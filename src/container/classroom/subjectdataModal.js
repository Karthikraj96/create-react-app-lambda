import React, { useState } from 'react';
import { Row, Col, Card, Divider, Modal, Input, Select, Space, TimePicker, Pagination, Table, Button,message } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { sortableContainer, sortableElement, sortableHandle } from 'react-sortable-hoc';
import { MenuOutlined } from '@ant-design/icons';
import arrayMove from 'array-move';
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
    title: ' Name',
    dataIndex: 'name',
    className: 'drag-visible',
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

const data = [
  {
    key: '1',
    name: 'Uyir Mei Eluthugal',
    topic: <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }}></FontAwesomeIcon>,
    index: 0,
  },
  {
    key: '2',
    name: 'Mei Eluthugal',
    topic: <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }}></FontAwesomeIcon>,
    index: 1,
  },
  {
    key: '3',
    name: 'Basic Tamil Letters',
    topic: <FontAwesomeIcon icon={faEye} style={{ fontSize: 18, color: 'green ' }}></FontAwesomeIcon>,
    index: 2,
  },
];

const SortableItem = sortableElement(props => <tr {...props} />);
const SortableContainer = sortableContainer(props => <tbody {...props} />);

const props = {
  name: 'file',
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const ChapterModal = ({ isVisible, handleOk, handleCancel }) => {
  //   const [level, setLevel] = React.useState(streamData.level);
  //   const [subject, setSubject] = React.useState(streamData.subject);
  const [state, setState] = useState({ dataSource: data });
  //   const [isCreateModalVisible, setisCreateModalVisible] = useState(false);

  const onSortEnd = ({ oldIndex, newIndex }) => {
    const { dataSource } = state;
    if (oldIndex !== newIndex) {
      const newData = arrayMove([].concat(dataSource), oldIndex, newIndex).filter(el => !!el);
      console.log('Sorted items: ', newData);
      setState({ dataSource: newData });
    }
  };
  const DraggableContainer = props => (
    <SortableContainer useDragHandle disableAutoscroll helperClass="row-dragging" onSortEnd={onSortEnd} {...props} />
  );

  const DraggableBodyRow = ({ className, style, ...restProps }) => {
    const { dataSource } = state;
    // function findIndex base on Table rowKey props and should always be a right array index
    const index = dataSource.findIndex(x => x.index === restProps['data-row-key']);
    return <SortableItem index={index} {...restProps} />;
  };

  const { dataSource } = state;

  const handleChange = value => {
    console.log(value);
  };

  return (
    <Modal destroyOnClose={true}
      title="Chapter Name(adippadi eluthukal)"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" type="primary">
          create
        </Button>,
      ]}
      width={800}
    >
      {/* <div style={{textAlign:"start"}}>
      <label style={{padding:1}}>Topic</label> &nbsp; 
       </div> <br /> */}

      <Row>
        <Col span={24} style={{ marginTop: 10 }}>
          <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
            <div>
              <span style={{ fontSize: 15 }}>Topic</span>
            </div>
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
                      wrapper: DraggableContainer,
                      row: DraggableBodyRow,
                    },
                  }}
                />
                {/* <CustomTable col={columns} data={data}/> */}
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Modal>
  );
};

export default ChapterModal;
