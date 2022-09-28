import { useLoaderData, Link } from "react-router-dom";

const PAGE_SIZE = 3;

export const getNumPages = (bookmarks: any[]) =>
  Math.ceil(bookmarks.length / PAGE_SIZE);

export default function Navi() {
  const { page, bookmarks } = useLoaderData() as {
    page: string;
    bookmarks: any[];
  };

  const p = parseInt(page);
  const pages = getNumPages(bookmarks);

  console.log("navi", p, pages);

  return (
    <div>
      <div className="flex ">
        <PageLink pages={pages} current={p} page={p - 1} label="<" />
        <div className="flex-grow flex gap-4 justify-center  ">
          <PageLink pages={pages} current={p} page={p - 2} />
          <PageLink pages={pages} current={p} page={p - 1} />
          <PageLink pages={pages} current={p} page={p} />
          <PageLink pages={pages} current={p} page={p + 1} />
          <PageLink pages={pages} current={p} page={p + 2} />
        </div>
        <PageLink pages={pages} current={p} page={p + 1} label=">" />
      </div>
      <div>
        page {p} of {pages}
      </div>
    </div>
  );
}

const PageLink = ({
  page,
  pages,
  label,
  current,
}: {
  page: number;
  pages: number;
  current: number;
  label?: string;
}) => {
  let style = ` w-10 h-10 underline `;
  if (current === page) style += " bg-blue-200";
  console.log({ current, page, style });

  if (page < 1 || page > pages) {
    if (label) return <div className={style}></div>;
    return null;
  }

  return (
    <Link
      className={style + " bg-gray-200 flex items-center justify-center"}
      to={`/${page}`}
    >
      {label ? label : page}
    </Link>
  );
};
