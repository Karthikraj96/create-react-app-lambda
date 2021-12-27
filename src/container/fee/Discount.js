import React, { Fragment, Suspense ,useState} from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Row, Col, Skeleton, Card, Space } from 'antd';
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
  faTags
} from '@fortawesome/pro-duotone-svg-icons';
import DiscountGraph from './Charts/Discount';
import { Tabs } from 'antd';
import DiscountProfileModal from './DiscountProfileModal';
import DiscountModal from './DiscountModal';
const { TabPane } = Tabs;

function Discount() {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isdiscountModalVisible, setisDiscountModalVisible] = useState(false);
  const toggleProfile = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleDiscount= () => {
    setisDiscountModalVisible(!isdiscountModalVisible);
  };
  const callback = key => {
    console.log(key);
  };
  const columns = [
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
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} onClick={toggleProfile} />
          <FontAwesomeIcon icon={faTags} style={{ fontSize: 15, color: 'green ' }} onClick={toggleDiscount} />
          {/* <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: 15, color: 'red ' }} /> */}
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
      discount: '10%',
      paid: '56546',
      pending: '324',
    },
    {
      institute: 2,
      name: 'Lokesh',
      type: 'Typer',
      addmissionno: 1234,
      discount: '10%',

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
      discount: '10%',

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
      discount: '10%',

      mobile: '9566132344',
      paid: '56546',
      pending: '324',
    },
  ];
  return (
    <Fragment>
      <PageHeader
        ghost
        title="Discounts"
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
      <DiscountProfileModal isVisible={isCreateModalVisible} handleOk={toggleProfile} handleCancel={toggleProfile} />
      <DiscountModal isVisible={isdiscountModalVisible} handleOk={toggleDiscount} handleCancel={toggleDiscount} />
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <DiscountGraph />
        </Suspense>
        <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
          <Filters />
        </Row>
        <Row gutter={25}>
          <Card headless>
            <CustomTable col={columns} data={data} />
          </Card>
        </Row>
      </Main>
    </Fragment>
  );
}

export default Discount;
