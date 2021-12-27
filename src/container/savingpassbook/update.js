import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Input, DatePicker } from 'antd';
import moment from 'moment';
import { onChangeDate, onChangeSelect, onChangeInput } from '../../components/updateFunctions/functions/index';
const { Option } = Select;

const Update = ({
  handleName,
  handleAmount,
  handleMark,
  handleType,
  isVisible,
  tokendata,
  handleDate,
  handleOk,
  handleInsti,
  handleLevel,
  handleCancel,
  grade,
  org,
  record2,
}) => {
  let [record, setRecord] = useState(null);
  useEffect(() => {
    setRecord(record2);
  }, [record2]);
  return (
    <Modal destroyOnClose={true}
      title="Update Contest"
      visible={isVisible}
      onCancel={() => {
        setRecord(null);
        handleCancel();
      }}
      footer={[
        <Button key="submit" onClick={() => handleOk(record, setRecord)} type="primary">
          UPDATE
        </Button>,
      ]}
      width={800}
    >
      {record ? (
        <>
          {tokendata === '1' ? (
            <>
              <div>
                <label style={{ padding: 10 }}>Institute</label> &nbsp;
                <Select
                  key={record.organization_id[0]}
                  defaultValue={record.organization_id}
                  mode="multiple"
                  onChange={value => {
                    onChangeSelect(value, 'organization_id', setRecord, record);
                  }}
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
            <label style={{ margin: 1 }}>Date</label> &nbsp;
            <br />
            <DatePicker
              key={record.organization_id[0] + 51}
              defaultValue={moment(record.entry_date)}
              format="DD/MM/YYYY"
              onChange={(date, dateString) => onChangeDate(date, dateString, 'entry_date', setRecord, record)}
              style={{ width: '100%' }}
            />
          </div>{' '}
          <br />
          <div>
            <label style={{ margin: 1 }}>Grade</label> &nbsp;
            <br />
            <Select
              key={record.organization_id[0] + 15}
              mode="multiple"
              defaultValue={record.grades_id}
              onChange={value => {
                onChangeSelect(value, 'grades_id', setRecord, record);
              }}
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
            <label style={{ margin: 1 }}>Contest-Type</label> &nbsp; <br />
            <Select
              key={record.organization_id[0] + 5}
              defaultValue={record.contest_type}
              onChange={value => {
                onChangeSelect(value, 'grades_id', setRecord, record);
              }}
              style={{ width: '100%' }}
            >
              <Option value={'automatic'}>automatic </Option>
              <Option value={'manual'}>manual</Option>
            </Select>
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}>Contest Name</label> &nbsp; <br />
            <Input
              key={record.contest_name}
              defaultValue={record.contest_name}
              onChange={e => {
                onChangeInput(e, 'contest_name', setRecord, record);
              }}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}>Amount</label> &nbsp; <br />
            <Input
              key={record.amount}
              defaultValue={record.amount}
              onChange={e => {
                onChangeInput(e, 'amount', setRecord, record);
              }}
              style={{ width: '100%' }}
            />
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}>Max Mark</label> &nbsp; <br />
            <Input
              key={record.max_mark}
              defaultValue={record.max_mark}
              onChange={e => {
                onChangeInput(e, 'max_mark', setRecord, record);
              }}
              style={{ width: '100%' }}
            />
          </div>
          <br />
        </>
      ) : null}
    </Modal>
  );
};

export default Update;
