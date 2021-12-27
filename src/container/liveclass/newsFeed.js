import React, { useState } from 'react';
import { Link, Switch, Route, useRouteMatch, NavLink } from 'react-router-dom';
import { Row, Col, Card, Divider, Modal, Input, Select, Space, Avatar, Upload, Radio, Image } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';
import { faMusic, faPhotoVideo, faPoll, faPlay, faVideo, faImage, faImages } from '@fortawesome/pro-duotone-svg-icons';
import { faPencil, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import { fal } from '@fortawesome/pro-light-svg-icons';

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

const NewFeed = () => {
  const [value, setValue] = React.useState(1);
  const [state, setState] = useState({
    loading: false,
    visible: false,
  });
  const [videomodal, setVideoModal] = useState({
    videoloading: false,
    videovisible: false,
  });

  const [audiomodal, setAudioModal] = useState({
    audioloading: false,
    audiovisible: false,
  });
  const [pollmodal, setPollModal] = useState({
    pollloading: false,
    pollvisible: false,
  });

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const videoModal = () => {
    setVideoModal({
      videovisible: true,
    });
  };

  const audioModal = () => {
    setAudioModal({
      audiovisible: true,
    });
  };
  const pollMOdal = () => {
    setPollModal({
      pollvisible: true,
    });
  };

  const showModal = () => {
    setState({
      visible: true,
    });
  };

  const handleOk = () => {
    setState({ loading: true });
    setVideoModal({ videoloading: true });
    setAudioModal({ audioloading: true });
    setPollModal({ pollloading: true });
    // setModal({ isloading: true });
    setTimeout(() => {
      setState({ loading: false, visible: false });
      setVideoModal({ videoloading: false, videovisible: false });
      setAudioModal({ audioloading: false, audiovisible: false });
      setPollModal({ pollloading: false, pollvisible: false });
      //   setModal({ isloading: false, isvisible: false });
    }, 3000);
  };

  const handleCancel = () => {
    setState({ visible: false });
    setVideoModal({ videovisible: false });
    setAudioModal({ audiovisible: false });
    setPollModal({ pollvisible: false });
  };

  const { visible, loading } = state;

  const { videovisible, videoloading } = videomodal;

  const { audiovisible, audioloading } = audiomodal;

  const { pollvisible, pollloading } = pollmodal;

  const action = () => {
    <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} />;
  };
  return (
    <div>
      <PageHeader
        ghost
        title="News Feed"
        buttons={
          [
            //   <div key="1" className="page-header-actions">
            //     <Button size="small"  type="primary" onClick={showModal}>
            //       Shedule
            //     </Button>
            //   </div>
          ]
        }
      />

      <div className="site-card-border-less-wrapper">
        <Card>
          <Row>
            <Col span={10} push={5}>
              <p
                block
                size="small"
                onClick={showModal}
                style={{ backgroundColor: 'lightgray', textAlign: 'left', padding: '5px', fontSize: 20 }}
              >
                News Feed
              </p>
            </Col>
          </Row>
          <Row>
            <Col span={10} push={5}>
              <Space size="middle">
                <FontAwesomeIcon icon={faImages} style={{ fontSize: 40 }} />
                <label onClick={videoModal} style={{ fontSize: 20 }}>
                  Images/video
                </label>
                <FontAwesomeIcon icon={faMusic} style={{ fontSize: 40 }} />
                <label onClick={audioModal} style={{ fontSize: 20 }}>
                  Audio
                </label>
                <FontAwesomeIcon icon={faPoll} style={{ fontSize: 49 }} />
                <label onClick={pollMOdal} style={{ fontSize: 20 }}>
                  Poll
                </label>
              </Space>
            </Col>
          </Row>
        </Card>
        <div style={{ marginTop: '10px' }}>
          <Card>
            <Row>
              <Col span={16} push={5} style={{ padding: '5px' }}>
                <p style={{ fontSize: 18 }}>Audience | Date | (Create By)</p>
              </Col>
              <Col span={6} pull={2}>
                <Space size="middle">
                  <FontAwesomeIcon icon={faPencil} style={{ fontSize: 20, color: 'green ' }} />
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                </Space>
              </Col>
              <Col span={10} push={5} style={{ textAlign: 'center' }}>
                <p>
                  {' '}
                  A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
                  welcome guest in many households across the world.
                </p>{' '}
                <br />
                <Image
                  width={200}
                  src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202008/Share_Multiple_Photos_and_Vide.jpeg?unoTzeJwAg_xbBQ0tXg8pxV5A5sl1VEO&size=770:433"
                />
              </Col>
            </Row>{' '}
            <br />
            <Row>
              <Col span={16} push={5} style={{ padding: '5px' }}>
                <p style={{ fontSize: 18 }}>Audience | Date | (Create By)</p>
              </Col>
              <Col span={6} pull={2}>
                <Space size="middle">
                  <FontAwesomeIcon icon={faPencil} style={{ fontSize: 20, color: 'green ' }} />
                  <FontAwesomeIcon icon={faTrash} style={{ fontSize: 20, color: 'red ' }} />
                </Space>
              </Col>
              <Col span={10} push={5} style={{ textAlign: 'center' }}>
                <p>
                  {' '}
                  A dog is a type of domesticated animal. Known for its loyalty and faithfulness, it can be found as a
                  welcome guest in many households across the world.
                </p>{' '}
                <br />
                <Image
                  width={200}
                  src="https://s3-eu-west-1.amazonaws.com/dmi-studentportal-uploads/v3blog/17-Types-of-Posts-You-Can-No-Longer-Post-on-Facebook_01.gif"
                />
              </Col>
            </Row>
          </Card>
        </div>
      </div>
      <Modal destroyOnClose={true}
        visible={visible}
        title="News Feed"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Post
          </Button>,
        ]}
        width={1000}
      >
        <div>
          <label style={{ padding: 18 }}>Institution</label> &nbsp;
          <Select defaultValue="LKG" size="small" style={{ width: 280 }}>
            <Option>CBSE</Option>
            <Option>Matric.</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 18 }}>Audience</label> &nbsp;
          <Select defaultValue="Teacher" size="small" style={{ width: 280 }}>
            <Option>Teacher</Option>
            <Option>Parent</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 32 }}>Level</label> &nbsp;
          <Select defaultValue="LKG" size="small" style={{ width: 280 }}>
            <Option>UKG</Option>
            <Option>LKG</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 15 }}>Media Type </label> &nbsp;
          <Space size="middle">
            <Radio.Group onChange={onChange} value={value}>
              <Radio value={1}>Image/Video</Radio>
              <Radio value={2}>Audio</Radio>
              <Radio value={3}>Poll</Radio>
            </Radio.Group>
          </Space>
        </div>
        <br />
        <div>
          <label style={{ padding: 12 }}>Description</label> &nbsp;
          <Input style={{ width: '30%' }} />
        </div>
        <br />
        <div>
          <label style={{ padding: 12 }}>Attachment</label> &nbsp;
          <Upload {...props}>
            <span>
              {' '}
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </span>
          </Upload>
        </div>
      </Modal>
      {/* //video Modal */}
      <Modal destroyOnClose={true}
        visible={videovisible}
        title="New Video"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Post
          </Button>,
        ]}
        width={1000}
      >
        <div>
          <label style={{ padding: 18 }}>Institution</label> &nbsp;
          <Select defaultValue="LKG" size="small" style={{ width: 280 }}>
            <Option>CBSE</Option>
            <Option>Matric.</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 18 }}>Audience</label> &nbsp;
          <Select defaultValue="Teacher" size="small" style={{ width: 280 }}>
            <Option>Teacher</Option>
            <Option>Parent</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 32 }}>Level</label> &nbsp;
          <Select defaultValue="LKG" size="small" style={{ width: 280 }}>
            <Option>UKG</Option>
            <Option>LKG</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 20 }}>Video</label> &nbsp;
          <Upload {...props}>
            <span>
              {' '}
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </span>
          </Upload>{' '}
        </div>

        <br />
        <div>
          <label style={{ padding: 12 }}>Description</label> &nbsp;
          <Input style={{ width: '30%' }} />
        </div>
        <br />
      </Modal>
      {/* //audio Modal */}
      <Modal destroyOnClose={true}
        visible={audiovisible}
        title="New Audio"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Post
          </Button>,
        ]}
        width={1000}
      >
        <div>
          <label style={{ padding: 18 }}>Institution</label> &nbsp;
          <Select defaultValue="LKG" size="small" style={{ width: 280 }}>
            <Option>CBSE</Option>
            <Option>Matric.</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 18 }}>Audience</label> &nbsp;
          <Select defaultValue="Teacher" size="small" style={{ width: 280 }}>
            <Option>Teacher</Option>
            <Option>Parent</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 32 }}>Level</label> &nbsp;
          <Select defaultValue="LKG" size="small" style={{ width: 280 }}>
            <Option>UKG</Option>
            <Option>LKG</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 20 }}>Audio</label> &nbsp;
          <Upload {...props}>
            <span>
              {' '}
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </span>
          </Upload>{' '}
        </div>
        <br />
        <div>
          <label style={{ padding: 12 }}>Description</label> &nbsp;
          <Input style={{ width: '30%' }} />
        </div>
      </Modal>

      {/* poll Modal */}
      <Modal destroyOnClose={true}
        visible={pollvisible}
        title="New Poll"
        centered
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Back
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            Post
          </Button>,
        ]}
        width={1000}
      >
        <div>
          <label style={{ padding: 18 }}>Institution</label> &nbsp;
          <Select defaultValue="CBSE" size="small" style={{ width: 280 }}>
            <Option>CBSE</Option>
            <Option>Matric.</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 18 }}>Audience</label> &nbsp;
          <Select defaultValue="Parent/Teacher/All" size="small" style={{ width: 280 }}>
            <Option>Parent</Option>
            <Option>Teacher</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 32 }}>Level</label> &nbsp;
          <Select defaultValue="LKG" size="small" style={{ width: 280 }}>
            <Option>LKG</Option>
            <Option>UKG</Option>
          </Select>
        </div>
        <br />
        <div>
          <label style={{ padding: 5 }}>Poll Question</label> &nbsp;
          <Input style={{ width: '30%' }} placeholder="are you satisfied? " />
          &nbsp; &nbsp;
        </div>
        <br />
        <div>
          <label style={{ padding: 20 }}>Option 1</label> &nbsp;
          <Input style={{ width: '30%' }} placeholder="Yes " /> &nbsp; &nbsp;
          <Button size="small" type="primary">
            <FeatherIcon icon="plus" size={14} />
            Add
          </Button>
        </div>
        <br />
        <div>
          <label style={{ padding: 20 }}>Option 2</label> &nbsp;
          <Input style={{ width: '30%' }} placeholder="No " />
        </div>
        <br />
        <div>
          <label style={{ padding: 20 }}>Option 3</label> &nbsp;
          <Input style={{ width: '30%' }} placeholder="May be " />
        </div>
      </Modal>
    </div>
  );
};

export default NewFeed;
