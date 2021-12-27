import actions from './actions';
import _ from 'lodash';
import { getOrgId } from '../../api/api';
let getOrg = () => {
  return dispatch => {
    getOrgId().then(response => {
      dispatch(setOrg(response.data))});
  };
};
let setOrg = data => {
  return { type: actions.SET_ORG, data: data };
};

export { setOrg, getOrg };
