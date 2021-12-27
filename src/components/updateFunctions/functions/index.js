import _ from 'lodash';
import Swal from 'sweetalert2';
import { deleteDocument2,AwsURL } from '../../../api/api';
export let onChangeDate = (date, dateString, string, setRecord, record) => {
  let da = record;
  let value = date.toISOString();
  _.set(da, string, value);
  setRecord(da);
};
export let  onChangeTime =(time, timeString,string, setRecord, record) => {
  console.log(time, timeString);
  let da = record;
  _.set(da, string, timeString);
  setRecord(da);
}
export let onChangeSelect = (value, string, setRecord, record) => {
  let da = record;
  _.set(da, string, value);
  setRecord(da);
};
export let onChangeInput = (e, string, setRecord, record) => {
  let da = e.target.value;
  let dat = record;
  _.set(dat, string, da);
  setRecord(dat);
};
export let deleteDocument21 = (folder, audio, string, setRecord, record, setIsdelete) => {
  let data = {
    folder: folder,
    audio: audio,
  };
  deleteDocument2(data)
    .then(res => {
      setRecord({...record,[string]:null,["location"]:null});
      if(setIsdelete){
        setIsdelete(true);
      }
    })
    .catch(e => {
      Swal.fire({
        icon: 'error',
        title: 'Database Error Retry',
        text:e
      });
    });
};
export const handleDownload = (folder,file) => {
  if (file) {
    let va = AwsURL+folder+'/'+file
    window.open(va, '_blank');
  } else {
    Swal.fire({
      icon: 'error',
      title: 'No file Available',
    });
  }
};
