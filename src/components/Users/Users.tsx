import st from './Users.module.css'
import Pagination from '../common/Pagination/Pagination';
import User from './User';
import { FC, useEffect } from 'react';
import UsersSearchForm from './UsersSearchForm';
import { FilterType, getUsers } from '../../redux/users-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentPageNumber, selectFollowingInProgress, selectPageSize, selectTotalCount, selectUsers, selectUsersFilter } from '../../redux/users-selectors';
import { useHistory } from 'react-router-dom';
import * as queryString from 'querystring';


type PropsType = {}
type QueryParamsType =  {term?: string; page?: string; friend?: string}

export const Users: FC<PropsType> = (props) => {

  const users = useSelector(selectUsers);
  const totalCount = useSelector(selectTotalCount);
  const currentPageNumber = useSelector(selectCurrentPageNumber);
  const pageSize = useSelector(selectPageSize);
  const filter = useSelector(selectUsersFilter);
  const followingInProgress = useSelector(selectFollowingInProgress);

  const history = useHistory();

  const dispatch = useDispatch()

  useEffect(() => {
    const parsed = queryString.parse(history.location.search.substr(1)) as QueryParamsType

    let actualPageNumber = currentPageNumber
    let actualFilter = filter

    if (!!parsed.page) actualPageNumber = +parsed.page
    if (!!parsed.term) actualFilter = {...actualFilter, term: parsed.term as string}

    switch (parsed.friend) {
      case "null":
        actualFilter = {...actualFilter, friend: null}
        break;
      case "true":
          actualFilter = {...actualFilter, friend: true}
          break;
      case "false":
          actualFilter = {...actualFilter, friend: false}
          break;
      default:
        break;
    }

    dispatch(getUsers(actualPageNumber, pageSize, actualFilter));

  }, [])

  useEffect(() => {
    const query: QueryParamsType = {}

    if (!!filter.term) query.term = filter.term
    if (filter.friend !== null ) query.friend = String(filter.friend)
    if (currentPageNumber !== 1 ) query.page = String(currentPageNumber)

    history.push({
      pathname: "/devs",
      search: queryString.stringify(query)
    })
  }, [filter, currentPageNumber])

  const onPageChanged = (currentPage: number) => {
    dispatch(getUsers(currentPage, pageSize, filter));
  }

  const onFilterChanged = (filter: FilterType) => {
    dispatch(getUsers(1, pageSize, filter));
  }

  const follow = (userId: number) => {
    dispatch(follow(userId))
  }

  const unfollow = (userId: number) => {
    dispatch(unfollow(userId))
  }

    return (
      <div className={st.users}>

        <UsersSearchForm onFilterChanged = {onFilterChanged}/>
        <Pagination pageSize={pageSize} currentPageNumber={currentPageNumber} 
                    totalItemsCount={totalCount} onPageChanged={onPageChanged} portionSize={10} />
        
        Users:
        <div>
          {
            users.map(user => <User key={user.id} user={user}
              followingInProgress={followingInProgress} unfollow={unfollow} follow={follow}/>)
          }
        </div>
      </div>
    )
}
