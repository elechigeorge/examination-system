import {
    CREATE_EXAM_FAILED,
    CREATE_EXAM_REQUEST,
    CREATE_EXAM_SUCCESS,
    GET_EXAM_FAILED,
    GET_EXAM_REQUEST,
    GET_EXAM_SUCCESS,
    GET_EXAMS_BY_DEPARTMENT_FAILED,
    GET_EXAMS_BY_DEPARTMENT_REQUEST,
    GET_EXAMS_BY_DEPARTMENT_SUCCESS
  } from "../constant/types";
  
  export const createExamReducer = (state = {}, action) => {
    switch (action.type) {
      case CREATE_EXAM_REQUEST:
        return { loading: true };
      case CREATE_EXAM_SUCCESS:
        return { loading: false, exam: action.payload };
      case CREATE_EXAM_FAILED:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const getAllExamsByIdReducer = (state = [], action) => {
    switch (action.type) {
      case GET_EXAM_REQUEST:
        return { loading: true };
      case GET_EXAM_SUCCESS:
        return { loading: false, exams: action.payload };
      case GET_EXAM_FAILED:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const getAllExamsByDepartmentReducer = (state = [], action) => {
    switch (action.type) {
      case GET_EXAMS_BY_DEPARTMENT_REQUEST:
        return { loading: true };
      case GET_EXAMS_BY_DEPARTMENT_SUCCESS:
        return { loading: false, exams: action.payload };
      case GET_EXAMS_BY_DEPARTMENT_FAILED:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  