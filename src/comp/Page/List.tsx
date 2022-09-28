import { Form } from "react-router-dom";
import { BookmarkI } from "../../lib/bookmarks";

interface Props {
  bookmarks: BookmarkI[];
}

export default function List({ bookmarks }: Props) {
  console.log(" <list ", bookmarks);

  return (
    <div>
      <div>
        <h2>Your Bookmarks</h2>
      </div>
      <div>
        <ul>
          {bookmarks.map((bm) => (
            <ListItem bookmark={bm} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const ListItem = ({ bookmark }: { bookmark: BookmarkI }) => {
  return (
    <li className="flex gap-8">
      <div>
        <a href={bookmark.url}>
          <div>
            <span>{bookmark.url}</span> - <span>{bookmark.timestamp}</span>
          </div>
        </a>
      </div>
      <div>
        <Form method="post" action="/remove">
          <input
            name="timestamp"
            value={bookmark.timestamp}
            className="hidden"
          />
          <button type="submit">X</button>
        </Form>
      </div>
    </li>
  );
};
