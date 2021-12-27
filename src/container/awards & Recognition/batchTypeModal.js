import React,{useState} from 'react';
import { Modal, Button, Input,Form,Upload  } from 'antd';
import ImgCrop from 'antd-img-crop';
import { UploadOutlined } from '@ant-design/icons';




const layout = {
    labelCol: { span: 3 },
    
  };

  

function BatchTypeModal({ isVisible, handleOk, handleCancel,
  // handleFile,handleTitle
 }) {
  let [state, setState] = useState({
    fileList: [],
  });
  const { fileList } = state;
  const props = {
    onRemove: file => {
      setState(state => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        handleFileRemove()
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setState(state => ({
        fileList: [...state.fileList, file],
      }));
      handleFile(file)
      return false;
    },
    fileList,
  };
    const [form] = Form.useForm();
    // const [fileList, setFileList] = useState([
    //   ]);

    
    
      // const onChange = ({ fileList: newFileList }) => {
      //   setFileList(newFileList);
      //   console.log(fileList)
      // };
    
      // const onPreview = async file => {
      //   let src = file.url;
      //   if (!src) {
      //     src = await new Promise(resolve => {
      //       const reader = new FileReader();
      //       reader.readAsDataURL(file.originFileObj);
      //       reader.onload = () => resolve(reader.result);
      //     });
      //   }
      //   const image = new Image();
      //   image.src = src;
      //   const imgWindow = window.open(src);
      //   imgWindow.document.write(image.outerHTML);
      // };

      // const onFinish = (values) => {
      //   console.log('Success:', values);
      // };
    
      // const onFinishFailed = (errorInfo) => {
      //   console.log('Failed:', errorInfo);
      // };
      const [requiredMark, setRequiredMarkType] = useState('required');
      let [record, setRecord] = useState({
        badgeTitle: null,
        badgePic:null
     
      });
      const onRequiredTypeChange = ({ requiredMarkValue }) => {
        setRequiredMarkType(requiredMarkValue);
      };
      let handleInput = (e) => {
        let { name, value } = e.target
        setRecord({ ...record, [name]: value })
      }
      const handleImg =(value, e)=>{
        setRecord({ ...record, [e]: value })
      }
      console.log(record)
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Create Batch Type"
      visible={isVisible}
      // onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      footer={[
        <Button key="back" onClick={handleCancel}>
              Cancel
            </Button>,
        <Button type="primary" htmlType="submit" form="Myform">
          Create
        </Button>
     
      ]}
      width={800}
    >
    <Form preserve={false} {...layout}
       preserve={false}
       form={form}
       id="Myform"
       initialValues={{
         requiredMarkValue: requiredMark,
       }}
       onValuesChange={onRequiredTypeChange}
       requiredMark={requiredMark}
       onFinish={() => handleOk(record, setRecord)}
      >
      <Form.Item  label="Type" name="badgeTitle" rules={[{ required: true, message: 'Please enter the type!' }]}>
        <Input name="badgeTitle"  onChange={handleInput} />
      </Form.Item>
      <Form.Item  label="Image" name="badgePic" rules={[{ required: true, message: 'Please select your Image!' }]}>
      <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      name="badgePic"
      // {...props}
      onChange={(e)=>handleImg(e)}
      // defaultFileList={[...fileList]}

    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
      
      {/* <ImgCrop rotate>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onChange={(e)=>handleImg(e)}
        name="batch_img"
        onPreview={onPreview}
      >
        {fileList.length < 5 && '+ Upload'}
      </Upload>
    </ImgCrop> */}
      </Form.Item>
    </Form>
    </Modal>
  );
}

export default BatchTypeModal;
