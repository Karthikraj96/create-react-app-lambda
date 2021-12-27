import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Fragment } from 'react';
import { Input, Space, Drawer,Rate  } from 'antd';
import CustomTable from '../../fee/dashboard/Components/Table';
import Filters from '../../fee/dashboard/Components/Filters';
import { Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faDownload,
  faEnvelope,
  faPencil,
  faSave,
  faTrash,
  faUpload,
  faEye,
  faPencilAlt,
  faCalendarCheck,
  faEdit,
  faListAlt,
  faRupeeSign
 
} from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
import PaymentModal from './paymentsModal';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

const Payments = () => {
    const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

  
  const [isPaymentModalVisible,  setisPaymentModalVisible]=useState(false);
  const togglePayments = () => {
    setisPaymentModalVisible(!isPaymentModalVisible);
  };
 

 
  const columns = [
    {
      title: 'Date ',
      dataIndex: 'Date',
      key: 'date',
      width:'15%'
     
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'date',
  
      
    },
    {
        title: 'Job ID',
        dataIndex: 'Jobid',
        key: 'date',
        
      },
    {
      title: 'Job Name',
      dataIndex: 'Jobname',
      key: 'subject',
   
    },
    {
        title: 'Vendor Name ',
        dataIndex: 'Vendorname',
        key: 'subject',
      
      },
    {
      title: 'Invoice ',
      dataIndex: 'Invoice',
      key: 'chapter',
    },
    {
      title: 'Amount  ',
      dataIndex: 'Amount',
      key: 'topic',
    },
    {
      title: 'Payment Type',
      dataIndex: 'PaymentType',
      key: 'assignment',
     
    },
    {
        title: 'Frequency',
        dataIndex: 'Frequency',
        key: 'assignment',
    
      },
      {
        title: 'Balance',
        dataIndex: 'Balance',
        width:'20%',
    
      },
    {
      title: 'Status',
      dataIndex: 'Status',
      key: 'assignment',
    },

    {
      title: 'Action',
      key: 'action',
      width: '15%',

      render: (text, record) => (
        <Space size="middle">
          {/* <FontAwesomeIcon icon={faCodeBranch} style={{ fontSize: 15, color: 'Dodgerblue ' }}  /> */}
          {/* <FontAwesomeIcon icon={faCalendarCheck} style={{ fontSize: 15, color: 'Dodgerblue ' }}   /> */}
          <FontAwesomeIcon icon={faRupeeSign} style={{ fontSize: 15, color: 'black ' }} onClick={togglePayments}   />
        </Space>
      ),
    },
  ];
 
  const data = [
    {
      Date: "21-04-2021",
      category: 'Office Renovation',
      Jobid:'001',
      Jobname:'Paint Work ',
      Vendorname:'krish',
      Invoice:'001',
      Amount:'5000',
      PaymentType:'OneTime',
      Frequency:'NA',
      Balance:'1000',
      Status: <Button type="success" shape="round">Completed</Button>,

    },
   
  ];
  


  return (
    <Main>
      
      <PaymentModal isVisible={isPaymentModalVisible} handleOk={togglePayments} handleCancel={togglePayments} />
      <PageHeader
        ghost
        // buttons={
        //   [
        //       <Button
        //         size="small"
        //          onClick={toggleCreate}
        //         type="primary"
        //       >
        //         <FeatherIcon icon="plus" size={15} />
        //         Create 
        //       </Button>,
        //   ]
        // }
        title="Payments"
      />
    
      <Row gutter={20} justify="end">
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Search  placeholder="Search" style={{ width: '100%' }} size="middle" />
        </Col>

        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Select Institute" size="large">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </Col>

        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Category Type" size="large">
            <Option value="a">1</Option>
            <Option value="b">2</Option>
          </Select>
        </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Status Filter" size="large">
            <Option value="1">Active</Option>
            <Option value="2">In-Active</Option>
          </Select>
        </Col>
      </Row><br />
      <Row>
        <Col md={24} lg={24}>
          <Cards headless>
            <CustomTable col={columns} data={data} />
          </Cards>
        </Col>
      </Row>
    </Main>
  );
};

export default Payments;
