import React from 'react';
import { Modal, Button, Select,Input,Upload,DatePicker } from 'antd';
import { UserOutlined,UploadOutlined } from '@ant-design/icons';


const { TextArea } = Input;
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

const AnnouncementModal = ({ isVisible, handleOk, handleCancel }) => {

  const [level, setLevel] = React.useState(streamData.level);
  const [subject, setSubject] = React.useState(streamData.subject);

  const handleChange = (value) => {
    console.log(value);
  }

  return (
    <Modal destroyOnClose={true}
      title="Create Announcement"
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
      
      <label style={{margin:1}}>Institute</label> 
      <div >
      <Select defaultValue={instituteData[0]} size="small"  style={{ width: '100%'}} onChange={handleChange} >
        {instituteData.map(province => (
          <Option key={province}>{province}</Option>
        ))}
      </Select></div> <br />
      
      <label style={{margin:1}}>Date</label> <div >
      <DatePicker onChange={onChange} style={{ width: '100%'}} />
      </div> <br />
      
      <label style={{margin:1}}>Grade</label> <div >
      <Select defaultValue="LKG" size="small" style={{ width: '100%'}} >
          <Option>CBSE</Option>
          <Option>Matric.</Option>
       </Select>
       </div><br />
       
      <label style={{margin:1}}>Title</label> <div  >
      <Input style={{ width: '100%'}}  />
      </div><br />
     
      <label style={{margin:1}}>Description</label>  <div  >
      <TextArea rows={4} style={{ width: '100%'}}  />
      </div><br />
      <div>
      <label style={{margin:1}} >Attachment</label> &nbsp; 
      <Upload {...props}>
                   <span> <Button icon={<UploadOutlined />}>Click to Upload</Button></span>
                  </Upload> 
        </div>
    </Modal>
  );
}

export default AnnouncementModal;
