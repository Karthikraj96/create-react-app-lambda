import React, { Fragment, Suspense } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Row, Col, Skeleton, Card, Space } from 'antd';
import Filters from './dashboard/Components/Filters';
import CustomTable from './dashboard/Components/Table';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';
import { Button } from '../../components/buttons/buttons';
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
} from '@fortawesome/pro-duotone-svg-icons';
const { TabPane } = Tabs;
import { Link } from 'react-router-dom';
import TPOGraph from './Charts/TwoPlusOne';
function TWOPLUSONE() {
  const callback = key => {
    console.log(key);
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
      title: 'Validity',
      dataIndex: 'validity',
      key: 'renewaldate',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
          {/* <FontAwesomeIcon icon={faPencilAlt} style={{ fontSize: 15, color: 'green ' }} />
          <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: 15, color: 'red ' }} /> */}
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
      validity: '23/10/1995',
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
      validity: '23/10/1995',
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
      validity: '23/10/1995',
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
      validity: '23/10/1995',
      paid: '56546',
      pending: '324',
    },
  ];
  return (
    <Fragment>
      <PageHeader
        ghost
        title="Two Plus One Scheme Information"
        // buttons={[
        //   <div key="1" className="page-header-actions">
        //     <Link to="/admin/fee/two_Plus_Settings">
        //       <Button size="small" type="primary">
        //         <FeatherIcon icon="settings" size={14} />
        //         Settings
        //       </Button>
        //     </Link>
        //   </div>,
        // ]}
      />
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <TPOGraph />
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
  );
}

export default TWOPLUSONE;
