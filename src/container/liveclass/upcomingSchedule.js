import { Row, Col, Card, Space,Button } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faClock } from '@fortawesome/pro-duotone-svg-icons';
import moment from 'moment';
import React from 'react';
function upcomingSchedule(props) {
  let {
    Level,
    section,
    Subject,
    Description,
    Teacher,
    Time_From,
    Time_To,
    Link,
    Meeting_id,
    Passcode,
    _id,
    id,
    created_at,
  } = props.item;
  let data2 = '';
  let date2 = moment(props.item.Date).format('YYYY/MM/DD');
  let date = moment(props.item.Date).format('DD/MM/YYYY');
  let newdate = moment(Date.now()).format('YYYY/MM/DD');
  try {
    for (i = 0; i < section.length; i++) {
      data2 = data2 + ',' + section[i];
    }
  } catch (e) {
    data2 = ',' + section;
  }

  return (
    <div style={{ marginBottom: '25px' }}>
      <div style={{ padding: 10, fontSize: 20 }}>
        <Row>
          <Col span={24}>{moment(newdate).isSame(date2) ? <span>Today</span> : date}</Col>
        </Row>
      </div>
      <Card bordered={false} style={{}}>
        <Row>
          <Col span={12}>
            {/* <p style={{ fontSize: 20 }}>
              {Subject} by {Teacher}
            </p>
            <p>{Description}</p>
            <p>
              {Level} - {data2.substring(1)}
            </p>
            <p>
              {Time_From}-{Time_To}
            </p> */}
            <p style={{ fontSize: 20 }}>
              {Subject} by {Teacher}
            </p>
            <p>
              <span>
                {' '}
                <FontAwesomeIcon icon={faClock} style={{ fontSize: 15, color: '#c3272b ' }} />
              </span>{' '}
              &nbsp;<span style={{ color: '#c3272b' }}>Date:&nbsp; {date}</span>
            </p>

            <p>
              {Level} - {data2.substring(1)}
            </p>
            <p>
              <span style={{ color: '#c3272b' }}>Time:</span> &nbsp;{Time_From}-{Time_To}
            </p>
            <p>
              <span style={{ color: '#c3272b' }}>Description:</span>&nbsp;{Description}
            </p>
            {/* <p>{Link}</p> */}
          </Col>
          <Col span={10} push={9}>
            <Space size="middle">
              <FontAwesomeIcon
                icon={faPencil}
                onClick={event => {
                  props.updateSch({ id: id, create: created_at, props: props.item });
                }}
                style={{ fontSize: 20, color: 'green ' }}
              />
              <Button size="small" type="primary" onClick={()=> window.location.href=Link}>
                Start
              </Button>
              <FontAwesomeIcon
                icon={faTrash}
                onClick={event => {
                  props.deleteSch(_id);
                }}
                style={{ fontSize: 20, color: 'red ' }}
              />
            </Space>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <strong>MeetingId:</strong>&nbsp;{Meeting_id}
          </Col>
          {/* <Col span={12}>Link:{Link}</Col> */}
          <Col span={12}>
            <strong>Password:</strong>&nbsp;{Passcode}
          </Col>
        </Row>
      </Card>
    </div>
  );
}
export default upcomingSchedule;
