import React, { Fragment, Suspense,useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { Row, Col, Skeleton, Card, Space, Tooltip } from 'antd';
import Filters from './dashboard/Components/Filters';
import CustomTable from './dashboard/Components/Table';
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
import RPPGraph from './Charts/RPP';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';
import RPPModal from './RPPModal';
// import RPPPaymentModal from './RPPPaymentModal';
const { TabPane } = Tabs;

function RPP() {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [ispaymentModalVisible, setisPaymentModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const togglePayment= () => {
    setisPaymentModalVisible(!ispaymentModalVisible);
  };
  const callback = key => {
    console.log(key);
  };

  const cash = () => {
    return (
      <div>
        <span>Type: Cash</span>
        <br />
        <span>Term: 1</span>
        <br />
        <span>Amount</span> &nbsp; &nbsp; <span> 988</span>
        <br />
        <p>(Rupees Nine Hundred Eighty Eight Only)</p>
      </div>
    );
  };
  const card = () => {
    return (
      <div>
        <span>Type: card</span>
        <br />
        <span>Card type: debit</span>
        <br />
        <span>lst 4 digit: 1234</span>
        <br />
        <span>Amount</span> &nbsp; &nbsp; <span> 988</span>
        <br />
        <p>(Rupees Nine Hundred Eighty Eight Only)</p>
      </div>
    );
  };
  const Cheque = () => {
    return (
      <div>
        <span>Type: Cheque</span>
        <br />
        <span>Bank Name:hdfc</span>
        <br />
        <span>Cheque No: 1234</span>
        <br />
        <span>IFSC No: 1234</span>
        <br />
        <span>Amount</span> &nbsp; &nbsp; <span> 988</span>
        <br />
        <p>(Rupees Nine Hundred Eighty Eight Only)</p>
      </div>
    );
  };
  const columns = [
    {
      title: 'Institute',
      dataIndex: 'institute',
      key: 'institute',
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },

    {
      title: 'Addmission No',
      dataIndex: 'addmissionno',
      key: 'addmissionno',
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
      title: 'Amount Paid',
      dataIndex: 'paid',
      key: 'paid',
    },
    {
      title: 'Amount Pending',
      dataIndex: 'pending',
      key: 'pending',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Payment Mode',
      dataIndex: 'payment',
      key: 'renewaldate',
    },
    {
      title: 'Renewal Date',
      dataIndex: 'renewaldate',
      key: 'renewaldate',
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleCreate} />
          {/* <FontAwesomeIcon icon={faRupeeSign} style={{ fontSize: 15, color: 'green ' }} onClick={togglePayment} /> */}
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

      status: 'Paid',
      payment: (
        <Tooltip placement="top" title={cash}>
          <span>Cash</span>
        </Tooltip>
      ),
      renewaldate: '23/10/1995',
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
      status: 'Paid',
      payment: (
        <Tooltip placement="top" title={card}>
          <span>Card</span>
        </Tooltip>
      ),
      renewaldate: '23/10/1995',
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
      status: 'Paid',
      payment: (
        <Tooltip placement="top" title={Cheque}>
          <span>Cheque</span>
        </Tooltip>
      ),
      renewaldate: '23/10/1995',
      pending: '324',
    },
    {
      institute: 5,
      name: 'Lokesh',
      type: 'Typer',
      addmissionno: 1234,
      parentname: 'SHAM',
      mobile: '9566132344',
      status: 'Paid',
      payment: 'Cheque',
      renewaldate: '23/10/1995',
      paid: '56546',
      pending: '324',
    },
  ];
  return (
    <Main>
       <RPPModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
       {/* <RPPPaymentModal isVisible={ispaymentModalVisible} handleOk={togglePayment} handleCancel={togglePayment} /> */}
    <Fragment>
      <PageHeader
        ghost
        title="RPP Information"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/fee/rppsettings">
              <Button size="small" type="primary">
                <FeatherIcon icon="settings" size={14} />
                Settings
              </Button>
            </Link>
          </div>,
        ]}
      />
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <RPPGraph />
        </Suspense>
        <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Filters />
        </Row>
        <Row gutter={25}>
          <Card headless>
            <Tabs defaultActiveKey="1" onChange={callback}>
              <TabPane tab="All" key="1">
                <CustomTable col={columns} data={data} />
              </TabPane>
              <TabPane tab="Paid" key="2">
                <CustomTable col={columns} data={data} />
              </TabPane>
              <TabPane tab="Pending" key="3">
                <CustomTable col={columns} data={data} />
              </TabPane>
              <TabPane tab="Expired" key="4">
                <CustomTable col={columns} data={data} />
              </TabPane>
              <TabPane tab="Cancelled" key="5">
                <CustomTable col={columns} data={data} />
              </TabPane>
              <TabPane tab="Refund" key="6">
                <CustomTable col={columns} data={data} />
              </TabPane>
            </Tabs>
          </Card>
        </Row>
      </Main>
    </Fragment>
    </Main>
  );
}

export default RPP;
