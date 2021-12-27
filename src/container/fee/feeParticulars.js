import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form,Select} from 'antd';
const layout = {
  labelCol: { span: 4 },
};
const { Option } = Select;
let FeeTypeModal = ({ isVisible, handleOk, record, setRecord, handleCancel,year, org, tokendata }) => {
  useEffect(() => {}, [record]);
  let onChange = (value, name) => {
    setRecord({ ...record, [name]: value });
  };
  return (
    <Modal
      destroyOnClose={true}
      style={{ top: 20 }}
      title={record.id ? 'Update Particulars' : 'Create Particulars'}
      visible={isVisible}
      onCancel={handleCancel}
      okText={record.id ? 'Update' : 'Create'}
      cancelText="Cancel"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="Myform">
          {record.id ? 'Update' : 'Create'}
        </Button>,
      ]}
      width={800}
    >
      <Form
        preserve={false}
        {...layout}
        initialValues={record}
        id="Myform"
        onFinish={() => handleOk(record)}
        autoComplete="off"
      >
         {tokendata == '1' ? (
          <Form.Item
            label=" Select Organization"
            name="organization_id"
            rules={[{ required: true, message: 'Please enter the type!' }]}
          >
            <Select
              mode="multiple"
              onChange={value => {
                onChange(value, 'organization_id');
              }}
            >
              {org.map((e, key) => {
                return (
                  <Option key={key} value={e.organization_id}>
                    {e.instituteName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item label="Particulars" name="particulars" rules={[{ required: true, message: 'Please enter the particulars' }]}>
          <Input onChange={(e)=>{onChange(e.target.value,'particulars')}}></Input>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FeeTypeModal;
