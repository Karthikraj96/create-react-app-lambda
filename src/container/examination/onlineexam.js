import React, { useState, useEffect } from 'react';
import { Row, Col, Pagination, Modal, Spin, Alert } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Fragment } from 'react';
import { Input, Space, Drawer } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import { Tabs, Divider, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { TabPane } = Tabs;
import FeatherIcon from 'feather-icons-react';
import Swal from 'sweetalert2';
import moment from 'moment';
import {
  decodedata,
  getAllcurrentTestWithResult,
  getSubject,
  createTest,
  createQuestion2,
  createTest2,
  deleteTest,
  AwsURL,
  getAllcurrentTestWithResult3,
  getSectionStudTotal,
  getParticularSection,
} from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faPencil, faTrash, faEye, faDownload, faClock, faCalendarCheck } from '@fortawesome/pro-duotone-svg-icons';
import QuestionCreate from './onlinequestion';
import { Select } from 'antd';
import { Form } from 'antd';
import './index.css';
import { deleteDocument21 } from '../../components/updateFunctions/functions/index';
import { DatePicker } from 'antd';
const { Option } = Select;
function OnlineExam() {
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [selectedOrg, setselectedOrg] = useState(null);
  let [questions, setQuestions] = useState(null);
  let [selectedOrg2, setselectedOrg2] = useState(null);
  let [tokendata, setTokendata] = useState(null);
  let [date, setDate] = useState(null);
  let [title, setTitle] = useState(null);
  let [min, setMin] = useState(null);
  let [max, setMax] = useState(null);
  let [isonline, setIsonline] = useState(0);
  let [level, setLevel] = useState(null);
  let [type, setType] = useState(null);
  let [date2, setDate2] = useState(null);
  let [level2, setLevel2] = useState(null);
  let [type2, setType2] = useState(null);
  let [data, setData] = useState(null);
  let [data2, setData2] = useState(null);
  let [subject, setSubject] = useState(null);
  let [subject2, setSubject2] = useState([]);
  let [multi, setMulti] = useState(0);
  let [edit, setEdit] = useState(null);
  let [id, setId] = useState(null);
  let [id2, setid2] = useState(null);
  let [testid, setTestid] = useState(null);
  let [rec, setRec] = useState(null);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const [isedit, setisEdit] = useState(false);
  let [update, setUpdate] = useState(0);
  let [file, setFile] = useState(null);
  let [total, setTotal] = useState(1);
  let [page, setPage] = useState(1);
  let [total2, setTotal2] = useState(1);
  let [page2, setPage2] = useState(1);
  let [load, setLoad] = useState(false);
  let [state, setState] = useState({
    fileList: [],
  });
  let [form1Visible, setForm1Visible] = useState(false);
  let [form1Data, setForm1Data] = useState([]);
  let [form2Data, setForm2Data] = useState([]);
  let [form1Visible1, setForm1Visible1] = useState(false);
  useEffect(() => {}, [total, total2]);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let data2 = {
      orgId: selectedOrg,
      grade: level,
      date: date,
      type: type,
      page: page,
    };
    let data3 = {
      orgId: selectedOrg,
      grade: level,
      date: date,
      type: type,
      page: page2,
    };
    getAllcurrentTestWithResult3(data2)
      .then(res => {
        let dat = res.data.testList;
        setTotal(res.data.totalItems);
        let dat2 = [];
        let date2 = moment(new Date(Date.now())).format('YYYY-MM-DD');
        dat.map(e => {
          let edate = moment(e.schedule).format('YYYY-MM-DD');
          if (moment(edate).isAfter(date2)) {
            dat2.push(e);
          }
        });
        setLoad(true);
        setData2(dat2);
      })
      .catch(e => {
        console.log(e);
      });
    getAllcurrentTestWithResult(data3)
      .then(res => {
        let dat = res.data.testList;
        setTotal2(res.data.totalItems);
        let dat1 = [];
        let date2 = moment(new Date(Date.now())).format('YYYY-MM-DD');
        dat.map(e => {
          let edate = moment(e.schedule).format('YYYY-MM-DD');
          if (moment(edate).isSameOrBefore(date2)) {
            dat1.push(e);
          }
        });
        setLoad(true);
        setData(dat1);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg, level, date, type, update]);
  useEffect(() => {
    let data3 = {
      type: decodedata.schoolType,
      level: level2,
    };
    getSubject(data3)
      .then(response => {
        setSubject2(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [level2]);
  useEffect(() => {}, [form1Data, form2Data]);
  const { fileList } = state;
  const props = {
    onRemove: file => {
      setState(state => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        handleFileRemove();
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setState(state => ({
        fileList: [...state.fileList, file],
      }));
      handleFile(file);
      return false;
    },
    fileList,
  };
  let handleCancel4 = () => {
    setForm1Visible(false);
    setForm1Data([]);
    setForm2Data([]);
  };
  let handleCancel5 = () => {
    setForm1Visible1(false);
    setForm2Data([]);
  };
  let handleDownload2 = val => {
    let va = AwsURL + val.level + '/' + val.correctSheet[0];
    window.open(va, '_blank');
  };
  let handleDownload = val => {
    if (val.quesPaper) {
      let va = AwsURL + val.level + '/' + val.quesPaper;
      window.open(va, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No file Available',
      });
    }
  };
  let handleDelete = data => {
    let id4 = data._id;
    Swal.fire({
      icon: 'info',
      title: 'Are you sure You want to delete this',
      text: 'It will Be Permanetly Deleted!!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        deleteTest(id4)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
              Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted ',
              });
            }
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
            });
          });
      }
    });
  };
  const handleFileRemove = () => {
    setFile(null);
  };
  const handleFile = data => {
    setFile(data);
  };
  const handleTitle = e => {
    setTitle(e.target.value);
  };
  const handlemin = e => {
    setMin(e.target.value);
  };
  const handlemax = e => {
    setMax(e.target.value);
  };
  const handleOk = () => {
    if (file) {
      let bodyFormData = new FormData();
      bodyFormData.append('folder', level2);
      bodyFormData.append('schedule', date2);
      bodyFormData.append('file', file);
      bodyFormData.append('level', level2);
      bodyFormData.append('title', title);
      bodyFormData.append('subject', subject);
      bodyFormData.append('organization_id', selectedOrg2);
      bodyFormData.append('examType', type2);
      bodyFormData.append('maxMark', max);
      bodyFormData.append('minMark', min);
      bodyFormData.append('isOnline', isonline);
      // bodyFormData.append('id', id);
      Swal.fire({
        icon: 'info',
        title: edit ? 'It will Update The Test ' : 'It Will Create the Test',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          createTest2(bodyFormData)
            .then(res => {
              if (res) {
                setTestid(res.data.id);
                setFile(null);
                setUpdate(update + 1);
                if (isonline === 1) {
                } else {
                  Swal.fire({
                    icon: 'success',
                    title: edit ? ' Updated Successfuly ' : 'Created Successfully',
                  });
                  setisVisible(false);
                }
              }
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
                text: { e },
              });
            });
        }
      });
    } else {
      let data = {
        schedule: date2,
        level: level2,
        subject: subject,
        organization_id: selectedOrg2,
        title: title,
        examType: type2,
        maxMark: max,
        isOnline: isonline,
        minMark: min,
        // id: id,
      };
      Swal.fire({
        icon: 'info',
        title: edit ? 'It will Update The Test ' : 'It Will Create the Test',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          createTest(data)
            .then(res => {
              if (res) {
                setTestid(res.data.id);
                setFile(null);
                setUpdate(update + 1);
                if (isonline === 1) {
                  setisVisible(false);
                  setisVisible2(true);
                } else {
                  Swal.fire({
                    icon: 'success',
                    title: edit ? ' Updated Successfuly ' : 'Created Successfully',
                  });
                  setisVisible(false);
                }
              }
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
                text: { e },
              });
            });
        }
      });
    }
  };
  const handleOk3 = () => {
    if (file) {
      let bodyFormData = new FormData();
      bodyFormData.append('folder', level2);
      bodyFormData.append('schedule', date2);
      bodyFormData.append('file', file);
      bodyFormData.append('level', level2);
      bodyFormData.append('title', title);
      bodyFormData.append('subject', subject);
      bodyFormData.append('organization_id', selectedOrg2);
      bodyFormData.append('examType', type2);
      bodyFormData.append('maxMark', max);
      bodyFormData.append('minMark', min);
      bodyFormData.append('isOnline', isonline);
      bodyFormData.append('id', id._id);
      Swal.fire({
        icon: 'info',
        title: edit ? 'It will Update The Test ' : 'It Will Create the Test',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          createTest2(bodyFormData)
            .then(res => {
              if (res) {
                setTestid(res.data.id);
                setFile(null);
                setUpdate(update + 1);
                if (isonline === 1) {
                  setisVisible(false);
                  setisVisible2(true);
                }
                Swal.fire({
                  icon: 'success',
                  title: edit ? ' Updated Successfuly ' : 'Created Successfully',
                });
                setisVisible(false);
              }
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
                text: { e },
              });
            });
        }
      });
    } else {
      let data = {
        schedule: date2,
        level: level2,
        subject: subject,
        organization_id: selectedOrg2,
        title: title,
        examType: type2,
        maxMark: max,
        isOnline: isonline,
        minMark: min,
        id: id._id,
        quesPaper: id.quesPaper,
      };
      Swal.fire({
        icon: 'info',
        title: edit ? 'It will Update The Test ' : 'It Will Create the Test',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          createTest(data)
            .then(res => {
              if (res) {
                setTestid(res.data.id);
                setFile(null);
                setUpdate(update + 1);
                if (isonline === 1) {
                  setisVisible(false);
                  setisVisible2(true);
                }
                Swal.fire({
                  icon: 'success',
                  title: edit ? ' Updated Successfuly ' : 'Created Successfully',
                });
                setisVisible(false);
              }
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
                text: { e },
              });
            });
        }
      });
    }
  };
  const handleOnline = value => {
    setIsonline(value);
  };
  const handleLevel = value => {
    setLevel(value);
    setLoad(false);
  };
  const handleLevel2 = value => {
    setLevel2(value);
  };
  const handleType = value => {
    setType(value);
    setLoad(false);
  };
  const handleType2 = value => {
    setType2(value);
  };
  const handleDate = (date, dateString) => {
    setDate(date);
    setLoad(false);
  };
  const handleDate3 = (date, dateString) => {
    setDate2(date);
  };
  const handleDate2 = record => {
    let dat = record.schedule;
    let da = moment(dat).format('DD/MM/YYYY');
    let da2 = moment(dat).format('hh:mm A');
    return (
      <>
        <span>
          {' '}
          <FontAwesomeIcon icon={faCalendarCheck} style={{ fontSize: 15 }} />
        </span>{' '}
        &nbsp;{' '}
        <span>
          <strong>{da}</strong>
        </span>
        <br />
        <span>
          {' '}
          <FontAwesomeIcon icon={faClock} style={{ fontSize: 15, color: '#c3272b ' }} />
        </span>{' '}
        &nbsp;{' '}
        <span style={{ color: '#c3272b' }}>
          <strong>{da2}</strong>
        </span>
      </>
    );
  };
  const handleCancel = () => {
    setisVisible(false);
  };
  const handleCancel2 = () => {
    setisVisible2(false);
  };
  const handleInsti = value => {
    setselectedOrg(value);
    setLoad(false);
  };
  const handleInsti2 = value => {
    setselectedOrg2(value);
  };
  const handleMulti = value => {
    setMulti(value);
  };
  const handleSubject = value => {
    setSubject(value);
  };
  const handleEdit = value => {
    setId(value);
    setEdit(true);
    setisVisible(true);
    setDate2(value.date);
    setLevel2(value.level);
    setSubject(value.subject);
    setselectedOrg2(value.organization_id);
    setTitle(value.title);
    setType2(value.examType);
    setMax(value.maxMark);
    setMin(value.minMark);
    setIsonline(value.isOnline);
  };
  const handleEye = value => {
    if (value.questions.length > 0) {
      setQuestions(value.questions);
      setisVisible2(true);
      setisEdit(true);
      setRec(value);
      setid2(value._id);
    } else {
      setisVisible2(true);
      setRec(value);
    }
  };
  // handleOk4
  const handleOk4 = da => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update the Exam Questions',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        createQuestion2(da)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Questions Updated Successfully',
              });
              setisVisible2(false);
              setUpdate(update + 1);
            }
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
              text: e,
            });
          });
      }
    });
  };
  const handleOk2 = da => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Post the Exam Questions',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        createQuestion2(da)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Questions Created Successfully',
              });
              setisVisible2(false);
              setUpdate(update + 1);
            }
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
              text: e,
            });
          });
      }
    });
  };
  let handleClick = (val, record123) => {
    getSectionStudTotal(val)
      .then(res => {
        let studenttotal = res.data;
        getParticularSection({ section: [], grade: val })
          .then(response => {
            let sectionDetails = response.data;
            studenttotal.map((e, key) => {
              sectionDetails.map(e1 => {
                if (e._id === e1._id) {
                  studenttotal[key].Class = e1.name;
                  studenttotal[key].level = val;
                  studenttotal[key].examType = record123.title;
                }
              });
            });
            studenttotal.map((e, key) => {
              let secResult = [];
              let pass = 0;
              let fail = 0;
              let noresult = 0;
              let attend = 0;
              let count = 0;
              let maxCount = e.count;
              for (let j = 0; j < record123.result.length; j++) {
                if (e._id == record123.result[j].sectionId) {
                  count = count + 1;
                  attend = attend + 1;
                  let val34 = record123.result[j];
                  val34.maxMark = record123.maxMark;
                  val34.subject = record123.subject;
                  if (parseFloat(record123.result[j].totalMark) >= parseFloat(record123.minMark)) {
                    pass = pass + 1;
                    val34.result = 'PASS';
                  } else if (parseFloat(record123.result[j].totalMark) < parseFloat(record123.minMark)) {
                    fail = fail + 1;
                    val34.result = 'FAIL';
                  } else {
                    noresult = noresult + 1;
                    val34.result = 'No Result';
                  }
                  if (val34.totalMark) {
                    if (val34.totalMark != 0) {
                      let calAvg = (val34.totalMark / val34.maxMark) * 100;
                      val34.Avg = calAvg + ' %';
                    } else {
                      val34.Avg = '0';
                    }
                  } else {
                    val34.Avg = '0';
                  }
                  secResult.push(val34);
                }

                studenttotal[key].result = secResult;
                studenttotal[key].pass = pass;
                studenttotal[key].fail = fail;
                studenttotal[key].noresult = noresult;
                studenttotal[key].attend = attend;
                if (maxCount === count) {
                  break;
                }
              }
            });
            setForm1Data(studenttotal);
            setForm1Visible(true);
          })
          .catch(err => {
            console.log(err);
          });
      })
      .catch(e => {
        console.log(e);
      });
  };
  const columns = [
    {
      title: 'Schedule',
      key: 'Schedule',
      render: (text, record) => handleDate2(record),
    },
    {
      title: 'Level',
      // dataIndex: 'level',
      render: (text, record) => (
        <Button
          onClick={() => {
            handleClick(record.level, record);
          }}
        >
          <strong>{record.level}</strong>
        </Button>
      ),
      key: 'Level',
    },
    {
      title: 'Type',
      dataIndex: 'examType',
      key: 'Type',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'Subject',
    },
    {
      title: 'Exam Title',
      dataIndex: 'title',
      key: 'ExamTitle',
    },
    {
      title: 'Max Mark',
      dataIndex: 'maxMark',
      key: 'MaxMark',
    },
    {
      title: 'Min Mark',
      dataIndex: 'minMark',
      key: 'Min Mark',
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          {record.isOnline === 1 ? (
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => handleEye(record)}
              style={{ fontSize: 15, color: 'Dodgerblue ' }}
            />
          ) : null}
          <FontAwesomeIcon
            onClick={() => handleEdit(record)}
            icon={faPencil}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(record)}
            style={{ fontSize: 15, color: 'red ' }}
          />
          {/* <FontAwesomeIcon icon={faPaperclip} style={{ fontSize: 15, color: 'BlueViolet' }} /> */}
          {record.quesPaper ? (
            record.quesPaper.length > 0 ? (
              <FontAwesomeIcon
                icon={faDownload}
                onClick={() => handleDownload(record)}
                style={{ fontSize: 15, color: 'Cyan' }}
              />
            ) : null
          ) : null}{' '}
        </Space>
      ),
    },
  ];
  const colums1 = [
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'Level',
    },
    {
      title: 'Class',
      dataIndex: 'Class',
      render: (text, record) => (
        <Button
          onClick={() => {
            setForm2Data(record.result);
            console.log('record.result', record.result);
            setForm1Visible1(true);
          }}
        >
          <strong>{record.Class}</strong>
        </Button>
      ),
      key: 'Class	',
    },
    {
      title: 'Exam Title',
      dataIndex: 'examType',
      key: 'ExamTitle',
    },
    {
      title: 'Attendance',
      render: (text, record) => {
        return (
          <>
            {record.attend} /{record.count}
          </>
        );
      },
      key: 'Attendance',
    },
    {
      title: 'Fail',
      dataIndex: 'fail',
      key: 'Fail',
    },
    {
      title: 'Pass',
      dataIndex: 'pass',
      key: 'Pass',
    },
  ];
  const columns2 = [
    {
      title: 'Student Name',
      dataIndex: 'stuName',
      key: 'Student Name',
    },
    {
      title: 'Class',
      dataIndex: 'stuClass',
      key: 'Class',
    },
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'Subject',
    },
    {
      title: 'Max Mark	',
      dataIndex: 'maxMark',
      key: 'Max Mark	',
    },
    {
      title: 'Mark',
      dataIndex: 'totalMark',
      key: 'Mark',
    },
    {
      title: 'Avg	',
      dataIndex: 'Avg',
      key: 'Avg',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'Result',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {record.correctSheet.length > 0 ? (
            <FontAwesomeIcon
              icon={faEye}
              onClick={() => handleDownload2(record)}
              style={{ fontSize: 15, color: 'Dodgerblue ' }}
            />
          ) : (
            <p>NO File</p>
          )}
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      {/* <NewLesson isVisible={isVisible} handleOk={handleOk} handleCancel={handleCancel} /> */}
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={() => setisVisible(true)} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Create
          </Button>,
        ]}
        title="Online Exam"
      />
      <Main>
        <Row gutter={25}>
          <Drawer
            destroyOnClose={true}
            title={edit ? 'Edit Exam' : 'Create Exam'}
            width={700}
            closable={true}
            onClose={handleCancel}
            visible={isVisible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                {edit ? (
                  <>
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                      Cancel
                    </Button>
                    <Button onClick={handleOk3} type="primary">
                      Update
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleCancel} style={{ marginRight: 8 }}>
                      Cancel
                    </Button>
                    <Button onClick={handleOk} type="primary">
                      Submit
                    </Button>
                  </>
                )}
              </div>
            }
          >
            <Form preserve={false} layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                {tokendata == '1' ? (
                  <>
                    <Col span={12}>
                      <Form.Item label="Multi">
                        <Select
                          allowClear={true}
                          placeholder="Select Multi"
                          onChange={handleMulti}
                          defaultValue={id ? (id.organization_id.length > 1 ? 'Yes' : 'No') : ''}
                          style={{ width: '100%' }}
                        >
                          <Option value="1">Yes</Option>
                          <Option value="0">No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="Institute" label="Institute">
                        {multi === '1' ? (
                          <Select
                            allowClear={true}
                            placeholder="Select Institute"
                            mode="multiple"
                            value={id ? id.organization_id : null}
                            onChange={handleInsti2}
                            style={{ width: '100%' }}
                          >
                            {org.map((e, key) => {
                              return (
                                <Option key={key} value={e.organization_id}>
                                  {e.instituteName}
                                </Option>
                              );
                            })}
                          </Select>
                        ) : (
                          <Select
                            allowClear={true}
                            placeholder="Select Institute"
                            value={id ? id.organization_id : null}
                            onChange={handleInsti2}
                            style={{ width: '100%' }}
                          >
                            {org.map((e, key) => {
                              return (
                                <Option key={key} value={e.organization_id}>
                                  {e.instituteName}
                                </Option>
                              );
                            })}
                          </Select>
                        )}
                      </Form.Item>
                    </Col>
                  </>
                ) : (
                  <> </>
                )}
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="Title" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
                    <Input
                      defaultValue={id ? id.title : ''}
                      placeholder="Enter the Exam title"
                      onChange={handleTitle}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="Date" label="Date" rules={[{ required: true, message: 'Please enter Date' }]}>
                    <DatePicker
                      placeholder=" Select Exam Date"
                      defaultValue={id ? moment(id.date) : ''}
                      format="DD/MM/YYYY HH:mm:ss"
                      required
                      showTime={{ format: 'HH:mm' }}
                      onChange={handleDate3}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="scale"
                    label="Select Level"
                    rules={[{ required: true, message: 'Please Select Level' }]}
                  >
                    <Select
                      allowClear={true}
                      defaultValue={id ? id.level : ''}
                      placeholder="Please Select Level"
                      onChange={handleLevel2}
                    >
                      {grade.map((e, key) => {
                        return (
                          <Option key={key} value={e.id}>
                            {e.id}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="term" label="Subject" rules={[{ required: true, message: 'Please Select A Type' }]}>
                    <Select
                      allowClear={true}
                      defaultValue={id ? id.subject : ''}
                      placeholder="Please Select Subject"
                      onChange={handleSubject}
                    >
                      {subject2.map((e, key) => {
                        return (
                          <Option key={key} value={e.name}>
                            {e.name}
                          </Option>
                        );
                      })}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="copy" label="Type" rules={[{ required: true, message: 'Please select a type' }]}>
                    <Select
                      allowClear={true}
                      defaultValue={id ? id.examType : ''}
                      placeholder="Please select Type"
                      onChange={handleType2}
                      allowClear={true}
                    >
                      <Option value="TT">TT</Option>
                      <Option value="ASSESSMENT">ASSESSMENT</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Is Online" rules={[{ required: true, message: 'Please select a type' }]}>
                    <Select
                      allowClear={true}
                      defaultValue={id ? id.isOnline : ''}
                      placeholder="Please select "
                      onChange={handleOnline}
                    >
                      <Option value={1}>Yes</Option>
                      <Option value={0}>No</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Divider>Marks</Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="max"
                    label="Max Marks"
                    rules={[{ required: true, message: 'Please enter max marks' }]}
                  >
                    <Input defaultValue={id ? id.maxMark : ''} placeholder="Enter the Max Marks" onChange={handlemax} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="min"
                    label="Min Marks"
                    rules={[{ required: true, message: 'Please enter Min marks' }]}
                  >
                    <Input defaultValue={id ? id.minMark : ''} placeholder="Enter the Min Marks" onChange={handlemin} />
                  </Form.Item>
                </Col>
              </Row>
              {id ? (
                id.quesPaper ? (
                  <>
                    <Form.Item label="Already Uploaded" tooltip="This is a required field">
                      <Row>
                        <Col span={20}>
                          <Input key={id.quesPaper} disabled={true} defaultValue={id.quesPaper} width={'80%'} />
                        </Col>
                        <Col span={2} style={{ margin: '10px' }}>
                          <FontAwesomeIcon
                            icon={faTrash}
                            key={Math.floor(Math.random() * 10)}
                            onClick={() => {
                              deleteDocument21(level2, id.quesPaper, 'quesPaper', setId, id);
                              setId({ ...id, ['quesPaper']: null });
                              setUpdate(update + 1);
                            }}
                            style={{ fontSize: 25, color: 'red ' }}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                  </>
                ) : (
                  <Form.Item label="Attachment">
                    <Upload {...props}>
                      <Button icon={<UploadOutlined />} style={{ marginTop: '15%' }}>
                        Select File
                      </Button>
                    </Upload>
                  </Form.Item>
                )
              ) : (
                <Form.Item label="Attachment">
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />} style={{ marginTop: '15%' }}>
                      Select File
                    </Button>
                  </Upload>
                </Form.Item>
              )}
            </Form>
          </Drawer>
          <QuestionCreate
            id={testid}
            isVisible={isVisible2}
            handleOk={handleOk2}
            handleOk2={handleOk4}
            isedit={isedit}
            handleCancel={handleCancel2}
            maxmark={max}
            date={date2}
            testtitle={title}
            subject={subject}
            record={rec}
            questions={questions}
          ></QuestionCreate>

          <Col xxl={24} md={24} sm={24} xs={24}>
            <Row gutter={25} style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
              {tokendata == '1' ? (
                <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                  <Select
                    allowClear={true}
                    placeholder="Select Institute"
                    onChange={handleInsti}
                    style={{ width: '100%' }}
                  >
                    {org.map((e, key) => {
                      return (
                        <Option key={key} value={e.organization_id}>
                          {e.instituteName}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
              ) : (
                <> </>
              )}
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Class{' '} */}
                <DatePicker
                  format="DD/MM/YYYY HH:mm:ss"
                  showTime={{ format: 'HH:mm' }}
                  onChange={handleDate}
                  placeholder="Select Date"
                />
              </Col>

              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Section{' '} */}
                <Select
                  allowClear={true}
                  style={{ width: '100%' }}
                  placeholder="Select Level"
                  optionFilterProp="children"
                  onChange={handleLevel}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {grade.map((e, key) => {
                    return (
                      <Option key={key} value={e.id}>
                        {e.id}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Class{' '} */}
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select Type"
                  optionFilterProp="children"
                  onChange={handleType}
                  allowClear={true}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="TT">TT</Option>
                  <Option value="ASSESSMENT">ASSESSMENT</Option>
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={25}>
          {load ? (
            <Cards headless>
              <Tabs defaultActiveKey="1">
                <TabPane tab="Upcoming Test" key="1">
                  <CustomTable col={columns} data={data2} pagination={false} />
                  <br></br>
                  <br></br>
                  <Row justify="end">
                    <Pagination
                      defaultCurrent={1}
                      showSizeChanger={false}
                      total={total}
                      onChange={page => {
                        setPage(page);
                      }}
                    />
                  </Row>
                </TabPane>
                <TabPane tab="Completed Test" key="2">
                  <CustomTable col={columns} data={data} pagination={false} />
                  <br></br>
                  <br></br>
                  <Row justify="end">
                    <Pagination
                      defaultCurrent={1}
                      showSizeChanger={false}
                      total={total2}
                      onChange={page => {
                        setPage2(page);
                      }}
                    />
                  </Row>
                </TabPane>
              </Tabs>
            </Cards>
          ) : (
            <Spin
              tip="Loading..."
              size="large"
              style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '5%' }}
            >
              <Alert style={{ display: 'inline-block', verticalAlign: 'middle' }} type="info" />
            </Spin>
          )}
        </Row>
      </Main>
      <Modal
        destroyOnClose={true}
        title="Section Details"
        visible={form1Visible}
        onOk={handleCancel4}
        onCancel={handleCancel4}
        footer={[
          <Button key="back" onClick={handleCancel4}>
            OK
          </Button>,
        ]}
        width={'70%'}
      >
        <CustomTable col={colums1} data={form1Data} pagination={false} />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Result Details"
        visible={form1Visible1}
        onOk={handleCancel5}
        onCancel={handleCancel5}
        footer={[
          <Button key="back" onClick={handleCancel5}>
            OK
          </Button>,
        ]}
        width={'80%'}
      >
        <CustomTable col={columns2} data={form2Data} pagination={false} />
      </Modal>
    </Fragment>
  );
}

export default OnlineExam;
