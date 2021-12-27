import React, { useState } from 'react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { Row, Col, Card, Divider, Modal, Input, Select, Space, TimePicker, Pagination, Table } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';
import { Main } from '../styled';
import ChapterModal from './subjectdataModal';
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
} from '@fortawesome/pro-duotone-svg-icons';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';

const { Option } = Select;

const DragHandle = sortableHandle(() => <MenuOutlined style={{ cursor: 'grab', color: '#999' }} />);

const columns = [
  {
    title: 'Sort',
    dataIndex: 'sort',
    width: 30,
    className: 'drag-visible',
    render: () => <DragHandle />,
  },
  {
    title: 'Book Name',
    dataIndex: 'bookname',
    className: 'drag-visible',
  },
  {
    title: 'Chapter Name',
    dataIndex: 'chaptername',
  },
  {
    title: 'Topic',
    dataIndex: 'topic',
  },
  {
    title: 'Action',

    width: '20%',

    render: (text, record) => (
      <Space size="middle">
        <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />
        <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />
      </Space>
    ),
  },
];

// const data = [
//   {
//     key: '1',
//     bookname: 'Tamil',
//     chaptername: 'adippadai eluthukal',
//     topic: (
     
//         <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }}></FontAwesomeIcon>
        
     
//     ),
//     index: 0,
//   },
//   {
//     key: '2',
//     bookname: 'Tamil',
//     chaptername: 'urainadai',
//     topic: (
      
//         <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }}  />
      
     
//     ),
//     index: 1,
//   },
// ];

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

const SubjectData = () => {

    const toggleCreate = () => {
        console.log('buttonclick');
        setisCreateModalVisible(!isCreateModalVisible);
      };
    const data = [
        {
          key: '1',
          bookname: 'Tamil',
          chaptername: 'adippadai eluthukal',
          topic: (
              <Button size="small" onClick={toggleCreate}>
              <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }}/>View
              </Button>
           
          ),
          index: 0,
        },
        {
          key: '2',
          bookname: 'Tamil',
          chaptername: 'urainadai',
          topic: (
            
            <Button  onClick={toggleCreate}>
            <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }}/>View
            </Button>
            
           
          ),
          index: 1,
        },
      ];
      
  // state = {
  //     dataSource: data,
  //   };
  const [state, setState] = useState({ dataSource: data });
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);

 const onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      setState({ dataSource: newData });
    }
  };
 const  DraggableContainer = props => (
    <SortableContainer
      useDragHandle
      disableAutoscroll
      helperClass="row-dragging"
      onSortEnd={onSortEnd}
      {...props}
    />
  );

 const  DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const { dataSource } = state;
  return (
    <div>
      <PageHeader
        ghost
        title="Menu"
        buttons={[
          <div key="1" className="page-header-actions">
            <span style={{ fontSize: 15 }}>Admin</span>
            <Button size="small">
              <FeatherIcon icon="user" size={14} />
              Logo
            </Button>
          </div>,
        ]}
      />
      <Main>
        <ChapterModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} />
        <div className="site-card-border-less-wrapper">
          <Row style={{ marginBottom: '20px' }}>
            <Col span={24}>
              <Row>
                <Col span={8} style={{ fontSize: 20, padding: 5 }}>
                  VII (Tamil)
                </Col>
                {/* <Col span={8} push={13} style={{ fontSize: 30 }}>
                  <Button size="small" type="primary" onClick={toggleCreate}>
                    <FeatherIcon icon="plus" size={14} />
                    Create Subject
                  </Button>
                </Col> */}
              </Row>
              <Row>
                <Col span={8} style={{ fontSize: 10, padding: 5 }}>
                  Chapter
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ marginTop: 10 }}>
                  <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
                    {/* <Select defaultValue="Current Announcement" style={{ width: 300 }}>
                      <Option>Announcement-1</Option>
                    </Select> */}
                    <Row>
                      <Col span={24} style={{ marginTop: 10 }}>
                        <Table
                          pagination={false}
                          dataSource={dataSource}
                          columns={columns}
                          rowKey="index"
                          components={{
                            body: {
                              wrapper:DraggableContainer,
                              row:DraggableBodyRow,
                            },
                          }}
                        />
                        {/* <CustomTable col={columns} data={data}/> */}
                      </Col>
                    </Row>
                  </div>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </Main>
    </div>
  );
};

export default SubjectData;
