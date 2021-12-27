import React, { useState } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form, Radio } from 'antd';
import UploadDocs from './NewAttachments';
const { TextArea } = Input;
function AttachmentsModal({ isVisible, handleOk, handleCancel }) {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('optional');

  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Modal destroyOnClose={true}
      title="Student Name - Lokesh"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
    >
      <UploadDocs />
    </Modal>
  );
}

export default AttachmentsModal;
