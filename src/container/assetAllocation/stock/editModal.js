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

function AssetModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Update Stock"
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
            <label>Institute</label>
            <br />
            <Select placeholder="Institute" style={{ width: '100%' }} mode="multiple" >
              <Option value="1">Development</Option>
              <Option value="2">Android </Option>
            </Select>
          </div>
          <br />
          <div>
            <label>Category</label>
            <br />
            <Select placeholder="Category" style={{ width: '100%' }} >
              <Option value="1">Electronics</Option>
              <Option value="2">Non-Electronics </Option>
            </Select>
          </div>
          <br />
          <div>
            <label>Type</label>
            <br />
            <Select placeholder="Type" style={{ width: '100%' }} >
              <Option value="1">Computer</Option>
              <Option value="2">Desktop </Option>
            </Select>
          </div>
          <br />
          <div>
            <label>ID</label>
            <br />
            <Input placeholder="Enter ID" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div >
            <label>Company</label>
            <br />
            <Input placeholder="Enter company" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div>
            <label>Model No</label>
            <br />
            <Input placeholder="Model" style={{width:'100%'}} />
          </div>
          <br />
          <div>
            <label>Year of Manufacture</label>
            <br />
            <Input placeholder="manufacture" style={{width:'100%'}} />
          </div>
          <div>
            <label>Remarks</label>
            <br />
            <TextArea placeholder="description" style={{width:'100%'}} />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default AssetModal;
