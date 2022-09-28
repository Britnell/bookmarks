import { Outlet } from "react-router-dom";

export default function Root() {
  return (
    <div>
      <div>
        <h1>App</h1>
      </div>
      <div>Add Bookmark</div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
