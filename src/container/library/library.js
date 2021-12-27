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
import BookModal from './bookModal';
import FineModal from './fineModal';
import DamageModal from './damageModal';
import SettingsModal from './settingsModal';
import IssueBookModal from './issueBookModal';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;

const Issued = () => {
  console.log("render Second");
  return "2";
};

function Library() {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isFineModalVisible, setisFineModalVisible] = useState(false);
  const [isDamageModalVisible, setisDamageModalVisible] = useState(false);
  const [isSettingsModalVisible, setisSettingsModalVisible] = useState(false);
  const [isIssueBookModalVisible, setisIssueBookModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleFine = () => {
    setisFineModalVisible(!isFineModalVisible);
  };
  const toggleDamage = () => {
    setisDamageModalVisible(!isDamageModalVisible);
  };
  const toggleSettings = () => {
    setisSettingsModalVisible(!isSettingsModalVisible);
  };
  const toggleIssue = () => {
    setisIssueBookModalVisible(!isIssueBookModalVisible);
  };
  const [disable, setDisable] = useState(false);
  //   onChange={() => setDisable(true)}
  const columns = [
    {
      title: 'ISBN',
      dataIndex: 'ISBN',
      key: 'date',
    },
    {
      title: 'Book Name',
      dataIndex: 'Bookname',
      key: 'subject',
    },
    {
      title: 'Genre',
      dataIndex: 'Genre',
      key: 'chapter',
    },
    {
      title: 'Author Name ',
      dataIndex: 'Authorname',
      key: 'topic',
    },
    {
      title: 'Rack Location',
      dataIndex: 'Racklocation',
      key: 'assignment',
    },
    {
      title: 'Qty in Stock',
      dataIndex: 'Qty',
      key: 'assignment',
    },
    {
      title: 'Book Issued',
      dataIndex: 'issued',
      key: 'assignment',
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
          <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
        </Space>
      ),
    },
  ];
  const IssuedBook = [
    {
      title: 'ISBN',
      dataIndex: 'ISBN',
      key: 'date',
    },
    {
      title: 'Book Name',
      dataIndex: 'Bookname',
      key: 'subject',
    },
    {
      title: 'Genre',
      dataIndex: 'Genre',
      key: 'chapter',
    },
    {
      title: 'Author Name ',
      dataIndex: 'Authorname',
      key: 'topic',
    },
    {
      title: 'Student Name',
      dataIndex: 'studentname',
      key: 'assignment',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'assignment',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'assignment',
    },
    {
      title: 'Issue Date',
      dataIndex: 'date',
      key: 'assignment',
    },
    {
      title: 'Validity',
      dataIndex: 'validity',
      key: 'assignment',
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
          <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
        </Space>
      ),
    },
  ];
  const Defaulters = [
    {
      title: 'ISBN',
      dataIndex: 'ISBN',
      key: 'date',
    },
    {
      title: 'Book Name',
      dataIndex: 'Bookname',
      key: 'subject',
    },
    {
      title: 'Genre',
      dataIndex: 'Genre',
      key: 'chapter',
    },
    {
      title: 'Author Name ',
      dataIndex: 'Authorname',
      key: 'topic',
    },
    {
      title: 'Student Name',
      dataIndex: 'studentname',
      key: 'assignment',
    },
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'assignment',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'assignment',
    },
    {
      title: 'Issue Date',
      dataIndex: 'date',
      key: 'assignment',
    },
    {
      title: 'Validity',
      dataIndex: 'validity',
      key: 'assignment',
    },
    {
      title: 'Delay',
      dataIndex: 'delay',
      key: 'assignment',
    },
    {
      title: 'Fine',
      dataIndex: 'fine',
      key: 'assignment',
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
        <div>
          <Button
            size="small"
            //  onClick={toggleCreate}
            type="primary"
            style={{ margin: '1px' }}
            onClick={toggleFine}
          >
            Pay Fine
          </Button>
          <Button
            size="small"
            //  onClick={toggleCreate}
            type="primary"
            style={{ margin: '1px' }}
            onClick={toggleDamage}
          >
            Damage
          </Button>
        </div>
      ),
    },
  ];
  const data = [
    {
      ISBN: 1,
      Bookname: 'Android Development',
      Genre: 'Android',
      Authorname: 'Ritchi',
      Racklocation: 'A',
      Qty: '10',
      issued: '2',
    },
    {
      ISBN: 2,
      Bookname: 'Python Development',
      Genre: 'Python',
      Authorname: 'Ritchi',
      Racklocation: 'A',
      Qty: '10',
      issued: '2',
    },
  ];
  const Bookdata = [
    {
      ISBN: 1,
      Bookname: 'Android Development',
      Genre: 'Android',
      Authorname: 'Ritchi',
      studentname: 'A',
      level: '10',
      class: '2',
      date: '27/6/21',
      validity: '27/7/21',
    },
    {
      ISBN: 1,
      Bookname: 'Android Development',
      Genre: 'Android',
      Authorname: 'Ritchi',
      studentname: 'A',
      level: '10',
      class: '2',
      date: '27/6/21',
      validity: '27/7/21',
    },
  ];
  const Defaulterdata = [
    {
      ISBN: 1,
      Bookname: 'Android Development',
      Genre: 'Android',
      Authorname: 'Ritchi',
      studentname: 'A',
      level: '10',
      class: '2',
      date: '27/6/21',
      validity: '27/7/21',
      delay: '1Week',
      fine: '10Rs',
      status: 'paid',
    },
    {
      ISBN: 1,
      Bookname: 'Android Development',
      Genre: 'Android',
      Authorname: 'Ritchi',
      studentname: 'A',
      level: '10',
      class: '2',
      date: '27/6/21',
      validity: '27/7/21',
      delay: '2Week',
      fine: '20Rs',
      status: 'unpaid',
    },
  ];

  // function callback(key) {
  //   console.log('clicked tab key',key);
  // }

 
  const tabClick=(key)=>{
    console.log('clicked tab key',key);
    if (key === "2"){
      console.log('tab 2 clicked')
        return(

       
        <Row  gutter={20} justify="end">
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Select Institute" optionFilterProp="children">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Genre" optionFilterProp="children">
            <Option value="1">LKG</Option>
            <Option value="2">UKG</Option>
            <Option value="3">PkG</Option>
          </Select>
        </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
            
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Level"
          
                   
                  >
                    <Option value="a">A</Option>
                    <Option value="b">B</Option>
                    <Option value="c">C</Option>
                  </Select>
                </Col>
        <Col xxl={3} lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="primary" onClick={toggleCreate}>
            <FeatherIcon icon="plus" size={15} />
            AddBook
          </Button>
        </Col>

        <Col xxl={3} lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="primary" onClick={toggleIssue}>
            <FeatherIcon icon="plus" size={15} />
            Issue Book
          </Button>
        </Col>
        
      </Row>
     )
    }
  }

  return (
    <Main>
      <BookModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
      <FineModal isVisible={isFineModalVisible} handleOk={toggleFine} handleCancel={toggleFine} />
      <DamageModal isVisible={isDamageModalVisible} handleOk={toggleDamage} handleCancel={toggleDamage} />
      <SettingsModal isVisible={isSettingsModalVisible} handleOk={toggleSettings} handleCancel={toggleSettings} />
      <IssueBookModal isVisible={isIssueBookModalVisible} handleOk={toggleIssue} handleCancel={toggleIssue} />
      {/* <PromotionModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} /> */}
      <PageHeader
        ghost
        buttons={[
          <Button
            size="small"
             onClick={toggleSettings}
            type="primary"
          >
            <FeatherIcon icon="plus" size={15} />
            Settings
          </Button>,
        ]}
        title="Library"
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
      {/* <br /> */}
     
      {/* <tabClick /> */}
      
      <Row  gutter={20} justify="end">
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Select Institute" optionFilterProp="children">
            <Option value="1">1</Option>
            <Option value="2">2</Option>
            <Option value="3">3</Option>
          </Select>
        </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
          <Select showSearch style={{ width: '100%' }} placeholder="Genre" optionFilterProp="children">
            <Option value="1">LKG</Option>
            <Option value="2">UKG</Option>
            <Option value="3">PkG</Option>
          </Select>
        </Col>
        <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
            
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Level"
          
                   
                  >
                    <Option value="a">A</Option>
                    <Option value="b">B</Option>
                    <Option value="c">C</Option>
                  </Select>
                </Col>
        <Col xxl={3} lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="primary" onClick={toggleCreate}>
            <FeatherIcon icon="plus" size={15} />
            AddBook
          </Button>
        </Col>

        <Col xxl={3} lg={3} md={3} sm={24} xs={24}>
          <Button size="small" type="primary" onClick={toggleIssue}>
            <FeatherIcon icon="plus" size={15} />
            Issue Book
          </Button>
        </Col>
        
      </Row>
      <Row>
        <Col md={24} lg={24}>
          <Tabs defaultActiveKey="1" onChange={tabClick}>
            <TabPane tab="Books" key="1">
              <Row>
                <Cards headless>
                  <CustomTable col={columns} data={data} />
                </Cards>
              </Row>
            </TabPane>

            <TabPane tab="Issued" key="2">
              <Row>
                <Cards headless>
                  <CustomTable col={IssuedBook} data={Bookdata} />
                </Cards>
              </Row>
            </TabPane>

            <TabPane tab="Defaulters" key="3">
              <Row>
                <Cards headless>
                  <CustomTable col={Defaulters} data={Defaulterdata} />
                </Cards>
              </Row>
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </Main>
  );
}

export default Library;
