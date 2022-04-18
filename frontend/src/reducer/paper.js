import {
    CREATE_PAPER_FAILED,
    CREATE_PAPER_REQUEST,
    CREATE_PAPER_SUCCESS,
    GET_PAPER_FAILED,
    GET_PAPER_REQUEST,
    GET_PAPER_SUCCESS,
    GET_SINGLE_PAPER_FAILED,
    GET_SINGLE_PAPER_REQUEST,
    GET_SINGLE_PAPER_SUCCESS,
  } from "../constant/types";
  
  export const createPaperReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_PAPER_REQUEST:
        return { loading: true };
      case CREATE_PAPER_SUCCESS:
        return { loading: false, paper: action.payload };
      case CREATE_PAPER_FAILED:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllPaperReducer = (state = [], action) => {
    switch (action.type) {
      case GET_PAPER_REQUEST:
        return { loading: true };
      case GET_PAPER_SUCCESS:
        return { loading: false, papers: action.payload };
      case GET_PAPER_FAILED:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const getSinglePaperReducer = (state = [], action) => {
    switch (action.type) {
      case GET_SINGLE_PAPER_REQUEST:
        return { loading: true };
      case GET_SINGLE_PAPER_SUCCESS:
        return { loading: false, papers: action.payload };
      case GET_SINGLE_PAPER_FAILED:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  
  