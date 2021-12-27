import React,{useState} from 'react';
import { Modal, Button, Input,Form,Upload,Select  } from 'antd';





const layout = {
    labelCol: { span: 4 },
    
  };

  

function CreatecounterModal({ isVisible, handleOk, handleCancel }) {

  return (
    <Modal
      style={{ top: 20 }}
      title="Create Counter"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      footer={[
        <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
        <Button type="primary" htmlType="submit" form="counter">
          Create
        </Button>
     
      ]}
      width={800}
    >
    <Form {...layout}
       initialValues={{
        remember: true,
      }}
      id="counter"
      autoComplete="off" >
      <Form.Item  label="Counter Name" name="counter" rules={[{ required: true, message: 'Please enter the details!' }]}>
        <Input />
      </Form.Item>
      <Form.Item  label="Purpose" name="purpose" rules={[{ required: true, message: 'Please enter the details!' }]}>
      <Select placeholder="select the purpose" allowClear>
          <Option value="1">Academics</Option>
          <Option value="2">Admission </Option>
          <Option value="3">TC</Option>
          <Option value="4">Fee Payment</Option>
          <Option value="5">Bonafide</Option>
          <Option value="6">Principal Meet</Option>
          <Option value="7">Others</Option>
        </Select>
      </Form.Item>
    </Form>
    </Modal>
  );
}

export default CreatecounterModal;
