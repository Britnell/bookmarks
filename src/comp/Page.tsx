import { Outlet, useParams } from "react-router-dom";

const usePage = () => {
  const params = useParams();
  let page;
  try {
    page = params.page ? parseInt(params.page) : 0;
  } catch (e) {
    page = 0;
  }
  console.log(params, page);
  return page;
};

export default function Page({}) {
  const page = usePage();
  return (
    <div>
      <div>
        <h3>page {page}</h3>
      </div>
    </div>
  );
}

export const loader = () => {
  console.log("/load page");
};
