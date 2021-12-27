import { Row, Col, Card, Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faTrash,faClock } from '@fortawesome/pro-duotone-svg-icons';
import React from 'react';
import moment from 'moment';
function completedSchedule(props) {
  let { Level, section, Subject, Description, Teacher, Time_From, Time_To, Link, Meeting_id, Passcode, _id } = props.item;
  let date = moment(props.item.Date).format('DD/MM/YYYY');
  let yesterday = moment().subtract(1,'day').format('DD/MM/YYYY');
  let data2 = '';
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
          <Col span={24}>{moment(yesterday).isSame(date) ? <span>Yesterday</span> : date}</Col>
        </Row>
      </div>
      <Card bordered={false} style={{}}>
        <Row>
          <Col span={12}>
            <p style={{ fontSize: 20 }}>
              {Subject} by {Teacher}
            </p>
            <p>
            <span> <FontAwesomeIcon
              icon={faClock}
              style={{ fontSize: 15, color: '#c3272b ' }}
            /></span> &nbsp;<span style={{color:'#c3272b'}}>Date:&nbsp; {date}</span>
            </p>
           
           
            <p>
              {Level} - {data2.substring(1)}
            </p>
            <p>
             <span style={{color:'#c3272b'}}>Time:</span> &nbsp;{Time_From}-{Time_To}
            </p>
            <p><span style={{color:'#c3272b'}}>Description:</span>&nbsp;{Description}</p>
           
          </Col>
          <Col span={10} push={9}>
            <Space size="middle">
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
              <Col span={12}><strong>MeetingId:</strong>&nbsp;{Meeting_id}</Col>
              {/* <Col span={12}>Link:{Link}</Col> */}
              <Col span={12}><strong>Password:</strong>&nbsp;{Passcode}</Col>
            </Row>
      </Card>
    </div>
  );
}
export default completedSchedule;
