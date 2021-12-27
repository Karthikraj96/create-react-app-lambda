import React, { useState, useEffect, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/buttons/buttons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { useHistory } from 'react-router-dom';
import { Card, Space, message, Collapse, Layout, Col, Row, Steps } from 'antd';
import { UploadOutlined, PlusOutlined, ClockCircleOutlined, FilePdfOutlined } from '@ant-design/icons';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilePdf, faPlayCircle, faEdit } from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';
import { Main } from '../styled';

const Lessons = () => {
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
  return (
    <div>
      <PageHeader
        ghost
        title="Chapters"
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
        <Row gutter={24}>
          <Col sm={24} md={24} lg={24} xl={24} xxl={24}>
            <Card>
              <Collapse defaultActiveKey={['1', '2', '3']} ghost>
                <Panel header="Maths Chapter 1 | Lesson 2" key="1">
                  <div>
                    <div style={{ paddingLeft: 24 }}>
                      <Row>
                        <Col span={8}>
                          {' '}
                          <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: 18, color: 'Dodgerblue ' }} />{' '}
                          <span style={{ padding: '12px' }}>Lesson:1</span>
                        </Col>
                        <Col span={8} offset={5}>
                          <Link
                            to={{
                              pathname: '/content',
                              state: lessonData,
                            }}
                          >
                            <Button size="small" type="dark">
                              Start
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </div>{' '}
                    <br />
                    <div style={{ paddingLeft: 25 }}>
                      <Row>
                        <Col span={8}>
                          {' '}
                          <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 18, color: 'red ' }} />{' '}
                          <span style={{ padding: '12px' }}>Lesson:2 (PDF)</span>
                        </Col>
                        <Col span={8} offset={5}>
                          <Link
                            to={{
                              pathname: '/content',
                              state: {
                                contentType: 'pdf',
                                srcFrom: 'other',
                                srcURL: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
                              },
                            }}
                          >
                            <Button size="small" type="dark">
                              Start
                            </Button>
                          </Link>
                          {/* </Space> */}
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Panel>
                <Panel header="Maths Chapter 2 | Lesson 2" key="2">
                  <div>
                    <div style={{ paddingLeft: 24 }}>
                      <Row>
                        <Col span={8}>
                          {' '}
                          <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: 18, color: 'Dodgerblue ' }} />{' '}
                          <span style={{ padding: '12px' }}>Lesson:1 (YT)</span>
                        </Col>
                        <Col span={8} offset={5}>
                          {/* <Space size={[8, 16]}> */}
                          <Link
                            to={{
                              pathname: '/content',
                              state: {
                                contentType: 'video',
                                srcFrom: 'youtube',
                                srcURL: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=0',
                              },
                            }}
                          >
                            <Button size="small" type="dark">
                              Start
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </div>{' '}
                    <br />
                    <div style={{ paddingLeft: 25 }}>
                      <Row>
                        <Col span={8}>
                          {' '}
                          <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 18, color: 'red ' }} />{' '}
                          <span style={{ padding: '12px' }}>Lesson:2</span>
                        </Col>
                        <Col span={8} offset={5}>
                          <Link to="/content">
                            <Button size="small" type="dark">
                              Start
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Panel>
                <Panel header="Maths Chapter 3 | Lesson 2" key="3">
                  <div>
                    <div style={{ paddingLeft: 24 }}>
                      <Row>
                        <Col span={8}>
                          {' '}
                          <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: 18, color: 'Dodgerblue ' }} />{' '}
                          <span style={{ padding: '12px' }}>Lesson:1</span>
                        </Col>
                        <Col span={8} offset={5}>
                          <Link to="/content">
                            <Button size="small" type="dark">
                              Start
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </div>{' '}
                    <br />
                    <div style={{ paddingLeft: 25 }}>
                      <Row>
                        <Col span={8}>
                          {' '}
                          <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 18, color: 'red ' }} />{' '}
                          <span style={{ padding: '12px' }}>Lesson:2</span>
                        </Col>
                        <Col span={8} offset={5}>
                          <Link to="/content">
                            <Button size="small" type="dark">
                              Start
                            </Button>
                          </Link>
                        </Col>
                      </Row>
                    </div>
                  </div>
                </Panel>
              </Collapse>
            </Card>{' '}
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Lessons;
