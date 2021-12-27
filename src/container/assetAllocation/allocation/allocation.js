import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton, Table } from 'antd';
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
  faTrashAlt,
  faCoins,
  faUsers,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faRupeeSign,
  faBell,
  faExchange,
  faListAlt
} from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
import TransferModal  from './transferModal';
import AllocationModal from '../allocationModal';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

const Allocation = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isAllocationModalVisible, setisAllocationModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleAllocation = () => {
    setisAllocationModalVisible(!isAllocationModalVisible);
  };

  //   };
  const [disable, setDisable] = useState(false);
  //   onChange={() => setDisable(true)}
  const columns = [
    {
      title: 'Employee Name',
      dataIndex: 'employeename',
      key: 'date',
    },
    {
      title: 'Department',
      dataIndex: 'department',
      key: 'subject',
    },
    {
      title: 'Designation',
      dataIndex: 'designation',
      key: 'subject',
    },
    {
      title: 'No.of Assets',
      dataIndex: 'noofassets',
      key: 'chapter',
    },
    {
      title: 'Category ',
      dataIndex: 'category',
      key: 'topic',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'assignment',
    },

    // {
    //   title: 'Action',
    //   key: 'action',
    //   width: '20%',

    //   render: (text, record) => (
    //     <Space size="middle">
    //       <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }}  />
    //       <FontAwesomeIcon icon={faPencilAlt} style={{ fontSize: 15, color: 'Dodgerblue ' }}  />
    //       <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'green ' }} />
    //     </Space>
    //   ),
    // },
  ];
  const expandcolumns = [
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'subject',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'subject',
    },
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'chapter',
    },
    {
      title: 'Make ',
      dataIndex: 'make',
      key: 'topic',
    },
    {
      title: 'Model No',
      dataIndex: 'modelno',
      key: 'assignment',
    },
    {
        title: 'Year of Make',
        dataIndex: 'year',
        key: 'assignment',
      },
      {
        title: 'status',
        dataIndex: 'status',
        key: 'assignment',
      },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faExchange} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleCreate} />
          <FontAwesomeIcon icon={faListAlt} style={{ fontSize: 15, color: 'Dodgerblue ' }}  />
          {/* <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'green ' }} /> */}
        </Space>
      ),
    },
  ];

  const expandData=[
      {
        date: '27/6/21 ',
        category: 'computer',
        type: 'Electronics',
        id: '7',
        make: 'DELL',
        modelno:'2',
        year:'2020',
        status: (
          <Button type="success" shape="round">
            Handover
          </Button>
        ),
      },
      {
        date: 'Murali ',
        category: 'VII',
        type: 'Teacher',
        id: '7',
        make: 'Electronics',
        modelno:'2',
        year:'2020',
        status: (
          <Button type="info" shape="round">
            In Possession
          </Button>
        ),
      },
  ]

  const data = [
    {
      employeename: 'Murali ',
      department: 'VII',
      designation: 'Teacher',
      noofassets: '7',
      category: 'Electronics',
      status: (
        <Button type="success" shape="round">
          Handover
        </Button>
      ),
    },
    {
      employeename: 'Murali ',
      department: 'VII',
      designation: 'Teacher',
      noofassets: '7',
      category: 'Electronics',
      status: (
        <Button type="danger" shape="round">
          pending
        </Button>
      ),
    },
  ];

  // function callback(key) {
  //   console.log('clicked tab key',key);
  // }

  return (
    <Main>
      <TransferModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
      <AllocationModal isVisible={isAllocationModalVisible} handleOk={toggleAllocation} handleCancel={toggleAllocation} />
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
        title="Allocation"
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
          <Button
            size="small"
            type="primary"
              onClick={toggleAllocation}
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
      </Row>
      <br />
      <Row>
        <Col md={24} lg={24}>
          <Cards headless>
            <Table
              expandable={{
                expandedRowRender: record => (
                  <Cards headless>
                    <CustomTable col={expandcolumns} data={expandData} />
                  </Cards>
                ),
              }}
              columns={columns}
              dataSource={data}
            />
          </Cards>
        </Col>
      </Row>
    </Main>
  );
};

export default Allocation;
