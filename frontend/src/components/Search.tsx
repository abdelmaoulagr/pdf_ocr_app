import React from "react";

export let listOfSearch = [];
function SearchBar({ handleRefresh }) {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const query = (document.getElementById("search-input") as HTMLInputElement)
      ?.value;
    console.log("Search query:", query);
    // fetch function to get data from Flask
    fetch("http://127.0.0.1:5000/search", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ searchBar: query }),
    })
      .then((res) => res.json())
      .then((data) => {
        listOfSearch=data;
        console.log(listOfSearch);
      });
    //handleRefresh(true);
    setTimeout(handleRefresh, 2000, true);
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
