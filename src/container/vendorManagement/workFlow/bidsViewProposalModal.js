import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,InputNumber,Form,Upload ,Rate } from 'antd';
import { Cards } from '../../../components/cards/frame/cards-frame';
import CustomTable from '../../fee/dashboard/Components/Table';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
  UploadOutlined
} from '@ant-design/icons';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

const layout = {
    labelCol: { span: 5 },
    
  };

function ViewProposalModal({ isVisible, handleOk, handleCancel }) {

    const columns = [
        {
          title: 'Vendor Name ',
          dataIndex: 'vendorname',
          key: 'date',
        },
        {
          title: 'Quote',
          dataIndex: 'quote',
          key: 'date',
      
          
        },
        {
          title: 'Rating',
          dataIndex: 'rating',
          key: 'subject',
         
        },
        {
            title: 'Proposal ',
            dataIndex: 'proposal',
            key: 'subject',
           
          },
      
    
        {
          title: 'Action',
          key: 'action',
          width: '20%',
    
          render: (text, record) => (
            <Select  style={{ width: '100%' }} placeholder="Action">
            <Option value="approve">Approve</Option>
            <Option value="decline">Decline</Option>
          </Select>
          ),
        },
      ];
     
      const data = [
        {
         vendorname: "Ventures LLP",
         quote: 'Office Renovation',
         rating:<Rate allowClear={true} defaultValue={3} />,
         proposal: <Upload name="logo" action="/upload.do" listType="picture">
         <Button icon={<UploadOutlined />}>Click to upload</Button>
       </Upload>
        },
       
      ];
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="View Proposal"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
    >
      <Row>
        <Col md={24} lg={24}>
          <Cards headless>
            <CustomTable col={columns} data={data} />
          </Cards>
        </Col>
      </Row>
    </Modal>
  );
}

export default ViewProposalModal;
