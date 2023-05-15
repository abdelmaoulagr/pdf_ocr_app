function Search() {
  return (
    <div className="input-group">
      <input
        type="text"
        className="form-control form-control-lg"
        placeholder="Recherche..."
        aria-label="Recipient's username with two button addons"
      ></input>
      <button className="btn btn-outline-secondary" type="button">
        Rechercher
      </button>
      <button className="btn btn-outline-secondary" type="button">
        Reset
      </button>
    </div>
  );
}

export default Search;
