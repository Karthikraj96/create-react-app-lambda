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

function BookModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Add Book"
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
          <div>
            <label>Publication</label>
            <br />
            <Input placeholder="Percentage" style={{width:'100%'}} />
          </div>
          <br />
          <div>
            <label>Date of Purchase</label>
            <br />
            <DatePicker format="DD-MM-YYYY"  style={{ width: '100%' }} />
          </div>
          <br />
          <div >
            <label>Rack Location</label>
            <br />
            <Select placeholder="rack" style={{ width: '100%' }}>
              <Option value="1">A</Option>
            </Select>
          </div>
          <br />
          <div>
            <label>Qty</label>
            <br />
            <Input placeholder="Percentage" style={{width:'100%'}} />
            {/* <InputNumber min={1} max={10} defaultValue={7} style={{width:'100%'}} /> */}
          </div>
          <br />
          <div>
            <label>Cost</label>
            <br />
            <InputNumber type='number' min={1} max={10} defaultValue={7} style={{width:'100%'}} />
          </div>
          <br />
          <div>
            <label>Description</label>
            <br />
            <TextArea placeholder="description" style={{width:'100%'}} />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default BookModal;
