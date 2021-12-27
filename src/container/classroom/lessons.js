import React, { useEffect, useState } from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { Space } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import {
  getSubject,
  decodedata,
  getAllOrgHomeworks,
  createAdminhome,
  createAdminhome2,
  createAdminhome3,
  editHomework,
  deletehomework,
  deleteDocument2,
  AwsURL,
} from '../../api/api';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ReactHtmlParser from 'react-html-parser';
import { faPencil, faDownload, faTrash ,faClock,faCalendarCheck} from '@fortawesome/pro-duotone-svg-icons';
import NewLesson from './newLessonModal';
import { Select } from 'antd';
import './style.css';
import Swal from 'sweetalert2';
import moment from 'moment';
const { Option } = Select;
function Student() {
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [update, setUpdate] = useState(0);
  let [id, setid] = useState(null);
  let [subject, setSubject] = useState([]);
  let [data, setData] = useState(null);
  let [assignment, setAssignment] = useState(null);
  let [data2, setData2] = useState(null);
  let [selectedDate, setselectedDate] = useState(null);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedOrg2, setselectedOrg2] = useState(decodedata.orgId);
  let [tokendata, setTokendata] = useState(null);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [selectedSubject, setselectedSubject] = useState(null);
  let [selectedSubject2, setselectedSubject2] = useState(null);
  let [chapselected, setChapSelected] = useState(null);
  let [file, setFile] = useState(null);
  let [file2, setFile2] = useState(null);
  let [topic, setTopic] = useState(null);
  let [org2, setorg2] = useState([]);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  const handleFile = data => {
    setFile(data);
  };
  const handleFile2 = data => {
    setFile2(data);
  };
  const handleTopic = value => {
    setTopic(value);
  };
  const handleTopic2 = e => {
    setTopic(e.target.value);
  };
  const handleFileRemove = () => {
    setFile(null);
  };
  const handleAssignment = value => {
    setAssignment(value);
  };
  const handleFileRemove2 = () => {
    setFile2(null);
  };
  const handleChapter2 = e => {
    setChapSelected(e.target.value);
  };
  const handleChapter = value => {
    setChapSelected(value);
  };
  let [record, setRecord] = useState(null);
  let [instType, setInstiType] = useState('CBSE');
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let datasfds = {
      orgId: selectedOrg,
      grade_id: selectedLevel,
      subject: selectedSubject,
    };
    getAllOrgHomeworks(datasfds)
      .then(res => {
        let datte = moment(Date.now()).format('YYYY/MM/DD');
        let dat = res.data;
        let dat1 = [];
        let dat2 = [];
        if (dat) {
          (dat1 = []), (dat2 = []);
          dat.map(e => {
            if (e) {
              let dateeee = moment(e.entry_date).format('YYYY/MM/DD');
              if (moment(dateeee).isAfter(datte)) {
                dat1.push(e);
              } else {
                dat2.push(e);
              }
            }
          });
        }
        setData(dat1);
        setData2(dat2);
      })
      .catch(e => {
        console.log(e);
      });
    if (selectedLevel) {
      if (decodedata.role_id == '1') {
        let type;
        org.filter(item => {
          if (item.organization_id == selectedOrg) {
            type = item.instituteType;
          }
        });
        let data5 = {
          type: type,
          level: selectedLevel,
        };
        getSubject(data5)
          .then(response => {
            setSubject(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        let data5 = {
          type: decodedata.schoolType,
          level: selectedLevel,
        };
        getSubject(data5)
          .then(response => {
            setSubject(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }, [selectedLevel, selectedOrg, selectedSubject, update]);
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleInsti2 = value => {
    setselectedOrg2(value);
  };
  const handleLevel = value => {
    setselectedLevel(value);
  };
  const handleType = value => {
    let da = [];
    org.map(e => {
      if (e.instituteType.toUpperCase() === value) {
        da.push(e);
      }
    });
    setorg2(da);
    setInstiType(value);
  };
  const handleSubject = value => {
    setselectedSubject(value);
  };
  const handleSubject2 = value => {
    setselectedSubject2(value);
  };
  const handleOk = () => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Create The Lesson',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        if (file && file2) {
          let bodyFormData = new FormData();
          bodyFormData.append('folder', selectedLevel);
          bodyFormData.append('folder2', selectedLevel);
          bodyFormData.append('file', file);
          bodyFormData.append('file2', file2);
          bodyFormData.append('entry_date', selectedDate);
          bodyFormData.append('topics', topic);
          bodyFormData.append('chapter_id', chapselected);
          bodyFormData.append('grade_id', selectedLevel);
          bodyFormData.append('subject', selectedSubject2);
          bodyFormData.append('description', assignment);
          bodyFormData.append('organization_id', selectedOrg2);
          createAdminhome(bodyFormData)
            .then(res => {
              if (res) {
                setisVisible(false);
                setUpdate(update + 1);
                setRecord(null);
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
        } else if (file) {
          let bodyFormData = new FormData();
          bodyFormData.append('folder', selectedLevel);
          bodyFormData.append('file', file);
          bodyFormData.append('fileno', 0);
          bodyFormData.append('entry_date', selectedDate);
          bodyFormData.append('topics', topic);
          bodyFormData.append('chapter_id', chapselected);
          bodyFormData.append('grade_id', selectedLevel);
          bodyFormData.append('subject', selectedSubject2);
          bodyFormData.append('description', assignment);
          bodyFormData.append('organization_id', selectedOrg2);
          createAdminhome2(bodyFormData)
            .then(res => {
              if (res) {
                setisVisible(false);
                setUpdate(update + 1);
                setRecord(null);
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
        } else if (file2) {
          let bodyFormData = new FormData();
          bodyFormData.append('folder', selectedLevel);
          bodyFormData.append('fileno', 1);
          bodyFormData.append('file', file2);
          bodyFormData.append('entry_date', selectedDate);
          bodyFormData.append('topics', topic);
          bodyFormData.append('chapter_id', chapselected);
          bodyFormData.append('grade_id', selectedLevel);
          bodyFormData.append('subject', selectedSubject2);
          bodyFormData.append('description', assignment);
          bodyFormData.append('organization_id', selectedOrg2);
          createAdminhome2(bodyFormData)
            .then(res => {
              if (res) {
                setisVisible(false);
                setUpdate(update + 1);
                setRecord(null);
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
        } else {
          let data = {
            entry_date: selectedDate,
            topics: topic,
            chapter_id: chapselected,
            grade_id: selectedLevel,
            subject: selectedSubject2,
            description: assignment,
            organization_id: selectedOrg2,
          };
          createAdminhome3(data)
            .then(res => {
              if (res) {
                setisVisible(false);
                setUpdate(update + 1);
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
      }
    });
  };
  const handleOk2 = () => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update The Details',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        if (file && file2) {
          let bodyFormData = new FormData();
          bodyFormData.append('id', id._id);
          bodyFormData.append('folder', id.grade_id);
          bodyFormData.append('folder2', id.grade_id);
          bodyFormData.append('file', file);
          bodyFormData.append('file2', file2);
          bodyFormData.append('entry_date', selectedDate);
          bodyFormData.append('topics', topic);
          bodyFormData.append('chapter_id', chapselected);
          bodyFormData.append('grade_id', selectedLevel);
          bodyFormData.append('subject', selectedSubject2);
          bodyFormData.append('description', assignment);
          bodyFormData.append('organization_id', selectedOrg2);
          createAdminhome(bodyFormData)
            .then(res => {
              if (res) {
                setisVisible2(false);
                setUpdate(update + 1);
                setRecord(null);
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
        } else if (file) {
          let bodyFormData = new FormData();
          bodyFormData.append('id', id._id);
          bodyFormData.append('folder', id.grade_id);
          bodyFormData.append('file', file);
          bodyFormData.append('fileno', 0);
          bodyFormData.append('entry_date', selectedDate);
          bodyFormData.append('topics', topic);
          bodyFormData.append('chapter_id', chapselected);
          bodyFormData.append('grade_id', selectedLevel);
          bodyFormData.append('subject', selectedSubject2);
          bodyFormData.append('description', assignment);
          bodyFormData.append('organization_id', selectedOrg2);
          bodyFormData.append('ansKey', record.ansKey);
          createAdminhome2(bodyFormData)
            .then(res => {
              if (res) {
                setisVisible2(false);
                setUpdate(update + 1);
                setRecord(null);
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
        } else if (file2) {
          let bodyFormData = new FormData();
          bodyFormData.append('id', id._id);
          bodyFormData.append('folder', id.grade_id);
          bodyFormData.append('file', file2);
          bodyFormData.append('fileno', 1);
          bodyFormData.append('entry_date', selectedDate);
          bodyFormData.append('topics', topic);
          bodyFormData.append('chapter_id', chapselected);
          bodyFormData.append('grade_id', selectedLevel);
          bodyFormData.append('subject', selectedSubject2);
          bodyFormData.append('description', assignment);
          bodyFormData.append('organization_id', selectedOrg2);
          bodyFormData.append('attachFile', record.attachFile);
          createAdminhome2(bodyFormData)
            .then(res => {
              if (res) {
                setisVisible2(false);
                setUpdate(update + 1);
                setRecord(null);
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
        } else {
          let data = {
            id: id._id,
            entry_date: selectedDate,
            topics: topic,
            chapter_id: chapselected,
            grade_id: selectedLevel,
            subject: selectedSubject2,
            description: assignment,
            organization_id: selectedOrg2,
            attachFile: record.attachFile,
            ansKey: record.ansKey
          };
          editHomework(data)
            .then(res => {
              if (res) {
                setisVisible2(false);
                setUpdate(update + 1);
                setRecord(null);
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
      }
    });
  };
  const handleUpdate = data => {
    setselectedDate(data.entry_date);
    setTopic(data.topics);
    setChapSelected(data.chapter_id);
    setselectedLevel(data.grade_id);
    setselectedSubject2(data.subject);
    setAssignment(data.description);
    setselectedOrg2(data.organization_id);
    setisVisible2(true);
    setid(data);
    setRecord(data);
  };
  const handleDate2 = (date, dateString) => {
    setselectedDate(date);
  };
  const handleCancel = () => {
    setisVisible(false);
  };
  const handleCancel2 = () => {
    setisVisible2(false);
  };
  const handleDate = data => {
    let date = data.entry_date;
    let da = moment(date).format('DD/MM/YYYY');
    let da2= moment(date).format('hh:mm A');
    return (
      <>
     <span> <FontAwesomeIcon
              icon={faCalendarCheck}
              style={{ fontSize: 15 }}
            /></span> &nbsp; <span><strong>{da}</strong></span><br/>
      <span> <FontAwesomeIcon
              icon={faClock}
              style={{ fontSize: 15, color: '#c3272b ' }}
            /></span> &nbsp; <span style={{color:'#c3272b'}}><strong>{da2}</strong></span>
      </>
     
    );
  };
  // toggleCreate
  const toggleCreate = () => {
    let da = [];
    org.map(e => {
      if (e.instituteType.toUpperCase() === instType) {
        da.push(e);
      }
    });
    setorg2(da);
    setisVisible(true);
  };
  const handlehtml = data => {
    let dat = data.description;
    return ReactHtmlParser(dat);
  };
  const handleDelete = data => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Delete this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let dat = {
          folder: 'Lesson',
          audio: data.attachFile,
        };
        let dat2 = {
          folder: 'ansKey',
          audio: data.Answerkey,
        };
        return deletehomework(data._id)
          .then(response => {
            deleteDocument2(dat)
              .then(res => {
                deleteDocument2(dat2)
                  .then(res => {
                    setUpdate(update + 1);
                  })
                  .catch(e => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Database Error Retry',
                    });
                  });
              })
              .catch(e => {
                Swal.fire({
                  icon: 'error',
                  title: 'Database Error Retry',
                });
              });
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
    }).then(result => {
      if (result.isConfirmed === true) {
        Swal.fire({
          icon: 'success',
          title: 'Data Deleted Succesfully',
        });
      }
    });
  };
  const handleDownload = (value,string) => {
    if (value[string].length > 0) {
      let va = AwsURL + value.grade_id + '/' + value[string];
      window.open(va, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No file Available',
      });
    }
  };
  const columns = [
    {
      title: 'Date',
      key: 'date',
      render: (text, record) => handleDate(record),
    },
    {
      title: 'Subject',
      dataIndex: 'subject_name',
      key: 'subject',
    },
    {
      title: 'Chapter',
      dataIndex: 'chapter_id',
      key: 'chapter',
    },
    {
      title: 'Topic',
      dataIndex: 'topics',
      key: 'topic',
    },
    {
      title: 'Assignment',
      key: 'assignment',
      render: (text, record) => handlehtml(record),
    },

    {
      title: 'Action',
      key: 'action',
      width: '15%',

      render: (text, record) => (
        <Space size="middle">
          {record.attachFile?record.attachFile.length > 0 ? (
            <FontAwesomeIcon
              icon={faDownload}
              onClick={() => handleDownload(record,"attachFile")}
              style={{ fontSize: 15, color: 'Dodgerblue ' }}
            />
          ) : null: null}
           {record.ansKey?record.ansKey.length > 0 ? (
            <FontAwesomeIcon
              icon={faDownload}
              onClick={() => handleDownload(record,"ansKey")}
              style={{ fontSize: 15, color: 'BlueViolet ' }}
            />
          ) : null: null}
          <FontAwesomeIcon
            onClick={() => handleUpdate(record)}
            icon={faPencil}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(record)}
            style={{ fontSize: 15, color: 'red ' }}
          />
          {/* <FontAwesomeIcon icon={faPaperclip} style={{ fontSize: 15, color: 'gray ' }} /> */}
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <NewLesson
        title="Create New Lesson"
        oktext="Create"
        handleSubject={handleSubject2}
        handleLevel={handleLevel}
        isVisible={isVisible}
        handleDate={handleDate2}
        handleType={handleType}
        tokendata={tokendata}
        handleOk={handleOk}
        handleFile={handleFile}
        handleFile2={handleFile2}
        handleFileRemove2={handleFileRemove2}
        handleFileRemove={handleFileRemove}
        handleCancel={handleCancel}
        org2={org2}
        handleAssignment={handleAssignment}
        subject={subject}
        handleChapter2={handleChapter2}
        handleChapter={handleChapter}
        handleTopic={handleTopic}
        handleTopic2={handleTopic2}
        handleInsti={handleInsti2}
        record={record}
        setRecord={setRecord}
      />
      <NewLesson
        title="Update the Lesson"
        oktext="Update"
        handleSubject={handleSubject2}
        handleLevel={handleLevel}
        isVisible={isVisible2}
        handleDate={handleDate2}
        handleType={handleType}
        tokendata={tokendata}
        handleOk={handleOk2}
        handleFile={handleFile}
        handleFile2={handleFile2}
        handleFileRemove2={handleFileRemove2}
        handleFileRemove={handleFileRemove}
        handleCancel={handleCancel2}
        org2={org2}
        handleAssignment={handleAssignment}
        subject={subject}
        handleChapter2={handleChapter2}
        handleChapter={handleChapter}
        handleTopic={handleTopic}
        handleTopic2={handleTopic2}
        handleInsti={handleInsti2}
        record={record}
        setRecord={setRecord}
      />
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCreate} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Create
          </Button>,
        ]}
        title="Lessons"
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Row gutter={25} style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Class{' '} */}
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Institute"
                  optionFilterProp="children"
                  onChange={handleInsti}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Class{' '} */}
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Class"
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
                {/* Section{' '} */}
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Subject"
                  optionFilterProp="children"
                  onChange={handleSubject}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {subject.map((e, key) => {
                    return (
                      <Option key={key} value={e.id}>
                        {e.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={25}>
          <Cards headless>
            <Tabs defaultActiveKey="1">
              <TabPane tab="Upcoming Lessons" key="1">
                <CustomTable col={columns} data={data} />
              </TabPane>
              <TabPane tab="Ongoing Lessons" key="2">
                <CustomTable col={columns} data={data2} />
              </TabPane>
            </Tabs>
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
}

export default Student;
