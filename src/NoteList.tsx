import { useMemo, useState } from "react";
import ReactSelect from "react-select";
import { Note, Tag } from "./App";

type NoteCardProps = {
  title: string;
  tags: Tag[];
  id: string;
};

type NoteListProps = {
  availableTags: Tag[];
  notes: Note[];
};

function NoteList({ availableTags, notes }: NoteListProps) {
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      return (
        ((title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
          selectedTags.length === 0) ||
        selectedTags.every((tag) =>
          note.tags.some((noteTag) => noteTag.id === tag.id)
        )
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen">
      <div className="w-full max-w-lg">
        <div className="mb-5">
          <div className="flex justify-between items-center mb-11">
            <h1 className="text-3xl font-black">myNotes</h1>
            <div className="flex gap-3">
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5"
              >
                Create
              </button>
              <button
                type="button"
                className="text-slate-800 bg-slate-300 hover:bg-slate-500 rounded-lg text-sm px-5 py-2.5"
              >
                Edit Tags
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="title"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search title"
              />
            </div>

            <div className="flex-1 min-w-[200px]">
              <label
                htmlFor="tags"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Tags
              </label>
              <ReactSelect
                isMulti
                value={selectedTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                options={availableTags.map((tag) => ({
                  label: tag.label,
                  value: tag.id,
                }))}
                onChange={(tags) => {
                  setSelectedTags(
                    tags.map((tag) => ({ label: tag.label, id: tag.value }))
                  );
                }}
                className="basic-multi-select text-slate-700"
                classNamePrefix="select"
                id="tags"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-3 w-full max-w-lg">
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function NoteCard({ id, title, tags }: NoteCardProps) {
  return <h1> hiiii </h1>;
}

export default NoteList;
