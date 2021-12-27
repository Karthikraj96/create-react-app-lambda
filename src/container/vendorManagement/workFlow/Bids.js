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
  faPlusCircle,
  faEye,
  faPencilAlt,
  faCodeBranch,
  faEdit,
  faListAlt
 
} from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
import CreateBids  from './createBidsModal';
import ProposalModal from './bidsProposalModal';
import ViewProposalModal from './bidsViewProposalModal';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

const Bids = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isProposalModalVisible, setisProposalModalVisible] = useState(false);
  const [isViewProposalModalVisible, setisViewProposalModalVisible] = useState(false);

  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleProposal =()=>{
    setisProposalModalVisible(!isProposalModalVisible)
  }
  const toggleViewProposal=()=>{
    setisViewProposalModalVisible(!isViewProposalModalVisible)
  }
  // const toggleAllocation = () => {
  //   setisAllocationModalVisible(!isAllocationModalVisible);
  // };
 

 
  const columns = [
    {
      title: 'Date ',
      dataIndex: 'Date',
      key: 'date',
      width: '15%'
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'date',
      width: '15%'
      
    },
    {
      title: 'Job Name',
      dataIndex: 'Jobname',
      key: 'subject',
      width: '12%'
    },
    {
        title: 'Description ',
        dataIndex: 'Description',
        key: 'subject',
        width: '18%'
      },
    {
      title: 'Requirement ',
      dataIndex: 'Requirement',
      key: 'chapter',
    },
    {
      title: 'Qty  ',
      dataIndex: 'Qty',
      key: 'topic',
    },
    {
      title: 'Deadline',
      dataIndex: 'Deadline',
      key: 'assignment',
      width: '12%'
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
        
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: 15, color: 'green ' }}  />
            <FontAwesomeIcon icon={faPlusCircle} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleProposal}  />
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'green ' }} onClick={toggleViewProposal}  /> 
        </Space>
      ),
    },
  ];
 
  const data = [
    {
      Date: "21-04-2021",
      category: 'Office Renovation',
      Jobname:'Paint Work ',
      Description:'Paint Work  for walls',
      Requirement:'paint',
      Qty: '12',
      Deadline:'14-04-21',
        status: <Button type="success" shape="round">Active</Button>,
    },
   
  ];
  


  return (
    <Main>
      
      <CreateBids isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
      <ProposalModal isVisible={isProposalModalVisible} handleOk={toggleProposal} handleCancel={toggleProposal} />
      <ViewProposalModal isVisible={isViewProposalModalVisible} handleOk={toggleViewProposal} handleCancel={toggleViewProposal} />
      <PageHeader
        ghost
        buttons={
          [
              <Button
                size="small"
                 onClick={toggleCreate}
                type="primary"
              >
                <FeatherIcon icon="plus" size={15} />
                Create New
              </Button>,
          ]
        }
        title="Vendor Bids"
      />
    
      <Row gutter={20} justify="end">
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Search  placeholder="Search" style={{ width: '100%' }} size="small" />
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

export default Bids;
