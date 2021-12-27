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

function AllocationModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Allocation"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
    >
      <Row>
        <Col span={24}>
        <div>
            <label>Employee Name</label>
            <br />
            <Input placeholder="Enter the employee name" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div>
            <label>Department</label>
            <br />
            <Input placeholder="Enter the department" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div>
            <label>Type</label>
            <br />
            <Select placeholder="designation" style={{ width: '100%' }} >
              <Option value="1">Teacher</Option>
              <Option value="2">office Staff </Option>
            </Select>
          </div>
          <br />
          <div>
            <label>No. of Assets</label>
            <br />
            <InputNumber type='number' min={1} max={10} defaultValue={3}  style={{width:"100%"}} />
          </div>
          <br />
          <div >
            <label>Category</label>
            <br />
            <Select placeholder="category" style={{ width: '100%' }} >
              <Option value="1">Electronics</Option>
              <Option value="2">Gadget </Option>
            </Select>
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default AllocationModal;
