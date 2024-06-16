import NoteForm from "./NoteForm";
import { NoteData, Tag } from "./App";

type NewNoteProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

function NewNote({ onSubmit, onAddTag, availableTags }: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4">This is a NOTE!</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}

export default NewNote;
