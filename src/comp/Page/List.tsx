import { useFetcher } from "react-router-dom";
import { BookmarkI } from "../../lib/bookmarks";

interface Props {
  bookmarks: BookmarkI[];
}

export default function List({ bookmarks }: Props) {
  return (
    <div>
      <div>
        <h2>Your Bookmarks</h2>
      </div>
      <div>
        <ul>
          {bookmarks.map((bm) => (
            <ListItem key={bm.timestamp} bookmark={bm} />
          ))}
        </ul>
      </div>
    </div>
  );
}

const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  // TODO - error check
  return date.toLocaleDateString("en-GB", {
    weekday: "short",
    month: "numeric",
    day: "2-digit",
    hour: "numeric",
    minute: "numeric",
  });
};

const ListItem = ({ bookmark }: { bookmark: BookmarkI }) => {
  const fetcher = useFetcher();

  return (
    <li className="flex gap-8">
      <div>
        <a href={bookmark.url}>
          <div>
            <span>{bookmark.url}</span> -{" "}
            <span>{formatDate(bookmark.timestamp)}</span>
          </div>
        </a>
      </div>
      <div>
        <fetcher.Form method="post" action="/remove">
          <input
            name="timestamp"
            defaultValue={bookmark.timestamp}
            className="hidden"
          />
          <button type="submit">X</button>
        </fetcher.Form>
      </div>
    </li>
  );
};
