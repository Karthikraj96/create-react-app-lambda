import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Form, Upload, Spin, Alert, Table } from 'antd';
import { Input } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Fragment } from 'react';
import { Select } from 'antd';
import { Space } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import NewStudent from './addnewstudentmodal';
import { useHistory } from 'react-router-dom';
import ChartJs from './Charts/StudentChart';
import './index.css';
import { faExchange, faPaperclip, faKey, faPencil, faLink, faPhone } from '@fortawesome/pro-duotone-svg-icons';
import {
  decodedata,
  getStudent_users,
  getClass,
  addstudent,
  editStudentDetail,
  saveNewPass,
  saveNewMob,
  guardians_chg,
  uploadStudentFiles,
  studentBatchSwap,
} from '../../api/api';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const { Option } = Select;
let Student = () => {
  const history = useHistory();
  let [load, setLoad] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const [isVisible3, setisVisible3] = useState(false);
  const [isVisible4, setisVisible4] = useState(false);
  const [isVisible5, setisVisible5] = useState(false);
  const [isVisible6, setisVisible6] = useState(false);
  let [rows, setRows] = useState([]);
  let [batchSwapData, setBatchSwapData] = useState(null);
  let [state, setState] = useState({
    fileList: [],
  });
  let [selectedStudent, setSelectedStudent] = useState(null);
  let [tokendata, setTokendata] = useState(null);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [batchVisible, setbatchVisible] = useState(false);
  let [selectedOrg, setselectedOrg] = useState(null);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [section, setSection] = useState([]);
  let [selectedSection, setSelectedSection] = useState(null);
  let [batchSelect, setbatchSelect] = useState([]);
  let [ExchangeSection, setExchange] = useState(selectedSection);
  let [update, setUpdate] = useState(0);
  let [data, setData] = useState([]);
  let [password, setPassword] = useState(null);
  let [mobile, setMobile] = useState(null);
  let [rowkeys, setRowkeys] = useState([]);
  let [mobileGuard, setMobileGuard] = useState(null);
  const rowSelection = {
    selectedRowKeys: rowkeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setRowkeys(selectedRowKeys);
      let val = [];
      selectedRows.map(e => {
        val.push(e.id);
      });
      setRows(val);
    },
  };
  useEffect(() => {
    setTokendata(decodedata.role_id);
    if (selectedLevel) {
      let dat = { level: selectedLevel, id: selectedOrg };
      getClass(dat)
        .then(res => {
          setSection(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    if (selectedSection) {
      getStudent_users(selectedSection)
        .then(res => {
          let d = [];
          res.data.map((e, key) => {
            e.key = key;
            d.push(e);
          });
          setData(d);
          setLoad(true);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [selectedLevel, selectedOrg, update, selectedSection]);
  useEffect(() => {}, [selectedStudent]);
  useEffect(() => {
    setselectedOrg(decodedata.orgId);
  }, []);
  let handleSwapOk = () => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update Batch Details',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        studentBatchSwap(batchSwapData)
          .then(res => {
            if (res) {
              setbatchVisible(false);
              setUpdate(update + 1);
              setRowkeys([]);
              setLoad(false);
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
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
  };
  let handleSection = (val, key) => {
    setSelectedSection(val);
    let batchgroup = section[key].batchGroup ? section[key].batchGroup : [];
    setbatchSelect(batchgroup);
  };
  let handleBatchChange = value => {
    let val = { studentId: rows, swapBatch: value };
    setBatchSwapData(val);
  };
  const onOrgChange = value => {
    setselectedOrg(value);
    setselectedLevel(null);
    setSelectedSection(null);
  };
  const onGradeChange = value => {
    setselectedLevel(value);
    setSelectedSection(null);
  };
  const handleOk = (record, setRecord) => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Save The Student',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        addstudent(record)
          .then(res => {
            if (res) {
              setisVisible(false);
              setUpdate(update + 1);
              setLoad(false);
              setRecord({
                admission_date: null,
                admission_number: null,
                date_of_birth: null,
                first_name: null,
                gender: null,
                grade_id: null,
                last_name: null,
                mob_no: null,
                roll_number: null,
                section_id: null,
              });
              Swal.fire({
                icon: 'success',
                title: 'Data Created Successfully',
              });
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
  };
  const handleCancel = () => {
    setisVisible(false);
  };
  const handleCancel2 = () => {
    setisVisible2(false);
  };
  const handleCancelb = () => {
    setbatchVisible(false);
  };
  let handleExcahnge = value => {
    setExchange(value);
  };
  let handleOk2 = () => {
    let dat = {
      id: selectedStudent._id,
      section_id: ExchangeSection,
    };
    Swal.fire({
      icon: 'info',
      title: 'It Will Update Student Section',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        editStudentDetail(dat)
          .then(res => {
            if (res) {
              setisVisible2(false);
              setUpdate(update + 1);
              setLoad(false);
              setExchange(null);
              setSelectedStudent(null);
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
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
  };
  let handleOk3 = () => {
    let val = {
      id: selectedStudent.users._id,
      password: password,
    };
    Swal.fire({
      icon: 'info',
      title: 'It Will Update Student Section',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        saveNewPass(val)
          .then(res => {
            if (res) {
              setisVisible3(false);
              setUpdate(update + 1);
              setLoad(false);
              setSelectedStudent(null);
              setPassword(null);
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
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
  };
  let handleOk4 = () => {
    let val = {
      profile_id: selectedStudent.users.profile_id,
      userName: mobile,
      id: selectedStudent.users.id,
    };
    Swal.fire({
      icon: 'info',
      title: 'It Will Update Student Number',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        saveNewMob(val)
          .then(res => {
            if (res) {
              setisVisible4(false);
              setUpdate(update + 1);
              setLoad(false);
              setSelectedStudent(null);
              setMobile(null);
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
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
  };
  let handleOk5 = () => {
    let val = {
      mobile: mobileGuard,
      id: selectedStudent.id,
    };
    Swal.fire({
      icon: 'info',
      title: 'It Will Update Student Guardian',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        guardians_chg(val)
          .then(res => {
            if (res) {
              setisVisible5(false);
              setUpdate(update + 1);
              setLoad(false);
              setSelectedStudent(null);
              setMobileGuard(null);
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
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
  };
  const { fileList } = state;
  const props = {
    onRemove: file => {
      setState(state => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        // handleFileRemove()
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setState(state => ({
        fileList: [...state.fileList, file],
      }));
      // handleFile(file)
      return false;
    },
    fileList,
  };
  let handleOk6 = () => {
    let da = new FormData();
    da.append('folder', 'certificate');
    fileList.map(e => {
      da.append('file', e);
    });
    da.append('id', selectedStudent.id);
    Swal.fire({
      icon: 'info',
      title: 'It Will Upload Student Certificates',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        uploadStudentFiles(da)
          .then(res => {
            if (res) {
              setisVisible6(false);
              setUpdate(update + 1);
              setLoad(false);
              setSelectedStudent(null);
              setState({ fileList: [] });
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
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
  };
  const columns = [
    {
      title: 'Roll No',
      dataIndex: 'roll_number',
      key: 'rollno',
    },
    {
      title: 'Admission',
      // dataIndex: 'admission_number',
      render: (text, record) => (
        <span>
          <strong>{record.admission_number}</strong>
        </span>
      ),
      key: 'admission_number',
    },
    {
      title: 'Student Name',
      render: (text, record) => {
        return (
          <>
            <p><strong>{record.first_name + ' ' + (record.last_name ? record.last_name : '')}</strong></p>
            {record.batchGroup ? (
              record.batchGroup.length > 0 ? (
                <span style={{color:'red'}}>
                  <strong>Batch:{ batchSelect.map((e,key)=>{
                    if(e._id ===record.batchGroup){
                      return e.groupName
                    }
                  })}</strong>
                </span>
              ) : null
            ) : null}
          </>
        );
      },
      key: 'studentname',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'gender',
    },
    {
      title: 'Parent Name',
      render: (text, record) => {
        if (record.guardians.length > 0) {
          let name =
            record.guardians[0].first_name + ' ' + (record.guardians[0].last_name ? record.guardians[0].last_name : '');
          return name;
        } else {
          return;
        }
      },
      key: 'parentname',
    },
    {
      title: 'Mobile Number',
      render: (text, record) => {
        if (record.mob_no) {
          return record.mob_no;
        } else if (record.guardians.length > 0) {
          return record.guardians[0].mobile_number;
        } else {
          return;
        }
      },
      key: 'mobilenumber',
    },
    {
      title: 'Status',
      render: (text, record) => {
        if (record.users) {
          if (record.users.id) {
            return <span style={{ color: '#28a745' }}> Registered</span>;
          } else {
            return <span style={{ color: '#dc3545' }}> UnRegistered</span>;
          }
        } else {
          return <span style={{ color: '#dc3545' }}> UnRegistered</span>;
        }
      },
      key: 'Status',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <Link to="admin/classroom/studentprofile"> */}
          <FontAwesomeIcon
            // onClick={() => setshowSideDraw(true)}
            onClick={() => {
              setSelectedStudent(record);
              setisVisible2(true);
            }}
            icon={faExchange}
            style={{ fontSize: 15, color: '#fb7e8d' }}
          />
          {/* </Link> */}
          <FontAwesomeIcon
            icon={faPaperclip}
            onClick={() => {
              setSelectedStudent(record);
              setisVisible6(true);
            }}
            style={{ fontSize: 15, color: '#fb7e8d' }}
          />
          <FontAwesomeIcon
            icon={faLink}
            onClick={() => {
              setSelectedStudent(record);
              setisVisible5(true);
            }}
            style={{ fontSize: 15, color: '#fb7e8d' }}
          />
          <FontAwesomeIcon
            icon={faKey}
            onClick={() => {
              if (record.users) {
                if (record.users.pass_unhash) {
                  setSelectedStudent(record);
                  setPassword(record.users.pass_unhash);
                  setisVisible3(!isVisible3);
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'No User Found',
                  });
                }
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'No User Found',
                });
              }
            }}
            style={{ fontSize: 15, color: '#fb7e8d' }}
          />
          <FontAwesomeIcon
            icon={faPhone}
            onClick={() => {
              if (record.users) {
                if (record.users.profile_id) {
                  if (record.mob_no) {
                    setSelectedStudent(record);
                    setMobile(record.mob_no);
                    setisVisible4(true);
                  } else if (record.guardians.length > 0) {
                    setSelectedStudent(record);
                    setMobile(record.guardians[0].mobile_number);
                    setisVisible4(true);
                  } else {
                    Swal.fire({
                      icon: 'error',
                      title: 'No User Phone Number Found',
                    });
                  }
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'No User Phone Number Found',
                  });
                }
              } else {
                Swal.fire({
                  icon: 'error',
                  title: 'No User Phone Number Found',
                });
              }
            }}
            style={{ fontSize: 15, color: '#fb7e8d' }}
          />
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => {
              let val = 'UnRegistered';
              if (record.users) {
                if (record.users.id) {
                  val = 'Registered';
                }
              }
              let da = {
                id: record.id,
                val: val,
              };
              history.push({ pathname: '/admin/classroom/studentprofile', state: da });
            }}
            style={{ fontSize: 15, color: '#fb7e8d' }}
          />
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <NewStudent
        isVisible={isVisible}
        grade={grade}
        handleOk={handleOk}
        handleCancel={handleCancel}
        selectedOrg={selectedOrg}
      />

      <PageHeader
        ghost
        title="Students List"
        buttons={[
          <Button onClick={() => setisVisible(true)} size="small" type="primary">
            <FeatherIcon icon="plus" size={15} />
            Add New Student
          </Button>,
          <Button onClick={() => setbatchVisible(true)} size="small" type="primary">
            <FeatherIcon icon="user" size={15} />
            New Bulk Batch
          </Button>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Row gutter={24} style={{ marginBottom: '2%' }} justify="end">
              {tokendata == '1' ? (
                <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
                  <Select
                    showSearch
                    size={'middle'}
                    style={{ width: '100%', marginRight: '20px' }}
                    placeholder="Select Institute"
                    defaultValue={selectedOrg}
                    onChange={onOrgChange}
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
                ''
              )}
              <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
                <Select
                  size={'middle'}
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Class"
                  value={selectedLevel}
                  onChange={onGradeChange}
                >
                  {grade.map((g, i) => {
                    return (
                      <Option key={i} value={g.id}>
                        {g.id}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
                <Select
                  placeholder="Select Section"
                  value={selectedSection}
                  onChange={(value, e) => {
                    handleSection(value, e.key);
                  }}
                  style={{ width: '100%' }}
                >
                  {section.map((g, i) => {
                    return (
                      <Option key={i} value={g._id}>
                        {g.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards
              isbutton={
                <div className="card-nav">
                  <ul>
                    <li>Total Students - 2,540</li>
                  </ul>
                </div>
              }
              title="Student Details"
              size="large"
            >
              <ChartJs />
            </Cards>
          </Col>
        </Row>
        {load === false ? (
          <Spin
            tip="Loading..."
            size="large"
            style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '5%' }}
          >
            <Alert style={{ display: 'inline-block', verticalAlign: 'middle' }} type="info" />
          </Spin>
        ) : (
          <Row gutter={25}>
            <Col xxl={24} md={24} sm={24} xs={24}>
              <Cards headless>
                <Table
                  scroll={{ x: true }}
                  rowSelection={{
                    type: 'checkbox',
                    ...rowSelection,
                  }}
                  columns={columns}
                  dataSource={data}
                />
              </Cards>
            </Col>
          </Row>
        )}
      </Main>
      <Modal
        destroyOnClose={true}
        title="BulkSwap for Batch"
        visible={batchVisible}
        onCancel={handleCancelb}
        footer={[
          <Button key="back" onClick={handleCancelb}>
            Cancel
          </Button>,
          <Button type="primary" htmlType="submit" form="Myformb">
            Submit
          </Button>,
        ]}
        width={'50%'}
      >
        <Form
          preserve={false}
          id="Myformb"
          initialValues={{
            requiredMarkValue: 'required',
          }}
          requiredMark={'required'}
          onFinish={handleSwapOk}
        >
          <Form.Item
            label="Section Batch"
            name="Section"
            required
            tooltip="This is a required field"
            rules={[{ required: true, message: 'This Cannot Be Empty' }]}
          >
            <Select placeholder="Select Batch" onChange={handleBatchChange} name="section_id" style={{ width: '100%' }}>
              {batchSelect.map((e, key) => {
                return <Option value={e._id}>{e.groupName}</Option>;
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Section switch"
        visible={isVisible2}
        onCancel={handleCancel2}
        footer={[
          <Button key="back" onClick={handleCancel2}>
            Cancel
          </Button>,
          <Button type="primary" htmlType="submit" form="Myform">
            Submit
          </Button>,
        ]}
        width={'50%'}
      >
        <Form
          preserve={false}
          id="Myform"
          initialValues={{
            requiredMarkValue: 'required',
          }}
          //  onValuesChange={onRequiredTypeChange}
          requiredMark={'required'}
          onFinish={handleOk2}
        >
          <Form.Item
            label="Section"
            name="Section"
            required
            tooltip="This is a required field"
            rules={[{ required: true, message: 'This Cannot Be Empty' }]}
          >
            <Select placeholder="Select Section" onChange={handleExcahnge} name="section_id" style={{ width: '100%' }}>
              {section.map((g, i) => {
                return (
                  <Option key={i} value={g._id}>
                    {selectedLevel + ' ' + g.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Password"
        visible={isVisible3}
        onCancel={() => {
          setisVisible3(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setisVisible3(false);
            }}
          >
            Cancel
          </Button>,
          <Button type="primary" htmlType="submit" form="Myform2">
            Submit
          </Button>,
        ]}
        width={'50%'}
      >
        <Form
          preserve={false}
          id="Myform2"
          initialValues={{
            requiredMarkValue: 'required',
          }}
          requiredMark={'required'}
          onFinish={handleOk3}
        >
          <Form.Item
            label="New Password"
            name="New Password"
            required
            tooltip="This is a required field"
            rules={[{ required: true, message: 'This Cannot Be Empty' }]}
          >
            {selectedStudent ? (
              <Input
                name="last_name"
                key={password}
                defaultValue={password}
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
            ) : (
              ''
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        destroyOnClose={true}
        title="User Mobile no."
        visible={isVisible4}
        onCancel={() => {
          setisVisible4(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setisVisible4(false);
            }}
          >
            Cancel
          </Button>,
          <Button type="primary" htmlType="submit" form="Myform4">
            Submit
          </Button>,
        ]}
        width={'50%'}
      >
        <Form
          preserve={false}
          id="Myform4"
          initialValues={{
            requiredMarkValue: 'required',
          }}
          requiredMark={'required'}
          onFinish={handleOk4}
        >
          <Form.Item
            label="New user No"
            name="New user No"
            required
            tooltip="This is a required field"
            rules={[{ required: true, message: 'This Cannot Be Empty' }]}
          >
            {selectedStudent ? (
              <Input
                name="last_name"
                key={mobile}
                defaultValue={mobile}
                onChange={e => {
                  setMobile(e.target.value);
                }}
              />
            ) : (
              ''
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Mobile no."
        visible={isVisible5}
        onCancel={() => {
          setisVisible5(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setisVisible5(false);
            }}
          >
            Cancel
          </Button>,
          <Button type="primary" htmlType="submit" form="Myform5">
            Submit
          </Button>,
        ]}
        width={'50%'}
      >
        <Form
          preserve={false}
          id="Myform5"
          initialValues={{
            requiredMarkValue: 'required',
          }}
          requiredMark={'required'}
          onFinish={handleOk5}
        >
          <Form.Item
            label="Parent Username No"
            name="Parent Username No"
            required
            tooltip="This is a required field"
            rules={[{ required: true, message: 'This Cannot Be Empty' }]}
          >
            {selectedStudent ? (
              <Input
                name="Parent Username No"
                // key={mobileGuard}
                // defaultValue={mobileGuard}
                onChange={e => {
                  setMobileGuard(e.target.value);
                }}
              />
            ) : (
              ''
            )}
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        destroyOnClose={true}
        title={
          'StudentName : ' +
          (selectedStudent
            ? selectedStudent.first_name + ' ' + (selectedStudent.last_name ? selectedStudent.last_name : ' ')
            : ' ')
        }
        visible={isVisible6}
        onCancel={() => {
          setisVisible6(false);
        }}
        footer={[
          <Button
            key="back"
            onClick={() => {
              setState({
                fileList: [],
              });
              setisVisible6(false);
            }}
          >
            Cancel
          </Button>,
          <Button type="primary" htmlType="submit" form="Myform5">
            Submit
          </Button>,
        ]}
        width={'50%'}
      >
        <Form
          preserve={false}
          id="Myform5"
          initialValues={{
            requiredMarkValue: 'required',
          }}
          requiredMark={'required'}
          onFinish={handleOk6}
        >
          <Form.Item
            label="Select Files To Upload"
            name="StudentName"
            required
            tooltip="This is a required field"
            rules={[{ required: true, message: 'This Cannot Be Empty' }]}
          >
            {selectedStudent ? (
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Select File</Button>
              </Upload>
            ) : (
              ''
            )}
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default Student;
