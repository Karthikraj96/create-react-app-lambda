import React, { useState } from 'react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { Row, Col, Card, Divider, Modal, Input, Select, Space, TimePicker, Pagination, Collapse } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Main } from '../styled';
import { Fragment } from 'react';
import { Cards } from '../../components/cards/frame/cards-frame';
import AnnouncementModal from './announcementModal';
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

const { Option } = Select;
const { Panel } = Collapse;
const { Meta } = Card;

const toggle =()=>{
  console.log('button clicked');
  <Collapse bordered={false}>
   <Panel header="This is panel header 1" key="1">
      {text}
    </Panel>
  </Collapse>
  
  
 

}

const text = (


  
  
  
  <p style={{ paddingLeft: 24 }}>
    
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest
    in many households across the world.<span><a href="#" onClick ={toggle}>More</a></span>
    
  </p>

 
);
const Announcement = () => {
  const [disable, setDisable] = useState(false);

  const expand =(
    <div>
      {disable? (
        <div>
          <p style={{ paddingLeft: 24 }}>
    
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest
    in many households across the world.<a href="#" onClick={() => setDisable(false)}>Less</a>
  </p>
  
          </div>
      ):(
        <p style={{ paddingLeft: 24 }}>
    
    A dog is a type of domesticated animal. Known for its loyalty and faithfulness,<a href="#" onClick={() => setDisable(true)}>Read more</a>
    
  </p>
      )
      }
   </div>
  )

  const [disabletwo, setDisabletwo] = useState(false);

  const expandtwo =(
    <div>
      {disabletwo? (
        <div>
          <p style={{ paddingLeft: 24 }}>
    
          A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a welcome guest
    in many households across the world.<a href="#" onClick={() => setDisabletwo(false)}>Less</a>
  </p>
  
          </div>
      ):(
        <p style={{ paddingLeft: 24 }}>
    
    A dog is a type of domesticated animal.<a href="#" onClick={() => setDisabletwo(true)}>Read more</a>
    
  </p>
      )
      }
   </div>
  )


  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);

  const toggleCreate = () => {
    console.log('buttonclick');
    setisCreateModalVisible(!isCreateModalVisible);
  };
  return (
    <Fragment>
      <AnnouncementModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCreate} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Create
          </Button>,
        ]}
        title="Announcement"
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            {/* <Row gutter={25} style={{ justifyContent: 'flex-end', marginBottom: '20px' }}> */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              {/* <Col xxl={6} lg={6} md={6} sm={24} xs={24}> */}
              <Col className="gutter-row" span={6} xxl={6} lg={6} md={6} sm={24} xs={24}>
             
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Institute"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Col>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Class"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="1">1</Option>
                  <Option value="2">2</Option>
                  <Option value="3">3</Option>
                </Select>
              </Col>
              {/* <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
              Section{' '}
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select Section"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="a">A</Option>
                <Option value="b">B</Option>
                <Option value="c">C</Option>
              </Select>
            </Col> */}
              {/* <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
              Section{' '}
              <Select
                showSearch
                style={{ width: '100%' }}
                placeholder="Select Suject"
                optionFilterProp="children"
                onChange={onChange}
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="a">English</Option>
                <Option value="b">Hindi</Option>
                <Option value="c">Tamil</Option>
              </Select>
            </Col> */}
            </Row>
          </Col>
        </Row>
        <Row style={{ marginTop: '1%' }}>
          {/* <Cards headless> */}
            <Card title="Assignment one"  extra={
               <Space size="middle">
               <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
               <FontAwesomeIcon
                //  onClick={() => setisVisible(true)}
                 icon={faPencil}
                 style={{ fontSize: 15, color: 'green ' }}
               />
                <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
               </Space>
            } style={{ width: "100%" }}>
              
              <div>
                {expand}
              </div>
              
              <br />
              <Meta title="Institution | justnow | Post by"/>
            </Card></Row>

            <Row style={{ marginTop: '2%' }}>
            <Card title="Assignment Two"  extra={
               <Space size="middle">
               <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
               <FontAwesomeIcon
                //  onClick={() => setisVisible(true)}
                 icon={faPencil}
                 style={{ fontSize: 15, color: 'green ' }}
               />
                <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
               </Space>
            } style={{ width: "100%" }}>
              
              <div>
                {expandtwo}
              </div>
              
              <br />
              <Meta title="Institution | justnow | Post by"/>
            </Card>
          {/* </Cards> */}
        </Row>
      </Main>
    </Fragment>
  );
};

export default Announcement;
