import api from "../util/api";
import {
  GET_QUESTION_FAILED,
  GET_QUESTION_REQUEST,
  GET_QUESTION_SUCCESS,
  CREATE_QUESTION_FAILED,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_SUCCESS,
} from "../constant/types";

import { logout } from "./user";

// FETCH STORED PAPER
export const get_all_questions_by_paper = (id) => async (dispatch) => {
  try {
    dispatch({ type: GET_QUESTION_REQUEST });

    const { data } = await api.get(`/question/${id}`);

    dispatch({
      type: GET_QUESTION_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_QUESTION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// ADMINISTRATORS - CREATE NEW QUESTION PROCESS
export const create_question =
  ({ id, question, answer, option_one, option_two, option_three }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: CREATE_QUESTION_REQUEST,
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

      console.log(id);

      const { data } = await api.post(
        `/question/${id}`,
        {
          question,
          answer,
          option_one,
          option_two,
          option_three,
        },
        config
      );

      dispatch({
        type: CREATE_QUESTION_SUCCESS,
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
        type: CREATE_QUESTION_FAILED,
        payload: message,
      });
    }
  };
