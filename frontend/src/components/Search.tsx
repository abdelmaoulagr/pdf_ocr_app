import React from "react";

function SearchBar() {
  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent form submission
    const query = (document.getElementById("search-input") as HTMLInputElement)
      ?.value;
    console.log("Search query:", query);
    // fetch function to get data from Flask
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

    //for testing ur frontend code, if u text "hey" u'll find in response 409 message is {"error": 'Not Found'}
    // if u input any other thing u'll get some test data in array in console ofc (-_-). 
    // in use home page u'll find just 'Article 1' good luck bro
    //Idea : i prefer to use listOfSearch[] like FileInput.tsx 
    /*
    Note that: 
        data=[
                {'loi':'l9oraidise','art 1':'dir m3ak abinno'},
                {'loi':'lbokhrissi','art 1':'l7aj l3thmani'}
              ]
    */
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
