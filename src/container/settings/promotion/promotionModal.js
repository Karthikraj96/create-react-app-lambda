import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
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
  faUniversity,
  faSearchLocation,
  faMoneyCheckAlt,
  faAddressCard,
} from '@fortawesome/pro-duotone-svg-icons';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

function PromotionModal({ isVisible, handleOk, handleCancel }) {
  return (
    //  <Select placeholder="Select Institute" style={{ width: '80%' }}>
    //         <Option value="1">1</Option>
    //         <Option value="2">2</Option>
    //       </Select>
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Create Promotion"
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width={800}
    >
      {/* //Institute details */}

      <Row>
        <Col span={24}>
          <div >
            <label>Academic Year</label>
            <br />

            <DatePicker showTime onChange={onChange} style={{ width: '100%' }} />
          </div>
        </Col>
      </Row>
    </Modal>
  );
}

export default PromotionModal;
