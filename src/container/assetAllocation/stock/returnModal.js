import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,InputNumber,Switch   } from 'antd';
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

function SwitchonChange(checked) {
    console.log(`switch to ${checked}`);
  }

function ReturnModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="RETURN/DLINK"
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
            <label>Employee Name</label>
            <br />
            <Input placeholder="Enter Name" style={{width:'100%'}} size="middle" />
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
            <label>Did you receive the product in good condition?</label>
            <br />
            <Switch defaultChecked onChange={SwitchonChange} />
          </div><br />
          <div>
            <label>Remarks</label>
            <br />
            <TextArea placeholder="remarks" style={{width:'100%'}} />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default ReturnModal;
