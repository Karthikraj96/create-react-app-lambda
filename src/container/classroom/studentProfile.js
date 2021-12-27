import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Row, Col, Avatar, Collapse, Spin, Alert } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserOutlined } from '@ant-design/icons';
import { Main } from '../styled';
import CustomTable from '../fee/dashboard/Components/Table';
import { getFullProfile, editStudentDetail, editGuardianDetail } from '../../api/api';
import moment from 'moment';
import { faPencil } from '@fortawesome/pro-duotone-svg-icons';
import { ChartjsStackedChart, ChartjsPieChart } from './Charts/chartjs';
import './style.css';
import StudentEditModal from './studentEditModal';
import ParentEditModal from './student_ParentEditModal';
import AddressEditModal from './student_AddressEditModal';
import Swal from 'sweetalert2';
const { Panel } = Collapse;
function TabChange(key) {
  console.log(key);
}

const StudentProfile = () => {
  const location = useLocation();
  const [extracurriculardata, setExtra] = useState([]);
  const [disciplinedata, setConst] = useState([]);
  let [update, setUpdate] = useState(0);
  let [load, setLoad] = useState(false);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isParentModalVisible, setisParentModalVisible] = useState(false);
  const [isAddressModalVisible, setisAddressModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [Attendancevisible, setAttendancevisible] = useState(false);
  const [disciplinevisible, setDisciplinevisible] = useState(false);
  const [extraCurricularvisible, setExtraCurricularvisible] = useState(false);
  let [fullData, setFullData] = useState([]);
  let [parentData, setParent] = useState([]);
  let [studentData, setStudent] = useState([]);
  let [attData, setAttData] = useState([]);
  useEffect(() => {
    getFullProfile(location.state.id)
      .then(res => {
        setFullData(res.data);
        setParent(res.data.guardian);
        setConst(res.data.student[0].discipline);
        setExtra(res.data.student[0].extra);
        setAttData(res.data.attendance[0]);
        let data = res.data.student[0]
        delete data.guardian
        delete data.subject
        delete data.discipline
        delete data.extra
        setStudent(data);
        data = null
        setLoad(true);
      })
      .catch(e => {
        console.log(e);
      });
  }, [update]);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleParent = () => {
    setisParentModalVisible(!isParentModalVisible);
  };
  const toggleAddress = () => {
    setisAddressModalVisible(!isAddressModalVisible);
  };
  let handleOk = () => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update The Student',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        editStudentDetail(studentData)
          .then(res => {
            if (res) {
              setisCreateModalVisible(!isCreateModalVisible);
              setUpdate(update + 1);
              setLoad(false)
              setStudent([])
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
  }
  let handleOk2 = (val) => {
    Swal.fire({
      icon: 'info',
      title: val,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        editGuardianDetail(parentData)
          .then(res => {
            if (res) {
              setisParentModalVisible(false);
              setisAddressModalVisible(false);
              setUpdate(update + 1);
              setLoad(false)
              setParent([])
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
  }

  const extracurricularcolumns = [
    {
      title: 'date',
      render: (text, record) => {
        if (record.entry_date) {
          return moment(record.entry_date).format('MM/DD/YYYY')
        }
      },
      key: 'date',
    },
    {
      title: 'Student Name',
      render: (text, record) => load ? fullData.student[0].first_name : '',
      key: 'roll',
    },
    {
      title: 'Competition',
      dataIndex: 'competition',
      key: 'name',
    },
    {
      title: 'Competition Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ];
  const disciplinecolumns = [
    {
      title: 'date',
      render: (text, record) => {
        if (record.entry_date) {
          return moment(record.entry_date).format('MM/DD/YYYY')
        }
      },
      key: 'date',
    },
    {
      title: 'Roll Number',
      render: (text, record) => { return fullData.student[0].roll_number },
      key: 'roll',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Issues',
      render: (text, record) => {
        if (record.generalissue && record.educationissue) {
          return (<><span> Education Issue {record.educationissue}</span><br /> <span> General Issue {record.generalissue}</span></>)
        }
        else if (record.educationissue) {
          return (<span> General Issue {record.educationissue}</span>)
        }
        else if (record.generalissue) {
          return (<span> Education Issue {record.educationissue}</span>)
        }
        else {
          return (<span> No Issues Mentioned </span>)
        }

      },
      key: 'grade',
    },
    {
      title: 'Status',
      // is_read
      render: (text, record) => {
        if (record.is_read == 1) {
          return <p>Readed</p>
        }
        else {
          return <p>Not Readed</p>
        }
      },
      key: 'Status',
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
  ];
  // const [Reportcardvisible, setReportcardvisible] = useState(false);
  const profile = () => {
    setVisible(true);
    setAttendancevisible(false);
    setDisciplinevisible(false);
    setExtraCurricularvisible(false);
  };
  const Attendance = () => {
    setAttendancevisible(true);
    setVisible(false);
    setDisciplinevisible(false);
    setExtraCurricularvisible(false);
  };
  const disciplin = () => {
    setAttendancevisible(false);
    setVisible(false);
    setDisciplinevisible(true);
    setExtraCurricularvisible(false);
  };
  const extracurricular = () => {
    setAttendancevisible(false);
    setVisible(false);
    setDisciplinevisible(false);
    setExtraCurricularvisible(true);
  };
  // const reportcard = () => {
  //   setAttendancevisible(false);
  //   setVisible(false);
  //   setDisciplinevisible(false);
  //   setExtraCurricularvisible(false);
  //   setReportcardvisible(true);
  // };
  return (
    <div>
      <PageHeader
        ghost
        buttons={
          [
            // <Button size="small" type="primary">
            //   <FeatherIcon icon="plus" size={15} />
            //   Allocate
            // </Button>,
          ]
        }
        title="Student Profile"
      />

      <Main>
        {load === false ? (
          <Spin
            tip="Loading..."
            size="large"
            style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '5%' }}
          >
            <Alert style={{ display: 'inline-block', verticalAlign: 'middle' }} type="info" />
          </Spin>
        ) : (
          <>
            <StudentEditModal isVisible={isCreateModalVisible} record={studentData} setrecord={setStudent} handleOk={handleOk} handleCancel={toggleCreate} />
            <ParentEditModal isVisible={isParentModalVisible} handleOk={handleOk2} record={parentData} setrecord={setParent} handleCancel={toggleParent} />
            <AddressEditModal isVisible={isAddressModalVisible} handleOk={handleOk2} record={parentData} setrecord={setParent} handleCancel={toggleAddress} />
            <Row justify="center">
              <Col span={6} style={{ textAlign: 'center' }}>
                <Avatar size={80} icon={<UserOutlined />} />
                <p>
                  {fullData.student[0].first_name +
                    ' ' +
                    (fullData.student[0].last_name ? fullData.student[0].last_name : '')}
                </p>
              </Col>
            </Row>

            <Cards headless>
              <Row justify="space-between" style={{ padding: '1%' }}>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Roll Number</span> <br />
                    <span style={{ fontWeight: 'lighter' }}>{fullData.student[0].roll_number}</span>
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Name</span> <br />
                    <span style={{ fontWeight: 'lighter' }}>
                      {fullData.student[0].first_name +
                        ' ' +
                        (fullData.student[0].last_name ? fullData.student[0].last_name : '')}
                    </span>
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Parent Name</span> <br />
                    <span style={{ fontWeight: 'lighter' }}>
                      {fullData.guardian.first_name +
                        ' ' +
                        (fullData.guardian.last_name ? fullData.guardian.last_name : '')}
                    </span>
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Emergency Contact</span>
                    <br />
                    <span style={{ fontWeight: 'lighter' }}>
                      {fullData.guardian.mobile_number ? fullData.guardian.mobile_number : ''}
                    </span>
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <span style={{ fontWeight: 'bold' }}>Status</span> <br />
                    <span style={{ fontWeight: 'lighter' }}>{location.state.val}</span>
                  </div>
                </Col>
              </Row>
            </Cards>

            <Cards headless>
              <Row justify="space-between" style={{ padding: '1%' }}>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <Button size="small" type="primary" block onClick={profile}>
                      <FeatherIcon icon="user" size={15} />
                      Profile Information
                    </Button>
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <Button size="small" type="primary" block onClick={Attendance}>
                      {/* <FeatherIcon icon="plus" size={15} /> */}
                      Attendance
                    </Button>
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <Button size="small" type="primary" block onClick={disciplin}>
                      {/* <FeatherIcon icon="plus" size={15} /> */}
                      Discipline
                    </Button>
                  </div>
                </Col>
                <Col span={4} style={{ textAlign: 'center' }}>
                  <div>
                    <Button size="small" type="primary" block onClick={extracurricular}>
                      {/* <FeatherIcon icon="plus" size={15} /> */}
                      Extra Curricular
                    </Button>
                  </div>
                </Col>
                {/* <Col span={4} style={{ textAlign: 'center' }}>
              <div>
                <Button size="small" type="primary" block onClick={reportcard}>
                  <FeatherIcon icon="clipboard" size={15} />
                  Report Card
                </Button>
              </div>
            </Col> */}
              </Row>
            </Cards>

            {visible ? (
              <Row gutter={24}>
                <Col span={24}>
                  <Collapse defaultActiveKey={['1']} onChange={TabChange}>
                    <Panel
                      header="Student Details"
                      key="1"
                      extra={
                        <FontAwesomeIcon
                          icon={faPencil}
                          style={{ fontSize: 15, color: 'green ' }}
                          onClick={event => {
                            event.stopPropagation();
                            toggleCreate();
                          }}
                        />
                      }
                      style={{ marginBottom: '5px' }}
                    >
                      <Cards headless>
                        <Row>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Roll Number</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.student[0].roll_number}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}> First Name</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.student[0].first_name}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Last Name</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.student[0].last_name ? fullData.student[0].last_name : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Gender</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.student[0].gender}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Date_Of_Birth</p>
                          </Col>
                          <Col span={6}>
                            <p>
                              {fullData.student[0].date_of_birth
                                ? moment(fullData.student[0].date_of_birth).format('MM/DD/YYYY')
                                : ''}
                            </p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Mobile No</p>
                          </Col>
                          <Col span={6}>
                            <p>
                              {fullData.student[0].mob_no
                                ? fullData.student[0].mob_no
                                : fullData.guardian.mobile_number
                                  ? fullData.guardian.mobile_number
                                  : ''}
                            </p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Admission Number</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.student[0].admission_number ? fullData.student[0].admission_number : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Admission Date</p>
                          </Col>
                          <Col span={6}>
                            <p>
                              {fullData.student[0].admission_date
                                ? moment(fullData.student[0].admission_date).format('MM/DD/YYYY')
                                : ''}
                            </p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Blood Group</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.student[0].blood_group ? fullData.student[0].blood_group : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Mother Tongue</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.student[0].mother_tongue ? fullData.student[0].mother_tongue : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Image</p>
                          </Col>
                          <Col span={6}>
                            <p></p>
                          </Col>
                        </Row>
                      </Cards>
                    </Panel>
                    <Panel
                      header="Parent Details"
                      key="2"
                      extra={
                        <FontAwesomeIcon
                          icon={faPencil}
                          style={{ fontSize: 15, color: 'green ' }}
                          onClick={event => {
                            event.stopPropagation();
                            toggleParent();
                          }}
                        />
                      }
                      style={{ marginBottom: '5px' }}
                    >
                      <Cards headless>
                        <Row>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}> Guardian 1 First Name</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.first_name ? fullData.guardian.first_name : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}> Guardian 1 Last Name</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.last_name ? fullData.guardian.last_name : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}> Guardian 1 Gender</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.gender ? fullData.guardian.gender : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 1 Occupation</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.occupation ? fullData.guardian.occupation : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 1 Annual Income</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.annual_income ? fullData.guardian.annual_income : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}> Guardian 1 Qualification</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.annual_income ? fullData.guardian.annual_income : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 1 Landline_no</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.landline_number ? fullData.guardian.landline_number : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 1 Mobile No</p>
                          </Col>
                          <Col span={6}>
                            <p>
                              {fullData.guardian.educational_qualification
                                ? fullData.guardian.educational_qualification
                                : '---'}
                            </p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 1 Relationship</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.relationship ? fullData.guardian.relationship : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 1 Email</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.email ? fullData.guardian.email : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 First Name</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.mother_first_name ? fullData.guardian.mother_first_name : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 Last Name</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.mother_last_name ? fullData.guardian.mother_last_name : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}> Guardian 2 Gender</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.m_gender ? fullData.guardian.m_gender : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 Occupation</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.mother_occupation ? fullData.guardian.mother_occupation : ''}</p>
                          </Col>
                          {/* mother_annual_income */}
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 Annual Income</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.mother_annual_income ? fullData.guardian.mother_annual_income : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 Qualification</p>
                          </Col>
                          <Col span={6}>
                            <p>
                              {fullData.guardian.mother_educational_qualification
                                ? fullData.guardian.mother_educational_qualification
                                : ''}
                            </p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 Relationship</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.srelationship ? fullData.guardian.srelationship : '---'}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 Email</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.mother_email ? fullData.guardian.mother_email : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 Landline_no</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.mother_landline_no ? fullData.guardian.mother_landline_no : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Guardian 2 Mobile Number</p>
                          </Col>
                          <Col span={6}>
                            <p>
                              {fullData.guardian.mother_mobile_number ? fullData.guardian.mother_mobile_number : ''}
                            </p>
                          </Col>
                        </Row>
                      </Cards>
                    </Panel>
                    <Panel
                      header="Address Details"
                      key="3"
                      extra={
                        <FontAwesomeIcon
                          icon={faPencil}
                          style={{ fontSize: 15, color: 'green ' }}
                          onClick={event => {
                            event.stopPropagation();
                            toggleAddress();
                          }}
                        />
                      }
                    >
                      <Cards headless>
                        <Row>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Building details</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.building_no ? fullData.guardian.building_no : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Street name</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.address ? fullData.guardian.address : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Area</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.locality ? fullData.guardian.locality : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Landmark</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.landmark ? fullData.guardian.landmark : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>City</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.city ? fullData.guardian.city : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Pincode</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.pincode ? fullData.guardian.pincode : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>State</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.state ? fullData.guardian.state : ''}</p>
                          </Col>
                          <Col span={6}>
                            <p style={{ fontWeight: 'bold' }}>Country</p>
                          </Col>
                          <Col span={6}>
                            <p>{fullData.guardian.country ? fullData.guardian.country : ''}</p>
                          </Col>
                        </Row>
                      </Cards>
                    </Panel>
                  </Collapse>
                </Col>
              </Row>
            ) : null}

            {Attendancevisible ? (
              <Row gutter={25}>
                <Col xxl={12} md={12} sm={24} xs={24}>
                  <Cards title="Attendance">
                    <ChartjsStackedChart
                      labels={['Present', 'Late', 'Absent']}
                      datasets={[
                        {
                          data: [attData.Present, attData.Late, attData.Absent],
                          backgroundColor: ['#560bd0', '#007bff', '#00cccc'],
                        },
                      ]}
                    />
                  </Cards>
                </Col>
                <Col md={12} sm={24} xs={24}>
                  <Cards title="Attendance">
                    <ChartjsPieChart
                      labels={['Present', 'Late', 'Absent']}
                      datasets={[
                        {
                          data: [attData.Present, attData.Late, attData.Absent],
                          backgroundColor: ['#560bd0', '#007bff', '#00cccc'],
                        },
                      ]}
                    />
                  </Cards>
                </Col>
              </Row>
            ) : null}

            {disciplinevisible ? (
              <Row gutter={24}>
                <Col span={24}>
                  <Cards headless>
                    <CustomTable col={disciplinecolumns} data={disciplinedata} />
                  </Cards>
                </Col>
              </Row>
            ) : null}

            {extraCurricularvisible ? (
              <Row gutter={24}>
                <Col span={24}>
                  <Cards headless>
                    <CustomTable col={extracurricularcolumns} data={extracurriculardata} />
                  </Cards>
                </Col>
              </Row>
            ) : null}
          </>
        )}
      </Main>
    </div>
  );
};
export default StudentProfile;
