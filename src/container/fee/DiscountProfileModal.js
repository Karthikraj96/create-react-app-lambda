import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space, Drawer } from 'antd';
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
import { Route } from 'react-router';

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

function DiscountProfileModal({ isVisible, handleOk, handleCancel }) {
  return (
    //  <Select placeholder="Select Institute" style={{ width: '80%' }}>
    //         <Option value="1">1</Option>
    //         <Option value="2">2</Option>
    //       </Select>
    <Drawer
      title="Creat Discount"
      width={400}
      onClose={handleCancel}
      visible={isVisible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }}>Cancel</Button>
          <Button type="primary">Create</Button>
        </div>
      }
    >
      {/* //Institute details */}

      <Row>
        <Col span={24}>
          <div>
            <label style={{ margin: 1 }}><strong>Academic Year</strong></label> &nbsp; &nbsp; &nbsp; &nbsp;
            <span>2020-2021 -discount-3000</span>
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}><strong>Academic Year</strong></label> &nbsp; &nbsp; &nbsp; &nbsp;
            <span>2021-2022 -discount-2000</span>
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}><strong>Total</strong></label> &nbsp; &nbsp; &nbsp; &nbsp;
            <span>Total-discount-5000</span>
          </div>
          <br />
        </Col>
      </Row>
      {/* <Row gutter={24}>
      <Col  span={12} >
            
                <label style={{ margin:1 }}>Level</label> &nbsp; &nbsp;
                
              </Col>
              <Col  span={12} >
               
              
              </Col>

      </Row> */}
    </Drawer>
  );
}

export default DiscountProfileModal;
