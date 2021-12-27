import React, { useEffect } from 'react';
import { Modal, Button, Select, Input, DatePicker, Form } from 'antd';
import moment from 'moment';
const { Option } = Select;
const layout = {
  labelCol: { span: 24 },
};
function StudentEditModal({ isVisible, handleOk, record, setrecord, handleCancel }) {
  let handleSelect = (value, name) => {
    setrecord({ ...record, [name]: value });
  };
  useEffect(() => { }, [record]);
  return (
    <Modal destroyOnClose={true}
      // style={{ top: 20 }}
      title="Profile Edit"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="Profileform">
          Update Profile
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
          date_of_birth: record.date_of_birth ? moment(record.date_of_birth) : '',
          mob_no: record.mob_no ? record.mob_no : '',
          admission_number: record.admission_number ? record.admission_number : '',
          admission_date: record.admission_date ? moment(record.admission_date) : '',
          mother_tongue: record.mother_tongue ? record.mother_tongue : '',
          blood_group: record.blood_group ? record.blood_group : '',
          roll_number: record.roll_number ? record.roll_number : '',
        }}
        id="Profileform"
        onFinish={handleOk}
      >
        <Form.Item
          label="First Name"
          name="first_name"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            // defaultValue={record.first_name ? record.first_name : ''}
            onChange={(e) => { handleSelect(e.target.value, "first_name") }}
            // name="first_name"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Last Name" name="last_name" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            // name="last_name"
            onChange={(e) => { handleSelect(e.target.value, "last_name") }}
            // defaultValue={record.last_name ? record.last_name : ''}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Roll Number"
          name="roll_number"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            // defaultValue={record.first_name ? record.first_name : ''}
            onChange={(e) => { handleSelect(e.target.value, "roll_number") }}
            // name="first_name"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item label="Gender" name="gender" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Select
            size="middle"
            onChange={value => {
              handleSelect(value, 'gender');
            }}
            // defaultValue={record.gender ? record.gender : ''}
            name="gender"
            placeholder="Select a option"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Date_Of_Birth" name="date_of_birth" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <DatePicker
            onChange={(date, dateString) => {
              handleSelect(date, 'date_of_birth');
            }}
            // name="date_of_birth"
            // selected={moment(record.date_of_birth)}
            // defaultValue={record.date_of_birth ? moment(record.date_of_birth).format('DD-MM-YYYY') : ''}
            format="DD-MM-YYYY"
            style={{ width: '100%', height: '46px' }}
          />
        </Form.Item>
        <Form.Item label="Mobile No" name="mob_no" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={(e) => { handleSelect(e.target.value, "mob_no") }}
            // name="mob_no"
            // defaultValue={record.mob_no ? record.mob_no : ''}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Admission Number"
          name="admission_number"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Input
            onChange={(e) => { handleSelect(e.target.value, "admission_number") }}
            // name="admission_number"
            // defaultValue={record.admission_number ? record.admission_number : ''}
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Admission Date"
          name="admission_date"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <DatePicker
            onChange={(date, dateString) => {
              handleSelect(date, 'admission_date');
            }}
            // name="admission_date"
            // selected={moment(record.admission_date)}
            // defaultValue={record.admission_date ? moment(record.admission_date).format('DD-MM-YYYY') : ''}
            format="DD-MM-YYYY"
            style={{ width: '100%', height: '46px' }}
          />
        </Form.Item>
        <Form.Item
          label="Blood Group"
          name="blood_group"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Select
            // name="blood_group"
            onChange={value => {
              handleSelect(value, 'blood_group');
            }}
            // defaultValue={record.blood_group ? record.blood_group : ''}
            size="middle"
            placeholder="Select a option"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="A+">A+</Option>
            <Option value="A-">A-</Option>
            <Option value="B+">B+</Option>
            <Option value="B-">B-</Option>
            <Option value="AB+">AB+</Option>
            <Option value="AB-">AB-</Option>
            <Option value="O+">O+</Option>
            <Option value="O-">O-</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Mother Tongue"
          name="mother_tongue"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'mother_tongue');
            }}
            size="middle"
            // defaultValue={record.mother_tongue ? record.mother_tongue : ''}
            name="mother_tongue"
            placeholder="Select a option"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="Tamil">Tamil</Option>
            <Option value="Hindi">Hindi</Option>
            <Option value="Sanskrit">Sanskrit</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default StudentEditModal;
