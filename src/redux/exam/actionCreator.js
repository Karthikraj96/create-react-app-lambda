import { Actions } from './actions';
import { api } from '../../api/api';
import Cookies from 'js-cookie';
let token = Cookies.get('auth_token')
api.defaults.headers.common.Authorization = `Bearer ${token}`;

// List all EXAMs
const listExams = (organization_id = 0) => async dispatch => {
  try {
    dispatch({ type: Actions.EXAM_LIST_REQUEST });
    let link = '/getAllExams';
    if (organization_id) {
      link = `/getAllExams?organization_id=${organization_id}`;
    }

    // Data request comes here
    const { data } = await api.get(link);

    dispatch({ type: Actions.EXAM_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: Actions.EXAM_LIST_FAIL, payload: []});
  }
};

// Delete Exams
const delExam = examId => async dispatch => {
  try {
    dispatch({ type: Actions.EXAM_DELETE_REQUEST });
    // Data request comes here
    const { data } = await api.delete(`/deleteExam/${examId}`);
    dispatch({ type: Actions.EXAM_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: Actions.EXAM_DELETE_FAIL, payload: error.message });
  }
};

// Save an Exam
const saveExam = examDetails => async dispatch => {
  try {
    dispatch({ type: Actions.EXAM_SAVE_REQUEST });

    if (!examDetails.id) {
      const { data } = await api.post('/createExam', examDetails);
      if (data.ERROR) {
        dispatch({ type: Actions.EXAM_SAVE_FAIL, payload: data.ERROR });
        alert('Exam Id duplicate found');
      }
      dispatch({ type: Actions.EXAM_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await api.post('/createExam', examDetails);
      if (data.ERROR) {
        dispatch({ type: Actions.EXAM_SAVE_FAIL, payload: data.ERROR });
        alert('Error updating exam');
      }
      dispatch({ type: Actions.EXAM_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: Actions.EXAM_SAVE_FAIL, payload: error.message });
  }
};

// List all ExamType
const listExamType = (organization_id = 0) => async dispatch => {
  try {
    dispatch({ type: Actions.EXAMTYPE_LIST_REQUEST });
    let link = '/getAllExamType';
    if (organization_id) {
      link = `/getAllExamType?organization_id=${organization_id}`;
    }

    // Data request comes here
    const { data } = await api.get(link);

    dispatch({ type: Actions.EXAMTYPE_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: Actions.EXAMTYPE_LIST_FAIL, payload:[] });
  }
};

// Delete ExamType
const delExamType = examId => async dispatch => {
  try {
    dispatch({ type: Actions.EXAMTYPE_DELETE_REQUEST });
    // Data request comes here
    const { data } = await api.delete(`/deleteSchoolexamtype/${examId}`);
    console.log('Delete', data);
    dispatch({ type: Actions.EXAMTYPE_DELETE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: Actions.EXAMTYPE_DELETE_FAIL, payload: error.message });
  }
};

// Save an Exam
const saveExamType = examDetails => async dispatch => {
  try {
    dispatch({ type: Actions.EXAMTYPE_SAVE_REQUEST });

    if (!examDetails.id) {
      const { data } = await api.post('/addSchoolexamtype', examDetails);
      if (data.ERROR) {
        console.log(data);
        dispatch({ type: Actions.EXAMTYPE_SAVE_FAIL, payload: data.ERROR });
        alert('Exam Id duplicate found');
      }
      dispatch({ type: Actions.EXAMTYPE_SAVE_SUCCESS, payload: data });
    } else {
      const { data } = await api.post('/createExam', examDetails);
      if (data.ERROR) {
        dispatch({ type: Actions.EXAMTYPE_SAVE_FAIL, payload: data.ERROR });
        alert('Error updating exam');
      }
      dispatch({ type: Actions.EXAMTYPE_SAVE_SUCCESS, payload: data });
    }
  } catch (error) {
    dispatch({ type: Actions.EXAMTYPE_SAVE_FAIL, payload: error.message });
  }
};

export { listExams, delExam, saveExam, listExamType, delExamType, saveExamType };
