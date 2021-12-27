import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,InputNumber  } from 'antd';
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

function TransferModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="TRANSFER ASSETS"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Confirm"
      cancelText="Cancel"
      width={800}
    >
      <Row>
        <Col span={24}>
        <div>
            <label>Employee ID</label>
            <br />
            <Input placeholder="Enter ID" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div>
            <label>Department</label>
            <br />
            <Input placeholder="Enter the department" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div>
            <label>Designation</label>
            <br />
            <Input placeholder="Enter the designation" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div >
            <label>Joining Date</label>
            <br />
            <DatePicker placeholder="join date" style={{width:'100%'}} size="middle" />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default TransferModal;
