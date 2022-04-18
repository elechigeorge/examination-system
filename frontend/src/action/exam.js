import api from "../util/api";
import {
  CREATE_EXAM_REQUEST,
  CREATE_EXAM_SUCCESS,
  CREATE_EXAM_FAILED,
  GET_EXAM_SUCCESS,
  GET_EXAM_REQUEST,
  GET_EXAM_FAILED,
  GET_EXAMS_BY_DEPARTMENT_FAILED,
  GET_EXAMS_BY_DEPARTMENT_REQUEST,
  GET_EXAMS_BY_DEPARTMENT_SUCCESS
} from "../constant/types";

import { logout } from "./user";

// FETCH STORED PAPER
export const get_exams_by_id = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAM_REQUEST });

    const { data } = await api.get(`/exam/${id}`);

    dispatch({
      type: GET_EXAM_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXAM_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ADMINISTRATORS - CREATE NEW QUESTION PROCESS
export const create_exam =
  ({user, paper, result}) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_EXAM_REQUEST,
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
        `/exam`,
        {
          user,
          paper,
          result,
        },
        config
      );

      dispatch({
        type: CREATE_EXAM_SUCCESS,
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
        type: CREATE_EXAM_FAILED,
        payload: message,
      });
    }
  };


  // FETCH STORED PAPER
export const get_exams_by_department = (department) => async (dispatch) => {
  try {
    dispatch({ type: GET_EXAMS_BY_DEPARTMENT_REQUEST });

    const { data } = await api.get(`/exam/d/${department}`);

    dispatch({
      type: GET_EXAMS_BY_DEPARTMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_EXAMS_BY_DEPARTMENT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
