import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, DatePicker } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import moment from 'moment';
import { onChangeDate, onChangeSelect, onChangeInput } from '../../components/updateFunctions/functions/index';
const { Option } = Select;
function CreateSurveyModal({
  isVisible,
  handleOk,
  handleCancel,
  tokendata,
  org,
  record2,
}) {
  let [record, setRecord] = useState(record2);
  useEffect(() => {
    setRecord(record2);
  }, [record2]);
  let handleCancel2 =()=>{
    handleCancel()
  }
  return (
    <Modal destroyOnClose={true}
      title="UPDATE SURVEY"
      visible={isVisible}
      onOk={()=>handleOk(record)}
      onCancel={handleCancel2}
      okText="UPDATE"
      cancelText="Cancel"
      width="60%"
    >
      {' '}
      {record ? (
        <>
          {' '}
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            {tokendata == '1' ? (
              <Col style={{ width: '100%' }}>
                <label style={{ padding: 20 }}>Select Institute</label>
                <Select
                  defaultValue={record.organization_id}
                  key={record.organization_id[0]}
                  style={{ width: '100%' }}
                  placeholder="Institute"
                  optionFilterProp="children"
                  onChange={(value) => {
                    onChangeSelect(value, 'organization_id', setRecord, record);
                  }}
                  mode="multiple"
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
          </Row>
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <label style={{ padding: 20 }}>Select Date</label>
              <DatePicker
                key={record.entry_date}
                defaultValue={moment(record.entry_date, 'YYYY/MM/DD')}
                format="YYYY/MM/DD"
                size="middle"
                onChange={(date, dateString) => onChangeDate(date, dateString, 'entry_date', setRecord, record)}
                style={{ width: '100%' }}
              />
            </Col>
          </Row>
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <label style={{ padding: 20 }}>Select Type</label>
              <Select
                key={record.type}
                placeholder="Select Type"
                defaultValue={record.type}
                onChange={(value) => {
                  onChangeSelect(value, 'type', setRecord, record);
                }}
                style={{ width: '100%' }}
              >
                <Option key="0" value="Parent">
                  {' '}
                  Parent{' '}
                </Option>
                <Option key="1" value="Teacher">
                  {' '}
                  Teacher{' '}
                </Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <label style={{ padding: 20 }}>Input Survey Text</label>
              <Input
                key={record.title}
                onChange={(e) => {
                  onChangeInput(e, 'title', setRecord, record);
                }}
                defaultValue={record.title}
                placeholder="Survey Text"
              />
            </Col>
          </Row>
        </>
      ) : null}
    </Modal>
  );
}

export default CreateSurveyModal;
