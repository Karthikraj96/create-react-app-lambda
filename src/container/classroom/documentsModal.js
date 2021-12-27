import React, { useState } from 'react';
import { Modal, Button, DatePicker, Upload } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
const { Option } = Select;

function DocumentsModal({ isVisible, handleOk, handleCancel, handleFile, handleFileRemove, tokendata, handleInsti2, handleDate, handleTitle, handlenote, handleLevel }) {
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [state, setState] = useState({
    fileList: [],
  })
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
  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Modal destroyOnClose={true}
      title="Add Document"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Save"
      cancelText="Cancel"
      width={1000}
    >
      <Form
        preserve={false}
        form={form}
        layout="vertical"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        {
          tokendata == '1' ?
            <Form.Item label="Institute" required tooltip="This is a required field">
              <Select mode="multiple" onChange={handleInsti2} allowClear placeholder="Select Institute" style={{ width: '100%' }}>
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
          <DatePicker style={{ width: '100%', height: '50px' }} format="DD-MM-YYYY" onChange={handleDate} />
        </Form.Item>
        <Form.Item label="Title" required tooltip="This is a required field">
          <Input placeholder="Enter Title" onChange={handleTitle} />
        </Form.Item>
        <Form.Item label="Level" required tooltip="This is a required field">
          <Select onChange={handleLevel} allowClear placeholder="Select Level" style={{ width: '100%' }}>
            {grade.map((e, key) => {
              return (
                <Option key={key} value={e.id}>
                  {e.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>

        <Form.Item label="Note" onChange={handlenote} required tooltip="This is a required field">
          <Input placeholder="Enter Note" />
        </Form.Item>

        <Form.Item label="Attachment" required tooltip="This is a required field">
          <Upload  {...props}>
            <Button icon={<UploadOutlined />} style={{ marginTop: '15%' }}>
              Select File
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DocumentsModal;
