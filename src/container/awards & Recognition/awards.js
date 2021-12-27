import React, { useState, useEffect } from 'react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { Row, Col, Card, Divider, Modal, Input, Select, Space, TimePicker, Pagination } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Main } from '../styled';
import CustomTable from '../fee/dashboard/Components/Table';
import {
  faCog,
  faDownload,
  faEnvelope,
  faPencil,
  faSave,
  faTrash,
  faUpload,
  faEye,
  faPencilAlt,
  faTrashAlt,
  faCoins,
  faUsers,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faRupeeSign,
  faBell,
  faPaperclip,
  faTrophyAlt,
} from '@fortawesome/pro-duotone-svg-icons';
import AwardsModal from './awardsModal';
import AwardsUpdateModal from './awardsupdateModal';
import { decodedata, getRecognition, getClass, getStudents, postRecognition,getBadge,deleteRecognition } from '../../api/api';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const { Option } = Select;

const columns = [
  {
    title: 'SCHOOL',
    dataIndex: 'school',
    key: 'date',
  },
  {
    title: 'LEVEL',
    dataIndex: 'level',
  },
  {
    title: 'CLASS',
    dataIndex: 'class',
  },
  {
    title: 'STUDENT',
    dataIndex: 'student',
  },
  {
    title: 'TITLE',
    dataIndex: 'title',
  },
  {
    title: 'BADGE',
    dataIndex: 'Badges',
  },
  {
    title: 'Action',
    key: 'action',
    width: '20%',

    render: (text, record) => (
      <Space size="middle">
        <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
        <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
      </Space>
    ),
  },
];
const data = [
  {
    school: 'Mathur',
    level: 'IV',
    class: 'Attrentiv',
    student: 'Krishna',
    title: 'Best student',
    badge: 'Nerd badge',
  },
];
for (let i = 0; i < 1; i++) {
  data.push({
    key: i,
    school: `perambur`,
    level: 'IV',
    class: 'Attrentiv',
    student: 'Krishna',
    title: 'Best student',
    badge: 'Nerd badge',
  });
}

const Awards = () => {
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [clas, setClas] = useState([]);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  let [secid, setsecid] = useState('');
  let [selDate, setSeldate] = useState('');
  let [secinsti, setSecinsti] = useState(decodedata.orgId);
  let [tokendata, setTokendata] = useState(null);
  let [record2, setRecord2] = useState(null);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [secLevel, setSeclevel] = useState('');
  let [update, setUpdate] = useState(0);
  let [SecStudent, setSecStudent] = useState('');
  let [Title, setTitle] = useState('');
  let [description, setDescription] = useState('');
  let [selectedLevel, setselectedLevel] = useState(null);
  let [selectedClass, setselectedClass] = useState(null);
  let [selectedType, setselectedType] = useState(null);
  let [student, setStudent] = useState([]);
  let [badge, setBadge] = useState([]);
  const [isVisible2, setisVisible2] = useState(false);
  let [id, setId] = useState(null);
  
  const handleClickEdit = data => {
    setisVisible2(true);
    setId(data);
  };
  const handleClas = value => {
    setsecid(value);
    let data = {
      section_id: value,
    };
    getStudents(data)
      .then(res => {
        setStudent(res.data);
      })
      .catch(e => {
        console.log('error', e);
      });
  };
  const handledescription = value => {
    setDescription(value);
  };
  const handleinsti = value => {
    setSecinsti(value);
  };
  const handleTitle = value => {
    setTitle(value.target.value);
  };
  const handlelevel = value => {
    setSeclevel(value);
  };
  const handleStudent = id => {
    setSecStudent(id);
  };

  const handleLevel = value => {
    setselectedLevel(value);
    setData([]);
    setselectedClass(null);
  };
  const handleclass = value => {
    setselectedClass(value);
    setData([]);
  };
  const handleType = value => {
    setselectedType(value);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    let data2 = {
      id: secinsti ? secinsti : decodedata.id,
      level: secLevel,
    };
    getClass(data2)
      .then(response => {
        setClas(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [secLevel, selectedClass]);
  useEffect(() => {
    let decodedata2 = decodedata;
    setTokendata(decodedata2.role_id);
    let data2 = {
      id: 1,
      level: selectedLevel,
    };
    getClass(data2)
      .then(response => {
        setClas(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    let data3 = {
      type: selectedType,
      section_id: selectedClass,
      orgId: selectedOrg,
    };
    getRecognition(data3).then(res => {
      setData(res.data.data);
    });
    getBadge()
    .then(res => {
      setBadge(res.data.data);
    })
    .catch(e => {
      console.log(e);
    });
  }, [selectedClass, selectedLevel, selectedType, update, selectedOrg]);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleUpdate =()=>{
    setisCreateModalVisible2(!isCreateModalVisible2)
  }
  // const handleOk = () => {
  //   let award_data = {
  //     // description: description,
  //     level:secLevel,
  //     sectionName:secid,
  //     Batch:selectedType,
  //     badgeId:secid,
  //     studentsId:SecStudent,
  //     title: Title,
  //     organization_id: secinsti,
  //     // student_id: SecStudent,
  //     section: secid,

  //   };
  //   console.log(award_data);
  //   Swal.fire({
  //     icon: 'info',
  //     title: 'It Will Create the Awards',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       postRecognition(award_data)
  //         .then(res => {
  //           if (res) {
  //             Swal.fire({
  //               icon: 'success',
  //               title: 'Data Created Successfully',
  //             });
  //             setUpdate(update + 1);
  //             setisCreateModalVisible(!isCreateModalVisible);
  //           }
  //         })
  //         .catch(e => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Database Error Retry',
  //           });
  //         });
  //     }
  //   });
  // };
  const handleOk = (record, setRecord) => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Save The Student',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      console.log("insert data was",record);
      if (result.isConfirmed) {
        postRecognition(record)
          .then(res => {
            if (res) {
              setisCreateModalVisible(false);
              setUpdate(update + 1);
              // setLoad(false);
              setRecord({
                organization_id: null,
                level: null,
                sectionId:null,
                studentsId: null,
                title: null,
                description: null,
                Batch:null,
                badgeId: null,
                // section:null,
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
  const columns = [
    {
      title: 'SCHOOL',
      dataIndex: 'school',
      key: 'school',
    },
    {
      title: 'LEVEL',
      dataIndex: 'level',
      key: 'level',
    },
    {
      title: 'CLASS',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'STUDENT',
      dataIndex: 'student',
      key: 'student',
    },
    {
      title: 'TITLE',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'BADGE',
      dataIndex: 'Batch',
      key: 'Batch',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
          <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }}
           onClick={() => handleClickEdit(record)} 
           />
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }}
           onClick={() => {
             console.log("the id was",record.id);
            handleDelete(record.id);
          }}
           />
        </Space>
      ),
    },
  ];
  const handleInsti = value => {
    setselectedOrg(value);
    setselectedLevel(null);
    setData([]);
    setselectedClass(null);
  };
  const handleDelete = data3 => {
    let delete_data = {
      id: data3,
    };
    Swal.fire({
      icon: 'error',
      title: 'Are you sure You want to delete this',
      text: 'It will Be Permanetly Deleted!!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        console.log('delete data', delete_data);
        deleteRecognition(delete_data)
          .then(res => {
            setUpdate(update + 1);
            Swal.fire({
              icon: 'success',
              title: 'Successfully Deleted',
            });
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
  return (
    <div>
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCreate} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Create
          </Button>,
        ]}
        title="Awards & Recognition"
      />
      <Main>
        <AwardsModal
          tokendata={tokendata}
          isVisible={isCreateModalVisible}
          student={student}
          handleOk={handleOk}
          handleClas={handleClas}
          handleCancel={toggleCreate}
          clas={clas}
          handleStudent={handleStudent}
          handleLevel={handlelevel}
          handleType={handleType}
          handleTitle={handleTitle}
          handleinsti={handleinsti}
          selectedOrg={selectedOrg}
          badge={badge}
          // handledescription={handledescription}
        />
        <AwardsUpdateModal 
         isVisible={isVisible2}
        //  handleOk={handleOk2}
         handleCancel={toggleUpdate}
         handleTitle={handleTitle}
         record={id}
         setisVisible={setisVisible2}
        tokendata={tokendata}
        selectedOrg={selectedOrg}
        badge={badge}
        student={student}
        />
        <Row justify="end">
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6} style={{ margin: '1%' }}>
            <Select placeholder="Institute" onChange={handleInsti} style={{ width: '100%' }}>
              {org.map((e, key) => {
                return (
                  <Option key={key} value={e.organization_id}>
                    {e.instituteName}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6} style={{ margin: '1%' }}>
            <Select placeholder="Level" onChange={handleLevel} style={{ width: '100%' }}>
              {grade.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.id}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6} style={{ margin: '1%' }}>
            <Select placeholder="Class" onChange={handleclass} style={{ width: '100%' }}>
              {clas.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Cards headless>
              <CustomTable col={columns} data={data} />
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Awards;
