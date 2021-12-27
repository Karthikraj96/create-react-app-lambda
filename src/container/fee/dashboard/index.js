import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Fragment } from 'react';
// import Select from 'react-select';
import { Select } from 'antd';
import { Input, Space, Drawer, Checkbox, Collapse } from 'antd';
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
import { Label } from 'reactstrap';
import FeeDownloadModal from './FreeDownloadModal';
// import { Input, Label } from 'reactstrap';
import './index.css';
import CustomTable from './Components/Table';
import Filters from './Components/Filters';
import PaidGraph from './Components/PaidGraph';
import UnPaidGraph from './Components/UnPaidGraph';
import ProfileDrawer from './indexProfileDrawer';
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;
const handleChange = value => {
  console.log(`selected ${value}`);
};

function Dashboard() {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [modal, setModal] = useState(false);
  const [visible, setVisible] = useState(false);
  const [balanceViewMore, setBalanceViewMode] = useState(false);
  const [totalViewMore, setTotalViewMore] = useState(false);
  const [disable, setDisable] = useState(false);
  const [payment, setPayment] = useState(false);
  const [card_details, setCard_details] = useState(false);

  const toggleProfile = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggle = () => {
    setModal(!modal);
  };
  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  const columns = [
    {
      title: 'Institute',
      dataIndex: 'institute',
      key: 'institute',
      width: '10%',
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
      width: '20%',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      width: '5%',
    },

    {
      title: 'Addmission No',
      dataIndex: 'addmissionno',
      key: 'addmissionno',
      width: '10%',
    },

    {
      title: 'Parent Name',
      dataIndex: 'parentname',
      key: 'parentname',
      width: '15%',
    },
    {
      title: 'Mobile No',
      dataIndex: 'mobile',
      key: 'mobile',
      width: '15%',
    },
    {
      title: 'Amount Paid',
      dataIndex: 'paid',
      key: 'paid',
      width: '5%',
    },
    {
      title: 'Amount Pending',
      dataIndex: 'pending',
      key: 'pending',
      width: '5%',
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleProfile} />
          <FontAwesomeIcon onClick={showDrawer} icon={faRupeeSign} style={{ fontSize: 15, color: 'green ' }} />
          <FontAwesomeIcon icon={faBell} style={{ fontSize: 15, color: 'red ' }} />
        </Space>
      ),
    },
  ];
  const data = [
    {
      institute: 1,
      name: 'Lokesh',
      type: 'Typer',
      addmissionno: 1234,
      parentname: 'SHAM',
      mobile: '9566132344',
      paid: '56546',
      pending: '324',
    },
    {
      institute: 2,
      name: 'Lokesh',
      type: 'Typer',
      addmissionno: 1234,
      parentname: 'SHAM',
      mobile: '9566132344',
      paid: '56546',
      pending: '324',
    },
    {
      institute: 3,
      name: 'Lokesh',
      type: 'Typer',
      addmissionno: 1234,
      parentname: 'SHAM',
      mobile: '9566132344',
      paid: '56546',
      pending: '324',
    },
    {
      institute: 5,
      name: 'Lokesh',
      type: 'Typer',
      addmissionno: 1234,
      parentname: 'SHAM',
      mobile: '9566132344',
      paid: '56546',
      pending: '324',
    },
  ];
  function handleChange(value) {
    console.log(`selected ${value}`);
  }
  function onChange(e) {
    console.log(`checked = ${e.target.checked}`);
  }

  return (
    <Fragment>
      <PageHeader
        ghost
        title="Fee Dashboard"
        // buttons={[
        //   <div key="1" className="page-header-actions">
        //     <Button size="small" type="primary">
        //       <FeatherIcon icon="plus" size={14} />
        //       Add New
        //     </Button>
        //   </div>,
        // ]}
      />
      <Main>
        <ProfileDrawer isVisible={isCreateModalVisible} handleOk={toggleProfile} handleCancel={toggleProfile} />
        <Drawer
          destroyOnClose={true}
          title="Fee Details"
          width="400px"
          placement="right"
          closable={false}
          onClose={onClose}
          visible={visible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button style={{ marginRight: 8 }}>Cancel</Button>
              <Button type="primary">Submit</Button>
            </div>
          }
        >
          <>
            <Collapse>
              <Panel header="Academic Year : &nbsp; &nbsp; 2020-21" key="1">
                <Row style={{ margin: '2%' }}>
                  Amount Pending &nbsp; &nbsp;
                  <a href="#" onClick={() => setBalanceViewMode(true)}>
                    1500-View More
                  </a>
                </Row>
              </Panel>
            </Collapse>
            <br />
            {totalViewMore ? (
              <Collapse>
                <Panel header="Academic Year : &nbsp; &nbsp; 2020-21" key="2">
                  <Row style={{ margin: '2%' }}>
                    Total Amount &nbsp; &nbsp;
                    <a href="#" onClick={() => setTotalViewMore(false)}>
                      3000-View More
                    </a>
                  </Row>
                  <br />
                  {disable ? (
                    <>
                      <Row>
                        <Col xxl={12} xl={12} lg={12} xs={24} span={24}>
                          <Select
                            placeholder="select Fee type"
                            style={{ width: '200%' }}
                            // onChange={handleChange}
                            onChange={() => setDisable(false)}
                          >
                            <Option key="annual">Annual</Option>
                            <Option key="term">Term</Option>
                            <Option key="monthly">Monthly</Option>
                            <Option key="rpp">RPP</Option>
                            <Option key="noselect">no select</Option>
                          </Select>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Cards headless border={true}>
                          <ul>
                            <li>
                              <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp;{' '}
                              <span style={{ color: 'green' }}>Initial</span>
                            </li>
                            <li>
                              <ul>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp;{' '}
                                  <span style={{ color: 'green' }}> July - 1500 </span>
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp;{' '}
                                  <span style={{ color: 'green' }}>August - 1500 </span>
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp; September - 1500
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp; October - 1500
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp; November - 1500
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp; December - 1500
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <br />
                          <Row>
                            <span style={{ fontWeight: 'bold' }}>Amount </span> &nbsp; &nbsp; &nbsp;
                            <span>-Rs. 3,000/-</span>
                          </Row>
                          <br />
                          <Row>
                            <span style={{ fontWeight: 'bold' }}>Discount </span> &nbsp; &nbsp; &nbsp;
                            <span>-Rs. 3,000/-</span>
                          </Row>
                          <br />
                          <Row>
                            <span style={{ fontWeight: 'bold' }}>Net Payable </span> &nbsp; &nbsp; &nbsp;
                            <span>-Rs. 0/-</span>
                          </Row>
                          <br />
                        </Cards>
                      </Row>

                      {payment ? (
                        <>
                          <Row>
                            <Select
                              placeholder="payment Mode"
                              style={{ width: '200%' }}
                              onChange={() => setPayment(false)}
                            >
                              <Option key="cash">Cash</Option>
                              <Option key="card">Card</Option>
                              <Option key="dd">DD</Option>
                            </Select>
                          </Row>
                          <br />

                          <Row>
                            <Input placeholder="Your Amount" style={{ width: '200%' }} />
                            <br />
                          </Row>
                          <br />
                          <Row>
                            <span>DD Details</span>
                          </Row>
                          <br />
                          <Row>
                            <Input placeholder="Cheque NO" style={{ width: '200%' }} />
                            <br />
                            <Input placeholder="Bank Name" style={{ width: '200%' }} />
                            <br />
                            <Input placeholder="Branch" style={{ width: '200%' }} />
                            <br />
                          </Row>
                          {card_details ? (
                            <>
                              <Row>
                                <Select
                                  placeholder="Card Type"
                                  style={{ width: '200%' }}
                                  onChange={() => setCard_details(false)}
                                >
                                  <Option key="Credit">Credit</Option>
                                  <Option key="Debit">debit</Option>
                                  <Option key="--select--">No select</Option>
                                </Select>
                              </Row>
                              <br />
                              <Row>
                                <span>Card Details</span>
                              </Row>
                              <br />
                              <Row>
                                <Input placeholder="Your card Number" style={{ width: '200%' }} />
                                <br />

                                <Input placeholder="Holder Name" style={{ width: '200%' }} />
                                <br />
                              </Row>
                            </>
                          ) : (
                            <Row>
                              <Select
                                placeholder="Card Type"
                                style={{ width: '200%' }}
                                onChange={() => setCard_details(true)}
                              >
                                <Option key="Credit">Credit</Option>
                                <Option key="Debit">debit</Option>
                              </Select>
                            </Row>
                          )}
                        </>
                      ) : (
                        <Row>
                          <Select
                            placeholder="payment Mode"
                            style={{ width: '200%' }}
                            onChange={() => setPayment(true)}
                          >
                            <Option key="cash">Cash</Option>
                            <Option key="card">Card</Option>
                            <Option key="dd">DD</Option>
                          </Select>
                        </Row>
                      )}
                    </>
                  ) : (
                    <Row>
                      <Col xxl={12} xl={12} lg={12} xs={24} span={24}>
                        <Select
                          placeholder="select Fee type"
                          style={{ width: '200%' }}
                          // onChange={handleChange}
                          onChange={() => setDisable(true)}
                        >
                          <Option key="annual">Annual</Option>
                          <Option key="term">Term</Option>
                          <Option key="monthly">Monthly</Option>
                          <Option key="rpp">RPP</Option>
                        </Select>
                      </Col>
                    </Row>
                  )}
                </Panel>
              </Collapse>
            ) : (
              <Collapse>
                <Panel header="Academic Year : &nbsp; &nbsp; 2020-21" key="2">
                  <Row style={{ margin: '2%' }}>
                    Total Amount &nbsp; &nbsp;
                    <a href="#" onClick={() => setTotalViewMore(true)}>
                      3000-View More
                    </a>
                  </Row>
                </Panel>
              </Collapse>
            )}
          </>
        </Drawer>
        <Row gutter={25}>
          <Col xxl={12} sm={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <PaidGraph />
            </Suspense>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={8} md={8} sm={8} xs={24}>
            <Cards headless>
              <div className="card_div_collection">
                <div>
                  <FontAwesomeIcon icon={faCoins} style={{ fontSize: 70, color: '#ffd43b ' }} />
                </div>
                <div>
                  <h5 style={{ fontSize: '2.6rem', color: '#fd868c' }}>278</h5>
                  <span>Fee Collection</span>
                </div>
              </div>
            </Cards>
          </Col>
          <Col xxl={8} md={8} sm={8} xs={24}>
            <Cards headless>
              <div className="card_div_collection">
                <div>
                  <FontAwesomeIcon icon={faUsers} style={{ fontSize: 70, color: '#78C000 ' }} />
                </div>
                <div>
                  <h5 style={{ fontSize: '2.6rem', color: '#fd868c' }}>278</h5>
                  Total Paid
                </div>
              </div>
            </Cards>
          </Col>
          <Col xxl={8} md={8} sm={8} xs={24}>
            <Cards headless>
              <div className="card_div_collection">
                <div>
                  <FontAwesomeIcon icon={faUsers} style={{ fontSize: 70, color: '#c3272b ' }} />
                </div>
                <div>
                  <h5 style={{ fontSize: '2.6rem', color: '#fd868c' }}>278</h5>
                  Total Unpaid
                </div>
              </div>
            </Cards>
          </Col>
        </Row>
        <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Filters />
        </Row>
        <Cards headless>
          <div className="row_page_divison">
            <div className="upload_down_icon">
              <FeeDownloadModal modal={modal} toggle={toggle} />
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '12px' }}>
                <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 20, color: '#c3272b  ', marginRight: '6px' }} />{' '}
                PDF
              </div>
              <div style={{ display: 'flex', alignItems: 'center', marginRight: '12px' }}>
                <FontAwesomeIcon icon={faFileExcel} style={{ fontSize: 20, color: '#78C000 ', marginRight: '6px' }} />
                Excel
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FontAwesomeIcon icon={faUpload} style={{ fontSize: 20, color: '#ffd43b  ', marginRight: '6px' }} />
                Upload
              </div>
            </div>
          </div>
          <br />
          <CustomTable col={columns} data={data} />
        </Cards>
      </Main>
    </Fragment>
  );
}

export default Dashboard;
