import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form, Radio } from 'antd';
import './modalstyle.css';
import { DatePicker, Space } from 'antd';
const { TextArea } = Input;

function NewAttendence({ isVisible, handleOk, handleCancel }) {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Modal destroyOnClose={true}
      title="Create Attendence"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      width={1000}
    >
      <Form
        preserve={false}
        form={form}
        layout="vertical"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        <Form.Item label="Roll Number" required tooltip="This is a required field">
          <Input placeholder="Student's Roll Number" />
        </Form.Item>

        <Form.Item label="Status" required tooltip="This is a required field">
          <Select placeholder="Select Status" style={{ width: '100%' }}>
            <Option value="1">Present</Option>
            <Option value="2">Absent</Option>
            <Option value="3">Late</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default NewAttendence;
