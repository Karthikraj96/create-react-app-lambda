import actions from './actions';

let { GET_ORG,SET_ORG } = actions;
let getOrgReducer = (state = [], action) => {
  switch (action.type) {
    case GET_ORG:
      return(dispatch)=> GET_ORG(dispatch)
      
    case SET_ORG:
      return action.data;
    default:
      return state;
  }
};

export { getOrgReducer };
