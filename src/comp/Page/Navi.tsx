import { useLoaderData, Link } from "react-router-dom";

export default function Navi() {
  const { page, pages } = useLoaderData() as {
    page: string;
    bookmarks: any[];
    pages: number;
  };

  const p = parseInt(page);

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
