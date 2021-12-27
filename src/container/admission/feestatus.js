import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import { Fragment } from 'react';
import { Select } from 'antd';
import { Input, Space, Drawer, Collapse } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import Filters from '../fee/dashboard/Components/Filters';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
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
} from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import FeeStatusChart from './Charts/FeeStatus';
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
function FeeStatus() {
  const callback = key => {
    console.log(key);
  };
  const columns = [
    {
      title: 'SI. No',
      dataIndex: 'sino',
      key: 'sino',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },

    {
      title: 'Addmission No',
      dataIndex: 'addmissionno',
      key: 'addmissionno',
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Parent Name',
      dataIndex: 'parentname',
      key: 'parentname',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile',
      key: 'mobile',
    },
    {
      title: 'Fee',
      dataIndex: 'paid',
      key: 'paid',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];
  const data = [
    {
      sno: 1,
      date: '23/10/1995',
      addmissionno: 1234,
      batch: 'dept',
      name: 'Lokesh',
      class: '2',
      parentname: 'SHAM',
      source: 'Internet',
      mobile: '9566132344',
      paid: '56546',

      status: 'Paid',
    },
    {
      sno: 1,
      date: '23/10/1995',
      addmissionno: 1234,
      batch: 'dept',
      name: 'Lokesh',
      class: '2',
      parentname: 'SHAM',
      source: 'Internet',
      mobile: '9566132344',
      paid: '56546',

      status: 'Paid',
    },
    {
      sno: 1,
      date: '23/10/1995',
      addmissionno: 1234,
      batch: 'dept',
      name: 'Lokesh',
      class: '2',
      parentname: 'SHAM',
      source: 'Internet',
      mobile: '9566132344',
      paid: '56546',

      status: 'Paid',
    },
    {
      sno: 1,
      date: '23/10/1995',
      addmissionno: 1234,
      batch: 'dept',
      name: 'Lokesh',
      class: '2',
      parentname: 'SHAM',
      source: 'Internet',
      mobile: '9566132344',
      paid: '56546',

      status: 'Paid',
    },
  ];

  return (
    <div>
      <PageHeader ghost title="" />
      <Main>
        <Row>
          <Col sm={24} lg={24} xl={24} xxl={24}>
            <FeeStatusChart title="Fee Status" />
          </Col>
        </Row>
        <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Col style={{ marginRight: '15px' }}>
            <label>Date</label> &nbsp;
            <Select placeholder="Select Date" style={{ width: '150px' }}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Col>
          <Col style={{ marginRight: '15px' }}>
            <label>Academic Year</label> &nbsp;
            <Select placeholder="Select Year" style={{ width: '150px' }}>
              <Option value="2020-2021">2020-2021</Option>
              <Option value="2021-2022">2021-2022</Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards headless>
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Default List" key="1">
                  <CustomTable col={columns} data={data} />
                </TabPane>

                <TabPane tab="Current List" key="2">
                  <CustomTable col={columns} data={data} />
                </TabPane>
              </Tabs>
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
}

export default FeeStatus;
