import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Fragment } from 'react';
import { Input, Space, Drawer } from 'antd';
import CustomTable from '../../fee/dashboard/Components/Table';
import Filters from '../../fee/dashboard/Components/Filters';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
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
import PromotionModal from './promotionModal';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
function Promotion() {
  // const handleOk = () => {
  //   setisVisible(false);
  // };
  // const handleCancel = () => {
  //   setisVisible(false);
  // };
  
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const columns = [
    {
      title: 'Roll',
      dataIndex: 'roll',
      key: 'date',
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'subject',
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      key: 'chapter',
      width:'20%'
    },
    {
      title: 'Current Class',
      dataIndex: 'currentclass',
      key: 'topic',
    },
    {
      title: 'Next Class',
      dataIndex: 'nextclass',
      key: 'assignment',
    },
    {
      title: 'Next Section',
      dataIndex: 'nextsection',
      key: 'assignment',
    },

    // {
    //   title: 'Action',
    //   key: 'action',
    //   width: '20%',

    //   render: (text, record) => (
    //     <Space size="middle">
    //       <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
    //       <FontAwesomeIcon
    //         onClick={() => setisVisible(true)}
    //         icon={faPencil}
    //         style={{ fontSize: 15, color: 'green ' }}
    //       />
    //       {/* <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} /> */}
    //       {/* <FontAwesomeIcon icon={faPaperclip} style={{ fontSize: 15, color: 'gray ' }} /> */}
    //     </Space>
    //   ),
    // },
  ];
  const data = [
    {
      roll: 1,
      name: 'name 1',
      gender: 'Male',
      currentclass: 'pre-KG',
      nextclass: 'LKG',
      nextsection:'Brilliant'
    },
    {
      roll: 2,
      name: 'name 2',
      gender: 'Female',
      currentclass: 'UKG',
      nextclass: 'I',
      nextsection:'Brilliant'
    },
   
  ];
  return (
    <Fragment>
      <PromotionModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCreate} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Create
          </Button>
        ]}
        title="Promotion"
      />
      <Main>
        {/* <Row gutter={25} justify="end">
          <Col xxl={24} md={24} sm={24} xs={24}> */}
            <Row gutter={25} style={{  marginBottom: '20px' }} >
              <Col xxl={6} lg={6} md={6} sm={24} xs={24} >
                {/* Class{' '} */}
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
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Class{' '} */}
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Level"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="1">LKG</Option>
                  <Option value="2">UKG</Option>
                  <Option value="3">PkG</Option>
                </Select>
              </Col>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Section{' '} */}
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Section"
                  optionFilterProp="children"
                  // onChange={onChange}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  <Option value="a">A</Option>
                  <Option value="b">B</Option>
                  <Option value="c">C</Option>
                </Select>
              </Col>
              <Col xxl={6} lg={6} md={6} sm={24} xs={24} >
                {/* Section{' '} */}
                <Button size="small" type="primary">
                  <FeatherIcon icon="plus" size={15} />
                  Update
                </Button>
              </Col>
            </Row>
        <Row gutter={25}>
          
            <Cards headless>
              <CustomTable col={columns} data={data} />
            </Cards>
         
        </Row>
      </Main>
    </Fragment>
  );
}

export default Promotion;
