import { FormEvent, useRef, useState } from "react";
import CreatableReactSelect from "react-select/creatable";
import { Link } from "react-router-dom";
import { NoteData, Tag } from "./App";
import { v4 as uuidV4 } from "uuid";
import { useNavigate } from "react-router-dom";

type NoteFormProps = {
  onSubmit: (data: NoteData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<NoteData>;

function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  markdown = "",
  tags = [],
}: NoteFormProps) {
  const Navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const markdownRef = useRef<HTMLTextAreaElement>(null);

  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);

  const submitForm = (event: FormEvent) => {
    event.preventDefault();

    onSubmit({
      title: titleRef.current!.value,
      markdown: markdownRef.current!.value,
      tags: selectedTags,
    });

    console.log("Form submitted");
    Navigate("..");
  };

  return (
    <div className="max-w-2xl mx-auto p-5 bg-white border border-gray-200 rounded-lg shadow sm:p-7 md:p-8 dark:bg-gray-800 dark:border-gray-700">
      <h1 className="text-3xl font-bold mb-7 text-center">
        Fill in the details below!
      </h1>

      <form onSubmit={submitForm} className="space-y-6">
        <div className="flex flex-col sm:flex-row gap-5">
          <div className="flex flex-col items-start w-full">
            <label
              htmlFor="title"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              ref={titleRef}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Enter Title"
              required
              defaultValue={title}
            />
          </div>

          <div className="flex flex-col w-full">
            <label
              htmlFor="tags"
              className=" flex mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Tags
            </label>
            <CreatableReactSelect
              isMulti
              onCreateOption={(label) => {
                const newTag = { id: uuidV4(), label };
                onAddTag(newTag);
                setSelectedTags((prev) => [...prev, newTag]);
                console.log("New tag created:", newTag); // Debugging log
              }}
              value={selectedTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              options={availableTags.map((tag) => ({
                label: tag.label,
                value: tag.id,
              }))}
              onChange={(tags) => {
                const updatedTags = tags.map((tag) => ({
                  label: tag.label,
                  id: tag.value,
                }));
                setSelectedTags(updatedTags);
                console.log("Tags changed:", updatedTags); // Debugging log
              }}
              className="basic-multi-select text-slate-400"
              classNamePrefix="select"
              id="tag"
            />
          </div>
        </div>

        <div className="flex flex-col items-start">
          <label
            htmlFor="description"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Enter Description
          </label>
          <textarea
            rows={10}
            id="description"
            ref={markdownRef}
            className="block w-full p-3 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Enter Description"
            defaultValue={markdown}
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none mt-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Submit
        </button>
      </form>

      <Link to="..">
        <button
          type="button"
          className="w-full mt-3 text-white bg-gray-700 hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:focus:ring-gray-500 dark:hover:bg-gray-800"
        >
          Discard & Go back!
        </button>
      </Link>
    </div>
  );
}

export default NoteForm;
