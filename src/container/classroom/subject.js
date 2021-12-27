import React, { useState } from 'react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { Row, Col, Card, Divider, Modal, Input, Select, Space, TimePicker, Pagination } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Main } from '../styled';
import SubjectModal from './subjectModal';
import CustomTable from '../fee/dashboard/Components/Table';
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
  faPaperclip,
} from '@fortawesome/pro-duotone-svg-icons';

const { Option } = Select;

const columns = [
  {
    title: 'Class',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Code',
    dataIndex: 'code',
    key: 'code',
  },
  {
    title: 'Subject Name',
    dataIndex: 'subjectname',
    key: 'subject',
  },
  {
    title: 'Subject Type',
    dataIndex: 'subjecttype',
    key: 'type',
  },
  {
    title: 'Chapter',
    dataIndex: 'chapter',
    key: 'chapter',
  },
  {
    title: 'Action',
    key: 'action',
    width: '20%',

    render: (text, record) => (
      <Space size="middle">
        <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
      </Space>
    ),
  },
];

const data = [
  {
    class: 'V',
    code: '001',
    subjectname: 'Tamil',
    subjecttype: 'Theory',
    chapter: (
      <Link to="/admin/subjectdata">
        <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }} />
        View
      </Link>
    ),
  },
  {
    class: 'V',
    code: '002',
    subjectname: 'Science',
    subjecttype: 'Theroy',
    chapter: (
      <Link to="/admin/subjectdata">
        <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }} />
        View
      </Link>
    ),
  },
];

const Subject = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const toggleCreate = () => {
    console.log('buttonclick');
    setisCreateModalVisible(!isCreateModalVisible);
  };
  return (
    <div>
      <PageHeader
        ghost
        title="Menu"
        buttons={[
          <div key="1" className="page-header-actions">
            <span style={{ fontSize: 15 }}>Admin</span>
            <Button size="small">
              <FeatherIcon icon="user" size={14} />
              Logo
            </Button>
          </div>,
        ]}
      />
      <Main>
        <SubjectModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
        <div className="site-card-border-less-wrapper">
          <Row style={{ marginBottom: '20px' }} >
            <Col span={12} style={{ fontSize: 30 }} push={8} xxl={24} md={24} sm={24} xs={24}>
              {' '}
              Subject
            </Col>
            <Col span={12} style={{ textAlign: 'end' }} xxl={24} md={24} sm={24} xs={24}>
              {' '}
              <Button size="small" type="primary" onClick={toggleCreate}>
                <FeatherIcon icon="plus" size={14} />
                Create Subject
              </Button>
            </Col>
          </Row>

          <Row>
            <Col span={24} style={{ marginTop: 10 }}>
              <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
                <Select defaultValue="Current Announcement" style={{ width: 300 }}>
                  <Option>Announcement-1</Option>
                </Select>
                <Row>
                  <Col span={24} style={{ marginTop: 10 }}>
                    <CustomTable col={columns} data={data} />
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
      </Main>
    </div>
  );
};

export default Subject;
