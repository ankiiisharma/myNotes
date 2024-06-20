import { Link } from "react-router-dom";
import { useNote } from "./NoteLayout";
import { useNavigate } from "react-router-dom";
import { MdEdit as EditIcon } from "react-icons/md";
import { MdOutlineDelete as DeleteIcon } from "react-icons/md";
import { MdHome as HomeIcon } from "react-icons/md";

type NoteProps = {
  onDelete: (id: string) => void;
};

function Note({ onDelete }: NoteProps) {
  const navigate = useNavigate();
  const note = useNote();

  return (
    <div className="flex flex-col items-center max-w-2xl mx-auto p-5 sm:p-7 md:p-8 dark:border-gray-700">
      <div className="flex flex-col items-center max-w-2xl mx-auto p-5 sm:p-7 md:p-8 dark:border-gray-700">
        <div className="w-full">
          {/* Title */}
          <h1 className="text-3xl font-bold text-slate-100 mb-4 underline decoration-blue-500 ">
            {note.title}
          </h1>

          {/* Note Content Section */}
          <div className="w-full justify-start bg-gray-100 bg-opacity-25 p-9 rounded-md mt-9">
            <div className="text-slate-200 font-normal">{note.markdown}</div>
          </div>
        </div>
      </div>

      {/* BUTTON */}
      <div className="mb-8 w-full flex items-center justify-center mt-10">
        {/* Buttons */}

        <div className="flex items-center space-x-1">
          <Link to={`/${note.id}/edit`}>
            <button className="flex items-center px-4 py-2 bg-slate-500 text-white rounded-md shadow-md hover:bg-green-700">
              <EditIcon className="w-5 h-5 mr-2" />
              Edit
            </button>
          </Link>
          <button
            onClick={() => {
              onDelete(note.id);
              navigate("/");
            }}
            className="flex items-center px-4 py-2 bg-red-800 text-white rounded-md shadow-md hover:bg-red-600"
          >
            <DeleteIcon className="w-5 h-5 mr-2" />
            Delete
          </button>
          <Link
            to={"/"}
            className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-md shadow-md hover:bg-gray-300"
          >
            <HomeIcon className="w-5 h-5 mr-2" />
            Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Note;
