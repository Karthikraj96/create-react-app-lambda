import React from 'react';
import { Modal, Row, Col, DatePicker } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
function CreateSurveyModal({
  isVisible,
  handleOk,
  handleCancel,
  handleTitle,
  tokendata,
  handleType2,
  handleInsti2,
  org,
  handleDate
}) {
  return (
    <Modal destroyOnClose={true}
      title="Create Survey"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width='60%'
    >
      <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
        {tokendata == '1' ? (
          <Col style={{ width: '100%' }}>
            <label style={{ padding: 20 }}>Select Institute</label>
            <Select
              style={{ width: '100%' }}
              placeholder="Institute"
              optionFilterProp="children"
              onChange={handleInsti2}
              mode='multiple'
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
      <Row style={{ justifyContent: 'flex-end', marginBottom: '20px'}}>
        <Col style={{ width: '100%' }}>
        <label style={{ padding: 20 }}>Select Date</label>
        <DatePicker format="DD-MM-YYYY" size="middle" onChange={handleDate}  style={{ width: '100%' }} />
        </Col>
      </Row>
      <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
        <Col style={{ width: '100%' }}>
          <label style={{ padding: 20 }}>Select Type</label>
          <Select  placeholder="Select Type" onChange={handleType2} style={{ width: '100%' }}>
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
          <Input onChange={handleTitle} placeholder="Survey Text" />
        </Col>
      </Row>
    </Modal>
  );
}

export default CreateSurveyModal;
