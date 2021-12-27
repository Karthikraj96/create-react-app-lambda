import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import { Fragment } from 'react';
import { Input, Space, Drawer } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import Filters from '../fee/dashboard/Components/Filters';
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
} from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
import {
  ChartjsPieChartSuggestions,
  ChartjsHorizontalChart,
  ChartjsStackedChart,
  ChartjsLineChart,
  ChartjsAreaChart,
  ChartjsBarChartTransparent,
  ChartjsDonutChart,
  ChartjsPieChart,
} from '../../components/charts/chartjs';
import ExpensesModal from './expensesModal';
import SettingsModal from './settingsModal';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Search } = Input;

function Expenses() {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isSettingsModalVisible, setisSettingsModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };

  const toggleSettings = () => {
    setisSettingsModalVisible(!isSettingsModalVisible);
  };
 
  const [disable, setDisable] = useState(false);
  //   onChange={() => setDisable(true)}
  const columns = [
    {
      title: 'S.no',
      dataIndex: 'sno',
      key: 'date',
    },
    {
      title: 'Institution',
      dataIndex: 'institution',
      key: 'subject',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'chapter',
    },
    {
      title: 'Particulars',
      dataIndex: 'particulars',
      key: 'topic',
    },
    {
      title: 'Expense Type',
      dataIndex: 'Expensestype',
      key: 'assignment',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'assignment',
    },
    {
      title: 'Proof of Receipt',
      dataIndex: 'receipt',
    
    },
    {
        title: 'Created By',
        dataIndex: 'created',
        key: 'assignment',
      },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          {/* <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} /> */}
          <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
        </Space>
      ),
    },
  ];
 
  const data = [
    {
      sno: 1,
      institution: 'institute 1',
      date: '27/6/21',
      particulars: 'Towards Travel Fuel',
      Expensestype: 'Reimbursement',
      amount: '25000',
      receipt:<FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />,
      created: 'Ramya',
    },
    {
        sno: 1,
        institution: 'institute 1',
        date: '03/6/21',
        particulars: 'Towards Travel Fuel',
        Expensestype: 'Reimbursement',
        amount: '25000',
        receipt:<FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />,
        created: 'Max',
      },
  ];
 
  return (
    <Main>
        <ExpensesModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
        <SettingsModal isVisible={isSettingsModalVisible} handleOk={toggleSettings} handleCancel={toggleSettings} />
      <PageHeader
        ghost
        buttons={[
            <Button
            size="small"
            type="primary"
            onClick={toggleSettings}
          >
            <FeatherIcon icon="settings" size={15} />
          </Button>,
          <Button
            size="small"
            type="primary"
            onClick={toggleCreate}
          >
            <FeatherIcon icon="plus" size={15} />
            Add Expenses
          </Button>,
        ]}
        title="Expenses"
      />

      <Row gutter={25}>
        <Col xxl={12} md={12} sm={24} xs={24}>
          <div className="overview-box">
            <Cards title="Graph for total books issued">
              <div className="d-flex align-items-center justify-content-between">
                <ChartjsStackedChart />
              </div>
            </Cards>
          </div>
        </Col>
        <Col md={12} sm={24} xs={24}>
          <Cards title="Graph for showing genre % issued">
            <ChartjsPieChart />
          </Cards>
        </Col>
      </Row>
      <Row  gutter={20} justify="end">
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Select Institute" size="large">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
        <DatePicker  style={{ width: '100%' }} placeholder="Enter the Date"  />
          {/* Class{' '} */}
          {/* <Select showSearch style={{ width: '100%' }} placeholder="Genre" optionFilterProp="children">
            <Option value="1">LKG</Option>
            <Option value="2">UKG</Option>
            <Option value="3">PkG</Option>
          </Select> */}
        </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
            
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Expenses Type"
                    size="large"
                    // optionFilterProp="children"
                   
                  >
                    <Option value="a">A</Option>
                    <Option value="b">B</Option>
                    <Option value="c">C</Option>
                  </Select>
                </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
        <Search placeholder="input search text" allowClear style={{ width: '100%' }} />
        </Col>

        
      </Row>
      <Row style={{marginTop:'1%'}}>
        <Col md={24} lg={24}>
        
              <Row>
                <Cards headless>
                  <CustomTable col={columns} data={data} />
                </Cards>
              </Row>
          
        </Col>
      </Row>
    </Main>
  );
}

export default Expenses;
