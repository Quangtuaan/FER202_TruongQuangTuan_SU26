import { lazy, Suspense, useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

const Users = lazy(() => import("./components/Users"));
const Posts = lazy(() => import("./components/Posts"));

function App() {
  const [currentPage, setCurrentPage] = useState("users");

  return (
    <div>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <Suspense fallback={<div className="loading">Loading component...</div>}>
        {currentPage === "users" ? <Users /> : <Posts />}
      </Suspense>
    </div>
  );
}

export default App;