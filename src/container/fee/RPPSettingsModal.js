import React, { useEffect } from 'react';
import { Button, Select, DatePicker, Form, Drawer, InputNumber } from 'antd';
const { RangePicker } = DatePicker;
const layout = {
  labelCol: { span: 6 },
};
function RPPSettingsModal({ isVisible, handleOk, tokendata, handleCancel, year, grade, org, record, setRecord }) {
  useEffect(() => {}, [record]);
  let onChange = (value, name) => {
    setRecord({ ...record, [name]: value });
  };
  return (
    <Drawer
      destroyOnClose={true}
      title="Create RPP Settings"
      width={'70%'}
      onClose={handleCancel}
      visible={isVisible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button onClick={handleCancel} style={{ marginRight: 8 }} type="warning">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" form="Myform">
            {record.id ? 'Update' : 'Create'}
          </Button>
          ,
        </div>
      }
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
            rules={[{ required: true, message: 'Please Select Organization!' }]}
          >
            <Select
              style={{ width: '100%', padding: '5px' }}
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
        <Form.Item label="Select Year" name="year" rules={[{ required: true, message: 'Please Select the Year!' }]}>
          <Select
            style={{ width: '100%', height: '40px', padding: '5px' }}
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
        <Form.Item label="Select Grade" name="grade_id" rules={[{ required: true, message: 'Please enter the type!' }]}>
          <Select
            style={{ width: '100%', height: '40px', padding: '5px' }}
            onChange={value => {
              onChange(value, 'grade_id');
            }}
          >
            {grade.map((g, i) => {
              return (
                <Option key={12554 + i} value={g.id}>
                  {g.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label=" RPP Fee" name="fees" rules={[{ required: true, message: 'Please enter the  RPP Fee!' }]}>
          <InputNumber
            onChange={value => {
              onChange(value, 'fees');
            }}
            style={{ width: '100%', height: '40px' }}
            type="number"
          ></InputNumber>
        </Form.Item>
        <Form.Item
          label=" Renewal RPP Fees"
          name="feesRenewal"
          rules={[{ required: true, message: 'Please enter the  Renewal RPP Fees!' }]}
        >
          <InputNumber
            onChange={value => {
              onChange(value, 'feesRenewal');
            }}
            style={{ width: '100%', height: '40px' }}
            type="number"
          ></InputNumber>
        </Form.Item>
        <Form.Item label=" Validity" name="valid" rules={[{ required: true, message: 'Please enter the Validity!' }]}>
          <RangePicker
            onChange={value => {
              onChange(value, 'valid');
            }}
            style={{ width: '100%', height: '40px', padding: '5px' }}
            format="DD/MM/YYYY"
          />
        </Form.Item>
      </Form>
    </Drawer>
  );
}

export default RPPSettingsModal;
