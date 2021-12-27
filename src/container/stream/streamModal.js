import React from 'react';
import { Modal, Button, Select } from 'antd';

const { Option } = Select;
const instituteData = ['CBSE','Matriculation'];
const streamData = {
  level: ['PKG', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
  subject: ['English', 'Maths', 'Science']
};



const CreateStreamModal = ({ isVisible, handleOk, handleCancel }) => {

  const [level, setLevel] = React.useState(streamData.level);
  const [subject, setSubject] = React.useState(streamData.subject);

  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <Modal destroyOnClose={true}
      title="Course"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" >
          create
          </Button>
      ]}
      width={500}

    >
      <div style={{textAlign:"center"}}>
      <label style={{padding:1}}>Curriculum</label> &nbsp; <Select defaultValue={instituteData[0]} size="small" style={{ width: 250}} onChange={handleChange} >
        {instituteData.map(province => (
          <Option key={province}>{province}</Option>
        ))}
      </Select></div> <br />
      <div  style={{textAlign:"center"}}>
      <label style={{padding:18}}>Level</label> &nbsp;  <Select style={{ width: 250  }} size="small" defaultValue={streamData.level[0]} onChange={handleChange} >
        {level.map(level => (
          <Option key={level}>{level}</Option>
        ))}
      </Select></div><br />
       <div  style={{textAlign:"center"}}>
      <label style={{padding:10}}>Subject</label> &nbsp;  <Select style={{ width: 250 }} size="small" defaultValue={streamData.subject[0]} onChange={handleChange} >
        {subject.map(subject => (
          <Option key={subject}>{subject}</Option>
        ))}
      </Select>
      </div>
    </Modal>
  );
}

export default CreateStreamModal;
