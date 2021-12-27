import React, { useState } from 'react';
import { Row, Col, Card,Select, Space} from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Main } from '../styled';
import CustomTable from '../fee/dashboard/Components/Table';
import {
  faPencil,
  faTrash,
} from '@fortawesome/pro-duotone-svg-icons';
import ClassModal from './classroomModal';
const { Option } = Select;

const columns = [
  {
    title: 'Level',
    dataIndex: 'level',
    key: 'level',
  },
  {
    title: 'Class',
    dataIndex: 'class',
    key: 'class',
  },
  {
    title: 'Total Student',
    dataIndex: 'totalstudent',
    key: 'student',
  },
  {
    title: 'Vacancy',
    dataIndex: 'vacancy',
    key: 'vacancy',
  },
  {
    title: 'Total Present',
    dataIndex: 'totalpresent',
    key: 'present',
  },
  {
    title: 'Teacher',
    dataIndex: 'teacher',
    key: 'teacher',
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
    sino: 1,
    instution: 'I',
    level: 'PKG',
    subject: 'English',
  },
  {
    sino: 2,
    instution: 'II',
    level: 'LKG',
    subject: 'English',
  },
  {
    sino: 3,
    instution: 'III',
    level: 'III',
    subject: 'English',
  },
];

const Classroom = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const toggleCreate = () => {
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
        <ClassModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
        <div className="site-card-border-less-wrapper">
          <Row>
            <Col span={24}>
              <div style={{ backgroundColor: 'white' }}>
                <Row>
                  <Col span={8}>
                    {' '}
                    <span style={{ fontSize: 20, paddingLeft: 8 }}>Level</span>
                    <br />
                    <Select defaultValue="Current Announcement" style={{ width: 500, marginTop: 8, paddingLeft: 5 }}>
                      <Option>Announcement-1</Option>
                    </Select>
                  </Col>
                  <br />
                </Row>
                <Row gutter={[16, 16]} style={{ marginTop: 5 }}>
                  <Col span={8}>
                    <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
                      <Card title="Classrooms" bordered={true} style={{ width: 300 }}>
                        <span>10</span>
                      </Card>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
                      <Card title="Students" bordered={true} style={{ width: 300 }}>
                        <span>10</span>
                      </Card>
                    </div>
                  </Col>
                  <Col span={8}>
                    <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
                      <Card title="Vacancy" bordered={true} style={{ width: 300 }}>
                        <span>10</span>
                      </Card>
                    </div>
                  </Col>
                </Row>
                <Row style={{ marginBottom: '20px' }}>
                  {/* <Col span={12} style={{ fontSize: 30 }} push={8}>Announcement</Col> */}
                  <Col span={24} style={{ textAlign: 'end', paddingRight: 5 }}>
                    {' '}
                    <Button size="small" type="primary" onClick={toggleCreate}>
                      <FeatherIcon icon="plus" size={14} />
                      Create Class
                    </Button>
                  </Col>
                </Row>
                <Row>
                  <Col span={24}>
                    <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
                      <CustomTable col={columns} data={data} />
                    </div>
                  </Col>
                </Row>
                {/* <CustomTable col={columns} data={data}/> */}
              </div>
            </Col>
          </Row>
        </div>
      </Main>
    </div>
  );
};

export default Classroom;
