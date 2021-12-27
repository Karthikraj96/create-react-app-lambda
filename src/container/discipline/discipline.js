// import React, { useState } from 'react';
// import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
// import { Row, Col, Card, Divider, Modal, Input, Select, Space, TimePicker, Pagination } from 'antd';
// import { PageHeader } from '../../components/page-headers/page-headers';
// import { Button } from '../../components/buttons/buttons';
// import { Tabs } from 'antd';
// import FeatherIcon from 'feather-icons-react';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
// import { Main } from '../styled';
// import CustomTable from '../fee/dashboard/Components/Table';
// import {
//   faCog,
//   faDownload,
//   faEnvelope,
//   faPencil,
//   faSave,
//   faTrash,
//   faUpload,
//   faEye,
//   faPencilAlt,
//   faTrashAlt,
//   faCoins,
//   faUsers,
//   faFileExcel,
//   faFilePdf,
//   faFileCsv,
//   faRupeeSign,
//   faBell,
//   faPaperclip,
// } from '@fortawesome/pro-duotone-svg-icons';

// import DisciplineModal from './disciplineModal';

// const { Option } = Select;

// const columns = [
//   {
//     title: 'Date',
//     dataIndex: 'date',
//     key: 'date',
//   },
//   {
//     title: 'Name',
//     dataIndex: 'name',
//     key: 'name',
//   },
//   {
//     title: 'Section',
//     dataIndex: 'section',
//     key: 'section',
//   },
//   {
//     title: 'Issues',
//     dataIndex: 'issues',
//     key: 'issues',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//   },
//   {
//     title: 'Status',
//     dataIndex: 'status',
//     key: 'status',
//   },
//   {
//     title: 'Action',
//     key: 'action',
//     width: '20%',

//     render: (text, record) => (
//       <Space size="middle">
//         <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
//         <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
//         <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
//       </Space>
//     ),
//   },
// ];
// const data = [
//   {
//     sino: 1,
//     instution: 'I',
//     level: 'PKG',
//     subject: 'English',
//   },
//   {
//     sino: 2,
//     instution: 'II',
//     level: 'LKG',
//     subject: 'English',
//   },
//   {
//     sino: 3,
//     instution: 'III',
//     level: 'III',
//     subject: 'English',
//   },
// ];

// const Discipline = () => {
//   const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
//   const toggleCreate = () => {
//     setisCreateModalVisible(!isCreateModalVisible);
//   };
//   return (
//     <div>
//       <PageHeader
//         ghost
//         buttons={[
//           <Button size="small" onClick={toggleCreate} type="primary">
//             <FeatherIcon icon="plus" size={15} />
//             Create
//           </Button>,
//         ]}
//         title="Discipline"
//       />

//       <Main>
//         <DisciplineModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />

//         <Row>
//           <Col span={24} style={{ marginTop: 10 }}>
//             <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
//               <CustomTable col={columns} data={data} />
//             </div>
//           </Col>
//         </Row>
//       </Main>
//     </div>
//   );
// };

// export default Discipline;
