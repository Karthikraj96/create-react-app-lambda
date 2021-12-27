import React, { useState } from 'react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { Row, Col, Card, Divider, Modal, Input, Select, Space, TimePicker, DatePicker } from 'antd';
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
const { RangePicker } = DatePicker;

const columns = [
  {
    title: 'Date',
    dataIndex: 'Date',
    key: 'date',
  },
  {
    title: 'Visitor Name',
    dataIndex: 'VisitorName',
  },
  {
    title: 'Type',
    dataIndex: 'Type',
  },
  {
    title: 'Purpose',
    dataIndex: 'Purpose',
  },
  {
    title: 'Remarks',
    dataIndex: 'Remarks',
    
  },
  {
    title: ' Handled By',
    dataIndex: 'HandledBy',
  },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   width: '20%',

    //   render: (text, record) => (
    //     <Space size="middle">
    //       <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
    //       <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
    //       <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
    //     </Space>
    //   ),
    // },
];
const data = [
  {
    Date: '02-11-21',
    VisitorName:"Murali",
    Type:"Parent",
    Purpose:"Fee",
    Remarks:"Discount",
    HandledBy:"Anitha",

   
  },
 
];
// for (let i = 0; i < 1; i++) {
//     data.push({
//       key: i,
//       school: `perambur`,
//       level:"IV",
//     class:"Attrentiv",
//     student:"Krishna",
//     title:"Best student",
//     badge:"Nerd badge",
//     });
//   }


const Status = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  return (
    <div>
      <PageHeader
        ghost
        buttons={[
          // <Button size="small" 
          //  type="primary">
          //   <FeatherIcon icon="plus" size={15} />
          //   Create
          // </Button>,
        ]}
        title="Queue Status"
      />
      <Main>
        <Row gutter={14}>
      <Col span={6}>
        <Cards title="No. of Visitors">
         Staff Name
        </Cards>
      </Col>
      <Col span={18}>
        <Cards title="Purposes Graph" >
         Graph
        </Cards>
      </Col>
     
    </Row>
        <Row justify="end">
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6} style={{ margin: '1%' }}>
          <RangePicker showTime />
          </Col>
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Cards headless>
              <CustomTable col={columns} data={data} />
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Status;
