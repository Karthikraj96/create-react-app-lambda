import {Actions} from './actions';

function examListReducer(state = { examLists: [] }, action) {
    switch (action.type) {
      case Actions.EXAM_LIST_REQUEST:
        return { loading: true, examLists: [] };
      case Actions.EXAM_LIST_SUCCESS:
        return { loading: false, examLists: action.payload };
      case Actions.EXAM_LIST_FAIL:
        return { loading: false, examLists: action.payload };
      default:
        return state;
    }
  }

  function examSaveReducer(state = { exam: {} }, action) {
    switch (action.type) {
      case Actions.EXAM_SAVE_REQUEST:
        return { loading: true, exam: {} };
      case Actions.EXAM_SAVE_SUCCESS:
        return { loading: false, exam: action.payload };
      case Actions.EXAM_SAVE_FAIL:
        return { loading: false, exam: action.payload };
      default:
        return state;
    }
  }


  function examDeleteReducer(state = { examDelete: {} }, action) {
    switch (action.type) {
      case Actions.EXAM_DELETE_REQUEST:
        return { loading: true, examDelete: {} };
      case Actions.EXAM_DELETE_SUCCESS:
        return { loading: false, examDelete: action.payload };
      case Actions.EXAM_DELETE_FAIL:
        return { loading: false, examDelete: action.payload };
      default:
        return state;
    }
  }






  function examTypeListReducer(state = { examTypeLists: [] }, action) {
    switch (action.type) {
      case Actions.EXAMTYPE_LIST_REQUEST:
        return { loading: true, examTypeLists: [] };
      case Actions.EXAMTYPE_LIST_SUCCESS:
        return { loading: false, examTypeLists: action.payload };
      case Actions.EXAMTYPE_LIST_FAIL:
        return { loading: false, examTypeLists: action.payload };
      default:
        return state;
    }
  }

  function examTypeSaveReducer(state = { examType: {} }, action) {
    switch (action.type) {
      case Actions.EXAMTYPE_SAVE_REQUEST:
        return { loading: true, examType: {} };
      case Actions.EXAMTYPE_SAVE_SUCCESS:
        return { loading: false, examType: action.payload };
      case Actions.EXAMTYPE_SAVE_FAIL:
        return { loading: false, examType: action.payload };
      default:
        return state;
    }
  }


  function examTypeDeleteReducer(state = { examTypeDelete: {} }, action) {
    switch (action.type) {
      case Actions.EXAMTYPE_DELETE_REQUEST:
        return { loading: true, examTypeDelete: {} };
      case Actions.EXAMTYPE_DELETE_SUCCESS:
        return { loading: false, examTypeDelete: action.payload };
      case Actions.EXAMTYPE_DELETE_FAIL:
        return { loading: false, examTypeDelete: action.payload };
      default:
        return state;
    }
  }














  export{

    examTypeListReducer,
    examTypeDeleteReducer,
    examTypeSaveReducer,
    
    examListReducer,
    examDeleteReducer,
    examSaveReducer
  }