import { FormEvent, useState } from "react";
import { useAppDispatch } from "../lib/store";
import { addBookmark, removeBookmark, BookmarkI } from "../lib/bookmark";

export default function Create() {
  const dispatch = useAppDispatch();

  const [urlInput, setUrlinput] = useState("");

  const add = (ev: FormEvent) => {
    ev.preventDefault();
    dispatch(addBookmark({ url: urlInput }));
    setUrlinput("");
  };

  return (
    <div>
      <form onSubmit={add}>
        <input
          name="url"
          value={urlInput}
          onChange={(ev) => setUrlinput(ev.target.value)}
        />
        <button type="submit">add</button>
      </form>
    </div>
  );
}
