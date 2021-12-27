import React, { useEffect } from 'react';
import { Modal, Button, Select, Input, Form } from 'antd';
const layout = {
  labelCol: { span: 24 },
};

function AddressEditModal({ isVisible, handleOk, record, setrecord, handleCancel }) {
  let handleSelect = (value, name) => {
    setrecord({ ...record, [name]: value });
  };
  useEffect(() => { }, [record]);
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Address Edit"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="Addressform">
          Update Address
        </Button>,
      ]}
      width={'50%'}
    >
      <Form
        preserve={false}
        {...layout}
        initialValues={{
          building_no: record.building_no ? record.building_no : '',
          address: record.address ? record.address : '',
          locality: record.locality ? record.locality : '',
          landmark: record.landmark ? record.landmark : '',
          city: record.city ? record.city : '',
          pincode: record.pincode ? record.pincode : '',
          country: record.country ? record.country : '',
          state: record.state ? record.state : '',
        }}
        id="Addressform"
        onFinish={() => handleOk('It Will Update The Address')}
      >
        <Form.Item
          label="Building No And Details"
          name="building_no"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'building_no');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Street name" name="address" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'address');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Area" name="locality" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'locality');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Landmark" name="landmark" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'landmark');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'city');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'state');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'pincode');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Country" name="country" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Select
            onChange={value => {
              handleSelect(value, 'country');
            }}
            placeholder="Select a option"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="India">India</Option>
            <Option value="UK">UK</Option>
            <Option value="US">US</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default AddressEditModal;
