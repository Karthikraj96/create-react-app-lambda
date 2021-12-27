import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { Cards } from '../../components/cards/frame/cards-frame';
import { useHistory } from 'react-router-dom';
import { Skeleton } from 'antd';
import SubjectCards from './partials/subjectCards';
import {
  Card,
  Table,
  Modal,
  Space,
  Upload,
  message,
  Input,
  Collapse,
  Layout,
  Col,
  Row,
  Badge,
  Timeline,
  Steps,
} from 'antd';
import { UploadOutlined, PlusOutlined, ClockCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
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
  faPaperclip,
  faPlayCircle,
  faPencilPaintbrush,
  faEdit,
  faPresentation,
} from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/pro-solid-svg-icons';
import { Breadcrumb } from 'antd';
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

const StreamData = () => {
  const { Header, Sider, Content } = Layout;
  const { Step } = Steps;
  const { Panel } = Collapse;
  const history = useHistory();

  const [state, setState] = useState({
    loading: false,
    visible: false,
  });
  const [selectedSubject, setSelectedSubject] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [modal, setModal] = useState({
    isloading: false,
    isvisible: false,
  });
  useEffect(() => {
    console.log('asdasdasdasd', window.location);
  }, []);
  useEffect(() => {
    setVolumes([
      {
        name: 'Maths-1',
        category: 'Kolatur',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCdGQlbVYFAoMkvDOp_kkqWgkPzRrUF4l_Q&usqp=CAU',
      },
      {
        name: 'Maths-2',
        category: 'Kolatur',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCdGQlbVYFAoMkvDOp_kkqWgkPzRrUF4l_Q&usqp=CAU',
      },
      {
        name: 'Stats Maths',
        category: 'Kolatur',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCdGQlbVYFAoMkvDOp_kkqWgkPzRrUF4l_Q&usqp=CAU',
      },
      {
        name: 'Business Maths',
        category: 'Kolatur',
        img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHCdGQlbVYFAoMkvDOp_kkqWgkPzRrUF4l_Q&usqp=CAU',
      },
    ]);
  }, []);
  const genExtra = () => (
    <PlusOutlined
      style={{ fontSize: '250%' }}
      onClick={event => {
        event.stopPropagation();
        <Link to="/admin/curriculum"></Link>;
      }}
    />
  );

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = () => {
    setState({ loading: true });
    setModal({ isloading: true });
    setTimeout(() => {
      setState({ loading: false, visible: false });
      setModal({ isloading: false, isvisible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setState({ visible: false });
    setModal({ isvisible: false });
  };

  const { visible, loading } = state;

  const { isvisible, isloading } = modal;

  const columns = [
    {
      title: 'Topic Name',
      dataIndex: 'topicname',
      key: 'topicname',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: 18, color: 'Dodgerblue ' }} />
          <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 18, color: 'gray ' }} />
          <FontAwesomeIcon icon={faYoutube} style={{ fontSize: 18, color: 'red ' }} />
          <FontAwesomeIcon icon={faEdit} style={{ fontSize: 18, color: 'green ' }} />
          {/* <FontAwesomeIcon icon={faTrash} style={{ fontSize: 18, color: 'red ' }} /> */}
        </Space>
      ),
    },
  ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  //   },
  // };

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
  const onCardClickHandle = courseInfo => {
    console.log('the course info ', courseInfo);
    history.push('/admin/lessons');
  };
  return (
    <div>
      {/* <div style={{ textAlign: 'left', fontSize: '18px', padding: '25px' }}> */}
      <PageHeader
        ghost
        title="Courses"
        // title="Level IV|Subject-Name| Modules: 7 | lessons: 134 | Duration: 120mins"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/curriculum">
              <Button size="small" type="primary">
                <FeatherIcon icon="plus" size={14} />
                Curriculum
              </Button>
            </Link>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Col span={24}>
            <Cards headless>
              <Breadcrumb>
                <Breadcrumb.Item>Maths</Breadcrumb.Item>
                <Breadcrumb.Item>
                  <a href="">Stats Maths</a>
                </Breadcrumb.Item>
              </Breadcrumb>
            </Cards>
          </Col>
        </Row>
        <Row gutter={25}>
          {volumes.map(subj => (
            <Col xxl={6} lg={8} sm={12} xs={24}>
              <Suspense
                fallback={
                  <Cards headless>
                    <Skeleton active />
                  </Cards>
                }
              >
                <SubjectCards onCardClickHandle={onCardClickHandle} item={subj} />+
              </Suspense>
            </Col>
          ))}
        </Row>
      </Main>
      {/* <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
        <Card bordered={true} style={{ width: 1300 }}>
          <Collapse>
            <Panel header="Maths-Chapter:1| Lesson:2" key="1">
              {chapterData}
            </Panel>
        
          </Collapse>
        </Card>{' '}
        <Card bordered={true} style={{ width: 1300 }}>
       
          <Collapse accordion>
            <Panel header="Science-Chapter:1| Lesson:2" key="1">
              {chapterData}
            </Panel>
            
          </Collapse>
        </Card>
        <Card bordered={true} style={{ width: 1300 }}>
         

          <Collapse accordion>
            <Panel header="English-Chapter:1| Lesson:2" key="1">
              {chapterData}
            </Panel>
          </Collapse>
        </Card>
      </div> */}
      {/* </Main> */}
      {/* </Timeline> */}
      {/* <Modal destroyOnClose={true}
        visible={visible}
        title="Create New Topic"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Add
          </Button>,
        ]}
        width={1000}
      >
        <label style={{ fontSize: '25px' }}>Topic:</label> &nbsp;
        <Input placeholder="Topic Name" style={{ width: 500 }} />
        <br />
        <br />
        <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 30, color: 'gray ' }} />{' '}
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload document</Button>
        </Upload>
        <br />
        <br />
        <FontAwesomeIcon icon={faPlay} style={{ fontSize: 30, color: 'green ' }} />{' '}
        <Upload action="" directory>
          <Button icon={<UploadOutlined />}>Upload Video</Button>
        </Upload>
        <br />
        <br />
        <FontAwesomeIcon icon={faPresentation} style={{ fontSize: 30, color: 'red ' }} />{' '}
        <Upload {...props}>
          <Button icon={<UploadOutlined />}>Upload Presentation</Button>
        </Upload>
        <br />
        <div className="container">
          <label style={{ fontSize: '25px' }}>Link:</label> &nbsp;{' '}
          <Input addonBefore="https://" style={{ width: 500 }} />
        </div>
      </Modal> */}

      {/* <Modal destroyOnClose={true}
        visible={isvisible}
        title="Curriculum"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Add
          </Button>,
        ]}
        width={1500}
      >
       
        <Row gutter={16} >
          <Col>
            <Row>
             

              <Col>
                <Card
                  title="+ Add Section"
                  extra={
                    <Button size="small">
                      <FeatherIcon icon="plus" size={2} />
                      Bulk Upload
                    </Button>
                  }
                  style={{ width: 400 }}
                >
                  <Collapse defaultActiveKey={['1']}>
                    <Panel header="This is panel header 1" key="1">
                      <div style={{ paddingLeft: '40px' }}>
                        <div>Untitle lession-1</div>
                        <div>Untitle lession-2</div>
                        <footer style={{ textAlign: 'end' }}>
                          <Button>+ Add Lession</Button>
                        </footer>
                      </div>
                    </Panel>
                    <Panel header="This is panel header 2" key="2">
                      <div style={{ paddingLeft: '40px' }}>
                        <div>Untitle lession-3</div>
                        <div>Untitle lession-4</div>
                        <footer style={{ textAlign: 'end' }}>
                          <Button>+ Add Lession</Button>
                        </footer>
                      </div>
                    </Panel>
                  </Collapse>
                </Card>
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Card title="Edit Lesson" bordered={true}>
              <label style={{ fontSize: '15px', paddingLeft: '22px' }}>Lesson Name:</label> &nbsp;
              <Input placeholder="Topic Name" style={{ width: 500 }} />
              <br />
              <br />
              <Card title="Add Content" bordered={false}>
                <Card.Grid style={gridStyle}>
                  <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 30, color: 'red ' }} />
                  <br />
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>PDF</Button>
                  </Upload>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <FontAwesomeIcon icon={faPlay} style={{ fontSize: 30, color: 'green ' }} />
                  <br />
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Video</Button>
                  </Upload>
                </Card.Grid>
                <Card.Grid style={gridStyle}>
                  <FontAwesomeIcon icon={faPresentation} style={{ fontSize: 30, color: 'red ' }} />
                  <br />
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Presentation</Button>
                  </Upload>
                </Card.Grid>

                <Card.Grid style={gridStyle}>
                  <FontAwesomeIcon icon={faPaperclip} style={{ fontSize: 30, color: 'gray ' }} />
                  <br />
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Document</Button>
                  </Upload>
                </Card.Grid>
              </Card>
            </Card>
          </Col>
        </Row>
      </Modal> */}
    </div>
  );
};

export default StreamData;
