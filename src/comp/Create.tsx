import { FormEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../lib/store";
import { addBookmark } from "../lib/bookmark";

const urlRegex =
  /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;

const validate_url = (str: string) => str.match(urlRegex);

const existing_url = (url: string) =>
  fetch(url, {
    method: "GET",
    mode: "no-cors",
  });

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
    // try {      await existing_url(urlInput);    } catch (e)
    // {      setError({ exist: true });      return;    }

    // Add bookmark
    setError(null);
    dispatch(addBookmark(urlInput));
    setUrlinput("");
  };

  useEffect(() => {
    // when url is valid, revalidate on text entry
    if (!error || !error?.valid) return;

    // error clears when input is empty
    if (urlInput === "") {
      setError(null);
      return;
    }

    const _valid = validate_url(urlInput);
    if (_valid) setError(null);
  }, [urlInput, error]);

  return (
    <div className="mt-4">
      <form onSubmit={add}>
        <label className="text-lg py-2 block" htmlFor="url">
          Add a bookmark :
        </label>
        <div className="flex gap-4">
          <input
            name="url"
            value={urlInput}
            placeholder="https://..."
            onChange={(ev) => setUrlinput(ev.target.value)}
            className="flex-grow  border-2 border-gray-400 rounded-md py-1 px-3 text-lg"
          />
          <button
            type="submit"
            className="text-lg font-semibold capitalize py-1 px-3 bg-gray-300 rounded-md hover:bg-blue-400 hover:text-white"
          >
            add
          </button>
        </div>
      </form>
      <div className="h-10">
        <div className="errormsg p-2 text-red-800 text-lg">
          {error?.valid &&
            "Please provide a valid url. ( full url inlcuding http/s )"}
          {error?.exist && "URL does not seem to exist, please double check"}
        </div>
      </div>
    </div>
  );
}
