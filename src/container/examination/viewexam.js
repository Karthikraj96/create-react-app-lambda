import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Fragment } from 'react';
import { Input, Space, Drawer, Upload } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import { UploadOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useHistory, useLocation } from 'react-router-dom';
import moment from 'moment';
import {
  faPencil,
  faTrash,
  faDownload,
  faIdCard,
  faCheck,
  faTimes
} from '@fortawesome/pro-duotone-svg-icons';
import {
  onChangeDate,
  onChangeSelect,
  onChangeInput,
  onChangeTime,
  deleteDocument21,
} from '../../components/updateFunctions/functions/index';
import { Select } from 'antd';
import {
  getExamSchedule,
  getGradeSubjects,
  createOneSchedule,
  uploadFileForExam,
  deleteSchedule2,
  internalNeedUpdate,
  getExam,
  AwsURL,
} from '../../api/api';
import { DatePicker, TimePicker } from 'antd';
import { Form } from 'antd';
import './index.css';
const { Option } = Select;
import Swal from 'sweetalert2';
function Viewexam() {
  let [avgmark, setAvgMark] = useState([]);
  let [state, setState] = useState({
    fileList: [],
  });
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

  const history = useHistory();
  const location = useLocation();
  let [update, setUpdate] = useState(0);
  let [isInternal, SetIsinternal] = useState(0);
  let [form2, setForm2] = useState([]);
  let [sub, setSub] = useState([]);
  const handleFile = data => {
    let arr = record2;
    arr.file = data;
    setRecord(arr);
  };
  const handleForm = data3 => {
    let dat3 = [];
    data3.Internalmark.map((e, key) => {
      if (e.mField) {
        let val2 = (
          <Col span={12}>
            <Form.Item
              name={e.mField}
              label={e.mField}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                defaultValue={updateRecord ? updateRecord.Internalmark[key].mark : e.mark}
                onChange={(event) => handleInternalMarkField2(event, data3, key)}
                name={e.mField}
                key={Math.random() * (100 - 1)}
                ke={key}
                placeholder={'Mark For ' + e.mField}
              />
            </Form.Item>
          </Col>
        );
        if (key === 0) {
          dat3.push(val2);
        } else {
          dat3.push(val2);
        }
      }
    });
    setForm2(dat3);
  };
  const handleDelete = data2 => {
    let dataa = {
      folder: 'ExamQuestion',
      audio: data2.filename,
      id: data2._id,
    };
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Delete this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed === true) {
        deleteSchedule2(dataa)
          .then(response => {
            setUpdate(update + 1);
            Swal.fire({
              icon: 'success',
              title: 'Data Deleted Succesfully',
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: { error },
            });
          });
      }
    });
  };
  const handleDownload = value => {
    if (value.quesPaper.length > 0) {
      let va = AwsURL + location.state.grade_id + '/' + value.quesPaper
      window.open(va, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No file Available',
      });
    }
  };
  const handleFileRemove = () => {
    let arr = record2;
    arr.file = null;
    setRecord(arr);
  };
  const handleTick = dataa => {
    let need = dataa.isInternalNotneed === 0 ? true : false;
    let da = {
      id: dataa._id,
      need: need,
    };
    Swal.fire({
      icon: 'info',
      title: 'It Will Update Internal Mark Status',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed === true) {
        internalNeedUpdate(da)
          .then(response => {
            setUpdate(update + 1);
            Swal.fire({
              icon: 'success',
              title: 'Data Updated Succesfully',
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: { error },
            });
          });
      }
    });
  };
  useEffect(() => {
    getGradeSubjects(location.state.grade_id)
      .then(res => {
        setSub(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  let [record2, setRecord] = useState({
    date: null,
    avgMark: 0,
    isInternalTest: null,
    starts_at: null,
    quesPaper: null,
    ends_at: null,
    remarks: null,
    theory_mark: null,
    pass_m: null,
    convertMark: null,
    subject_id: null,
    exam_id: location.state._id,
    file: null,
    data: null,
    filename: null,
    internalTest: [
      {
        Ttype: null,
        mark: 0,
      },
    ],

    Internalmark: [
      {
        mField: null,
        mark: 0,
      },
    ],
    folder: 'ExamQuestion',
  });
  let [updateRecord, setUpdateRecord] = useState(null);
  let [formdata, setForm] = useState([]);
  let [columns, setColumns] = useState([]);
  let column = [
    {
      title: 'Date',
      key: 'date',
      render: (text, record) => handleDate(record),
    },
    {
      title: 'Session',
      key: 'Session',
      render: (text, record) => record.remarks,
    },
    {
      title: 'Subject',
      dataIndex: 'subject_id',
      key: 'subject',
    },
    {
      title: 'Starts At',
      dataIndex: 'starts_at',
      key: 'startsat',
    },
    {
      title: 'Ends At',
      dataIndex: 'ends_at',
      key: 'endsat',
    },
    {
      title: 'Theory',
      dataIndex: 'theory_mark',
      key: 'theory_mark',
    },
    {
      title: 'Pass Mark',
      dataIndex: 'pass_m',
      key: 'pass_m',
    },
    {
      title: 'Mark Convert',
      dataIndex: 'convertMark',
      key: 'convertMark',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            onClick={() => {
              handleForm(record);
              setUpdateRecord(record);
              setisEdit(true);
              setisCreateVisible(true);
            }}
            icon={faPencil}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            style={{ fontSize: 15, color: 'red ' }}
            onClick={() => handleDelete(record)}
          />
          {
            record.isInternalNotneed == 0 ? <FontAwesomeIcon
              icon={faTimes}
              onClick={() => {
                handleTick(record);
              }}
              style={{ fontSize: 15, color: 'Turquoise' }}
            /> :  record.isInternalTest == 1 ? null :<FontAwesomeIcon
              icon={faCheck}
              onClick={() => {
                handleTick(record);
              }}
              style={{ fontSize: 15, color: 'Gold' }}
            />
          }

          <FontAwesomeIcon
            onClick={() => {
              history.push({ pathname: '/admin/examination/schoolresult', state: location.state });
            }}
            icon={faIdCard}
            style={{ fontSize: 15, color: '#5F63F2' }}
          />
          {
            record.quesPaper ? record.quesPaper.length > 0 ? <FontAwesomeIcon
              icon={faDownload}
              onClick={() => {
                handleDownload(record);
              }}
              style={{ fontSize: 15, color: 'Dodgerblue ' }}
            /> : null : null
          }
        </Space>
      ),
    },
  ];
  useEffect(() => {
    let dat3 = [];
    location.state.internalMarkField.map((e, key) => {
      if (e.itype) {
        let val2 = (
          <Col span={12}>
            <Form.Item
              name={e.itype}
              label={e.itype}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input
                onChange={handleInternalMarkField}
                name={e.itype}
                key={Math.random() * (100 - 1)}
                ke={key}
                placeholder={'Mark For ' + e.itype}
              />
            </Form.Item>
          </Col>
        );

        if (key === 0) {
          dat3.push(val2)
        } else {
          dat3.push(val2)
        }
      }
      setForm(dat3);
    });
  }, []);
  useEffect(() => {
    let val2;
    let exam = null;
    getExamSchedule(location.state._id)
      .then(res => {
        setData(res.data);
        let data2 = res.data;
        let arr = column;
        if (data2[0].Internalmark.length > 0) {
          data2[0].Internalmark.map((e, key) => {
            if (e.mField) {
              let val = {
                title: e.mField,
                key: e.mField,
                render: (text, record) => {
                  if (e.mark) {
                    return record.Internalmark[key].mark;
                  } else {
                    return null;
                  }
                },
              };
              arr.splice(5, 0, val);
              // setColumn(column => column.splice(5, 0, val))
            } else {
              setColumns(arr);
            }
          });
        } else {
          setColumns(arr);
        }
        getExam(location.state._id)
          .then(resp => {
            if (resp.data.internalTest.length > 0) {
              resp.data.internalTest.map((e, key) => {
                exam = 1;
                if (e.Ttype) {
                  let arr = avgmark;
                  arr[key] = e.mark;
                  setAvgMark(arr);
                  val2 = {
                    title: e.Ttype,
                    key: e.Ttype,
                    render: (text, record) => {
                      if (record.isInternalTest === 1) {
                        return;
                      } else if (record.isInternalNotneed === 0) {
                        return;
                      }
                      return avgmark[key];
                    },
                  };
                } else {
                  setColumns(arr);
                }
                arr.splice(6, 0, val2);
                setColumns(arr);
              });
            } else {
              setColumns(arr);
            }
          })
          .catch(error => {
            console.log(error);
            setColumns(arr);
          });
        // if (exam === null) {
        //   setColumns(arr)
        // }
        // else if (!exam.internalTest) {
        //   setColumns(arr)
        // }
      })
      .catch(e => {
        console.log(e);
        setColumns(column);
      });
  }, [update]);
  useEffect(() => {
  }, [updateRecord])
  useEffect(() => { }, [columns]);
  let handleInternalMarkField = async (e) => {
    let { value, name } = e.target;
    if (!Number(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Number Only',
      });
    } else {
      let arr = await record2;
      let len = arr.Internalmark.length ? arr.Internalmark.length - 1 : 0;
      arr.Internalmark[len].mField = name;
      arr.Internalmark[len].mark = Number(value);
      setRecord(arr);
    }
  };
  let handleInternalTestField = async (e) => {
    const { value, name } = e.target;
    if (!Number(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Number Only',
      });
    } else {
      let arr = await record2;
      let len = arr.internalTest.length ? arr.internalTest.length - 1 : 0;
      arr.internalTest[len].Ttype = arr.subject_id;
      arr.internalTest[len].mark = Number(value);
      arr.avgMark = Number(value);
      setRecord(arr);
    }
  };
  let handleInternalMarkField2 = (e, da, key) => {
    let { value, name } = e.target;
    if (!Number(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Number Only',
      });
    } else {
      let arr = da;
      arr.Internalmark[key].mark = Number(value);
      setUpdateRecord(arr);
    }
  };
  let handleInternalTestField2 = async (e) => {
    const { value, name } = e.target;
    if (!Number(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Please Enter Number Only',
      });
    } else {
      let arr = await updateRecord;
      if (arr.internalTest.length > 0) {
        let check = false
        arr.internalTest.map((e1, key) => {
          if (e1.Ttype === arr.subject_id) {
            check = true
            arr.internalTest[key].mark = Number(value);
          }
        })
        if (check === false) {
          let da = {
            Ttype: arr.subject_id,
            mark: Number(value)
          }
          arr.internalTest.push(da)
        }
      }
      arr.avgMark = Number(value);
      setUpdateRecord(arr);
    }
  };
  let [isEdit, setisEdit] = useState(false);
  const handleOk1 = () => {
    if (isEdit) {
      if (fileList.length > 0) {
        let formData2 = new FormData();
        formData2.append('file', fileList[0]);
        formData2.append('folder', location.state.grade_id);
        uploadFileForExam(formData2)
          .then(res => {
            let arr = updateRecord;
            arr.quesPaperLocation = res.data.data.Location;
            arr.quesPaper = res.data.filename;
            setUpdateRecord(arr);
            let title = isEdit ? 'Are You Sure You want to Update this' : 'Are You Sure You want to Save this';
            let title2 = isEdit ? 'Data Updated Succesfully' : 'Data Saved Succesfully';
            Swal.fire({
              icon: 'info',
              title: title,
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
            }).then(result => {
              if (result.isConfirmed) {
                createOneSchedule(arr)
                  .then(response => {
                    Swal.fire({
                      icon: 'success',
                      title: title2,
                    });
                    setUpdate(update + 1);
                    handleDrawerCancel2();
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
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: { error },
            });
          });
      } else {
        let arr = updateRecord;
        setUpdateRecord(arr);
        let title = isEdit ? 'Are You Sure You want to Update this' : 'Are You Sure You want to Save this';
        let title2 = isEdit ? 'Data Updated Succesfully' : 'Data Saved Succesfully';
        Swal.fire({
          icon: 'info',
          title: title,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        })
          .then(result => {
            if (result.isConfirmed) {
              createOneSchedule(updateRecord)
                .then(response => {
                  Swal.fire({
                    icon: 'success',
                    title: title2,
                  });
                  setUpdate(update + 1);
                  handleDrawerCancel2();
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
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: { error },
            });
          });
      }
    } else {
      if (fileList.length > 0) {
        let formData2 = new FormData();
        formData2.append('file', record2.file);
        formData2.append('folder', location.state.grade_id);
        uploadFileForExam(formData2)
          .then(res => {
            let arr = record2;
            arr.file = null;
            arr.filename = res.data.filename;
            arr.folder = null;
            arr.data = res.data.data;
            setRecord(arr);
            let title = isEdit ? 'Are You Sure You want to Update this' : 'Are You Sure You want to Save this';
            let title2 = isEdit ? 'Data Updated Succesfully' : 'Data Saved Succesfully';
            Swal.fire({
              icon: 'info',
              title: title,
              showCancelButton: true,
              confirmButtonText: 'Yes',
              cancelButtonText: 'No',
            }).then(result => {
              if (result.isConfirmed) {
                createOneSchedule(record2)
                  .then(response => {
                    Swal.fire({
                      icon: 'success',
                      title: title2,
                    });
                    setUpdate(update + 1);
                    handleDrawerCancel();
                  })
                  .catch(error => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Request Failed',
                      text: { error },
                    });
                  });
              }
            });
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: { error },
            });
          });
      } else {
        let arr = record2;
        arr.file = null;
        arr.filename = null;
        arr.folder = null;
        let dat = { Location: null };
        arr.data = dat;
        setRecord(arr);
        let title = isEdit ? 'Are You Sure You want to Update this' : 'Are You Sure You want to Save this';
        let title2 = isEdit ? 'Data Updated Succesfully' : 'Data Saved Succesfully';
        Swal.fire({
          icon: 'info',
          title: title,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        })
          .then(result => {
            if (result.isConfirmed) {
              createOneSchedule(record2)
                .then(response => {
                  Swal.fire({
                    icon: 'success',
                    title: title2,
                  });
                  setUpdate(update + 1);
                  handleDrawerCancel();
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
          })
          .catch(error => {
            Swal.fire({
              icon: 'error',
              title: 'Request Failed',
              text: { error },
            });
          });
      }
    }
  };
  const [isCreateVisible, setisCreateVisible] = useState(false);
  let [data, setData] = useState([]);
  let intialState = {
    date: null,
    avgMark: 0,
    isInternalTest: null,
    starts_at: null,
    quesPaper: null,
    ends_at: null,
    remarks: null,
    theory_mark: null,
    pass_m: null,
    convertMark: null,
    subject_id: null,
    exam_id: location.state._id,
    file: null,
    data: null,
    filename: null,
    internalTest: [
      {
        Ttype: null,
        mark: 0,
      },
    ],

    Internalmark: [
      {
        mField: null,
        mark: 0,
      },
    ],
    folder: location.state.grade_id,
  };
  const handleDrawerCancel = () => {
    setisCreateVisible(false);
    setState({ fileList: [] });
    setRecord(intialState);
  };
  const handleDrawerCancel2 = () => {
    setisCreateVisible(false);
    setState({ fileList: [] });
    setisEdit(false);
    setUpdateRecord(null);
  };
  const handleDate = data => {
    let date = data.date;
    let da = moment(date).format('DD/MM/YYYY');
    return da;
  };
  return (
    <Fragment>
      {/* <NewLesson isVisible={isVisible} handleOk={handleOk} handleCancel={handleCancel} /> */}
      <PageHeader
        ghost
        buttons={[
          <Button size="small" key={121} onClick={() => setisCreateVisible(true)} type="primary">
            <FeatherIcon key={122} icon="plus" size={15} />
            Create New Exam
          </Button>,
        ]}
        title="Exam Information"
      />
      <Main>
        <Row gutter={25}>
          <Drawer
            destroyOnClose={true}
            title={isEdit ? 'Edit Exam' : 'Create New Exam'}
            width={750}
            onClose={isEdit ? handleDrawerCancel2 : handleDrawerCancel}
            visible={isCreateVisible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={isEdit ? handleDrawerCancel2 : handleDrawerCancel} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={handleOk1} type="primary">
                  Submit
                </Button>
              </div>
            }
          >
            {isEdit ? (
              updateRecord ? (
                <Form preserve={false}>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="date"
                        label="Date"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <DatePicker
                          defaultValue={moment(updateRecord.date, 'YYYY/MM/DD [GMT]Z')}
                          format="YYYY-MM-DD"
                          onChange={(date, dateString) =>
                            onChangeDate(date, dateString, 'date', setUpdateRecord, updateRecord)
                          }
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="subject"
                        label="Subject"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          defaultValue={updateRecord.subject_id}
                          onChange={value => {
                            onChangeSelect(value, 'subject_id', setUpdateRecord, updateRecord);
                          }}
                          allowClear
                          placeholder="Select Subject"
                          style={{ width: '100%' }}
                        >
                          {sub.map((e, key) => {
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
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="session"
                        label="Session"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          defaultValue={updateRecord.remarks}
                          onChange={value => {
                            onChangeSelect(value, 'remarks', setUpdateRecord, updateRecord);
                          }}
                          placeholder="Select Session"
                          style={{ width: '100%' }}
                        >
                          <Option value="FN">FN</Option>
                          <Option value="AN">AN</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="isinternal"
                        label="Is Internal"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Select
                          placeholder="Is the exam internal"
                          defaultValue={updateRecord.isInternalTest}
                          onChange={value => {
                            SetIsinternal(value);
                            onChangeSelect(value, 'isInternalTest', setUpdateRecord, updateRecord);
                          }}
                          style={{ width: '100%' }}
                        >
                          <Option value={1}>Yes</Option>
                          <Option value={0}>No</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="start"
                        label="Start"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <TimePicker
                          defaultValue={moment(updateRecord.starts_at, 'h:mm a')}
                          onChange={(time, timeString) => {
                            onChangeTime(time, timeString, 'starts_at', setUpdateRecord, updateRecord);
                          }}
                          use12Hours
                          format="h:mm a"
                          placeholder=""
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="end"
                        label="End"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <TimePicker
                          defaultValue={moment(updateRecord.ends_at, 'h:mm a')}
                          onChange={(time, timeString) => {
                            onChangeTime(time, timeString, 'ends_at', setUpdateRecord, updateRecord);
                          }}
                          use12Hours
                          format="h:mm a"
                          placeholder=""
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="theory"
                        label="Theory"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          defaultValue={updateRecord.theory_mark}
                          onChange={e => {
                            onChangeInput(e, 'theory_mark', setUpdateRecord, updateRecord);
                          }}
                          placeholder="Theory Marks"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="passmark"
                        label="Pass Mark"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          defaultValue={updateRecord.pass_m}
                          onChange={e => {
                            onChangeInput(e, 'pass_m', setUpdateRecord, updateRecord);
                          }}
                          placeholder="Passing marks"
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="markconvert"
                        label="Mark Convert"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          defaultValue={updateRecord.convertMark}
                          onChange={e => {
                            onChangeInput(e, 'convertMark', setUpdateRecord, updateRecord);
                          }}
                          placeholder="Mark Convert"
                        />
                      </Form.Item>
                    </Col>
                    {isInternal == 0 ? null : (
                      <Col span={12}>
                        <Form.Item
                          name="Avg Mark"
                          label="Avg Mark"
                          rules={[
                            {
                              required: true,
                            },
                          ]}
                        >
                          <Input
                            defaultValue={updateRecord.avgMark}
                            onChange={handleInternalTestField2}
                            placeholder="Average Mark"
                          />
                        </Form.Item>
                      </Col>
                    )}
                  </Row>
                  {form2.map(e => {
                    return e
                  })}
                  {updateRecord ? updateRecord.quesPaper ? updateRecord.quesPaper.length > 0 ? (
                    <>
                      {' '}
                      <Form.Item label="Already Uploaded" tooltip="This is a required field">
                        <Row>
                          <Col span={20}>
                            <Input
                              key={updateRecord.organization_id + 415}
                              disabled={true}
                              defaultValue={updateRecord.quesPaper[0]}
                              width={800}
                            />
                          </Col>
                          <Col span={2} style={{ margin: '10px' }}>
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() =>
                                deleteDocument21(
                                  location.state.grade_id,
                                  updateRecord.quesPaper[0],
                                  'quesPaper',
                                  setUpdateRecord,
                                  updateRecord,
                                )
                              }
                              style={{ fontSize: 25, color: 'red ' }}
                            />
                          </Col>
                        </Row>
                      </Form.Item>
                    </>
                  ) : (
                    <Form.Item label="Attachment " required tooltip="This is a required field">
                      <Upload key={Math.random() * (100 - 1)} {...props}>
                        <Button key={Math.random() * (100 - 1)} icon={<UploadOutlined />}>
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item>
                  ) : (
                    <Form.Item label="Attachment " required tooltip="This is a required field">
                      <Upload key={Math.random() * (100 - 1)} {...props}>
                        <Button key={Math.random() * (100 - 1)} icon={<UploadOutlined />}>
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item>
                  ) : (
                    <Form.Item label="Attachment " required tooltip="This is a required field">
                      <Upload key={Math.random() * (100 - 1)} {...props}>
                        <Button key={Math.random() * (100 - 1)} icon={<UploadOutlined />}>
                          Select File
                        </Button>
                      </Upload>
                    </Form.Item>
                  )}
                </Form>
              ) : null
            ) : (
              <Form preserve={false}>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="date"
                      label="Date"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder=""
                        key={record2.date ? record2.date : Math.random() * (100 - 1)}
                        onChange={(date, dateString) => onChangeDate(date, dateString, 'date', setRecord, record2)}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="subject"
                      label="Subject"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        key={record2.subject_id ? record2.subject_id : Math.random() * (100 - 1)}
                        onChange={value => {
                          onChangeSelect(value, 'subject_id', setRecord, record2);
                        }}
                        allowClear
                        placeholder="Select Subject"
                        style={{ width: '100%' }}
                      >
                        {sub.map((e, key) => {
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
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="session"
                      label="Session"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        key={record2.remarks ? record2.remarks : Math.random() * (100 - 1)}
                        onChange={value => {
                          onChangeSelect(value, 'remarks', setRecord, record2);
                        }}
                        placeholder="Select Session"
                        style={{ width: '100%' }}
                      >
                        <Option value="FN">FN</Option>
                        <Option value="AN">AN</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="isinternal"
                      label="Is Internal"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Select
                        key={record2.isInternalTest ? record2.isInternalTest : Math.random() * (100 - 1)}
                        placeholder="Is the exam internal"
                        onChange={value => {
                          console.log('val', value);
                          SetIsinternal(value);
                          onChangeSelect(value, 'isInternalTest', setRecord, record2);
                        }}
                        style={{ width: '100%' }}
                      >
                        <Option value={1}>Yes</Option>
                        <Option value={0}>No</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="start"
                      label="Start"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <TimePicker
                        key={record2.starts_at ? record2.starts_at : Math.random() * (100 - 1)}
                        onChange={(time, timeString) => {
                          onChangeTime(time, timeString, 'starts_at', setRecord, record2);
                        }}
                        use12Hours
                        format="h:mm a"
                        placeholder=""
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="end"
                      label="End"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <TimePicker
                        key={record2.ends_at ? record2.ends_at : Math.random() * (100 - 1)}
                        onChange={(time, timeString) => {
                          onChangeTime(time, timeString, 'ends_at', setRecord, record2);
                        }}
                        use12Hours
                        format="h:mm a"
                        placeholder=""
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="theory"
                      label="Theory"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        key={record2.theory_mark ? record2.theory_mark : Math.random() * (100 - 1)}
                        onChange={e => {
                          onChangeInput(e, 'theory_mark', setRecord, record2);
                        }}
                        placeholder="Theory Marks"
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      name="passmark"
                      label="Pass Mark"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        key={record2.pass_m ? record2.pass_m : Math.random() * (100 - 1)}
                        onChange={e => {
                          onChangeInput(e, 'pass_m', setRecord, record2);
                        }}
                        placeholder="Passing marks"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      name="markconvert"
                      label="Mark Convert"
                      rules={[
                        {
                          required: true,
                        },
                      ]}
                    >
                      <Input
                        key={record2.convertMark ? record2.convertMark : Math.random() * (100 - 1)}
                        onChange={e => {
                          onChangeInput(e, 'convertMark', setRecord, record2);
                        }}
                        placeholder="Mark Convert"
                      />
                    </Form.Item>
                  </Col>
                  {isInternal == 0 ? null : (
                    <Col span={12}>
                      <Form.Item
                        name="Avg Mark"
                        label="Avg Mark"
                        rules={[
                          {
                            required: true,
                          },
                        ]}
                      >
                        <Input
                          key={record2.avgMark === 0 ? Math.random() * (100 - 1) : record2.avgMark}
                          onChange={handleInternalTestField}
                          placeholder="Average Mark"
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Row>
                {formdata.map(e => {
                  return e
                })}
                <Form.Item label="Attachment " required tooltip="This is a required field">
                  <Upload {...props}>
                    <Button key={Math.random() * (100 - 1)} icon={<UploadOutlined />}>
                      Select File
                    </Button>
                  </Upload>
                </Form.Item>
              </Form>
            )}{' '}
          </Drawer>
          <Cards headless>
            <CustomTable col={columns} data={data} />
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
}

export default Viewexam;
