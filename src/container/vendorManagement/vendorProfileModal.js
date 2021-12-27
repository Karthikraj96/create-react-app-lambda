import React, { useState } from 'react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { Row, Col, Card, Divider, Modal, Input, Select, Space, TimePicker, Pagination } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Main } from '../styled';
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
  faTrophyAlt,
} from '@fortawesome/pro-duotone-svg-icons';
const { Option } = Select;



function VendorProfileModal({ isVisible, handleOk, handleCancel }) {
    return (
      <Modal destroyOnClose={true}
        style={{ top: 20 }}
        title="Vendor Profile"
        visible={isVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        // okText="Create"
        // cancelText="Cancel"
        width={800}
      >
          <div>
      <PageHeader
        ghost
        // buttons={[
        //   <Button size="small" type="primary">
        //     <FeatherIcon icon="plus" size={15} />
        //     Allocate
        //   </Button>,
        // ]}
        title={[
            <p>Vendor Name:Ventures LLP </p>,
            <p> Category:Painting</p>
        ]}
      />
      <Main>
        

        <Cards headless>
          <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }} style={{ padding: '1%' }}>
            <Col className="gutter-row" span={6}>
              <div>
                <span>Stats_Contracts</span>
              </div>
            </Col>
          </Row>
        </Cards>

        <Cards headless>
          <Row gutter={{ xs: 24, sm: 24, md: 24, lg: 32 }} style={{ padding: '1%' }}>
            <Col className="gutter-row" span={24}>
              <div>
                <p>Contact Name:</p>
                <p>Designation:</p>
                <p>Contact Number:</p>
                <p>Address:</p>
                <p>GST No:</p>
              </div>
            </Col>
          </Row>
        </Cards>

        <Row justify="space-between">
        <Col lg={6} md={6} sm={24} xs={24}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}
            No. Years of Service
          </Button>
        </Col>
        <Col lg={6} md={6} sm={24} xs={24}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}
            No. of Contracts Awarded
          </Button>
        </Col>
        <Col lg={6} md={6} sm={24} xs={24}>
          <Button size="small" type="info">
          Total Value Earned
          </Button>
        </Col>
      </Row>
       <br />
      <Cards headless>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ padding: '1%' }}>
            <Col className="gutter-row" span={6}>
              <div>
                <span>Overall Rating:</span>
              </div>
            </Col>
          </Row>
        </Cards>
        {/* <br /> */}
        <Row justify="space-between">
        <Col lg={3} md={3} sm={24} xs={24} span={6}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}
            Communication
          </Button>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24} span={6}>
          <Button size="small" type="info">
            {/* <FeatherIcon icon="plus" size={15} /> */}
            Product Quality
          </Button>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24} span={6}>
          <Button size="small" type="info">
          On-Time Delivery
          </Button>
        </Col>
        <Col lg={3} md={3} sm={24} xs={24} span={6}>
        <Button size="small" type="info">
        Price
          </Button>
        </Col>
      </Row>
      </Main>
    </div>
      </Modal>
    );
  }
  
  export default VendorProfileModal;
