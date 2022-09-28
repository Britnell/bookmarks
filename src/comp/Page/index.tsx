import { useLoaderData, json, redirect } from "react-router-dom";
import {
  fetchBookmarksPage,
  BookmarkI,
  removeBookmark,
} from "../../lib/bookmarks";
import { addBookmark } from "../../lib/bookmarks";
import List from "./List";
import Navi, { getNumPages } from "./Navi";

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
        <Navi />
      </div>
    </div>
  );
}

export const loader = async ({ params }: any) => {
  let parse = params.page ? parseInt(params.page) : 1;
  const page = isNaN(parse) ? 1 : parse;
  const { data: bookmarks } = await fetchBookmarksPage(page);

  // check valid page number
  const pages = getNumPages(bookmarks);
  if (page > pages) return redirect(`/${pages}`);

  return json({ bookmarks, page }, { status: 200 });
};

export const action = async ({
  params,
  request,
}: {
  params: any;
  request: Request;
}) => {
  console.log(" /ADD ", params);

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
