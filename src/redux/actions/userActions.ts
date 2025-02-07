import axios from 'axios';
import axiosInstance from "../../configs/axiosInstance";

export const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST';
export const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS';
export const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE';


export const fetchUsers = () => async (dispatch: any) => {
  dispatch({ type: FETCH_USERS_REQUEST });
  try {
    const response = await axiosInstance.get('/get-users');  
    dispatch({
      type: FETCH_USERS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USERS_FAILURE,
      payload: error.message,
    });
  }
};
