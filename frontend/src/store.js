import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

import { userLoginReducer, userRegisterReducer } from "./reducer/user";
import {createPaperReducer, getAllPaperReducer, getSinglePaperReducer} from "./reducer/paper";
import {createQuestionReducer, getAllQuestionsByPaperReducer} from "./reducer/question";
import {createExamReducer, getAllExamsByIdReducer, getAllExamsByDepartmentReducer} from "./reducer/exam";

const reducer = combineReducers({

  // user reducers list
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,

  // paper reducers list
  getAllPapers: getAllPaperReducer,
  createPaper: createPaperReducer,
  getSinglePapers: getSinglePaperReducer,

  // question reducers list
  createQuestion: createQuestionReducer,
  getAllQuestion: getAllQuestionsByPaperReducer,

  // exams reducers list
  createExam: createExamReducer,
  getAllExamById: getAllExamsByIdReducer,
  getAllExamByDepartment: getAllExamsByDepartmentReducer,


});

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;