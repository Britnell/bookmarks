import { Outlet } from "react-router-dom";
import AddBookmark from "./AddBookmark";

export default function Root() {
  return (
    <div className="  max-w-xl mx-auto">
      <header>
        <h1 className=" font-bold">Bookmarks App</h1>
      </header>
      <AddBookmark />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
