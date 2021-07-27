import st from './Users.module.css'
import Pagination from '../common/Pagination/Pagination';
import User from './User';

const Users = ({pageSize, currentPageNumber, totalCount, onPageChanged, ...props}) => {

    return (
        <div className={st.users}>
          <Pagination pageSize={pageSize} currentPageNumber={currentPageNumber} 
                      totalItemsCount={totalCount} onPageChanged={onPageChanged} portionSize={10} />
         
        Users:
        <div>
          {
            props.users.map(user => <User key={user.id} user={user}
              followingInProgress={props.followingInProgress} unfollow={props.unfollow} follow={props.follow}/>)
          }
        </div>
      </div>
      )
}

export default Users;