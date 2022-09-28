import { useLoaderData } from "react-router-dom";
import { fetchBookmarksPage, BookmarkI } from "../../lib/bookmarks";

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
        <h3>page </h3>
      </div>
    </div>
  );
}

export const loader = async ({ params }: any): Promise<LoaderI> => {
  let parse = params.page ? parseInt(params.page) : 0;
  const page = isNaN(parse) ? 0 : parse;

  const { data: bookmarks } = await fetchBookmarksPage(page);
  return { page, bookmarks };
};
