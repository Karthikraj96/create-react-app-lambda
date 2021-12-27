import React, { useEffect,useState } from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space, InputNumber, Form, Upload } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getClass,decodedata,getStudents } from '../../api/api';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

const layout = {
  labelCol: { span: 3 },
};

const AwardsModal = ({ isVisible, handleOk, handleCancel,tokendata,selectedOrg,badge}) => { 
  const [form] = Form.useForm();
  // let {
  //   tokendata,
  //   isVisible,
  //   handleOk,
  //   handleCancel,
  //   clas,
  //   handleClas,
  //   student,
  //   handleinsti,
  //   handleStudent,
  //   handleLevel,
  //   handleTitle,
  //   handleType,
  //   handledescription
  // } = props;
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [section, setSection] = useState([])
  let [selectedLevel, setselectedLevel] = useState(null);
  const [requiredMark, setRequiredMarkType] = useState('required');
  let [record, setRecord] = useState({
    organization_id: null,
    level: null,
    sectionId:null,
    studentsId: null,
    title: null,
    description: null,
    Batch:null,
    badgeId: null,
  });
  let [student, setStudent] = useState([]);
  let [secid, setsecid] = useState('');

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
  }, [selectedLevel])
  const onGradeChange = (value, e) => {
    setselectedLevel(value);
    handleSelect(value, e)
  };
  let handleInput = (e) => {
    let { name, value } = e.target
    setRecord({ ...record, [name]: value })
  }
  let handleSelect = (value, e) => {
    setsecid(value)
    let data = {
      section_id: value,
    };
    getStudents(data)
    .then(res => {
      setStudent(res.data);
    })
    .catch(e => {
      console.log('error', e);
    });
    setRecord({ ...record, [e]: value })
  }
  // useEffect(() => {}, [props]);
  return (
    <Modal
      destroyOnClose={true}
      style={{ top: 20 }}
      title="Create Awards & Recognition"
      visible={isVisible}
      // onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
      footer={[
        <Button  type="primary" htmlType="submit" form="award">
          Submit
        </Button>,
      ]}
    >
      
      <Form preserve={false} {...layout} form={form} name="nest-messages" id="award"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        onFinish={() => handleOk(record, setRecord)}
      >
      {tokendata == '1' ? (
        <>
         <Form.Item label="Institution" name="inst"  rules={[{ required: true, message: 'Please input your details!' }]}>
         <Select placeholder="select the School" name="organization_id" onChange={(value) => handleSelect(value, "organization_id")} allowClear>
          {org.map((e, key) => {
                return (
                  <Option key={key} value={e.organization_id}>
                    {e.instituteName}
                  </Option>
                );
              })}
          </Select>
          </Form.Item>
        </>
      ) : (
        <> </>
      )}
        <Form.Item label="LEVEL" name="level" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select placeholder="select the Level" name="level"  onChange={(value) => onGradeChange(value, "level")} allowClear>
            {grade.map((e, key) => {
              return (
                <Option key={key} value={e.id}>
                  {e.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="CLASS" name="class" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select placeholder="select the Class" name="sectionId"  onChange={(value) => handleSelect(value, "sectionId")} allowClear>
          {section.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.name}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        {/* <Form.Item label="CLASSID" name="class" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select placeholder="select the Class" name="section"  onChange={(value) => handleSelect(value, "section")} allowClear>
          {section.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.id}
              </Option>
            );
          })}
          </Select>
        </Form.Item> */}
        <Form.Item label="STUDENT" name="student" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select mode="multiple" name="studentsId" onChange={(value) => handleSelect(value, "studentsId")} placeholder="select the Student" allowClear>
          {student.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.first_name}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="TITLE"  name="title" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="title" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
         
          rules={[{ required: true, message: 'Please input your details!' }]}
        >
          <Input name="description" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="Batch" name="Batch" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Batch" onChange={(value) => handleSelect(value, "Batch")} placeholder="select the BatchType" allowClear>
          {badge.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.badgeTitle}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="BADGE" name="badge" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select name="badgeId" onChange={(value) => handleSelect(value, "badgeId")} placeholder="select the Badge" allowClear>
            <Option value="RJWeek">RJ of the Week</Option>
            <Option value="RJMonth">RJ of the Month </Option>
            <Option value="Winner_1">WINNER - 1st Place </Option>
            <Option value="Winner_2">Winner - 2nd Place </Option>
            <Option value="Winner_3">Winner - 3rd Place </Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AwardsModal;
