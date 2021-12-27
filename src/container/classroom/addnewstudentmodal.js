import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { Select } from 'antd';
import { Input, InputNumber } from 'antd';
import { Form } from 'antd';
import './modalstyle.css';
import { DatePicker } from 'antd';
import { getClass } from '../../api/api';
const { Option } = Select;
let NewStudent = ({ isVisible, handleOk, handleCancel, selectedOrg, grade }) => {
  const [form] = Form.useForm();
  let [section, setSection] = useState([]);
  // let [selectedSection, setSelectedSection] = useState(null);
  let [selectedLevel, setselectedLevel] = useState(null);
  const [requiredMark, setRequiredMarkType] = useState('required');
  let [record, setRecord] = useState({
    admission_date: null,
    admission_number: null,
    date_of_birth: null,
    first_name: null,
    gender: null,
    grade_id: null,
    last_name: null,
    mob_no: null,
    roll_number: null,
    section_id: null,
  });
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  useEffect(() => {
    if (selectedLevel) {
      let dat = { level: selectedLevel, id: selectedOrg };
      getClass(dat)
        .then(res => {
          setSection(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [selectedLevel]);
  const onGradeChange = (value, e) => {
    setselectedLevel(value);
    handleSelect(value, e);
  };
  let handleInput = e => {
    let { name, value } = e.target;
    setRecord({ ...record, [name]: value });
  };
  let handleSelect = (value, e) => {
    setRecord({ ...record, [e]: value });
  };
  return (
    <Modal
      destroyOnClose={true}
      title="Add New Student"
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="Myform">
          Create
        </Button>,
      ]}
      width={1000}
    >
      <Form
        preserve={false}
        form={form}
        layout="vertical"
        id="Myform"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        onFinish={() => handleOk(record, setRecord)}
      >
        <Form.Item
          label="First Name"
          name="First Name"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <Input name="first_name" onChange={e => handleInput(e)} placeholder="Student's First Name" />
        </Form.Item>
        <Form.Item label="Last Name" name="Last Name">
          <Input name="last_name" onChange={e => handleInput(e)} placeholder="Student's Last Name" />
        </Form.Item>
        <Form.Item
          label="Admission No"
          name="Admission No"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <Input name="admission_number" onChange={e => handleInput(e)} placeholder="Admission No" />
        </Form.Item>
        <Form.Item
          label="Admission Date"
          name="Admission Date"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <DatePicker
            name="admission_date"
            format="DD-MM-YYYY"
            onChange={(date, dateString) => handleSelect(date, 'admission_date')}
            placeholder=" Admission Date"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Date Of Birth"
          name="Date Of Birth"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <DatePicker
            name="date_of_birth"
            format="DD-MM-YYYY"
            onChange={(date, dateString) => handleSelect(date, 'date_of_birth')}
            placeholder=" Date Of Birth"
            style={{ width: '100%' }}
          />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="Gender"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <Select
            placeholder="Select Gender"
            onChange={value => handleSelect(value, 'gender')}
            name="gender"
            style={{ width: '100%' }}
          >
            <Option value="male">Male</Option>
            <Option value="female">Female</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Mobile No"
          name="Mobile No"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <InputNumber
            type="number"
            minLength={10}
            placeholder="Enter mobile number"
            style={{ width: '100%' }}
            onChange={value => handleSelect(value, 'mob_no')}
            name="mob_no"
          />
        </Form.Item>
        <Form.Item
          label="Roll Number"
          name="Roll Number"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <InputNumber
            type="number"
            placeholder="Enter Student Roll Number"
            style={{ width: '100%' }}
            onChange={value => handleSelect(value, 'roll_number')}
            name="roll_number"
          />
        </Form.Item>
        <Form.Item
          label="Class"
          name="Class"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <Select
            placeholder="Select Class"
            name="grade_id"
            onChange={value => onGradeChange(value, 'grade_id')}
            style={{ width: '100%' }}
          >
            {grade.map((g, i) => {
              return (
                <Option key={i} value={g.id}>
                  {g.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Section"
          name="Section"
          required
          tooltip="This is a required field"
          rules={[{ required: true, message: 'This Cannot Be Empty' }]}
        >
          <Select
            placeholder="Select Section"
            onChange={value => handleSelect(value, 'section_id')}
            name="section_id"
            style={{ width: '100%' }}
          >
            {section.map((g, i) => {
              return (
                <Option key={i} value={g._id}>
                  {g.name}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewStudent;
