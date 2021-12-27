import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,Tabs,Form, Divider  } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  MinusCircleOutlined,
  PlusOutlined
} from '@ant-design/icons';
import DynamicField from './dynamicField';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}


const defaultFormItemLayout = {
    labelCol: {
      xs: { span: 6 }
    },
    wrapperCol: {
      xs: { span: 12 }
    }
  };

function SettingsModal({ isVisible, handleOk, handleCancel }) {
    const [form] = Form.useForm();

    function handleFinish(values) {
      console.log("VALUES", values);
      alert("Check console for values");
    }
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Settings"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={700}
    >
         <Tabs defaultActiveKey="1" tabPosition="left">
    <TabPane tab="Genre" key="1">
    <div className="App">
      <p>Genre</p>
      <Form form={form}preserve={false} {...defaultFormItemLayout} onFinish={handleFinish}>
        <DynamicField />
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
    </TabPane>
    <TabPane tab="Rack Location" key="2">
    <p>Rack Location</p>
    <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
    <Form.List name="rackLocation">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  name={[index, "Rack"]}
                  label="Rack Location"
                >
                  <Input placeholder="Rack Location" />
                </Form.Item>
                {fields.length > 0 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                    style={{margin:'2px'}}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "100%" }}
              >
                <PlusOutlined /> Add Rack Location
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
    <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
    </Form>
    </TabPane>
    <TabPane tab="Issue Duration" key="3">
    <p>Issue Duration</p>
    <Form form={form} {...defaultFormItemLayout} onFinish={handleFinish}>
    <Form.Item label="Validity">
          <Input placeholder="validity" />
        </Form.Item>
        <Form.Item label="Fine">
          <Input placeholder="Fine per day" />
        </Form.Item>
    <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
    </Form>
    </TabPane>
  </Tabs>
      {/* <Row>
        <Col span={24}>
          <div>
            <label>Fine Amount</label>
            <br />
            <Input placeholder="Enter the fine" style={{width:'100%'}} size="middle" />
          </div>
          <br />
        </Col>
      </Row> */}
    </Modal>
  );
}

export default SettingsModal;
