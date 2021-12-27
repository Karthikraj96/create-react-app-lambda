import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import { Fragment } from 'react';
import { Input, Space, Drawer } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import Filters from '../fee/dashboard/Components/Filters';
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
  faCodeBranch,
  faEdit,
  faListAlt
 
} from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;
import VendorModal from './vendorModal';
import VendorProfileModal from './vendorProfileModal';

const VendorList = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isProfileModalVisible, setisProfileModalVisible] = useState(false);
//   const [isReturnModalVisible, setisReturnModalVisible] = useState(false);
//   const [isEditModalVisible, setisEditModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleProfile=()=>{
    setisProfileModalVisible(!isProfileModalVisible);
  }

//   const toggleAllocation = () => {
//     setisAllocationModalVisible(!isAllocationModalVisible);
//   };
//   const toggleReturn = () => {
//     setisReturnModalVisible(!isReturnModalVisible);
//   };
//   const toggleEdit = () => {
//     setisEditModalVisible(!isEditModalVisible);
//   };


  const columns = [
    {
      title: 'Vendor Name',
      dataIndex: 'vendorname',
      key: 'date',
      width: '12%'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'subject',
    },
    {
        title: 'Date of Start',
        dataIndex: 'start',
        key: 'subject',
        width: '12%'
      },
    {
      title: 'Contact Name',
      dataIndex: 'contactname',
      key: 'chapter',
      width: '12%'
    },
    {
      title: 'Number ',
      dataIndex: 'number',
      key: 'topic',
    },
    {
      title: 'Designation ',
      dataIndex: 'designation',
      key: 'assignment',
    },
    {
        title: 'Contract Value ',
        dataIndex: 'value',
        key: 'assignment',
        width: '15%'
      },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'assignment',
    },

    {
      title: 'Action',
      key: 'action',
      width: '15%',

      render: (text, record) => (
        <Space size="middle">   
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleProfile} />      
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: 15, color: 'green ' }}  />
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }}  />
        </Space>
      ),
    },
  ];
 
  const data = [
    {
        vendorname: "Ventures LLP",
        category: 'Painting ',
        start:'03-11-2021 ',
        contactname: 'Krishna ',
        number: '9962611818 ',
        designation: 'CEO ',
        value:'45000 ',
        status: <Button type="success" shape="round">Active</Button>,
    },
  
  ];


  return (
    <Main>
         <VendorModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
         <VendorProfileModal isVisible={isProfileModalVisible} handleOk={toggleProfile} handleCancel={toggleProfile} />
         
      <PageHeader
        ghost
        buttons={
          [
            //   <Button
            //     size="small"
            //     //  onClick={toggleSettings}
            //     type="primary"
            //   >
            //     <FeatherIcon icon="plus" size={15} />
            //     Settings
            //   </Button>,
          ]
        }
        title="Vendor List"
      />
      <Row justify="space-around">
        <Col lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}
            45 Vendors
          </Button>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}
            315 Contracts
          </Button>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}35,33,000/-
          </Button>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="primary"
          onClick={toggleCreate}
          >
            <FeatherIcon icon="plus" size={15} />
            AddNew
          </Button>
        </Col>
      </Row>
      <br />
      <Row gutter={20} justify="end">
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Search placeholder="Search" style={{ width: '100%' }} size="small" />
        </Col>

        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Select Institute" size="small">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </Col>

        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Category Type">
            <Option value="a">1</Option>
            <Option value="b">2</Option>
          </Select>
        </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Status Filter">
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

export default VendorList;
