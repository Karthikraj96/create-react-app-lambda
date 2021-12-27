import React, { useEffect, useState } from 'react';
import { Row, Button } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import { InputNumber, Input, Space } from 'antd';
import { useStateRef } from 'use-state-ref';
import CustomTable from '../fee/dashboard/Components/Table';
import { uploadFileForExam, entryMark, deleteDocument2, getSectionScheduledel } from '../../api/api';
import Swal from 'sweetalert2';
let Markentry = () => {
  const location = useLocation();
  let [edit, setEdit] = useState(false);
  let [Data, SetData] = useState([]);
  const stateRef = useStateRef(Data);
  let stateEdit = useStateRef(edit);
  let [val, setVal] = useState(false);
  const val2 = useStateRef(val);
  let [columns, setColumns] = useState([
    {
      title: 'Roll No',
      dataIndex: 'rollno',
      key: 'RollNO',
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentname',
    },

    {
      title: 'Theory',
      render: (text, record) => {
        return (
          <Space size={'middle'}>
            {stateEdit.current ? (
              <>
                {' '}
                <InputNumber
                  type="number"
                  controls={false}
                  value={record.marks_scored}
                  size={'middle'}
                  max={record.tmax}
                  min={0}
                  onChange={e => handleTheory(e, record)}
                  style={{ width: '100px' }}
                />
              </>
            ) : (
              <>
                {' '}
                <InputNumber
                  type="number"
                  controls={false}
                  //  value={record.marks_scored}
                  size={'middle'}
                  max={record.tmax}
                  min={0}
                  onChange={e => handleTheory(e, record)}
                  style={{ width: '100px' }}
                />
              </>
            )}
          </Space>
        );
      },
      key: 'Theory',
    },

    {
      title: 'Answer Sheet',
      key: 'answersheet',
      render: (text, record) => {
        if (record.answersheet.length > 0) {
          return (
            <Space size={'middle'}>
              <p onDoubleClick={() => handleDelete(record)}> {record.answersheet}</p>
            </Space>
          );
        } else {
          return (
            <Space size={'middle'}>
              <Input bordered={false} style={{ width: '105px' }} onChange={e => handleInput(e, record)} type="file" />
            </Space>
          );
        }
      },
    },
    {
      title: 'Convert',
      render: (text, record) => {
        if (record.converted) {
          let ifind = record.ifind ? record.ifind : 0;
          let totalScored = record.totalScored + record.bestofPA + ifind;
          let iexam = location.state.iexam ? location.state.iexam : 0;
          let PAavgmark = location.state.subexam === true ? location.state.PAavgmark : 0;
          let totalMark = record.totalMark + PAavgmark + iexam;
          // convertMark
          // console.log("totalScored",totalScored,"totalMark",totalMark,"record.convertMark",record.convertMark)
          let val = (totalScored / totalMark) * Number(record.convertMark);
          record.converted = val;
          // console.log("val",val)
          return Math.round(val);
        } else {
          return null;
        }
      },
      key: 'total',
    },
    {
      title: 'Result',
      dataIndex: 'Result',
      key: 'Result',
    },
  ]);
  let [update, setUpdate] = useState(0);
  useEffect(() => {
    let da = {
      exam_schedule_id: location.state.exam_schedule_id,
      section_id: location.state.section_id,
      subject: location.state.subject,
    };
    getSectionScheduledel(da)
      .then(res => {
        if (res.data.length > 0) {
          setVal(true);
          setEdit(true);
          if (location.state.ifind === false) {
            let data = res.data;
            data.map((e, key) => {
              if (location.state.iexam2.length > 0) {
                data[key].ifind = location.state.iexam2[0].mark;
              }
            });
            if (location.state.subexam === true) {
              data.map((e, key) => {
                data[key].bestofPA = location.state.bestofPA[key].bestPa;
              });
            }
            SetData(data);
          } else {
            let data = res.data;
            if (location.state.subexam === true) {
              data.map((e, key) => {
                data[key].bestofPA = location.state.bestofPA[key].bestPa;
                data[key].ifind = 0;
              });
            }
            SetData(data);
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
    if (location.state) {
      if (location.state.subexam === true) {
        let val = {
          title: 'BestOfPA',
          key: 'BestOfPA',
          dataIndex: 'bestofPA',
        };
        let arr = columns;
        arr.splice(2, 0, val);
        setColumns(arr);
      }
      if (location.state.ifind === false) {
        if (location.state.iexam2.length > 0) {
          let val = {
            title: location.state.iexam2[0].Ttype,
            key: location.state.iexam2[0].Ttype,
            dataIndex: 'ifind',
          };
          let arr = columns;
          arr.splice(2, 0, val);
          setColumns(arr);
        }
      }
      if (location.state.mark) {
        location.state.mark.map((e, key) => {
          let val = {
            title: e.mField,
            render: (text, record) => {
              let val3;
              record.markField.map((dat, key) => {
                if (dat.mField === e.mField) {
                  val3 = dat.mark;
                }
              });
              return (
                <Space size={'middle'}>
                  {stateEdit.current ? (
                    <>
                      {' '}
                      <InputNumber
                        type="number"
                        controls={false}
                        value={val3}
                        max={e.maxMark}
                        min={0}
                        key={e.student_id}
                        size={'middle'}
                        onChange={event => {
                          handleMfield(e.mField, e.maxMark, event, record);
                        }}
                        style={{ width: '100px' }}
                      />
                    </>
                  ) : (
                    <>
                      {' '}
                      <InputNumber
                        type="number"
                        controls={false}
                        // value={val3}
                        max={e.maxMark}
                        min={0}
                        key={e.student_id}
                        size={'middle'}
                        onChange={event => {
                          handleMfield(e.mField, e.maxMark, event, record);
                        }}
                        style={{ width: '100px' }}
                      />
                    </>
                  )}
                </Space>
              );
            },
            key: e.mField,
          };
          if (key === 0) {
            let arr = columns;
            arr.splice(3, 0, val);
            setColumns(arr);
          } else {
            let arr = columns;
            arr.splice(3, 0, val);
            setColumns(arr);
          }
        });
      }
      if (val2.current === false) {
        SetData(location.state.data);
      }
    }
  }, [update, val]);
  useEffect(() => {}, [Data]);
  const handleTheory = (e, record) => {
    const value = e;
    if (!Number(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Number Only',
      });
    } else if (Number(value) > record.tmax) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Number Between 0 And ' + record.tmax,
      });
    } else {
      let arr = stateRef.current;
      let key = record.key;
      arr[key].marks_scored = Number(value);
      // let total = 0;
      // arr[key].markField.map(e => {
      //   total = total + e.mark;
      // });
      // arr[key].marks_scored = total + Number(value);
      // arr[key].total = Math.round((arr[key].marks_scored / arr[key].marks_total) * arr[key].markConvert);
      SetData(arr);
      // setUpdate(update + 1);
    }
  };
  const handleDelete = record => {
    let data = {
      folder: 'AnswerSheet',
      audio: val2.current === false ? record.answersheet : record.answersheet[0][0],
    };
    Swal.fire({
      icon: 'error',
      text: 'It Will Delete The Document',
      showCancelButton: true,
      title: 'Are You Sure',
    }).then(result => {
      if (result.isConfirmed) {
        deleteDocument2(data)
          .then(response => {
            let arr = Data.current;
            arr[record.key].answersheet = [];
            arr[record.key].answersheetlocation = null;
            SetData(arr);
            Swal.fire({
              icon: 'success',
              title: 'The Document Deleted From The Database',
            });
            setUpdate(update + 1);
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: { error },
            });
          });
      }
    });
  };
  const handleMfield = (val1, val2, event, record) => {
    const value = event;
    if (!Number(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Number Only',
      });
    } else if (Number(value) > val2) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Number Between 0 And ' + val2,
      });
    } else {
      let arr = stateRef.current;
      let key2 = record.key;
      // let total = 0;
      // total = arr[key2].t_mark;
      arr[key2].markField.map((e, key) => {
        // total = total + e.mark;
        if (e.mField === val1) {
          arr[key2].markField[key].mark = Number(value);
          console.log(' arr[key2].markField[key].mark', arr);
        }
      });
      // arr[key2].marks_scored = total + Number(value);
      // arr[key2].total = Math.round((arr[key2].marks_scored / arr[key2].marks_total) * arr[key2].markConvert);
      SetData(arr);
      // setUpdate(update + 1);
    }
  };
  const handleInput = async (e, record) => {
    let formData = new FormData();
    formData.append('file', e.target.files[0]);
    formData.append('folder', location.state.grade_id);
    uploadFileForExam(formData)
      .then(res => {
        let key = record.key;
        let arr = stateRef.current;
        arr[key].answersheet[0] = res.data.filename;
        arr[key].answersheetlocation = res.data.data.Location;
        SetData(arr);
        Swal.fire({
          icon: 'success',
          title: 'File Uploaded SuccesFully',
          text: 'Dont Upload More Than One File',
        });
      })
      .catch(e => {
        console.log('error', e);
        Swal.fire({
          icon: 'error',
          text: { e },
          title: 'Unable to Upload ',
        });
      });
  };
  const handleCheck = () => {
    setUpdate(update + 1);
    Swal.fire({
      icon: 'success',
      title: 'Check Success',
    });
  };
  const handleOk = () => {
    // entryMark
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You Want To Save This',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        entryMark(stateRef.current)
          .then(response => {
            Swal.fire({
              icon: 'success',
              title: 'The Data Saved to the Database',
            });
            setUpdate(update + 1);
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: { error },
            });
          });
      }
    });
  };
  return (
    <Fragment>
      <PageHeader
        ghost
        title={
          location.state.examName.title +
          '  Exam  Mark Entry For ' +
          location.state.subject +
          '  Section  ' +
          location.state.section_name
        }
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="middle" type="primary" onClick={handleCheck}>
              Check{' '}
            </Button>
            <Button size="middle" type="primary" onClick={handleOk}>
              Submit
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Cards headless>
            <CustomTable
              col={columns}
              pagination={false}
              data={stateRef.current.length > 0 ? stateRef.current : Data}
            />
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
};

export default Markentry;
