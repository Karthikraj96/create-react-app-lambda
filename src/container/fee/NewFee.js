import React, { Fragment, useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Label } from 'reactstrap';

import { Row, Col, Skeleton, Card, Space, Input, Button, Tooltip, DatePicker, Table, Icon } from 'antd';
import Filters from './dashboard/Components/Filters';
import CustomTable from './dashboard/Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCog,
  faDownload,
  faEnvelope,
  faPencil,
  faPlus,
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
} from '@fortawesome/pro-duotone-svg-icons';
import './dashboard/index.css';
import { Select } from 'antd';
import { H2 } from '../../components/heading/style';
import { Cards } from '../../components/cards/frame/cards-frame';
import NewFeeDrawer from './NewFeeDrawer';
const { Option } = Select;

const Term_columns = [
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'schedule',
  },
  {
    title: 'Fee Term Type',
    dataIndex: 'termtype',
    key: 'feetype',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    key: 'amount',
  },
];

const Term_data = [
  {
    date: '27/5/20201',
    termtype: 'T1,T2',
    amount: '2000',
  },
  {
    date: '27/6/20201',
    termtype: 'T1,T2',
    amount: '2000',
  },
  {
    date: '27/7/20201',
    termtype: 'T1,T2',
    amount: '2000',
  },
  {
    date: '27/8/20201',
    termtype: 'T1,T2',
    amount: '2000',
  },
  {
    date: '27/9/20201',
    termtype: 'T1,T2',
    amount: '2000',
  },
  {
    date: '27/10/20201',
    termtype: 'T1,T2',
    amount: '2000',
  },
];

// const expandedRow = row => {
//   console.log(row);
//   let inTable = row.key == 1 ? data1 : row.key == 2 ? data2 : data3;
//   return <Table columns={columns} dataSource={inTable} pagination={false} />;
// };

function NewCourseFee() {
  const [count, setCount] = useState(1);
  const [disable, setDisable] = useState(false);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const toggleProfile = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };

  const columns = [
    {
      title: 'Schedule Type',
      dataIndex: 'schedule',
      key: 'schedule',
      width: '20%',
    },
    {
      title: 'Fee Type',
      dataIndex: 'feetype',
      key: 'feetype',
    },
    {
      title: 'Installments',
      dataIndex: 'installments',
      key: 'installments',
    },
    {
      title: 'Fee Date',
      dataIndex: 'feedate',
      key: 'feedate',
    },
    {
      title: 'Validity',
      dataIndex: 'validity',
      key: 'validity',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleProfile} />
          <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
        </Space>
      ),
    },
  ];

  const Montly = () => {
    console.log('buttonclick');
    return (
      <Row gutter={25}>
        <Cards headless>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <div>
              <label>Recurring</label>
              <br />
              <Select placeholder="select type" style={{ width: '100%' }}>
                <Option key="yes">Yes</Option>
                <Option key="no">No</Option>
              </Select>
            </div>
          </Col>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <div>
              <label>Fee Date</label>
              <br />
              <DatePicker style={{ width: '100%' }} />
            </div>
          </Col>
        </Cards>
        <Col xxl={24} md={24} sm={24} xs={24}>
          <CustomTable col={Term_columns} data={Term_data} />
        </Col>
      </Row>
    );
  };

  const data3 = [
    {
      key: 1,
      schedule: 'Annual',
      feetype: 'T1,T2',
      installments: '1',
      feedate: '04/6/21',
      validity: 'To',
    },
    {
      key: 2,
      // onChange={() => setDisable(true)}
      schedule: (
        // // <Montly />

        <Select placeholder="select type" style={{ width: '100%' }} size="large">
          <Option key="annual">Annual</Option>
          <Option key="month">Monthly</Option>
        </Select>
      ),
      feetype: 'T1,T2',
      installments: <Input placeholder="Enter your Installments" style={{ width: '100%' }} />,
      feedate: <DatePicker style={{ width: '100%' }} />,
      validity: 'To',
      description: (
        <Row gutter={25}>
          <Cards headless>
            <Col xxl={24} md={24} sm={24} xs={24}>
              <div>
                <label>Recurring</label>
                <br />
                <Select placeholder="select type" style={{ width: '100%' }}>
                  <Option key="yes">Yes</Option>
                  <Option key="no">No</Option>
                </Select>
              </div>
              <br />
            </Col>
            <Col xxl={24} md={24} sm={24} xs={24}>
              <div>
                <label>Fee Date</label>
                <br />
                <DatePicker style={{ width: '100%' }} />
              </div>
            </Col>
          </Cards>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <CustomTable col={Term_columns} data={Term_data} pagination={false} />
          </Col>
        </Row>
      ),
    },
  ];

  // const expandedRow = row => {
  //   console.log(row);
  //   let inTable = row.key == 1 ? data1 : row.key == 2 ? data2 : data3;
  //   return <Table columns={columns} dataSource={inTable} pagination={false} />;
  // };

  const NewFee = () => {
    return (
      <Card
        style={{ width: '100%' }}
        title="Create Course Fee"
        extra={
          <Space size="middle">
            <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
            <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
          </Space>
        }
      >
        <Row style={{ background: '#f2f3f6', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
          <Col sm={8} xs={8} lg={14} xl={14} xxl={14}>
            Select Level - &nbsp;
            <Select placeholder="Select Batch" style={{ width: '80%' }}>
              <Option value="I">I</Option>
              <Option value="II">II</Option>
            </Select>
          </Col>

          <Col
            style={{ marginTop: '10px', textAlign: 'center', fontSize: '14px', fontWeight: 'bold' }}
            sm={8}
            xs={8}
            lg={10}
            xl={10}
            xxl={10}
          >
            Total Amount- 1000
          </Col>
        </Row>
        <div className="another_main_card">
          <Row>
            <Col sm={8} xs={8} lg={8} xl={8} xxl={8}>
              <Label>Fee Type</Label>
              <Select placeholder="Select Type" style={{ width: '250px', marginLeft: '5px' }}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
              </Select>
            </Col>
            <Col
              style={{ marginTop: '10px', fontSize: '14px', fontWeight: 'bold' }}
              sm={4}
              xs={4}
              lg={4}
              xl={4}
              xxl={4}
            >
              <span>Total Amount -</span>&nbsp;
              <span>rs.100</span>
            </Col>
          </Row>
          <Row style={{ marginTop: '13px' }}>
            <Col sm={8} xs={8} lg={8} xl={8} xxl={8}>
              {/* <H2 style={{ color: '#5F63F2' }}>
                Particulars &nbsp; &nbsp;
                <span style={{ color: 'black', fontSize: '14px' }}>
                  <input type="checkbox" />
                  &nbsp; Same as the above
                </span>
              </H2> */}
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Particulars &nbsp; &nbsp; </span>
              <span style={{ color: 'black', fontSize: '14px' }}>
                <input type="checkbox" />
                &nbsp; Same as the above
              </span>
              <Select placeholder="Select Type" style={{ width: '80%', marginTop: '7%' }}>
                <Option value="1">1</Option>
                <Option value="2">2</Option>
              </Select>
            </Col>

            <Col style={{ marginLeft: '20px' }} sm={10} xs={10} lg={10} xl={10} xxl={10}>
              <div className="another_main_col_div">
                <Input style={{ width: '300px', height: '40px' }} placeholder="Amount" />
              </div>
            </Col>
            <Col sm={4} xs={4} lg={4} xl={4} xxl={4}>
              <div style={{ top: '45px' }} className="another_main_col_div_action">
                <Tooltip title="Add Fee Type">
                  {/* <Button
                    type="primary"
                    shape="circle"

                    // icon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 15 }} />}
                  ></Button> */}
                  <FontAwesomeIcon icon={faPlus} style={{ fontSize: 25, color: 'blue' }} />
                </Tooltip>
              </div>
            </Col>
          </Row>
        </div>
        <Row style={{ marginTop: '10px' }} justify="end">
          <Button type="primary" onClick={() => setCount(count + 1)}>
            Create New Fee Type
          </Button>
        </Row>
      </Card>
    );
  };

  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(<NewFee />);
  }
  return (
    <Fragment>
      <NewFeeDrawer isVisible={isCreateModalVisible} handleCancel={toggleProfile} />
      <Main style={{ marginTop: '20px' }}>
        <Row gutter={25}>
          {data}
          <br />
          {/* <Card style={{ width: '100%' }} title="Create Course Fee">
            <Row style={{ background: '#f2f3f6', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}>
              <Col sm={8} xs={8} lg={14} xl={14} xxl={14}>
                Select Level - &nbsp;
                <Select placeholder="Select Batch" style={{ width: '80%' }}>
                  <Option value="I">I</Option>
                  <Option value="II">II</Option>
                </Select>
              </Col>

              <Col style={{ marginTop: '10px', textAlign: 'center' }} sm={8} xs={8} lg={10} xl={10} xxl={10}>
                Total Amount- 1000
              </Col>
            </Row>
            <div className="another_main_card">
              <Row>
                <Col sm={8} xs={8} lg={8} xl={8} xxl={8}>
                  <Label>Fee Type</Label>
                  <Select placeholder="Select Type" style={{ width: '250px', marginLeft: '5px' }}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                </Col>

                <Col style={{ marginLeft: '20px' }} sm={10} xs={10} lg={10} xl={10} xxl={10}>
                  <Label>Title</Label>&nbsp;
                  <Input style={{ width: '300px', height: '40px', marginLeft: '5px' }} placeholder="Basic usage" />
                </Col>
                <Col style={{ marginTop: '10px' }} sm={4} xs={4} lg={4} xl={4} xxl={4}>
                  <span>Total Amount -</span>&nbsp;
                  <span>rs.100</span>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col sm={8} xs={8} lg={8} xl={8} xxl={8}>
                  <H2 style={{ color: '#5F63F2' }}>
                    Particulars &nbsp; &nbsp;
                    <span style={{ color: 'black', fontSize: '14px' }}>
                      <input type="checkbox" />
                      &nbsp; Same as the above
                    </span>
                  </H2>
                  <Select placeholder="Select Type" style={{ width: '80%' }}>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                  </Select>
                </Col>

                <Col style={{ marginLeft: '20px' }} sm={10} xs={10} lg={10} xl={10} xxl={10}>
                  <div className="another_main_col_div">
                    <Input style={{ width: '300px', height: '40px' }} placeholder="Title" />
                  </div>
                </Col>
                <Col sm={4} xs={4} lg={4} xl={4} xxl={4}>
                  <div style={{ top: '45px' }} className="another_main_col_div_action">
                    <Tooltip title="Add Fee Type">
                      <Button
                        type="primary"
                        shape="circle"
                        icon={<FontAwesomeIcon icon={faPlus} style={{ fontSize: 15 }} />}
                      />
                    </Tooltip>
                  </div>
                </Col>
              </Row>
            </div>
            <Row style={{ marginTop: '10px' }}>
              <Button type="primary" block>
                Create New Fee Type
              </Button>
            </Row>
          </Card> */}
        </Row>
        <Row style={{ marginTop: '10px' }} gutter={25}>
          <Card style={{ width: '100%' }} title="Fee Breakup">
            <Row>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                <p>T1</p>
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                Term1
              </Col>
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                Total Amount - 1000
              </Col>
            </Row>
            <Row>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Particulars &nbsp; &nbsp; </span>
              <span style={{ color: 'black', fontSize: '14px' }}></span>
              {/* <H2 style={{ color: '#5F63F2' }}>
                Particulars &nbsp; &nbsp;
                <span style={{ color: 'black', fontSize: '14px' }}>
                  <input type="checkbox" />
                  &nbsp; Same as the above
                </span>
              </H2> */}
            </Row>
            <br />
            <Row>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                Bus
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                <Input style={{ width: '300px', height: '40px' }} placeholder="Price" />
              </Col>
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                </Tooltip>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                Book
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                <Input style={{ width: '300px', height: '40px' }} placeholder="Price" />
              </Col>
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                </Tooltip>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                Note
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                <Input style={{ width: '300px', height: '40px' }} placeholder="Price" />
              </Col>
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                </Tooltip>
              </Col>
            </Row>
            <br />
            <hr />
            <br />

            <Row>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                <p>T1</p>
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                Term1
              </Col>
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                Total Amount - 1000
              </Col>
            </Row>
            <Row>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>Particulars &nbsp; &nbsp; </span>
              <span style={{ color: 'black', fontSize: '14px' }}></span>
              {/* <H2 style={{ color: '#5F63F2' }}>
                Particulars &nbsp; &nbsp;
                <span style={{ color: 'black', fontSize: '14px' }}>
                  <input type="checkbox" />
                  &nbsp; Same as the above
                </span>
              </H2> */}
            </Row>
            <br />
            <Row>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                Bus
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                <Input style={{ width: '300px', height: '40px' }} placeholder="Price" />
              </Col>
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                </Tooltip>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                Book
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                <Input style={{ width: '300px', height: '40px' }} placeholder="Price" />
              </Col>
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                </Tooltip>
              </Col>
            </Row>
            <br />
            <Row>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                Note
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                <Input style={{ width: '300px', height: '40px' }} placeholder="Price" />
              </Col>
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                </Tooltip>
              </Col>
            </Row>
          </Card>
        </Row>
        <Row style={{ marginTop: '10px' }} gutter={25}>
          <Card style={{ width: '100%' }} title="Total">
            <Row>
              {/* <Col sm={8} xs={8} lg={8} xl={8} xxl={8}> */}
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                1
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                {/* <Col style={{ marginLeft: '20px' }} sm={10} xs={10} lg={10} xl={10} xxl={10}> */}
                7,5090
              </Col>
              {/* <Col sm={24} xs={24} lg={4} xl={4} xxl={4}> */}
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                </Tooltip>
              </Col>
            </Row>
            <br />

            <Row>
              {/* <Col sm={8} xs={8} lg={8} xl={8} xxl={8}> */}
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                1
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                {/* <Col style={{ marginLeft: '20px' }} sm={10} xs={10} lg={10} xl={10} xxl={10}> */}
                7,5090
              </Col>
              {/* <Col sm={24} xs={24} lg={4} xl={4} xxl={4}> */}
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                </Tooltip>
              </Col>
            </Row>
            <br />

            <Row>
              {/* <Col sm={8} xs={8} lg={8} xl={8} xxl={8}> */}
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                1
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                {/* <Col style={{ marginLeft: '20px' }} sm={10} xs={10} lg={10} xl={10} xxl={10}> */}
                7,5090
              </Col>
              {/* <Col sm={24} xs={24} lg={4} xl={4} xxl={4}> */}
              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                <Tooltip title="Delete Type">
                  {/* <Button
                    type="primary"
                    shape="circle"
                    icon={<FontAwesomeIcon icon={faTrash} style={{ fontSize: 15 }} />}
                  /> */}
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                </Tooltip>
              </Col>
            </Row>
            <br />
            <Row style={{ padding: '20px', background: '#f4f5f7', borderRadius: '10px' }}>
              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
              Total Amount
              </Col>
              <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                7,5090
              </Col>
            </Row>
            <br />
            <Button style={{ float: 'right' }} type="primary">
              Confirm
            </Button>
          </Card>
        </Row>
        <Row style={{ marginTop: '10px' }} gutter={25}>
          <Card style={{ width: '100%' }} title="Payment Schedule">
            {/* record.description */}
            <Table
              columns={columns}
              expandedRowRender={record => (
                <div style={{ margin: 0 }}>
                  <Montly />
                </div>
              )}
              dataSource={data3}
              pagination={false}
            />
            {/* <CustomTable col={columns} data={data3}  /> */}
          </Card>
        </Row>
      </Main>
    </Fragment>
  );
}

export default NewCourseFee;
