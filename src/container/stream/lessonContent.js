import React, { useState } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Link } from 'react-router-dom';
import { Row, Col, Input, Card, Collapse, Breadcrumb, Image } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { Main } from '../styled';
// import VideoPlayer from 'react-video-markers';
import { useLocation } from 'react-router-dom';
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
import { LionPlayer } from 'lion-player';
import { useParams } from 'react-router-dom';
import { UncontrolledLionPlayer, usePlayer } from 'lion-player';
import { Media, Player, controls } from 'react-media-player';
const { PlayPause, MuteUnmute } = controls;

const SOURCES = [
  {
    src: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    // type: 'application/x-mpegURL',
  },
  { src: 'https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=1' },
  // {
  //   src: 'https://bitmovin-a.akamaihd.net/content/playhouse-vr/mpds/105560.mpd',
  //   type: 'application/dash+xml',
  // },
];
const LessonContent = () => {
  const params = useParams();
  let location = useLocation();
  const [isPlaying, setisPlaying] = useState(false);
  const [currentURL, setcurrentURL] = useState('');
  const [volume, setvolume] = useState(0.7);
  const { Panel } = Collapse;
  const handlePlay = () => {
    setisPlaying(true);
  };
  // useEffect(() => {
  //   if (this.props.srcURL) {
  //     setcurrentURL(this.props.srcURL);
  //   }
  // }, []);
  const handlePause = () => {
    setisPlaying(false);
  };

  const handleVolume = value => {
    setvolume(value);
  };

  return (
    <div>
      <PageHeader
        title="Maths"
        buttons={[
          <div key="1" className="page-header-actions">
            <Link to="/admin/datastream">
              <Button size="small" type="primary">
                Back
              </Button>
            </Link>
          </div>,
        ]}
      />
      <Main>
        <Row gutter={24}>
          <Col sm={24} md={24} lg={6} xl={6} xxl={5}>
            <Card style={{ height: 'calc(100vh-100px)', overflowY: 'scroll' }} title="Contents">
              <Row>
                <Col style={{ cursor: 'pointer' }} span={24}>
                  {' '}
                  <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: 15, color: 'Dodgerblue ' }} />{' '}
                  <span style={{ padding: '8px' }}>Trignomentry</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ cursor: 'pointer' }} span={24}>
                  {' '}
                  <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: 15, color: 'Dodgerblue ' }} />{' '}
                  <span style={{ padding: '8px' }}>Integration</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ cursor: 'pointer' }} span={24}>
                  {' '}
                  <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: 15, color: 'Dodgerblue ' }} />{' '}
                  <span style={{ padding: '8px' }}>Differentiation</span>
                </Col>
              </Row>
              <br />
              <Row>
                <Col style={{ cursor: 'pointer' }} span={24}>
                  {' '}
                  <FontAwesomeIcon icon={faPlayCircle} style={{ fontSize: 15, color: 'Dodgerblue ' }} />{' '}
                  <span style={{ padding: '8px' }}>Vector Alegbra</span>
                </Col>
              </Row>
              <br />

              <Row>
                <Col span={24}>
                  {' '}
                  <FontAwesomeIcon icon={faFilePdf} style={{ fontSize: 15, color: 'red ' }} />{' '}
                  <span style={{ padding: '10px' }}>Algebra</span>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col sm={24} md={24} lg={18} xl={18} xxl={18}>
            <Card style={{ height: 'auto' }}>
              {location.state.contentType === 'video' ? (
                <>
                  {location.state.srcFrom === 'other' ? (
                    <LionPlayer
                      sources={[location.state.srcURL]}
                      autoplay={false}
                      poster="https://everwinschool.com/img/school/logo-mathur.png"
                      bigPlayButton={true}
                      controls={true}
                      fluid={true}
                    />
                  ) : (
                    <div class="videoWrapper">
                      <iframe
                        width="100%"
                        height="auto"
                        src={location.state.srcURL}
                        frameborder="0"
                        allowfullscreen
                      ></iframe>
                    </div>
                  )}
                </>
              ) : (
                <div class="videoWrapper">
                  <iframe
                    width="100%"
                    height="auto"
                    src={location.state.srcURL}
                    frameborder="0"
                    allowfullscreen
                  ></iframe>
                </div>
              )}
            </Card>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default LessonContent;
