import { Form, useFetcher } from "react-router-dom";

export default function AddBookmark() {
  const fetcher = useFetcher();

  return (
    <div>
      <div>
        <h3>Add bookmark</h3>
      </div>
      <fetcher.Form method="post" action="/add">
        <input type="url" name="url" />
        <button type="submit">Add</button>
      </fetcher.Form>
    </div>
  );
}
