import React from 'react';
import { Modal, Button, Select,Input,Upload,DatePicker } from 'antd';


const { Option } = Select;
const instituteData = ['CBSE','Matriculation'];
const streamData = {
  level: ['PKG', 'LKG', 'UKG', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'],
  subject: ['English', 'Maths', 'Science']
};

const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  const onChange =(date, dateString)=>  {
    console.log(date, dateString);
  }

const ClassModal = ({ isVisible, handleOk, handleCancel }) => {

  const [level, setLevel] = React.useState(streamData.level);
  const [subject, setSubject] = React.useState(streamData.subject);

  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <Modal destroyOnClose={true}
      title="Create Class"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary" >
          create
          </Button>
      ]}
      width={800}

    >
      <div >
      <label style={{padding:1}}>Institute</label> &nbsp;<br /> 
      <Select defaultValue={instituteData[0]} size="small"  style={{ width: 300}} onChange={handleChange} >
        {instituteData.map(province => (
          <Option key={province}>{province}</Option>
        ))}
      </Select></div> <br />
      {/* <div >
      <label style={{padding:1}}>Date</label> &nbsp;<br />
      <DatePicker onChange={onChange} style={{ width: 300}} />
      </div> <br /> */}
      <div >
      <label style={{padding:1}}>Level</label> &nbsp;<br />
      <Select defaultValue="LKG" size="small" style={{ width: 300}} >
          <Option>LKG</Option>
          <Option>UKG.</Option>
       </Select>
       </div><br />
       <div  >
      <label style={{padding:1}}>Class Name</label> &nbsp; <br />
      <Select defaultValue="LKG" size="small" style={{ width: 300}} >
          <Option>A</Option>
          <Option>B.</Option>
       </Select>
      </div><br />
      <div  >
      <label style={{padding:1}}>student</label> &nbsp; <br />
      <Input style={{ width: 300}} />
      </div><br />
      {/* <div  >
      <label style={{padding:1}}>competition</label> &nbsp; <br />
      <Input style={{ width: 300}} />
         
      </div><br />
      <div  >
      <label style={{padding:1}}>competition Type</label> &nbsp; <br />
      <Select defaultValue="LKG" size="small" style={{ width: 300}} >
          <Option>student-1</Option>
          <Option>student-2.</Option>
       </Select>
      </div><br />
      <div>
      <label style={{padding:1}}>Result</label> &nbsp; <br />
      <Select defaultValue="LKG" size="small" style={{ width: 300}} >
          <Option>issue-1</Option>
          <Option>issue-2</Option>
       </Select>
      </div><br />
      <div  >
      <label style={{padding:1}}>Remarks</label> &nbsp; <br />
      <TextArea rows={4} />
      </div><br /> */}
      {/* <div>
      <label style={{padding:12}} >Attachment</label> &nbsp; 
      <Upload {...props}>
                   <span> <Button icon={<UploadOutlined />}>Click to Upload</Button></span>
                  </Upload> 
        </div> */}
    </Modal>
  );
}

export default ClassModal;
