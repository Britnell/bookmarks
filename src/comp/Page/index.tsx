import { useLoaderData, json, redirect } from "react-router-dom";
import { fetchBookmarks, BookmarkI, removeBookmark } from "../../lib/bookmarks";
import { addBookmark, getNumPages } from "../../lib/bookmarks";
import List from "./List";
import Navi from "./Navi";

interface LoaderI {
  page: number;
  bookmarks: BookmarkI[];
}

export default function Page({}) {
  const { bookmarks } = useLoaderData() as LoaderI;

  return (
    <div className="">
      <List bookmarks={bookmarks} />
      <Navi />
    </div>
  );
}

export const loader = async ({ params }: any) => {
  let parse = params.page ? parseInt(params.page) : 1;
  const page = isNaN(parse) ? 1 : parse;
  try {
    const { data: bookmarks, pages } = await fetchBookmarks(page);
    return json({ bookmarks, page, pages }, { status: 200 });
  } catch (e) {
    return redirect(`/`);
  }
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
