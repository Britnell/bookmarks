import { useState } from "react";
import { useFetcher, useNavigation } from "react-router-dom";
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
        <ul className="flex flex-col gap-2">
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
  const [editing, setEditing] = useState(false);
  const fetcher = useFetcher();

  return (
    <li className="flex gap-8  items-center hover:bg-gray-300 px-4 py-1">
      {editing ? (
        <>
          <fetcher.Form method="post" action="/update">
            <input defaultValue={bookmark.url} name="url" />
            <input
              defaultValue={bookmark.timestamp}
              name="timestamp"
              className="hidden"
            />
            <button type="submit">update</button>
            <button
              type="button"
              className="hover:bg-gray-500 w-8 h-8"
              onClick={() => setEditing(false)}
            >
              cancel
            </button>
          </fetcher.Form>
        </>
      ) : (
        <>
          <a href={bookmark.url} className="flex-grow ">
            <div className="flex gap-4">
              <span className="flex-grow">{bookmark.url}</span>
              <span>{formatDate(bookmark.timestamp)}</span>
            </div>
          </a>
          <div>
            <fetcher.Form method="post" action="/rmv">
              <input
                name="timestamp"
                defaultValue={bookmark.timestamp}
                className="hidden"
              />
              <button
                type="button"
                className="hover:bg-gray-500 w-8 h-8"
                onClick={() => setEditing(true)}
              >
                e
              </button>
              <button type="submit" className="hover:bg-gray-500 w-8 h-8">
                X
              </button>
            </fetcher.Form>
          </div>
        </>
      )}
    </li>
  );
};
