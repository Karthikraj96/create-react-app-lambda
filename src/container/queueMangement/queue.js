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
import CreatecounterModal from './createCounterModal';
const { Option } = Select;

const columns = [
  {
    title: 'SCHOOL',
    dataIndex: 'school',
    key: 'date',
  },
  {
    title: 'LEVEL',
    dataIndex: 'level',
  },
  {
    title: 'CLASS',
    dataIndex: 'class',
  },
  {
    title: 'STUDENT',
    dataIndex: 'student',
  },
  {
    title: 'TITLE',
    dataIndex: 'title',
    
  },
  {
    title: 'BADGE',
    dataIndex: 'badge',
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
const data = [
  {
    school: 'Mathur',
    level:"IV",
    class:"Attrentiv",
    student:"Krishna",
    title:"Best student",
    badge:"Nerd badge",

   
  },
 
];
for (let i = 0; i < 1; i++) {
    data.push({
      key: i,
      school: `perambur`,
      level:"IV",
    class:"Attrentiv",
    student:"Krishna",
    title:"Best student",
    badge:"Nerd badge",
    });
  }


const Queue = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const toggleCounter = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  return (
    <div>
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCounter}
           type="primary">
            <FeatherIcon icon="plus" size={15}  />
            Create Counter
          </Button>,
        ]}
        title="Queue"
      />
      <Main>
        <CreatecounterModal isVisible={isCreateModalVisible} handleOk={toggleCounter} handleCancel={toggleCounter} />
        <Row gutter={16}>
      <Col span={12}>
        <Cards title="Fee Counter 1">
         Staff Name
        </Cards>
      </Col>
      <Col span={12}>
        <Cards title="Fee Counter 2" >
         Staff Name
        </Cards>
      </Col>
      <Col span={12}>
        <Cards title="Admission Counter 1">
          Staff Name
        </Cards>
      </Col>
      <Col span={12}>
        <Cards title="Admission Counter 2">
          Staff Name
        </Cards>
      </Col>
    </Row>

        {/* <Row gutter={24}>
          <Col span={24}>
            <Cards headless>
              <CustomTable col={columns} data={data} />
            </Cards>
          </Col>
        </Row> */}
      </Main>
    </div>
  );
};

export default Queue;
