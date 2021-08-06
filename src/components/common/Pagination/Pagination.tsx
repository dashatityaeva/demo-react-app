import { useState } from 'react';
import st from './Pagination.module.css'
import cn from 'classnames'

type PropsType = {
  pageSize: number
  currentPageNumber?: number
  totalItemsCount: number
  onPageChanged?: (pageNumber: number) => void
  portionSize?: number //? means that is not required
}

const Pagination: React.FC<PropsType> = ({pageSize, currentPageNumber = 1, totalItemsCount, onPageChanged = x => x, portionSize = 10}) => {

  let pagesCount = Math.ceil(totalItemsCount / pageSize);
  let pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {pages.push(i);}

  let portionCount = Math.ceil(pagesCount / portionSize);
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