import React, { useEffect, useState } from 'react';
import { Input, Select, TimePicker, DatePicker } from 'antd';
import moment from 'moment';
export default function modalSchedule(props) {
  let {
    tokendata,
    org,
    grade,
    clas,
    teacher,
    subject,
    handleDate,
    handleInsti,
    handleMid,
    handleLink,
    handleLevel,
    handleClass,
    handleSubject,
    handleDesc,
    handleTeach,
    handleFrom,
    handleTo,
    handlePass,
    record,
  } = props;
  const { Option } = Select;
let [record2,setRecord] =useState(record)
useEffect(()=>{
  if(record){
    setRecord(record)
  }
},[record,record2])
  return (
    <>
      <div>
        <label style={{ padding: 22 }}>Date</label> &nbsp;
        <DatePicker
          format="YYYY-MM-DD"
          defaultValue={record2 ? moment(record2.Date) : ''}
          size="middle"
          onChange={handleDate}
          style={{ width: '100%' }}
        />
      </div>{' '}
      <br />
      {tokendata == '1' ? (
        <>
          <div>
            <label style={{ padding: 10 }}>Institute</label> &nbsp;
            <Select
              defaultValue={record2 ? record2.organization_id : ''}
              size="small"
              onChange={handleInsti}
              style={{ width: '100%' }}
            >
              {org.map((e, key) => {
                return (
                  <Option key={key} value={e.organization_id}>
                    {e.instituteName}
                  </Option>
                );
              })}
            </Select>
          </div>
          <br />
        </>
      ) : (
        <> </>
      )}
      <div>
        <label style={{ padding: 20 }}>Level</label> &nbsp;
        <Select
          defaultValue={record2 ? record2.section : ''}
          onChange={handleLevel}
          size="small"
          style={{ width: '100%' }}
        >
          {grade.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.id}
              </Option>
            );
          })}
        </Select>
      </div>
      <br />
      <div>
        <label style={{ padding: 20 }}>Class</label> &nbsp;
        <Select
          mode="multiple"
          allowClear
          defaultValue={record2 ? record2.Level : ''}
          onChange={handleClass}
          style={{ width: '100%' }}
        >
          {clas.map((e, key) => {
            return (
              <Option key={key} value={e._id}>
                {e.name}
              </Option>
            );
          })}
        </Select>
      </div>
      <br />
      <div>
        <label style={{ padding: 12 }}>Subject</label> &nbsp;
        <Select
          defaultValue={record2 ? record2.Subject : ''}
          onChange={handleSubject}
          size="small"
          style={{ width: '100%' }}
        >
          {subject.map((e, key) => {
            return (
              <Option key={key} value={e._id}>
                {e.name}
              </Option>
            );
          })}
        </Select>
      </div>
      <br />
      <div>
        <label style={{ padding: 12 }}>Teacher</label> &nbsp;
        <Select
          defaultValue={record2 ? record2.Teacher : ''}
          onChange={handleTeach}
          size="small"
          style={{ width: '100%' }}
        >
          {teacher.map((e, key) => {
            return (
              <Option key={key} value={e._id}>
                {e.first_name + e.last_name}
              </Option>
            );
          })}
        </Select>
      </div>
      <br />
      <div>
        <label>Description</label> &nbsp;
        <Input style={{ width: '100%' }} defaultValue={record2 ? record2.Description : ''} onChange={handleDesc} />
      </div>
      <br />
      <div>
        <label style={{ padding: 3 }}>Time-From:</label>
        <TimePicker
          use24Hours
          defaultValue={record2 ? moment(record2.Time_From, 'HH:mm') : ''}
          format="HH:mm"
          style={{ width: '40%' }}
          onChange={handleFrom}
        />
        {/* <Input style={{ width: '30%' }}  /> */}
        <label style={{ padding: 5 }}>Time-To:</label>
        {/* <Input style={{ width: '30%' }}  /> */}
        <TimePicker
          use24Hours
          defaultValue={record2 ? moment(record2.Time_To, 'HH:mm') : ''}
          format="HH:mm"
          style={{ width: '40%' }}
          onChange={handleTo}
        />
      </div>
      <br />
      <div>
        <label style={{ padding: 24 }}>Link</label> &nbsp;
        <Input defaultValue={record2 ? record2.Link : ''} style={{ width: '100%' }} onChange={handleLink} />
      </div>
      <br />
      <div>
        <label style={{ padding: 5 }}>MeetingID</label> &nbsp;
        <Input defaultValue={record2 ? record2.Meeting_id : ''} style={{ width: '100%' }} onChange={handleMid} />
      </div>
      <br />
      <div>
        <label style={{ padding: 8 }}>Password</label> &nbsp;
        <Input defaultValue={record2 ? record2.Passcode : ''} style={{ width: '100%' }} onChange={handlePass} />
      </div>
    </>
  );
}
