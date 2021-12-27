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
import { Comment, Avatar } from 'antd';
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
import {
  ChartjsBarChart,
  ChartjsHorizontalChart,
  ChartjsStackedChart,
  ChartjsLineChart,
  ChartjsAreaChart,
  ChartjsBarChartTransparent,
  ChartjsDonutChart,
  ChartjsPieChart,
} from '../../components/charts/chartjs';
import './index.css';
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
function Response() {
  const callback = key => {
    console.log(key);
  };
  const ExampleComment = ({ children }) => (
    <Comment
      actions={[<span key="comment-nested-reply-to">Reply</span>]}
      author={<a>Han Solo</a>}
      avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" alt="Han Solo" />}
      content={
        <p>
          We supply a series of design principles, practical patterns and high quality design resources (Sketch and
          Axure).
        </p>
      }
    >
      {children}
    </Comment>
  );
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
      <PageHeader
        ghost
        title="Survey Responses"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary">
              <FeatherIcon icon="plus" size={14} />
              Show Stats
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards title="1.What are the staff courteous while you were here">
              <p>2 Responses</p>
              <ChartjsPieChart height="50px"/>
            </Cards>
            <Cards title="1.What are the staff courteous while you were here">
              <p>5 Responses</p>
              <ChartjsPieChart height="50px"/>
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
}

export default Response;
