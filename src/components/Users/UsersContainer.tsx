import { useSelector } from "react-redux";
import { FilterType } from "../../redux/users-reducer";
import React from 'react';
import Preloader from "../common/Preloader/Preloader";
import {  selectIsFetching } from "../../redux/users-selectors";
import { UserType } from "../../types/types";
import { Users } from "./Users";


type UsersPagePropsType = {
  pageTitle: string
}

export const UsersPage: React.FC<UsersPagePropsType> = (props) => {
  const  isFetching = useSelector(selectIsFetching);
  return <>
      <h2>{props.pageTitle}</h2>
      {isFetching ? <Preloader/> : null}
      <Users />
    </>
}
