import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../lib/store";
import { addBookmark } from "../lib/bookmark";

const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const validate_url = (str: string) => str.match(urlRegex);

export default function Create() {
  const dispatch = useAppDispatch();
  const [error, setError] = useState<{
    valid?: boolean;
    exist?: boolean;
  } | null>(null);

  const [urlInput, setUrlinput] = useState("");

  const add = async (ev: FormEvent) => {
    ev.preventDefault();

    // Check valid url string
    const _valid = validate_url(urlInput);
    if (!_valid) {
      setError({ valid: true });
      return;
    }

    // check url exists
    try {
      await fetch(urlInput, {
        method: "GET",
        mode: "no-cors",
      });
    } catch (e) {
      setError({ exist: true });
      return;
    }

    // Add bookmark
    setError(null);
    dispatch(addBookmark(urlInput));
    setUrlinput("");
  };

  useEffect(() => {
    // when url is valid, revalidate on text entry
    if (!error || !error?.valid) return;

    const _valid = validate_url(urlInput);
    if (_valid) setError(null);
  }, [urlInput, error]);

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
      {error?.valid && (
        <div>Please provide a valid url. ( full url inlcuding http/s )</div>
      )}
      {error?.exist && (
        <div>URL does not seem to exist, please double check</div>
      )}
    </div>
  );
}
