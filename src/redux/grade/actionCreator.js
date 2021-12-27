import actions from './actions';
import getGrade2 from '../../api/api'

let getGrade =() => {
  return ( dispatch )=>{
    getGrade2()
    .then((response)=> dispatch(setGrade( response.data )))
}
  }
  let setGrade = (data) => {
    return {   "type" : actions.SET_GRADE,"data":data}
  }


export {setGrade,getGrade}