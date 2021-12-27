import actions from './actions';

let { GET_GRADE, SET_GRADE } = actions;

let getGradesReducer = (state = [], action) => {
  switch (action.type) {
    case GET_GRADE:
      return(dispatch)=> GET_GRADE(dispatch)
      
    case SET_GRADE:
      return action.data;
    default:
      return state;
  }
};

export { getGradesReducer };
