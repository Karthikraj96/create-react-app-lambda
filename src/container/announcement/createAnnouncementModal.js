import React, { useState } from 'react';
import { Modal, Button, Upload, DatePicker } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form } from 'antd';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;
function CreateAnnouncement({ isVisible, handleOk, handleCancel, handleannounce, tokendata, handleFileRemove, handleFile, handleLevel, handleInsti2, handleTitle, handleDate }) {
  const [form] = Form.useForm();
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
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
  return (
    <Modal destroyOnClose={true}
      title="Create New Announcement"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      width={1000}
    >
      <Form preserve={false} form={form} layout="vertical">
        {
          tokendata == '1' ?
            <Form.Item label="Institute" required tooltip="This is a required field">
              <Select mode="multiple" style={{ width: '100%', height: '50px' }} onChange={handleInsti2} allowClear placeholder="Select Institute" style={{ width: '100%' }}>
                {org.map((e, key) => {
                  return (
                    <Option key={key} value={e.organization_id}>
                      {e.instituteName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            : ''}
        <Form.Item label="Date" required tooltip="This is a required field">
          <DatePicker style={{ width: '100%', height: '50px' }} onChange={handleDate} />
        </Form.Item>

        <Form.Item label="Grade" required tooltip="This is a required field">
          <Select mode="multiple" onChange={handleLevel} allowClear placeholder="Select Grades" style={{ width: '100%' }}>
            {grade.map((e, key) => {
              return (
                <Option key={key} value={e.id}>
                  {e.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Title" required tooltip="This is a required field">
          <Input placeholder="Enter title" onChange={handleTitle} />
        </Form.Item>
        <Form.Item label="Announcement" required tooltip="This is a required field">
          <TextArea rows={4} onChange={handleannounce} />
        </Form.Item>
        <Form.Item label="Attachment " required tooltip="This is a required field">
          <Upload {...props}>
            <Button icon={<UploadOutlined />} >
              Select File
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default CreateAnnouncement;
