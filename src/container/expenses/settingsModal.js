import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,Form  } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

const onFinish = values => {
  console.log("Received values of form:", values);
};


function SettingsModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Expenses"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Submit"
      cancelText="Cancel"
      width={800}
      footer={[
        <Button key="back" onClick={handleCancel}>
        Cancel
      </Button>,
        <Button type="primary" htmlType="submit" onClick={handleOk} id="userform">
        Submit
      </Button>
      ]}
    >
      <Form  preserve={false}onFinish={onFinish} className="my-form" id="userform">
      <Form.List name="users">
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Col md={22} lg={22}>
                    <Form.Item
                      name={[field.name, "Expenses Type"]}
                      fieldKey={[field.fieldKey, "ExpensesType"]}
                      // rules={[{ required: true, message: 'Please Enter the details!' }]}
                    >
                      <Input placeholder="Enter the Expenses Type" />
                    </Form.Item>
                  </Col>
                  <Col flex="none" style={{marginLeft:'5px'}} md={1} lg={1}>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  style={{ width: "100%" }}
                >
                  <PlusOutlined /> Add Expenses Type
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Form>
    </Modal>
  );
}

export default SettingsModal;
