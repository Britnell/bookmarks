import { useLoaderData, json } from "react-router-dom";
import { fetchBookmarksPage, BookmarkI } from "../../lib/bookmarks";
import { addBookmark } from "../../lib/bookmarks";

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
        <div> [ bookmarks ] </div>
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
  request,
}: {
  params: any;
  request: Request;
}) => {
  if (request.method !== "POST") throw { error: " POST request only " };

  const { url }: { url?: string } = Object.fromEntries(
    await request.formData()
  );

  if (!url) throw { error: 'req requires "url" ' };
  addBookmark(url);
};
