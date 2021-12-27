import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Select, DatePicker } from 'antd';
const layout = {
  labelCol: { span: 6 },
};
const { Option } = Select;
let FeeTypeModal = ({ isVisible, handleOk, record, setRecord, handleCancel, year, org, tokendata }) => {
  let [sample, setSample] = useState([]);
  useEffect(() => {
    if (record.installments) {
      if (record.installments == 0) {
        setSample([]);
      } else {
        let n = record.installments;
        let arr = [];
        for (let i = 0; i < n; i++) {
          arr.push(i);
        }
        setSample(arr);
      }
    }
  }, [record]);
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  let arr2 = ['Annually', 'Monthly', 'Term'];
  let onChange = (value, name) => {
    setRecord({ ...record, [name]: value });
  };
  let onDateChange = value => {
    let datee = record ? (record.date_array ? record.date_array : []) : [];
    datee.push(value);
    setRecord({ ...record, ['date_array']: datee });
  };
  return (
    <Modal
      destroyOnClose={true}
      style={{ top: 20 }}
      title={record.id ? 'Update Fee Type' : 'Create Fee Type'}
      visible={isVisible}
      onCancel={() => {
        handleCancel();
        setSample([]);
      }}
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
        <Form.Item label="Select Year" name="year" rules={[{ required: true, message: 'Please enter the type!' }]}>
          <Select
            onChange={value => {
              onChange(value, 'year');
            }}
          >
            {year.map((e, key) => {
              return (
                <Option key={key} value={e.year}>
                  {e.year}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label=" Fee Type" name="fee" rules={[{ required: true, message: 'Please enter the type!' }]}>
          <Select
            onChange={value => {
              onChange(value, 'fee');
            }}
          >
            {arr2.map(e => {
              return (
                <Option key={e} value={e}>
                  {e}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label=" Installments "
          name="installments"
          rules={[{ required: true, message: 'Please Enter the Installments' }]}
        >
          <Select
            onChange={value => {
              onChange(value, 'installments');
            }}
          >
            {arr.map(e => {
              return (
                <Option key={e} value={e}>
                  {e}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {sample.map((e, key) => {
          return (
            <Form.Item
              label={' Installment  ' + (key + 1) + 'Date '}
              name={'installmentsdates' + (key + 1)}
              rules={[{ required: true, message: 'Please Enter the Installment ' + (key + 1) + ' Date' }]}
            >
              <DatePicker
                onChange={(date, dateString) => {
                  onDateChange(date);
                }}
                style={{ width: '100%', height: '40px', padding: '5px' }}
                format="DD/MM/YYYY"
              />
            </Form.Item>
          );
        })}
      </Form>
    </Modal>
  );
};

export default FeeTypeModal;
