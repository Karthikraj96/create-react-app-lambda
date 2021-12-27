import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { Select } from 'antd';
import moment from 'moment';
import { useSelector } from 'react-redux';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import CustomPopover from './newEventModal';
import { Row, Col } from 'antd';
import { Fragment } from 'react';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { PageHeader } from '../../components/page-headers/page-headers';
import './calendercss.css';
import Swal from 'sweetalert2';
import { decodedata, getAllEvent, deleteEvent, addEvent } from '../../api/api';
const { Option } = Select;
const localizer = momentLocalizer(moment);
const ColoredDateCellWrapper = ({ children }) => {
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: 'lightblue',
    },
  });
};
let CustomCalender = ({}) => {
  let [tokendata, setTokendata] = useState(null);
  const [allBatches, setallBatches] = useState(null);
  let [update, setUpdate] = useState(0);
  const [visible, setVisible] = useState(false);
  const [eventList, seteventList] = useState([]);
  let [id, setId] = useState(null);
  const [isEventEditMode, setisEventEditMode] = useState(false);
  let calenderEvents = [];
  let [secinsti, setSecinsti] = useState(null);
  let [seclevel, setSeclevel] = useState(null);
  let [secdate, setSecdate] = useState(null);
  let [secdate2, setSecdate2] = useState(null);
  let [sectitle, setSectitle] = useState(null);
  let [secnote, setSecnote] = useState(null);
  let [color, setColor] = useState(null);
  let [selectedOrg, setselectedOrg] = useState(null);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [record, setRecord] = useState(null);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    setSecinsti(decodedata.orgId);
    let dat = {
      orgId: selectedOrg,
      grade_id: selectedLevel,
    };
    getAllEvent(dat)
      .then(res => {
        setallBatches(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [update, selectedLevel, selectedOrg]);
  useEffect(() => {
    if (allBatches) {
      allBatches.map(batch => {
        if (batch.end !== null && batch.start !== null) {
          let filteredDates = [];
          let yr = '';
          let mnth = '';
          let dte = '';
          let endyr = '';
          let endmnth = '';
          let enddte = '';
          if (batch.batch_day ? batch.batch_day.length > 0 : false) {
            batch.batch_day.map(days => {
              filteredDates.push(filterDateByDays(batch.start_date, batch.end_date, days));
            });
            if (filteredDates.length > 0) {
              filteredDates.map(outer => {
                outer.map(inner => {
                  yr = moment(inner)
                    .format('YYYY,MM,DD')
                    .split(',')[0];
                  mnth = moment(inner)
                    .format('YYYY,MM,DD')
                    .split(',')[1];
                  dte = moment(inner)
                    .format('YYYY,MM,DD')
                    .split(',')[2];
                  endyr = moment(inner)
                    .format('YYYY,MM,DD')
                    .split(',')[0];
                  endmnth = moment(inner)
                    .format('YYYY,MM,DD')
                    .split(',')[1];
                  enddte = moment(inner)
                    .format('YYYY,MM,DD')
                    .split(',')[2];
                  let stHr = moment(batch.start)
                    .format('h:mm:ss')
                    .split(':')[0];
                  let stMin = moment(batch.start)
                    .format('h:mm:ss')
                    .split(':')[1];
                  let stSec = moment(batch.start)
                    .format('h:mm:ss')
                    .split(':')[2];
                  let endHr = moment(batch.end)
                    .format('h:mm:ss')
                    .split(':')[0];
                  let endMin = moment(batch.end)
                    .format('h:mm:ss')
                    .split(':')[1];
                  let endSec = moment(batch.end)
                    .format('h:mm:ss')
                    .split(':')[2];
                  let tmp = {};
                  tmp.id = batch.id;
                  tmp.title = batch.title;
                  tmp.start = new Date(yr, mnth - 1, dte, stHr, stMin, stSec);
                  tmp.end = new Date(endyr, endmnth - 1, enddte, endHr, endMin, endSec);
                  tmp.description = batch.description;
                  calenderEvents.push(tmp);
                });
              });
            }
          } else {
            yr = moment(batch.start)
              .format('YYYY,MM,DD')
              .split(',')[0];
            mnth = moment(batch.start)
              .format('YYYY,MM,DD')
              .split(',')[1];
            dte = moment(batch.start)
              .format('YYYY,MM,DD')
              .split(',')[2];
            endyr = moment(batch.end)
              .format('YYYY,MM,DD')
              .split(',')[0];
            endmnth = moment(batch.end)
              .format('YYYY,MM,DD')
              .split(',')[1];
            enddte = moment(batch.end)
              .format('YYYY,MM,DD')
              .split(',')[2];
            let stHr = moment(batch.start)
              .format('h:mm:ss')
              .split(':')[0];
            let stMin = moment(batch.start)
              .format('h:mm:ss')
              .split(':')[1];
            let stSec = moment(batch.start)
              .format('h:mm:ss')
              .split(':')[2];
            let endHr = moment(batch.end)
              .format('h:mm:ss')
              .split(':')[0];
            let endMin = moment(batch.end)
              .format('h:mm:ss')
              .split(':')[1];
            let endSec = moment(batch.end)
              .format('h:mm:ss')
              .split(':')[2];
            let tmp = {};
            tmp.id = batch.id;
            tmp.title = batch.title;
            tmp.start = new Date(yr, mnth - 1, dte, stHr, stMin, stSec);
            tmp.end = new Date(endyr, endmnth - 1, enddte, endHr, endMin, endSec);
            tmp.description = batch.description;
            tmp.color = batch.color;
            tmp.batch = batch;
            calenderEvents.push(tmp);
          }
        }
      });
      seteventList(calenderEvents);
    }
  }, [update,allBatches]);
  const filterDateByDays = (startRange, endRange, day) => {
    var start = moment(startRange),
      end = moment(endRange),
      day = day;
    var result = [];
    var current = start.clone();
    while (current.day(day).isSameOrBefore(end)) {
      result.push(current.clone());
      current.day(7 + day);
    }
    return result;
  };
  const handleOk = () => {
    if (sectitle && secnote && seclevel && secinsti && secdate && secdate2 && color) {
      let data = {
        title: sectitle,
        description: secnote,
        grade_id: seclevel,
        organization_id: secinsti,
        start: secdate,
        end: secdate2,
        color: color,
      };
      Swal.fire({
        icon: 'info',
        title: 'It Will Create the Event',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          addEvent(data)
            .then(res => {
              if (res) {
                setUpdate(update + 1);
                Swal.fire({
                  icon: 'success',
                  title: 'Data Created Successfully',
                });
                setVisible(false);
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
      Swal.fire({
        icon: 'error',
        title: 'Please Fill All The Required Fields',
      });
    }
  };
  const handleOk2 = (data14, setrec) => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update the Event',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        addEvent(data14)
          .then(res => {
            if (res) {
              setrec(null);
              setUpdate(update + 1);
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
              setVisible(false);
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
  const handleDelete = () => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure You want to delete this',
      text: 'It will Be Permanetly Deleted!!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        deleteEvent(id)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
              Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted The Schedule',
              });
              setVisible(false);
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
  const handleCancel = setrec => {
    setVisible(false);
    setrec(null);
  };

  const handleshowPopup = () => {
    setVisible(true);
  };
  const handleEventSelect = event => {
    setId(event.id);
    setRecord(event.batch);
    setisEventEditMode(true);
    setVisible(true);
  };
  const handleDate = (date, dateString) => {
    setSecdate(date);
  };
  const handleDate2 = (date, dateString) => {
    setSecdate2(date);
  };
  const handleInsti2 = value => {
    setSecinsti(value);
  };
  const handleColor = value => {
    setColor(value);
  };
  const handlenote = e => {
    setSecnote(e.target.value);
  };
  const handleTitle = e => {
    setSectitle(e.target.value);
  };
  const handleLevel = value => {
    setSeclevel(value);
  };
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleGrade = value => {
    setselectedLevel(value);
  };

  return (
    <Fragment>
      <PageHeader ghost title="Calendar" />
      <CustomPopover
        tokendata={tokendata}
        Modaltitle={isEventEditMode ? 'Edit Event' : 'Create New Event'}
        handleOk={handleOk}
        handleCancel={handleCancel}
        isEventEditMode={isEventEditMode}
        setisEventEditMode={setisEventEditMode}
        visible={visible}
        setVisible={setVisible}
        handleLevel={handleLevel}
        handleTitle={handleTitle}
        handlenote={handlenote}
        handleInsti2={handleInsti2}
        handleDate={handleDate}
        handleDate2={handleDate2}
        handleOk2={handleOk2}
        handleDelete={handleDelete}
        handleColor={handleColor}
        record2={record}
        setRecord2={setRecord}
      />
      <Main>
        <Row gutter={25} style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
          {tokendata == '1' ? (
            <Col style={{ margin: '40' }}>
              <Select
                showSearch
                style={{ width: '200px', margin: '10' }}
                placeholder="Everwin Vidhyashram"
                optionFilterProp="children"
                onChange={handleInsti}
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
          <Col style={{ margin: '40' }}>
            <Select
              showSearch
              style={{ width: '200px', margin: '10' }}
              placeholder="LKG"
              optionFilterProp="children"
              onChange={handleGrade}
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
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards headless>
              <div style={{ height: '700px' }}>
                <Calendar
                  selectable
                  onSelectEvent={event => {
                    handleEventSelect(event);
                  }}
                  onSelectSlot={slotInfo => {
                    handleshowPopup();
                  }}
                  //   onSelectSlot={(slotInfo) => {
                  //     setVisible(true);
                  //   }}
                  events={eventList}
                  eventPropGetter={(event, start, end, isSelected) => {
                    let newStyle = {
                      backgroundColor: 'lightgrey',
                      color: 'black',
                      borderRadius: '0px',
                      border: 'none',
                    };

                    if (event.color) {
                      newStyle.backgroundColor = event.color;
                    }

                    return {
                      className: '',
                      style: newStyle,
                    };
                  }}
                  step={30}
                  views={['month', 'week', 'day', 'agenda']}
                  defaultView="month"
                  showMultiDayTimes
                  // max={dates.add(dates.endOf(new Date(2015, 17, 1), "day"), -1, "hours")}
                  defaultDate={new Date()}
                  components={{
                    event: Event,
                    timeSlotWrapper: ColoredDateCellWrapper,
                  }}
                  localizer={localizer}
                />
              </div>
            </Cards>
          </Col>
        </Row>
      </Main>
    </Fragment>
  );
};
function Event({ event }) {
  return (
    <span>
      <strong>{event.title}</strong>
      {event.desc && ':  ' + event.desc}
    </span>
  );
}
export default CustomCalender;
