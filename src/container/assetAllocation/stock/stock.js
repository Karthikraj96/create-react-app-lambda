import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Fragment } from 'react';
import { Input, Space, Drawer } from 'antd';
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
  faCodeBranch,
  faEdit,
  faListAlt
 
} from '@fortawesome/pro-duotone-svg-icons';
import AssetModal from '../stockModal';
import AllocateModal from './allocateModal';
import ReturnModal from './returnModal';
import EditModal from './editModal';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

const Stock = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isAllocationModalVisible, setisAllocationModalVisible] = useState(false);
  const [isReturnModalVisible, setisReturnModalVisible] = useState(false);
  const [isEditModalVisible, setisEditModalVisible] = useState(false);
//   const [isIssueBookModalVisible, setisIssueBookModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleAllocation = () => {
    setisAllocationModalVisible(!isAllocationModalVisible);
  };
  const toggleReturn = () => {
    setisReturnModalVisible(!isReturnModalVisible);
  };
  const toggleEdit = () => {
    setisEditModalVisible(!isEditModalVisible);
  };
//   const toggleIssue = () => {
//     setisIssueBookModalVisible(!isIssueBookModalVisible);
//   };
  const [disable, setDisable] = useState(false);
  //   onChange={() => setDisable(true)}
  const columns = [
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'date',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'subject',
    },
    {
        title: 'ID',
        dataIndex: 'id',
        key: 'subject',
      },
    {
      title: 'Make',
      dataIndex: 'make',
      key: 'chapter',
    },
    {
      title: 'Modal No ',
      dataIndex: 'modal',
      key: 'topic',
    },
    {
      title: 'Year of Manufacture',
      dataIndex: 'year',
      key: 'assignment',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'assignment',
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faCodeBranch} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleAllocation} />
          <FontAwesomeIcon icon={faListAlt} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleReturn} />
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: 15, color: 'green ' }} onClick={toggleEdit} />
        </Space>
      ),
    },
  ];
 
  const data = [
    {
        category: "Electron",
        type: 'Laptop',
        id:'001',
        make: 'Dell',
        modal: '3500',
        year: '2020',
        status: <Button type="success" shape="round">Active</Button>,
    },
    {
        category: "Electron",
        type: 'Laptop',
        id:'001',
        make: 'Dell',
        modal: '3500',
        year: '2020',
        status: <Button type="danger" shape="round">In-Active</Button>
    },
  ];
  
  // function callback(key) {
  //   console.log('clicked tab key',key);
  // }

  return (
    <Main>
      <AssetModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
      <AllocateModal isVisible={isAllocationModalVisible} handleOk={toggleAllocation} handleCancel={toggleAllocation} />
      <ReturnModal isVisible={isReturnModalVisible} handleOk={toggleReturn} handleCancel={toggleReturn} />
      <EditModal isVisible={isEditModalVisible} handleOk={toggleEdit} handleCancel={toggleEdit} />
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
        title="Assets Allocation"
      />
      <Row justify="space-around">
        <Col lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}
            45 Assets
          </Button>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}
            35 Possession
          </Button>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}7 Handover
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

export default Stock;
