import React, { useState, useEffect } from "react";

import "./SelectPage.css";

function SelectPage({ pageN, totalPage, onChange }) {
  const [number, setNumber] = useState(pageN);

  const handleNextPage = () => {
    onChange(pageN + 1);
  };

  const handlePrewPage = () => {
    onChange(pageN - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (number > totalPage) {
      alert("The page is currently unavailable");
      return;
    } else {
      onChange(number);
    }
  };

  useEffect(() => {
    setNumber(pageN);
  }, [pageN]);

  return (
    <div className="select">
      <div className="button">
        {pageN > 1 && <button onClick={handlePrewPage}>Prew</button>}
        <p>{pageN}</p>
        {pageN < totalPage && <button onClick={handleNextPage}>Next</button>}
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <p>Total Page : {totalPage}</p>
        <input
          type="number"
          min="1"
          pattern="[0-9]*"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />

        <button type="submit">Go</button>
      </form>
    </div>
  );
}

export default SelectPage;
