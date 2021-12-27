import React, { useEffect, useState } from 'react';
import { getTeacher, getClass, getSubject, postSchedule, getSchedule, deleteSchedule, decodedata } from '../../api/api';
import { Modal, Select, Spin } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Tabs } from 'antd';
import { useSelector } from 'react-redux';
import { CheckOutlined } from '@ant-design/icons';
import CompletedSchedule from './completedSchedule';
import UpcomingSchedule from './upcomingSchedule';
import ScheduleModal from './scheduleModal';
import Swal from 'sweetalert2';
import moment from 'moment';
const { TabPane } = Tabs;
const { Option } = Select;

const ClassShedule = () => {
  let [state, setState] = useState({
    loading: false,
    visible: false,
    visible2: false,
  });
  let [schedlue, setSchedule] = useState([]);
  let [schedlue2, setSchedule2] = useState([]);
  let [created_at, setCreated_at] = useState('');
  let [id, setId] = useState('');
  let [record2, setRecord] = useState(null);
  let [teacher, setTeacher] = useState([]);
  let [subject, setSubject] = useState([]);
  let [clas, setClas] = useState([]);
  let [selectedDate, setselectedDate] = useState('');
  let [selectedOrg, setselectedOrg] = useState(1);
  let [selectedOrg2, setselectedOrg2] = useState(1);
  let [tokendata, setTokendata] = useState(null);
  let [selectedLevel2, setselectedLevel2] = useState('LKG');
  let [selectedClass, setselectedClass] = useState('LKG');
  let [selectedSubject, setselectedSubject] = useState(' ');
  let [selectedDesc, setselectedDesc] = useState(' ');
  let [selectedTeach, setselectedTeach] = useState(' ');
  let [timeFrom, settimeFrom] = useState('');
  let [timeTo, settimeTo] = useState('');
  let [selectedLink, setselectedLink] = useState(' ');
  let [selectedPass, setselectedPass] = useState(' ');
  let [selectedMid, setselectedMid] = useState(' ');
  let [update, setUpdate] = useState(0);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);

  useEffect(() => {
    setTokendata(decodedata.role_id);
    getSchedule(selectedOrg)
      .then(response => {
        let dat = response.data;
        let dat1 = [];
        let dat2 = [];
        if (dat) {
          let datte = moment(Date.now()).format('YYYY/MM/DD');
          dat.map(e => {
            if (e) {
              let dateeee = moment(e.Date).format('YYYY/MM/DD');
              if (moment(dateeee).isSameOrAfter(datte)) {
                dat1.push(e);
              } else {
                dat2.push(e);
              }
            }
          });
        }
        setSchedule(dat1);
        setSchedule2(dat2);
        setState({ loading: true });
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg, update]);
  useEffect(() => {
    let data2 = {
      id: selectedOrg,
      level: selectedLevel2,
    };
    getClass(data2)
      .then(response => {
        setClas(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    if (tokendata == '1') {
      let type;
      org.filter(item => {
        if (item.organization_id == selectedOrg) {
          type = item.instituteType;
        }
      });
      let data = {
        type: type,
        level: selectedLevel2,
      };
      getSubject(data)
        .then(response => {
          setSubject(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    } else {
      let data = {
        type: decodedata.schoolType,
        level: selectedLevel2,
      };
      getSubject(data)
        .then(response => {
          setSubject(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    getTeacher(selectedOrg)
      .then(response => {
        setTeacher(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedLevel2, selectedOrg]);
  let deleteSch = data => {
    let _id = { _id: data };
    Swal.fire({
      icon: 'info',
      title: 'Are you sure You want to delete this',
      text: 'It will Be Permanetly Deleted!!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        deleteSchedule(_id)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
              Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted The Schedule',
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
  const showModal = () => {
    setState({
      visible: true,
    });
  };
  let updateSch = data => {
    let { create, id ,props} = data;
    setCreated_at(create);
    setId(id);
    setState({
      visible2: true,
    });
    setRecord(props)
    setselectedOrg2(props.organization_id)
    setselectedLevel2(props.Level)
    setselectedClass(props.Class)
    setselectedSubject(props.SubjectId)
    setselectedDate(props.Date)
    setselectedDesc(props.Description)
    setselectedTeach(props.TeacherId)
    setCreated_at(props.created_at)
    settimeFrom(props.Time_From)
    settimeTo(props.Time_To)
    setselectedLink(props.Link)
    setselectedMid(props.Meeting_id)
    setselectedPass(props.Passcode)
  };
  const handleOk = () => {
    let data = {
      Date: selectedDate,
      Level: selectedLevel2,
      Class: selectedClass,
      Subject: selectedSubject,
      organization_id: selectedOrg2,
      Description: selectedDesc,
      Teacher: selectedTeach,
      Time_From: timeFrom,
      Time_To: timeTo,
      Link: selectedLink,
      Meeting_id: selectedMid,
      Passcode: selectedPass,
    };
    Swal.fire({
      icon: 'info',
      title: 'It Will Create the Schedule',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        postSchedule(data)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
              Swal.fire({
                icon: 'success',
                title: 'Data Created Successfully',
              });
              setState({ visible: false });
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
  const handleOk2 = () => {
    let data = {
      Date: selectedDate,
      Level: selectedLevel2,
      Class: selectedClass,
      Subject: selectedSubject,
      organization_id: selectedOrg2,
      Description: selectedDesc,
      Teacher: selectedTeach,
      Time_From: timeFrom,
      Time_To: timeTo,
      Link: selectedLink,
      Meeting_id: selectedMid,
      Passcode: selectedPass,
      created_at: created_at,
      updated_at: Date.now(),
      id: id,
    };
    Swal.fire({
      icon: 'info',
      title: 'It Will Update The Schedule',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        postSchedule(data)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
              setselectedOrg2(null)
              setselectedLevel2(null)
              setselectedClass(null)
              setselectedSubject(null)
              setselectedDate(null)
              setselectedDesc(null)
              setselectedTeach(null)
              setCreated_at(null)
              settimeFrom(null)
              settimeTo(null)
              setselectedLink(null)
              setselectedMid(null)
              setselectedPass(null)
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
              setState({ visible: false });
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
    setState({ visible: false });
    setUpdate(update + 1);
    setRecord(null)
  };
  const handleCancel2 = () => {
    setState({ visible: false });
    setUpdate(update + 1);
    setRecord(null)
  };
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleInsti2 = value => {
    setselectedOrg2(value);
  };
  const handleDate = (date, dateString) => {
    setselectedDate(dateString);
  };

  const handleLevel2 = value => {
    setselectedLevel2(value);
  };
  const handleClass = value => {
    setselectedClass(value);
  };
  const handleSubject = value => {
    setselectedSubject(value);
  };
  const handleDesc = e => {
    setselectedDesc(e.target.value);
  };
  const handleTeach = value => {
    setselectedTeach(value);
  };
  const handleFrom = (time, timeString) => {
    settimeFrom(timeString);
  };
  const handleTo = (time, timeString) => {
    settimeTo(timeString);
  };
  const handlePass = e => {
    setselectedPass(e.target.value);
  };
  const handleMid = e => {
    setselectedMid(e.target.value);
  };
  const handleLink = e => {
    setselectedLink(e.target.value);
  };
  const { visible, visible2, loading } = state;

  return (
    <div>
      <PageHeader
        ghost
        title="Live Class"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary" onClick={showModal}>
              Shedule
            </Button>
          </div>,
        ]}
      />
      {tokendata == '1' ? (
        <div>
          <b>
            <label style={{ padding: 10, margin: 10, fontWeight: 600, fontSize: '20px', lineHeight: '32px' }}>
              {' '}
              Select Institute to View Schedule
            </label>
          </b>{' '}
          &nbsp;
          <Select size="small" defaultValue={selectedOrg} onChange={handleInsti} style={{ width: 280 }}>
            {org.map((e, key) => {
              return (
                <Option key={key} value={e.organization_id}>
                  {e.instituteName}
                </Option>
              );
            })}
          </Select>
        </div>
      ) : (
        <> </>
      )}
      <div className="site-card-border-less-wrapper">
        <Tabs defaultActiveKey="1">
          <TabPane tab={<span>Upcoming</span>} key="1">
            {state.loading ? (
              schedlue.length > 0 ? (
                schedlue.map(item => {
                  let datte = moment(Date.now()).format('YYYY/MM/DD');
                  let newdate = moment(item.Date).format('YYYY/MM/DD');
                  if (moment(newdate).isSameOrAfter(datte)) {
                    return <UpcomingSchedule item={item} deleteSch={deleteSch} updateSch={updateSch} />;
                  }
                })
              ) : (
                <p> No Schedule Found </p>
              )
            ) : (
              <Spin></Spin>
            )}
          </TabPane>
          <TabPane
            tab={
              <span>
                <CheckOutlined />
                Completed
              </span>
            }
            key="2"
          >
            {state.loading ? (
              schedlue2.length > 0 ? (
                schedlue2.map(item => {
                  let datte = moment(Date.now()).format('YYYY/MM/DD');
                  let newdate = moment(item.Date).format('YYYY/MM/DD');
                  if (moment(newdate).isBefore(datte)) {
                    return <CompletedSchedule item={item} deleteSch={deleteSch} updateSch={updateSch} />;
                  }
                })
              ) : (
                <p> No Schedule Found </p>
              )
            ) : (
              <Spin></Spin>
            )}
          </TabPane>
        </Tabs>
      </div>
      <Modal
        destroyOnClose={true}
        visible={visible}
        title="Create Shedule"
        centered
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk}>
            Shedule
          </Button>,
        ]}
        width={'60%'}
      >
        <ScheduleModal
          tokendata={tokendata}
          org={org}
          grade={grade}
          clas={clas}
          teacher={teacher}
          subject={subject}
          handleDate={handleDate}
          handleInsti={handleInsti2}
          handleLevel={handleLevel2}
          handleClass={handleClass}
          handleSubject={handleSubject}
          handleDesc={handleDesc}
          handleTeach={handleTeach}
          handleFrom={handleFrom}
          handleTo={handleTo}
          handlePass={handlePass}
          handleMid={handleMid}
          handleLink={handleLink}
          record={record2}
        />
      </Modal>
      <Modal
        destroyOnClose={true}
        visible={visible2}
        title="Update Shedule"
        centered
        onCancel={handleCancel2}
        footer={[
          <Button key="back" onClick={handleCancel2}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk2}>
            Update Shedule
          </Button>,
        ]}
        width={'60%'}
      >
        <ScheduleModal
          tokendata={tokendata}
          org={org}
          grade={grade}
          clas={clas}
          teacher={teacher}
          subject={subject}
          handleDate={handleDate}
          handleInsti={handleInsti2}
          handleLevel={handleLevel2}
          handleClass={handleClass}
          handleSubject={handleSubject}
          handleDesc={handleDesc}
          handleTeach={handleTeach}
          handleFrom={handleFrom}
          handleTo={handleTo}
          handlePass={handlePass}
          handleMid={handleMid}
          handleLink={handleLink}
          record={record2}
        />
      </Modal>
    </div>
  );
};

export default ClassShedule;
