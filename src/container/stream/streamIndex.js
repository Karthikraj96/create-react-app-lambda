import React, { lazy, Suspense, useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Select } from 'antd';
import { Input, Space, Drawer, Collapse, Row, Col } from 'antd';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import FeatherIcon from 'feather-icons-react';
import './index.css';
import CreateStreamModal from './streamModal';
import StreamData from './streamData';
const { Search } = Input;
const { Option } = Select;
const { Panel } = Collapse;

const provinceData = ['Matriculation', 'CBSE'];

const Course = () => {
  const routeChange = () => {};
  const callback = key => {
    console.log(key);
  };
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);

  const toggleCreateStream = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  return (
    <div>
      <PageHeader
        ghost
        title="Course"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" onClick={toggleCreateStream} type="primary">
              <FeatherIcon icon="plus" size={14} />
              Create Course
            </Button>
          </div>,
        ]}
      />
      <Main>
        <CreateStreamModal
          isVisible={isCreateModalVisible}
          handleOk={toggleCreateStream}
          handleCancel={toggleCreateStream}
        />
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            {/* <Cards headless> */}
            <Row gutter={25} style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Class{' '} */}
                <Select showSearch style={{ width: '100%' }} placeholder="Curriculum" optionFilterProp="children">
                  <Option value="1">Sate Board</Option>
                  <Option value="2">CBSE</Option>
                </Select>
              </Col>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Class{' '} */}
                <Select showSearch style={{ width: '100%' }} placeholder="Level" optionFilterProp="children">
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Col>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Section{' '} */}
                <Select showSearch style={{ width: '100%' }} placeholder="Subject" optionFilterProp="children">
                  <Option value="a">English</Option>
                  <Option value="b">Science</Option>
                  <Option value="c">History</Option>
                </Select>
              </Col>
            </Row>
            {/* </Cards> */}
          </Col>
        </Row>

        <StreamData />
      </Main>
    </div>
  );
};

export default Course;
