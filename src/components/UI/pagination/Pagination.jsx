import React from 'react';
import { getPagesArray } from "../../../utils/pages.js";

const Pagination = ({totalPages, page, changePage}) => {

    let pagesArray = getPagesArray(totalPages);

    return (
        <div>
        <div style={{display: 'flex', justifyContent:'center'}}>
          {
          pagesArray.map(p =>
          <button
            onClick={() => changePage(p)}
            key={p}
            className={ page === p ? 'page page__curent' : 'page'}
          >
            {p}
          </button>)}
        </div>
        </div>
    );
};

export default Pagination;