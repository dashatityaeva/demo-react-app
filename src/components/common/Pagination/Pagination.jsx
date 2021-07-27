import { useState } from 'react';
import st from './Pagination.module.css'
import cn from 'classnames'

const Pagination = ({pageSize, currentPageNumber, totalItemsCount, onPageChanged, portionSize = 10}) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages = [];
  for (let i = 1; i <= pagesCount; i++) {pages.push(i);}

  let portionCount = Math.ceil(pagesCount / portionSize);
  console.log('portionCount: ', portionCount);
  let [portionNumber, setPortionNumber] = useState(1);
  let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
  let rightPortionPageNumber = portionNumber * portionSize;

  return (
    <div>
      {portionNumber > 1 && <button onClick={() => {setPortionNumber(portionNumber - 1)}}>Prev</button>}

      { pages.filter(page => page >= leftPortionPageNumber && page <= rightPortionPageNumber)
        .map(page => {
          return <span onClick={()=> { onPageChanged(page) }} 
          className={ cn({[st.pageActive]: currentPageNumber === page }, st.pageNumber)} key={page}>{page}</span>
        })
       
      }

      {portionCount > portionNumber && <button onClick={() => {setPortionNumber(portionNumber + 1)}}>Next</button>}

    </div>
  )
}

export default Pagination;