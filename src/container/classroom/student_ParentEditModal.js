import React, { useEffect } from 'react';
import { Modal, Button, Select, Input, Form } from 'antd';
const layout = {
  labelCol: { span: 24 },
};
const { Option } = Select
function ParentEditModal({ isVisible, handleOk, record, setrecord, handleCancel }) {
  let handleSelect = (value, name) => {
    setrecord({ ...record, [name]: value });
  };
  useEffect(() => { }, [record]);
  return (
    <Modal destroyOnClose={true}
      title="parent Edit"
      visible={isVisible}
      // onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="Parentform">
          Update
        </Button>,
      ]}
      width={'50%'}
    >
      <Form
        preserve={false}
        {...layout}
        initialValues={{
          first_name: record.first_name ? record.first_name : '',
          last_name: record.last_name ? record.last_name : '',
          gender: record.gender ? record.gender : '',
          relationship: record.relationship ? record.relationship : '',
          educational_qualification: record.educational_qualification ? record.educational_qualification : '',
          occupation: record.occupation ? record.occupation : '',
          annual_income: record.annual_income ? record.annual_income : '',
          email: record.email ? record.email : '',
          mobile_number: record.mobile_number ? record.mobile_number : '',
          landline_number: record.landline_number ? record.landline_number : '',
          mother_first_name: record.mother_first_name ? record.mother_first_name : '',
          mother_last_name: record.mother_last_name ? record.mother_last_name : '',
          m_gender: record.m_gender ? record.m_gender : '',
          mother_occupation: record.mother_occupation ? record.mother_occupation : '',
          mother_mobile_number: record.mother_mobile_number ? record.mother_mobile_number : '',
          srelationship: record.srelationship ? record.srelationship : '',
          mother_educational_qualification: record.mother_educational_qualification
            ? record.mother_educational_qualification
            : '',
          mother_annual_income: record.mother_annual_income ? record.mother_annual_income : '',
          mother_email: record.mother_email ? record.mother_email : '',
          mother_landline_no: record.mother_landline_no ? record.mother_landline_no : '',
        }}
        id="Parentform"
        onFinish={() => handleOk('It Will Update The Parent Detail')}
      >
        <Form.Item
          label=" Guardian 1 First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'first_name');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label=" Guardian 1 Last Name"
          name="last_name"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'last_name');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Guardian 1 Gender"
          name="gender"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'gender');
            }}
            size="middle"
            placeholder="Select a gender"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Guardian 1 Relationship"
          name="relationship"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'relationship');
            }}
            size="middle"
            placeholder="Select a Relationship"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="Father">Father</Option>
            <Option value="Mother">Mother</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Guardian 1 Education Qualification"
          name="educational_qualification"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'educational_qualification');
            }}
            size="middle"
            placeholder="Select a Education Qualification"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="No Educated">No Educated</Option>
            <Option value="10th">10th</Option>
            <Option value="+2">+2</Option>
            <Option value="Under Graduate">Under Graduate</Option>
            <Option value="Post Graduate">Post Graduate</Option>
            <Option value="Doctorate">Doctorate</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Guardian 1  Occupation"
          name="occupation"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'occupation');
            }}
            size="middle"
            placeholder="Select a Occupation"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="Salaried">Salaried</Option>
            <Option value="Self_Employed">Self_Employed</Option>
            <Option value="Home Maker">Home Maker</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label=" Guardian 1  Annual Income"
          name="annual_income"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'annual_income');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Guardian 1 E-Mail"
          name="email"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'email');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Guardian 1 Mobile"
          name="mobile_number"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'mobile_number');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label=" Guardian 1 Landline_no"
          name="landline_number"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'landline_number');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label=" Guardian 2 First Name"
          name="mother_first_name"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'mother_first_name');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label=" Guardian 2 Last Name"
          name="mother_last_name"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'mother_last_name');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Guardian 2 Gender"
          name="m_gender"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'm_gender');
            }}
            size="middle"
            placeholder="Select a gender"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Guardian 2 Relationship"
          name="srelationship"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'srelationship');
            }}
            size="middle"
            placeholder="Select a Relationship"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="Father">Father</Option>
            <Option value="Mother">Mother</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Guardian 2 Education Qualification"
          name="mother_educational_qualification"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'mother_educational_qualification');
            }}
            size="middle"
            placeholder="Select a Education Qualification"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="No Educated">No Educated</Option>
            <Option value="10th">10th</Option>
            <Option value="+2">+2</Option>
            <Option value="Under Graduate">Under Graduate</Option>
            <Option value="Post Graduate">Post Graduate</Option>
            <Option value="Doctorate">Doctorate</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Guardian 2  Occupation"
          name="mother_occupation"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'mother_occupation');
            }}
            size="middle"
            placeholder="Select a Occupation"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="Salaried">Salaried</Option>
            <Option value="Self_Employed">Self_Employed</Option>
            <Option value="Home Maker">Home Maker</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label=" Guardian 2  Annual Income"
          name="mother_annual_income"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'mother_annual_income');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Guardian 2 E-Mail"
          name="mother_email"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'mother_email');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Guardian 2 Mobile"
          name="mother_mobile_number"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'mother_mobile_number');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label=" Guardian 2 Landline_no"
          name="mother_landline_no"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'mother_landline_no');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ParentEditModal;
