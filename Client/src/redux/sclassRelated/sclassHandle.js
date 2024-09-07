import axios from "axios";
import {
  getRequest,
  getSuccess,
  getFailed,
  getError,
  getStudentsSuccess,
  detailsSuccess,
  getFailedTwo,
  getSubjectsSuccess,
  getSubDetailsSuccess,
  getSubDetailsRequest,
} from "./sclassSlice";

// Fetch all school classes
export const getAllSclasses = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${address}List/${id}`
    );
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError({ message: error.message }));
  }
};

// Fetch students of a specific class
export const getClassStudents = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/Sclass/Students/${id}`
    );
    if (result.data.message) {
      dispatch(getFailedTwo(result.data.message));
    } else {
      dispatch(getStudentsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError({ message: error.message }));
  }
};

// Fetch details of a specific class
export const getClassDetails = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${address}/${id}`
    );
    if (result.data) {
      dispatch(detailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError({ message: error.message }));
  }
};

// Fetch list of subjects for a class
export const getSubjectList = (id, address) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${address}/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSubjectsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError({ message: error.message }));
  }
};

// Fetch subjects available for a teacher
export const getTeacherFreeClassSubjects = (id) => async (dispatch) => {
  dispatch(getRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/FreeSubjectList/${id}`
    );
    if (result.data.message) {
      dispatch(getFailed(result.data.message));
    } else {
      dispatch(getSubjectsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError({ message: error.message }));
  }
};

// Fetch details of a specific subject
export const getSubjectDetails = (id, address) => async (dispatch) => {
  dispatch(getSubDetailsRequest());

  try {
    const result = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${address}/${id}`
    );
    if (result.data) {
      dispatch(getSubDetailsSuccess(result.data));
    }
  } catch (error) {
    dispatch(getError({ message: error.message }));
  }
};
