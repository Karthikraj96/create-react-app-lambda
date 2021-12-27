// import React from 'react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
// import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
// import { Row, Col, Input, Card, Collapse, Breadcrumb, Image } from 'antd';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { Main } from '../styled';
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
  faFileSpreadsheet,
  faFileWord,
} from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faPlay } from '@fortawesome/pro-solid-svg-icons';
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
  Select,
  Image,
  Breadcrumb,
  BackTop,
} from 'antd';
import { UploadOutlined, PlusOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '../../components/buttons/buttons';
import './index.css';
const gridStyle = {
  width: '25%',
  textAlign: 'center',
};

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
const text = () => {
  return <div></div>;
};
const styles = {
  rootContainer: {
    backgroundColor: '#1A1A1D',
    height: '100%',
  },
  content: {
    height: '65%',
    padding: '1%',
  },
  header: {
    height: '30%',
    backgroundColor: 'transparent',
    marginTop: '5%',
  },
  card: {
    width: '100%',
  },
  cardBody: {
    overflow: 'auto',
  },
};

const items = [...Array(100)].map((val, i) => `Item ${i}`);

const Curriculum = () => {
  const { Header, Sider, Content } = Layout;
  const { Step } = Steps;
  const { Panel } = Collapse;
  const history = useHistory();
  const [state, setState] = useState({
    loading: false,
    visible: false,
  });
  const [lessonData, setlessonData] = useState({
    contentType: 'video',
    srcFrom: 'other',
    srcURL: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  });
  const [modal, setModal] = useState({
    isloading: false,
    isvisible: false,
  });
  const [newLessonModalVisible, setnewLessonModalVisible] = useState(false)
  const handleSave = () => {
    setnewLessonModalVisible(false)
    console.log('Saving now')
  }
  const handleCancel = () => {
    setnewLessonModalVisible(false)

  }
  return (
    <div>
        <Modal title="New Lesson" visible={newLessonModalVisible} onOk={handleSave} onCancel={handleCancel}>
        <Input placeholder="Lesson Name" />
      </Modal>
      <PageHeader
        title="Create new lesson"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary">
              Preview
            </Button>
            <Button size="small" type="success">
              Publish
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={24}>
          {/* <Col sm={24} md={24} lg={6} xl={6} xxl={5}> */}
          <Col span={24}>
            {/* <Cards headless> */}
            <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
              <Col span={12}>
                <img
                  width={100}
                  height={100}
                  style={{ borderRadius: '50%' }}
                  src="data:image/png;base64,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"
                />
              </Col>
              <Col span={12} pull={10}>
                <Breadcrumb style={{ padding: '20px' }}>
                  <p style={{ fontWeight: 'bold', fontSize: '20px' }}>English</p>
                  <Breadcrumb.Item>CBSE</Breadcrumb.Item>
                  <Breadcrumb.Item>LKG</Breadcrumb.Item>
                </Breadcrumb>
              </Col>
            </Row>
            <Row style={{ marginTop: '2%' }} gutter={15}>
              <Col md={24} lg={8} sm={24} xs={24}>
                <div>
                  <Row style={{ padding: '2%', overflowY: 'scroll' }}>
                    <Cards title="Lessons" style={{ width: '100%' }}>
                      <div id="scrollable-container">
                        <span style={{display:"flex", justifyContent:'end', marginBottom:'20px'}}>
                          {' '}
                          <Button onClick = {() => setnewLessonModalVisible(!newLessonModalVisible)} size="small" type="primary">
                            Add Lesson
                          </Button>
                        </span>
                        <div
                          style={{
                            color: ' #5A5F7D',
                            cursor: 'pointer',
                            padding: '12px 16px 10px 45px',
                            backgroundColor: '#F8F9FB',
                          }}
                        >
                          Lesson 1
                        </div>
                      </div>
                    </Cards>
                  </Row>
                </div>
              </Col>
              <Col md={16} lg={16} sm={24} xs={24}>
                <Cards title="Add Lesson Content">
                  <Col span={24}>
                    <div>
                      <label style={{ fontSize: '15px' }}>Add Section:</label> &nbsp;
                      <Select mode="multiple" allowClear defaultValue="LKG" style={{ width: '100%' }}>
                        <Option>LKG</Option>
                        <Option>UKG</Option>
                      </Select>
                    </div>
                    <br />
                    <div>
                      <label style={{ fontSize: '15px' }}>Lesson Name:</label> &nbsp;
                      <Input placeholder="Topic Name" style={{ width: '100%' }} />
                    </div>{' '}
                    <br />
                    <div>
                      <label style={{ fontSize: '15px' }}>Description:</label> &nbsp; &nbsp; &nbsp;
                      <Input placeholder="Topic Name" style={{ width: '100%' }} />
                    </div>{' '}
                    <br />
                    <div>
                      <label style={{ fontSize: '15px' }}>youtube Link:</label> &nbsp;
                      <Input placeholder="Topic Name" style={{ width: '100%' }} />
                    </div>{' '}
                    <br />
                    <div>
                      <label style={{ fontSize: '15px' }}>Duration:</label>&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
                      <Input placeholder="Topic Name" style={{ width: '100%' }} />
                    </div>{' '}
                    <br />
                    <Card.Grid style={gridStyle}>
                      <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 20, color: 'red ' }} />
                      <br />
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>PDF</Button>
                      </Upload>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <FontAwesomeIcon icon={faPlay} style={{ fontSize: 20, color: 'green ' }} />
                      <br />
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Video</Button>
                      </Upload>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <FontAwesomeIcon icon={faPresentation} style={{ fontSize: 20, color: 'red ' }} />
                      <br />
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Presentation</Button>
                      </Upload>
                    </Card.Grid>
                    <Card.Grid style={gridStyle}>
                      <FontAwesomeIcon icon={faFileWord} style={{ fontSize: 20, color: 'blue ' }} />
                      <br />
                      <Upload {...props}>
                        <Button icon={<UploadOutlined />}>Document</Button>
                      </Upload>
                    </Card.Grid>
                  </Col>
                </Cards>
              </Col>
            </Row>
            <div style={{ margin: 10, textAlign: 'end' }}>
              <footer>
                <Button size="small" type="primary">
                  <FeatherIcon icon="plus" size={14} />
                  Add
                </Button>
              </footer>
            </div>
            {/* </Cards> */}
          </Col>
          {/* </Col> */}
        </Row>
      </Main>
    </div>
  );
};

export default Curriculum;
