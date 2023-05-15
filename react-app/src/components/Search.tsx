function SearchBar() {
  return (
    <form className="d-flex" role="search">
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        /*onMouseEnter={function ok() {
          return console.log("ok");
        }}*/
        /*onKeyDown={function ok() {
          return console.log("ok");
        }}
        onPointerEnter={function ok() {
          return console.log("ok");
        }}*/
        /*onKeyUpCapture={function ok() {
          return console.log("ok");
        }}*/
      />
    </form>
  );
}
export default SearchBar;
