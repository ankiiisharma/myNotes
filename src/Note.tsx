import { Link } from "react-router-dom";
import { useNote } from "./NoteLayout";

function Note() {
  const note = useNote();
  return (
    <>
      <div className="flex flex-col items-center p-4 w-full max-w-lg">
        <div className="flex w-full flex-row justify-between  ">
          {/* NOTE TITLE */}
          <div>
            <h1>{note.title}</h1>
          </div>

          {/* BUTTON */}
          <div className="text-yellow-500 ">
            <button> Submit </button>
            <Link to={`/${note.id}/edit`}>
              <button> edit </button>
            </Link>
            <Link to={"/"}>
              <button> home </button>
            </Link>
          </div>
        </div>

        <div>
          <p>{note.markdown}</p>
        </div>
      </div>
    </>
  );
}

export default Note;
