import { connect } from "react-redux";
import { follow, setCurrentPage, unfollow, toggleFollowingProgress, getUsers } from "../../redux/users-reducer";
import React from 'react';
import Users from './Users';
import Preloader from "../common/Preloader/Preloader";
import { withAuthRedirect } from "../../hoc/withAuthRedirect";
import { compose } from "redux";
import { selectCurrentPageNumber, selectFollowingInProgress, selectIsFetching, selectPageSize, selectTotalCount, selectUsers } from "../../redux/users-selectors";


class UsersContainer extends React.Component {

    componentDidMount() {
      //внутренняя деструктуризация 
      const {currentPageNumber, pageSize} = this.props;
      this.props.getUsers(currentPageNumber, pageSize);
    }
  
    onPageChanged = (currentPage) => {
      this.props.setCurrentPage(currentPage); // делаем активную страницу жирным
      this.props.getUsers(currentPage, this.props.pageSize);
    }
  
    render() {
      return <>
        {this.props.isFetching ? <Preloader/> : null}
      <Users totalCount={this.props.totalCount}
            pageSize={this.props.pageSize} 
            currentPageNumber={this.props.currentPageNumber}
            users={this.props.users}
            onPageChanged = {this.onPageChanged}
            follow = {this.props.follow}
            unfollow = {this.props.unfollow}
            followingInProgress = {this.props.followingInProgress}
      />
      </>
    }
}

const mapStateToProps = (state) => {
    return {
        users: selectUsers(state),
        totalCount: selectTotalCount(state),
        pageSize: selectPageSize(state),
        currentPageNumber: selectCurrentPageNumber(state),
        isFetching: selectIsFetching(state),
        followingInProgress: selectFollowingInProgress(state)
    }
}

//раньше создавали mapDispatchToProps и передавали его в connect()
// const mapDispatchToProps = (dispatch) => {
//     return {
//         follow: (id) => {
//             dispatch(followAC(id));
//         },
//         unfollow: (id) => {
//             dispatch(unfollowAC(id));
//         },
//         setUsers: (users) => {
//             dispatch(setUsersAC(users));
//         },
//         setTotalCount: (totalCount) => {
//             dispatch(setTotalCountAC(totalCount));
//         },
//         setCurrentPage: (currentPage) => {
//             dispatch(setCurrentPageAC(currentPage));
//         },
//         toggleIsFetching: (isFetching) => {
//             dispatch(toggleIsFetchingAC(isFetching));
//         },
//     }
// }

// export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

//теперь передаем объект вместо mapDispatchToProps
//ключ и значение совпадают по имени, пишем один раз

// let UsersContainerWitRedirect = WithAuthRedirect(UsersContainer)

export default compose(
  withAuthRedirect,
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleFollowingProgress,
    getUsers
  })
)(UsersContainer);