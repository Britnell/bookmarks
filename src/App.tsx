import Create from "./comp/Create";
import Header from "./comp/Header";
import List from "./comp/List";

function App() {
  return (
    <div className="page max-w-xl mx-auto">
      <header>
        <Header />
      </header>
      <main>
        <Create />
        <p>BOokmarks</p>
        <List />
      </main>
    </div>
  );
}
export default App;
