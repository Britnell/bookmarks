import { Form, useFetcher } from "react-router-dom";

export default function AddBookmark() {
  const fetcher = useFetcher();

  return (
    <div>
      <div>
        <h3>Add bookmark</h3>
      </div>
      <fetcher.Form method="post" action="/add" className="flex gap-4">
        <input
          type="url"
          name="url"
          className="flex-grow border-2 border-gray-500 px-2 py-2"
        />
        <button type="submit" className="p-2 bg-gray-200 hover:bg-blue-200">
          Add
        </button>
      </fetcher.Form>
    </div>
  );
}
