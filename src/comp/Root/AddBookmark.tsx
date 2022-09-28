import { Form } from "react-router-dom";

export default function AddBookmark() {
  return (
    <div>
      <div>
        <h3>Add bookmark</h3>
      </div>
      <Form method="post" action="/add">
        <input type="url" name="url" />
        <button type="submit">Add</button>
      </Form>
    </div>
  );
}
