function Navbar({ currentPage, setCurrentPage }) {
  return (
    <nav className="navbar">
      <div className="logo">Logo</div>

      <div className="nav-links">
        <button
          className={currentPage === "users" ? "active" : ""}
          onClick={() => setCurrentPage("users")}
        >
          Home
        </button>

        <button
          className={currentPage === "posts" ? "active" : ""}
          onClick={() => setCurrentPage("posts")}
        >
          Posts
        </button>
      </div>
    </nav>
  );
}

export default Navbar;