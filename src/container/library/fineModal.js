import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

function FineModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Pay Fine"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Pay"
      cancelText="Cancel"
      width={400}
    >
      <Row>
        <Col span={24}>
          <div>
            <label>Fine Amount</label>
            <br />
            <Input placeholder="Enter the fine" style={{width:'100%'}} size="middle" />
          </div>
          <br />
        </Col>
      </Row>
    </Modal>
  );
}

export default FineModal;
