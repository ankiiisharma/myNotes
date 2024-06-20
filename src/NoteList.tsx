import { useEffect, useMemo, useState } from "react";
import ReactSelect from "react-select";
import { Note, Tag } from "./App";
import { Link } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";

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
      const titleMatch =
        title === "" || note.title.toLowerCase().includes(title.toLowerCase());
      const tagsMatch =
        selectedTags.length === 0 ||
        selectedTags.every((tag) =>
          note.tags.some((noteTag) => noteTag.id === tag.id)
        );
      return titleMatch && tagsMatch;
    });
  }, [title, selectedTags, notes]);

  return (
    <div className="flex flex-col items-center p-4 min-h-screen ">
      <div className="w-full max-w-lg">
        <div className="mb-5">
          <div className="flex justify-between items-center mb-10">
            <h1 className="flex text-3xl font-black underline decoration-sky-500 hover:translate-y-1 cursor-pointer transition-1">
              myNotes
            </h1>
            <div className="flex gap-3 ">
              <Link to={"/new"}>
                <button
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 rounded-lg text-sm px-5 py-2.5 sm:"
                >
                  Create
                </button>
              </Link>
              {/* <button
                type="button"
                className="text-slate-800 bg-slate-300 hover:bg-slate-500 rounded-lg text-sm px-5 py-2.5"
              >
                Edit Tags
              </button> */}
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

      <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 gap-3 w-full max-w-lg mt-9">
        {filteredNotes.map((note) => (
          <div key={note.id}>
            <NoteCard id={note.id} title={note.title} tags={note.tags} />
          </div>
        ))}
        {/* <EditTagModal /> */}
      </div>
    </div>
  );
}

// function EditTagModal() {
//   return (
//     <>
//       <div>Modal</div>
//     </>
//   );
// }

function NoteCard({ id, title, tags }: NoteCardProps) {
  useEffect(() => {
    Aos.init();
  }, []);

  return (
    <>
      <Link to={`/${id}`}>
        <div data-aos="fade-up" data-aos-anchor-placement="top-center">
          <div className="bg-slate-200 border rounded-lg p-9 shadow hover:bg-slate-400 cursor-pointer -translate-y-6 ">
            <h2 className="text-xl font-bold text-slate-800 flex justify-center ">
              {title}
            </h2>
            <div className="flex flex-wrap gap-2 mt-9">
              {tags.map((tag) => (
                <span
                  key={tag.id}
                  className="bg-slate-700 text-ehite-800 text-sm font-medium px-2.5 py-0.5 rounded"
                >
                  {tag.label}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default NoteList;
