import { Outlet } from "react-router-dom";
import AddBookmark from "./AddBookmark";

export default function Root() {
  return (
    <div>
      <div>
        <h1>App</h1>
      </div>
      <AddBookmark />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
