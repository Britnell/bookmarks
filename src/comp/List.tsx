import { useState } from "react";
import { removeBookmark, updateBookmark, BookmarkI } from "../lib/bookmark";
import { useAppDispatch, useAppSelector } from "../lib/store";

export default function List() {
  const bookmarks = useAppSelector((state) => state.bookmark.list);

  return (
    <div>
      {bookmarks.map((bm) => (
        <ListItem key={bm.timestamp} bookmark={bm} />
      ))}
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
  return (
    <li>
      {editing ? (
        <div>
          <input
            value={editValue}
            onChange={(ev) => setEditValue(ev.target.value)}
          />
          <button onClick={() => setEditing(false)}>cancel</button>
          <button onClick={update}>Update</button>
        </div>
      ) : (
        <div>
          <div>{bookmark.url}</div>
          <button onClick={() => setEditing(true)}>edit</button>
          <button onClick={() => dispatch(removeBookmark(bookmark.timestamp))}>
            delete
          </button>
        </div>
      )}
    </li>
  );
};
