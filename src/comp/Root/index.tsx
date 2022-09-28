import { Outlet } from "react-router-dom";
import AddBookmark from "./AddBookmark";

export default function Root() {
  return (
    <div>
      <header>
        <h1>BOokmarks App</h1>
      </header>
      <AddBookmark />
      <div>
        <Outlet />
      </div>
    </div>
  );
}
