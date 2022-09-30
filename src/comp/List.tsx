import { useState } from "react";
import { removeBookmark, updateBookmark, BookmarkI } from "../lib/bookmark";
import { useAppDispatch, useAppSelector } from "../lib/store";

export default function List() {
  const bookmarks = useAppSelector((state) => state.bookmark.list);

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {bookmarks.map((bm) => (
          <ListItem key={bm.timestamp} bookmark={bm} />
        ))}
      </ul>
    </div>
  );
}

const ListItem = ({ bookmark }: { bookmark: BookmarkI }) => {
  const [editing, setEditing] = useState(false);

  const dispatch = useAppDispatch();
  const [editValue, setEditValue] = useState(bookmark.url);

  const update = () => {
    dispatch(
      updateBookmark({
        timestamp: bookmark.timestamp,
        url: editValue,
      })
    );
    setEditing(false);
  };

  const styles = {
    url: "flex-grow",
    button: "rounded-md h-9 px-2 hover:bg-gray-200 capitalize",
  };

  return (
    <li className=" list-none px-2 py-1 bg-gray-100 rounded-md ">
      <div className="flex gap-4 items-center">
        {editing ? (
          <>
            <input
              value={editValue}
              onChange={(ev) => setEditValue(ev.target.value)}
              className={
                styles.url + " py-1 px-2 border-2 border-blue-300 rounded-md"
              }
            />
            <button className={styles.button} onClick={() => setEditing(false)}>
              cancel
            </button>
            <button
              className={styles.button + " bg-blue-300 hover:bg-blue-300"}
              onClick={update}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <a
              href={bookmark.url}
              className={
                styles.url +
                " hover:underline text-ellipsis whitespace-nowrap overflow-hidden"
              }
              target="_blank"
              rel="noopener noreferrer"
            >
              {bookmark.url}
            </a>
            <button className={styles.button} onClick={() => setEditing(true)}>
              edit
            </button>
            <button
              className={styles.button}
              onClick={() => dispatch(removeBookmark(bookmark.timestamp))}
            >
              delete
            </button>
          </>
        )}
      </div>
    </li>
  );
};
