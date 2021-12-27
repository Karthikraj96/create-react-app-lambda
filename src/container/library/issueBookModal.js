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

function IssueBookModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Issue Book"
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
            <Select placeholder="Institute" style={{ width: '100%' }}  >
              <Option value="1">Development</Option>
              <Option value="2">Android </Option>
            </Select>
          </div>
          <br />
          <div>
            <label>ISBN</label>
            <br />
            <Input placeholder="Enter the ISBN" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div>
            <label>Book Name</label>
            <br />
            <Input placeholder="Enter the Book Name" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div >
            <label>Genre</label>
            <br />
            <Select placeholder="Genre" style={{ width: '100%' }}>
              <Option value="1">Development</Option>
            </Select>
          </div>
          <br />
          <div>
            <label>Author Name</label>
            <br />
            <Input placeholder="Percentage" style={{width:'100%'}} />
          </div>
          <br />
          <div >
            <label>Level</label>
            <br />
            <Select placeholder="Level" style={{ width: '100%' }}>
              <Option value="1">Development</Option>
            </Select>
          </div>
          <br />
          <div >
            <label>Class</label>
            <br />
            <Select placeholder="Class" style={{ width: '100%' }}>
              <Option value="1">Development</Option>
            </Select>
          </div>
          <br />
          <div >
            <label>Studet Name</label>
            <br />
            <Select placeholder="Student Name" style={{ width: '100%' }}>
              <Option value="1">Development</Option>
            </Select>
          </div>
          <br />
          <div>
            <label>Issue Date</label>
            <br />
            <DatePicker format="DD-MM-YYYY"  style={{ width: '100%' }} />
          </div>
          <br />
          <div>
            <label>Validity</label>
            <br />
            <DatePicker format="DD-MM-YYYY"  style={{ width: '100%' }} placeholder="7 days" />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default IssueBookModal;
