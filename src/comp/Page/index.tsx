import { useLoaderData, json, redirect } from "react-router-dom";
import { fetchBookmarks, BookmarkI } from "../../lib/bookmarks";

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
