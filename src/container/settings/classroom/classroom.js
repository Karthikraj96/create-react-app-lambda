import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Select, Space } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Button } from '../../../components/buttons/buttons';
import { Cards } from '../../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Main } from '../../styled';
import CustomTable from '../../fee/dashboard/Components/Table';
import {
  faPencil,
  faTrash,
  faChalkboardTeacher,
  faUserGraduate,
  faChairOffice,
} from '@fortawesome/pro-duotone-svg-icons';
import { Fragment } from 'react';
import ClassroomModal from './classroomModal';
import UpdateModal from './classroomUpdate';
import { decodedata, deleteSection, getSectionDetail, createSection, updateSection } from '../../../api/api';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const { Option } = Select;

const Classroom = () => {
  let [id, SetId] = useState(null);
  let [batch, setBatch] = useState([]);
  let [data5, setData5] = useState([]);
  let [tokendata, setTokendata] = useState(null);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [data, setData] = useState([]);
  let [teacher, setTeacher] = useState(null);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedOrg2, setselectedOrg2] = useState(decodedata.orgId);
  let [selectedLevel2, setselectedLevel2] = useState('LKG');
  let [selectedTeacher, setSelectedTeacher] = useState(null);
  let [name, setName] = useState(null);
  let [totalSectionStudent, setTotalSectionStudent] = useState(null);
  let [selectedLevel, setselectedLevel] = useState('LKG');
  let [totalStudent, setTotalStudent] = useState(0);
  let [totalAvailable, setTotalAvailable] = useState(0);
  let [update, setUpdate] = useState(0);
  let [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  let [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  let [record3, setRecord3] = useState(null);
  // let [record,setrecord] = useState(null)
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleCreate2 = () => {
    setisCreateModalVisible2(!isCreateModalVisible2);
  };

  useEffect(() => {
    let data2 = {
      orgId: selectedOrg2,
      grade_id: selectedLevel2,
    };
    getSectionDetail(data2)
      .then(res => {
        let da1 = res.data;
        let da2 = da1.map(e => {
          return { name: e.name, _id: e._id };
        });
        setData5(da2);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg2, selectedLevel2]);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let data2 = {
      orgId: selectedOrg,
      grade_id: selectedLevel,
    };
    getSectionDetail(data2)
      .then(res => {
        setData(res.data);
        let da = res.data;
        let count = 0;
        let total = 0;
        da.map(e => {
          total = total + e.totalStudent;
          count = count + (e.count ? e.count : 0);
        });
        setTotalStudent(count);
        setTotalAvailable(total);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedLevel, selectedOrg, update]);
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleInsti2 = value => {
    setselectedOrg2(value);
  };
  const handleLevel2 = value => {
    setselectedLevel2(value);
  };
  const handleTeacher = value => {
    setSelectedTeacher(value);
  };
  const handleName = e => {
    let n = e.target.value.toUpperCase();
    setName(n);
  };
  const handleTotalSectionStudent = e => {
    setTotalSectionStudent(e.target.value);
  };
  const handleLevel = value => {
    setselectedLevel(value);
  };
  let handleDelete = data => {
    let data2 = { _id: data._id };
    if (data.count) {
      Swal.fire({
        icon: 'error',
        title: 'Students Present',
        text: 'Students Are There So First Delete The Students To Delete The Class ',
      });
    } else {
      Swal.fire({
        icon: 'info',
        title: 'Are you sure You want to delete this',
        text: 'It will Be Permanetly Deleted!!',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result.isConfirmed) {
          deleteSection(data2)
            .then(res => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  title: 'Successfully Deleted The Class',
                });
                setUpdate(update + 1);
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
    }
  };
  const handleUpdate = value => {
    setRecord3(value);
    SetId(value._id);
    setisCreateModalVisible2(!isCreateModalVisible2);
    setselectedLevel2(value.grade_id);
    // setSelectedTeacher(value.teacher_id);
    setTotalSectionStudent(value.totalStudent);
    setselectedOrg2(value.organization_id);
    setName(value.name);
  };
  const handlePresent = value => {
    let da = data.map(e => {
      if (e._id === value._id) {
        return e.count ? e.count : 0;
      }
      return;
    });
    return da;
  };
  const handleVacancy = value => {
    let data3 = value.count ? value.totalStudent - value.count : value.totalStudent;
    if (data3 < 0) {
      return data3;
    } else if (data3 > 9) {
      return data3;
    } else {
      return '0' + data3;
    }
  };
  const handleOk = (batch, setB) => {
    let check = false;
    data5.map(e => {
      if (e.name == name) {
        check = true;
      }
    });
    if (check) {
      Swal.fire({
        icon: 'error',
        title: 'Name Already Exists',
        text: 'Please Change the Name to Proceed',
      });
    } else {
      let data33 = {
        grade_id: selectedLevel2,
        // teacher_id: selectedTeacher,
        batchGroup: batch,
        totalStudent: totalSectionStudent,
        orgId: selectedOrg2,
        name: name,
      };
      Swal.fire({
        icon: 'info',
        title: 'It Will Create the Class',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result.isConfirmed) {
          createSection(data33)
            .then(res => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  title: 'Data Created Successfully',
                });
                setB([]);
                setisCreateModalVisible(!isCreateModalVisible);
                setUpdate(update + 1);
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
    }
  };
  const handleOk2 = (batch, setB) => {
    let check2 = false;
    data5.map(e => {
      if (e.name == name) {
        if (e._id == id) {
          check2 = false;
        } else {
          check2 = true;
        }
      }
    });
    if (check2) {
      Swal.fire({
        icon: 'error',
        title: 'Name Already Exists',
        text: 'Please Change the Name to Proceed',
      });
    } else {
      let data33 = {
        id: id,
        grade_id: selectedLevel2,
        batchGroup: batch,
        totalStudent: totalSectionStudent,
        orgId: selectedOrg2,
        name: name,
      };
      Swal.fire({
        icon: 'info',
        title: 'It Will Update the Class',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result.isConfirmed) {
          updateSection(data33)
            .then(res => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  title: 'Data Updated Successfully',
                });
                setisCreateModalVisible2(!isCreateModalVisible2);
                setB();
                setUpdate(update + 1);
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
    }
  };
  const columns = [
    {
      title: 'Level',
      dataIndex: 'grade_id',
      key: 'level',
      width: '15%',
    },
    {
      title: 'Class',
      // dataIndex: 'name',
      render: (text, record) => {
        return (
          <>
            <p>
              <strong>{record.name}</strong>
            </p>
            {record.batchGroup ? (
              record.batchGroup.length > 0 ? (
                <span style={{ color: 'red' }}>
                 <strong>Batch : </strong> 
                  <strong>
                    {record.batchGroup.map(e => {
                      return <span>{' '+e.groupName+' '}</span>
                    })}
                  </strong>
                </span>
              ) : null
            ) : null}
          </>
        );
      },
      key: 'class',
      width: '15%',
    },
    {
      title: 'Total Student',
      dataIndex: 'totalStudent',
      key: 'student',
      width: '15%',
    },
    {
      title: 'Total Present',
      key: 'count',
      width: '15%',
      render: (text, record) => handlePresent(record),
    },
    {
      title: 'Vacancy',
      key: 'vacancy',
      width: '10%',
      render: (text, record) => handleVacancy(record),
    },
   
    {
      title: 'Action',
      key: 'action',
      width: '15%',
      // width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => {
              handleUpdate(record);
              if (record.batchGroup) {
                setBatch(record.batchGroup);
              }
            }}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(record)}
            style={{ fontSize: 15, color: 'red ' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <ClassroomModal
        isVisible={isCreateModalVisible}
        tokendata={tokendata}
        handleOk={handleOk}
        handleCancel={toggleCreate}
        org={org}
        grade={grade}
        handleTotalSectionStudent={handleTotalSectionStudent}
        handleName={handleName}
        handleLevel2={handleLevel2}
        handleInsti2={handleInsti2}
        handleTeacher={handleTeacher}
        teacher={teacher}
      />
      <UpdateModal
        isVisible={isCreateModalVisible2}
        tokendata={tokendata}
        handleOk={handleOk2}
        handleCancel={toggleCreate2}
        org={org}
        grade={grade}
        handleTotalSectionStudent={handleTotalSectionStudent}
        handleName={handleName}
        handleLevel2={handleLevel2}
        handleInsti2={handleInsti2}
        handleTeacher={handleTeacher}
        teacher={teacher}
        record={record3}
        batch={batch}
        setBatch={setBatch}
      />

      <PageHeader
        ghost
        buttons={[
          <Button size="small" type="primary" onClick={toggleCreate}>
            <FeatherIcon icon="plus" size={15} />
            Create Class
          </Button>,
        ]}
        title="Classroom"
      />
      <Main>
        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} justify="end">
          {/* <Col xxl={6} lg={6} md={6} sm={24} xs={24}> */}
          {tokendata == '1' ? (
            <Col className="gutter-row" span={6} xxl={6} lg={6} md={6} sm={24} xs={24}>
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Institute"
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
          ) : (
            ''
          )}
          <Col className="gutter-row" span={6} xxl={6} lg={6} md={6} sm={24} xs={24}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder={selectedLevel}
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
        </Row>
        <br />
        {/* <Row  gutter={[16, 16]}> */}
        <Row justify="space-around">
          <Col span={6}>
            {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}> */}
            <Card
              title="Classroom"
              bordered={false}
              extra={<FontAwesomeIcon icon={faChalkboardTeacher} style={{ fontSize: 20, color: 'Dodgerblue ' }} />}
            >
              {data.length ? data.length : 0}
            </Card>
          </Col>
          <Col span={6}>
            {/* <Col xs={{ span: 11, offset: 1 }} lg={{ span: 6, offset: 2 }}> */}
            <Card
              title="Student"
              bordered={false}
              extra={<FontAwesomeIcon icon={faUserGraduate} style={{ fontSize: 20, color: 'Dodgerblue ' }} />}
            >
              {totalStudent}
            </Card>
          </Col>
          <Col span={6}>
            {/* <Col xs={{ span: 5, offset: 1 }} lg={{ span: 6, offset: 2 }}> */}
            <Card
              title="Vacancy"
              bordered={false}
              extra={<FontAwesomeIcon icon={faChairOffice} style={{ fontSize: 20, color: 'Dodgerblue ' }} />}
            >
              {totalAvailable - totalStudent}
            </Card>
          </Col>
        </Row>
        <br />

        {/* <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
          <Col className="gutter-row" span={24} style={{ margin: 10 }}>
            <div style={{ textAlign: 'end' }}>
              <Button size="small" type="primary" onClick={toggleCreate}>
                <FeatherIcon icon="plus" size={15} />
                Create Class
              </Button>
            </div>
          </Col>
        </Row> */}

        <Row style={{ marginTop: 10 }} gutter={25}>
          <Cards headless>
            <CustomTable col={columns} pagination={false} data={data} />
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
};

export default Classroom;
