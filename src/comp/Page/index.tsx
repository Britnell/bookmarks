import { useLoaderData, json } from "react-router-dom";
import {
  fetchBookmarksPage,
  BookmarkI,
  removeBookmark,
} from "../../lib/bookmarks";
import { addBookmark } from "../../lib/bookmarks";
import List from "./List";

interface LoaderI {
  page: number;
  bookmarks: BookmarkI[];
}

export default function Page({}) {
  const { page, bookmarks } = useLoaderData() as LoaderI;
  console.log("<page ", page, bookmarks);

  return (
    <div>
      <div>
        <List bookmarks={bookmarks} />
        <h3>page #{page} </h3>
      </div>
    </div>
  );
}

export const loader = async ({ params }: any) => {
  let parse = params.page ? parseInt(params.page) : 0;
  const page = isNaN(parse) ? 0 : parse;
  const { data: bookmarks } = await fetchBookmarksPage(page);
  return json({ bookmarks, page }, { status: 200 });
};

export const action = async ({
  params,
  request,
}: {
  params: any;
  request: Request;
}) => {
  if (request.method !== "POST") throw { error: " POST request only " };

  const { url, timestamp }: { url?: string; timestamp?: string } =
    Object.fromEntries(await request.formData());

  console.log("/ action ", params);

  const { page } = params;
  if (page === "add") {
    if (!url) throw { error: 'req requires "url" ' };
    addBookmark(url);
  }

  if (page === "remove") {
    if (!timestamp) throw { error: 'req requires "timestamp" ' };
    try {
      const ts = parseInt(timestamp);
      removeBookmark(ts);
    } catch (e) {
      throw { error: "invalid timestamp" };
    }
  }
};
