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
  faPaperclip,
  faCoins,
  faUsers,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faRupeeSign,
  faBell,
} from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import AttachmentsModal from './NewAttachmentModal';
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;
function AdmissionDoc() {
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
      title: 'Mobile No',
      dataIndex: 'mobile',
      key: 'mobile',
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faPaperclip}
            onClick={() => setisVisible(true)}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
        </Space>
      ),
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
  const [isVisible, setisVisible] = useState(false);
  const handleCancel = () => {
    setisVisible(false);
  };

  const handleOk = () => {
    setisVisible(false);
  };
  return (
    <div>
      <PageHeader ghost title="Addmission Documents" />
      <AttachmentsModal isVisible={isVisible} handleCancel={handleCancel} handleOk={handleOk} />
      <Main>
        <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Col style={{ marginRight: '15px' }}>
            <label>Class</label> &nbsp;
            <Select placeholder="Select Class" style={{ width: '150px' }}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Col>
          <Col style={{ marginRight: '15px' }}>
            <label>Institute</label> &nbsp;
            <Select placeholder="Select Institute" style={{ width: '150px' }}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Col>
          <Col style={{ marginRight: '15px' }}>
            <label>Level</label> &nbsp;
            <Select placeholder="Select Level" style={{ width: '150px' }}>
              <Option value="I">I</Option>
              <Option value="II">II</Option>
            </Select>
          </Col>
          <Col style={{ marginRight: '5px' }}>
            <Search placeholder="Search" style={{ width: '180px', height: '38px' }} />
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards headless>
              <CustomTable col={columns} data={data} />
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
}

export default AdmissionDoc;
