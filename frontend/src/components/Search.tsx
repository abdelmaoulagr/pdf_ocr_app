import React from "react";

function SearchBar() {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission
    const query = (document.getElementById("search-input") as HTMLInputElement)
      ?.value;
    console.log("Search query:", query);
    // Add your code here to handle the search request
    fetch('http://127.0.0.1:5000/lois', {
      method: 'POST',
      headers: {
          Accept: 'application/form-data',
          'Content-Type': 'application/json',
          },
      body: JSON.stringify({searchBar:query})
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      });
  };

  return (
    <form className="d-flex" role="search" onSubmit={handleSearch}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        name="query"
        id="search-input"
      />
    </form>
  );
}

export default SearchBar;
