import api from "../util/api";
import {
  CREATE_PAPER_REQUEST,
  CREATE_PAPER_SUCCESS,
  CREATE_PAPER_FAILED,
  GET_PAPER_SUCCESS,
  GET_PAPER_REQUEST,
  GET_PAPER_FAILED,
  GET_SINGLE_PAPER_FAILED,
  GET_SINGLE_PAPER_REQUEST,
  GET_SINGLE_PAPER_SUCCESS,

} from "../constant/types";

import { logout } from "./user";

// FETCH STORED PAPER
export const get_all_paper = () => async (dispatch) => {
  try {
    dispatch({ type: GET_PAPER_REQUEST });

    const { data } = await api.get("/paper");

    dispatch({
      type: GET_PAPER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PAPER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ADMINISTRATORS - CREATE NEW QUESTION PROCESS
export const create_paper =
  (title, code, department) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_PAPER_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          token: userInfo.token,
        },
      };

      const { data } = await api.post(
        `/paper`,
        {
          title,
          code,
          department,
        },
        config
      );

      dispatch({
        type: CREATE_PAPER_SUCCESS,
        payload: data,
      });

    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: CREATE_PAPER_FAILED,
        payload: message,
      });
    }
  };


  // FETCH USER SPECIFIC PAPERS
export const get_single_paper = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_SINGLE_PAPER_REQUEST });

    const { data } = await api.get(`/paper/department/${id}`);

    dispatch({
      type: GET_SINGLE_PAPER_SUCCESS,
      payload: data,
    });
    
  } catch (error) {
    dispatch({
      type: GET_SINGLE_PAPER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};