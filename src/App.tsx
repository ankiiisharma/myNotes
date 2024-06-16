import React, { useMemo } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "./App.css";

import { v4 as uuidV4 } from "uuid";

import NewNote from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";

export type Note = {
  id: string;
} & NoteData;

export type NoteData = {
  title: string;
  markdown: string;
  tags: Tag[];
};

export type Tag = {
  id: string;
  label: string;
};

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  markdown: string;
  tagsIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => note.tagsIds.includes(tag.id)),
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes((prevNotes) => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map((tag) => tag.id) },
      ];
    });
  }

  function onAddTag(tag: Tag) {
    setTags((prev) => [...prev, tag]);
  }

  return (
    <div className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <h1 className="text-white font-bold"> Hii you are at "home"</h1>
          }
        />
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route
          path="/new"
          element={
            <NewNote
              onSubmit={onCreateNote}
              onAddTag={onAddTag}
              availableTags={tags}
            />
          }
        />
        <Route path="/:id">
          <Route index element={<h1>show notes</h1>} />
          <Route path="edit" element={<h1>edit notes</h1>} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
