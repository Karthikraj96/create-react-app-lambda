import React, { useEffect, useState } from 'react';
import { Row, Spin, Alert, Col } from 'antd';
import {
  getFullAttendence,
  getAttendenceTotal,
  decodedata,
  getStudents,
  getStudentsTotal,
  getSectionAttendence,
  getAttendenceId,
  postAttendence,
  editAttendence,
  deleteAttendance,
} from '../../api/api';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import moment from 'moment';
import { Fragment } from 'react';
import { Space, Drawer } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faEye } from '@fortawesome/pro-duotone-svg-icons';
import NewAttendence from './newAttendenceModal';
import { Select } from 'antd';
import './style.css';
import { Progress } from 'antd';
import { DatePicker } from 'antd';
import { useSelector } from 'react-redux';
const { Option } = Select;
import Swal from 'sweetalert2';

let Student = () => {
  const attcolumns = [
    {
      title: 'Roll No',
      dataIndex: 'roll_number',
      key: 'rollno',
    },
    {
      title: 'Student Name',
      dataIndex: 'first_name',
      key: 'studentname',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Select
          placeholder="Select Status"
          onChange={value => handleSelect(record, value)}
          defaultValue="1"
          style={{ width: '100%' }}
        >
          <Option value="1">Present</Option>
          <Option value="2">Absent</Option>
          <Option value="3">Late</Option>
          <Option value="4">OD</Option>
        </Select>
      ),
    },
  ];
  const attcolumns2 = [
    {
      title: 'Roll No',
      dataIndex: 'roll_number',
      key: 'rollno',
    },
    {
      title: 'Student Name',
      dataIndex: 'first_name',
      key: 'studentname',
    },
    {
      title: 'Attendence',
      key: 'attendence',
      render: (text, record) => {
        return (
          <>
            {' '}
            {data4.map(e => {
              if (e.section_id === record.section_id) {
                if (e.roll_number == record.roll_number) {
                  if (e.is_absent == 0 && e.is_late == 0 && e.is_OD == 0) {
                    return <>Present</>;
                  } else if (e.is_late == 1) {
                    return <>Late</>;
                  } else if (e.is_OD) {
                    return <>OD</>;
                  } else {
                    return <>Absent</>;
                  }
                } else {
                  return;
                }
              } else {
                return;
              }
            })}
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Select
          placeholder="Select Status"
          onChange={value => handleSelect2(record, value)}
          defaultValue="1"
          style={{ width: '100%' }}
        >
          <Option value="1">Present</Option>
          <Option value="2">Absent</Option>
          <Option value="3">Late</Option>
          <Option value="4">OD</Option>
        </Select>
      ),
    },
  ];

  let org = useSelector(store => store.getOrgReducer);
  let [state, setState] = useState({ a: 0, b: 0, c: 0 });
  let [data, setData] = useState([]);
  let [load, setLoad] = useState(true);
  let [data2, setData2] = useState([]);
  let [data3, setData3] = useState([]);
  let [data4, setData4] = useState([]);
  let [data5, setData5] = useState([]);
  let [update, setUpdate] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  const [showSideDraw, setshowSideDraw] = useState(false);
  const [showSideDraw2, setshowSideDraw2] = useState(false);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  let [totalStudents, setTotalstudents] = useState(0);
  const columns = [
    {
      title: 'Class',
      dataIndex: 'grade',
      key: 'class',
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Teacher',
      render: (text, record) => {
        if (record.creator) {
          if (record.creator.length > 0) {
            return record.creator;
          } else {
            return <p><strong>Admin</strong></p>;
          }
        } else {
          return <p><strong>Admin</strong></p>;
        }
      },
      key: 'teacher',
    },
    {
      title: 'Present',
      key: 'present',
      dataIndex: 'Present',
      // render: (text, record) => {
      //   if (record.attendance) {
      //   }
      // return (
      // <>
      //   {data.map(e => {
      //     if (e.section_id === record.section_id) {
      //       if (e.attendance) {
      //         if (e.attendance.Present) {
      //           return e.attendance.Present;
      //         } else {
      //           return 0;
      //         }
      //       } else {
      //         return 0;
      //       }
      //     } else {
      //       return;
      //     }
      //   })}
      // </>
      // );
      // },
    },
    {
      title: 'Late',
      key: 'late',
      dataIndex: 'Late',
      // render: (text, record) => {
      //   return (
      //     <>
      //       {' '}
      //       {data.map(e => {
      //         if (e.section_id === record.section_id) {
      //           if (e.attendance) {
      //             if (e.attendance.Late) {
      //               return e.attendance.Late;
      //             } else {
      //               return 0;
      //             }
      //           } else {
      //             return 0;
      //           }
      //         } else {
      //           return;
      //         }
      //       })}
      //     </>
      //   );
      // },
    },
    {
      title: 'OD',
      key: 'od',
      dataIndex: 'Od',
      // render: (text, record) => {
      //   return (
      //     <>
      //       {' '}
      //       {data.map(e => {
      //         if (e.section_id === record.section_id) {
      //           if (e.attendance) {
      //             if (e.attendance.Od) {
      //               return e.attendance.Od;
      //             } else {
      //               return 0;
      //             }
      //           } else {
      //             return 0;
      //           }
      //         } else {
      //           return;
      //         }
      //       })}
      //     </>
      //   );
      // },
    },
    {
      title: 'Absent',
      key: 'absent',
      dataIndex: 'Absent',
      // render: (text, record) => {
      //   return (
      //     <>
      //       {' '}
      //       {data.map(e => {
      //         if (e.section_id === record.section_id) {
      //           if (e.attendance) {
      //             if (e.attendance.Absent) {
      //               return e.attendance.Absent;
      //             } else {
      //               return 0;
      //             }
      //           } else {
      //             return 0;
      //           }
      //         } else {
      //           return;
      //         }
      //       })}
      //     </>
      //   );
      // },
    },
    {
      title: 'Percentage',
      // dataIndex: 'doc',
      key: 'doc',
      render: (text, record) => {
        if (record.Percentage != 0) {
          return (
            <Progress
              strokeColor={{
                '0%': 'rgb(55 144 78)',
                '100%': 'rgb(200 239 184)',
              }}
              percent={record.Percentage}
              status="active"
            />
          );
        } else {
          return;
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',

      render: (text, record) => (
        <Space size="middle">
          {record.attendance != null ? (
            <FontAwesomeIcon
              onClick={() => {
                console.log('record', record);
                handleclick2(record.section_id);
              }}
              icon={faEye}
              style={{ fontSize: 15, color: 'blue' }}
            />
          ) : (
            <FontAwesomeIcon
              onClick={() => {
                console.log('record', record);
                handleclick(record.section_id);
              }}
              icon={faPencil}
              style={{ fontSize: 15, color: 'green ' }}
            />
          )}
        </Space>
      ),
    },
  ];

  let handleSelect = (record, value) => {
    let key = record.key;
    let array = data2;
    console.log('array', array[key]);
    switch (value) {
      case '1':
        array[key].is_absent = 0;
        array[key].is_late = 0;
        array[key].is_OD = 0;
        setData3(array);
        break;
      case '2':
        array[key].is_absent = 1;
        array[key].is_late = 0;
        array[key].is_OD = 0;
        setData3(array);
        break;
      case '3':
        array[key].is_absent = 0;
        array[key].is_late = 1;
        array[key].is_OD = 0;
        setData3(array);
        break;
      case '4':
        array[key].is_absent = 0;
        array[key].is_late = 0;
        array[key].is_OD = 1;
        setData3(array);
        break;
    }
  };
  let handleSelect2 = (record, value) => {
    let key = record.key;
    let array = data4;
    switch (value) {
      case '1':
        array[key].is_absent = 0;
        array[key].is_late = 0;
        array[key].is_OD = 0;
        setData3(array);
        break;
      case '2':
        array[key].is_absent = 1;
        array[key].is_late = 0;
        array[key].is_OD = 0;
        setData3(array);
        break;
      case '3':
        array[key].is_absent = 0;
        array[key].is_late = 1;
        array[key].is_OD = 0;
        setData3(array);
        break;
      case '4':
        array[key].is_absent = 0;
        array[key].is_late = 0;
        array[key].is_OD = 1;
        setData3(array);
        break;
    }
  };
  const handleclick = data2 => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Create The Attendece for Today',
      text: 'You Cannot Cancel This Without Entering Attendence',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        let data = {
          section_id: data2,
          orgId: selectedOrg,
          entry_date: date,
        };
        let attid;
        getAttendenceId(data).then(res => {
          attid = res.data.id;
          getStudents(data)
            .then(res => {
              let stud = res.data;
              let stud2;
              stud2 = stud.map((l, i) => {
                return (l = {
                  id: l.student_id + attid,
                  first_name: l.first_name,
                  roll_number: l.roll_number,
                  section_id: l.section_id,
                  student_id: l.student_id,
                  is_absent: 0,
                  is_OD: 0,
                  is_late: 0,
                  attendance_id: attid,
                  key: i,
                });
              });
              setData2(stud2);
              setData3(stud2);
              setshowSideDraw(true);
            })
            .catch(e => {
              console.log(e);
            });
        });
      }
    });
  };
  const handleclick2 = data2 => {
    let data = {
      section_id: data2,
      entry_date: date,
    };
    getSectionAttendence(data)
      .then(res => {
        let stud = res.data;
        let stud2;
        stud2 = stud.map((e, i) => {
          return (e = { ...e, key: i });
        });
        setData4(stud2);
        setData5(stud2);
        setshowSideDraw2(true);
      })
      .catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'First Enter the Attendence to View Attendence',
          text: 'Enter the Attendence to View Attendence !!',
        });
        console.log(e);
      });
  };
  const handleOk = () => {
    setisVisible(false);
  };
  const handleCancel = () => {
    setisVisible(false);
  };
  const onClose = val => {
    Swal.fire({
      icon: 'error',
      title: 'It Will Delete The Attendence ',
      confirmButtonText: 'Do You Wish To Proceed',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        setshowSideDraw2(false);
        deleteAttendance({ id: val })
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: 'Attendence Deleted',
            });
            setshowSideDraw(false);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };
  const onClose2 = () => {
    setshowSideDraw2(false);
  };
  const handleDate = (date, dateString) => {
    setState({ a: 0, b: 0, c: 0 });
    setDate(dateString);
    setLoad(true);
  };
  useEffect(() => {
    let dat = {
      entry_date: date,
      orgId: selectedOrg,
    };
    getFullAttendence(dat)
      .then(response => {
        setData(response.data);
        setLoad(false);
      })
      .catch(e => {
        console.log(e);
      });
    getStudentsTotal(dat)
      .then(res => {
        setTotalstudents(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    getAttendenceTotal(dat)
      .then(res => {
        let { Total, Late, Absent, Present } = res.data[0];
        setState({
          a: parseInt((Present / totalStudents) * 100),
          b: parseInt((Late / Total) * 100),
          c: parseInt((Absent / Total) * 100),
        });
      })
      .catch(e => {
        console.log(e);
      });
  }, [date, update, selectedOrg]);
  useEffect(() => {}, [data, update, state]);
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleSubmit = () => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure ',
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel',
      showCancelButton: true,
    }).then(result => {
      if (result.isConfirmed) {
        postAttendence(data3)
          .then(res => {
            setData([]);
            setLoad(true);
            setUpdate(update + 1);
            Swal.fire({
              title: 'Data Inserted Successfully',
            });
            setshowSideDraw(false);
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Not for Editing',
              text: 'For Editing Select Eye Button On Main Menu !!',
            });
            setshowSideDraw(false);
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Retry Some Database Error',
          text: 'Something went wrong!',
        });
      }
    });
  };
  const handleSubmit2 = () => {
    Swal.fire({
      icon: 'info',
      title: 'All The Attendence Will be Updated',
      showCancelButton: true,
      confirmButtonText: 'Update',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        editAttendence(data5)
          .then(res => {
            setData([]);
            setLoad(true);
            setUpdate(update + 1);
            Swal.fire({
              icon: 'success',
              title: 'Data Updated Successfully',
            });
            setshowSideDraw2(false);
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Retry Some Database Error',
              text: 'Something went wrong!!!',
            });
          });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Retry Some Database Error',
          text: 'Something went wrong!',
        });
      }
    });
  };
  return (
    <Fragment>
      <NewAttendence isVisible={isVisible} handleOk={handleOk} handleCancel={handleCancel} />
      <Drawer
        title="Mark Attendece For Students"
        width={640}
        placement="right"
        destroyOnClose={true}
        closable={false}
        onClose={() => onClose(data2[0].attendance_id)}
        visible={showSideDraw}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={() => onClose(data2[0].attendance_id)} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <CustomTable col={attcolumns} pagination={false} data={data2} />
      </Drawer>
      <Drawer
        destroyOnClose={true}
        title="Attendece OF Students"
        width={640}
        placement="right"
        onClose={onClose2}
        visible={showSideDraw2}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose2} style={{ marginRight: 8 }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit2} type="primary">
              Submit
            </Button>
          </div>
        }
      >
        <CustomTable col={attcolumns2} pagination={false} data={data4} />
      </Drawer>

      <PageHeader ghost title="Attendence Information" />
      <Main>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards headless>
              <Row justify="end">
                <Col xxl={7} lg={7} md={7} sm={24} xs={24}>
                  <Select
                    showSearch
                    style={{ width: '100%', marginRight: '2%' }}
                    size="middle"
                    value={selectedOrg}
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
                <Col xxl={7} lg={7} md={7} sm={24} xs={24}>
                  {/* Date */}
                  <DatePicker
                    style={{ width: '100%', marginLeft: '2%' }}
                    size="small"
                    onChange={handleDate}
                    defaultValue={moment()}
                    format="YYYY-MM-DD"
                  />
                </Col>
              </Row>
              <br />
              {load ? (
                <div> </div>
              ) : (
                <>
                  <Row gutter={25}>
                    <Col xxl={8} lg={8} md={8} sm={24} xs={24}>
                      Present{' '}
                      <Progress
                        strokeColor={{
                          '0%': 'rgb(55 144 78)',
                          '100%': 'rgb(200 239 184)',
                        }}
                        percent={state.a}
                        status="active"
                      />
                    </Col>
                    <Col xxl={8} lg={8} md={8} sm={24} xs={24}>
                      Late{' '}
                      <Progress
                        strokeColor={{
                          '0%': '#a32be2',
                          '100%': '#bd95d2',
                        }}
                        percent={state.b}
                        status="active"
                      />
                    </Col>{' '}
                    <Col xxl={8} lg={8} md={8} sm={24} xs={24}>
                      Absent{' '}
                      <Progress
                        strokeColor={{
                          '0%': '#ff1d1d',
                          '100%': '#f38d8d',
                        }}
                        percent={state.c}
                        status="active"
                      />
                    </Col>{' '}
                  </Row>
                </>
              )}
            </Cards>
          </Col>
        </Row>
        {load ? (
          <Spin
            tip="Loading..."
            size="large"
            style={{ display: 'inline-block', verticalAlign: 'middle', marginTop: '20%' }}
          >
            <Alert style={{ display: 'inline-block', verticalAlign: 'middle' }} type="info" />
          </Spin>
        ) : (
          <>
            <Row gutter={25}>
              <Cards headless>
                <CustomTable pagination={false} col={columns} data={data} />
              </Cards>
            </Row>
          </>
        )}
      </Main>
    </Fragment>
  );
};

export default Student;
