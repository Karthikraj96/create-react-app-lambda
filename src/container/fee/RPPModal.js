import React from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,Drawer } from 'antd';
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

function RPPModal({ isVisible, handleOk, handleCancel }) {
  return (
    <Drawer
    title="RPP Student Name | Class Name"
    width={400}
    onClose={handleCancel}
    visible={isVisible}
    footer={
      <div
        style={{
          textAlign: 'right',
        }}
      >
        <Button style={{ marginRight: 8 }} type="warning">
          Cancel
        </Button>
        <Button type="primary">Create</Button>
      </div>
    }
  >
      {/* //Institute details */}

      <Row>
        <Col span={24}>
        <div>
        <label style={{ margin:1 }}><strong>Academic year:</strong></label> &nbsp; &nbsp; &nbsp; &nbsp;
        <span>2020-2021</span>
       
      </div><br />
      <div>
        <label style={{ margin:1 }}><strong>Amount paid</strong></label> &nbsp; &nbsp; &nbsp; &nbsp;
        <span>paid Successfull</span>
        <br />
       
      </div>{' '}<br />
      <div>
      <label style={{ margin:1 }}><strong>Date of Payment</strong></label> &nbsp; &nbsp; &nbsp; &nbsp;
        <span>27/5/2021</span>
      </div><br />
      {/* <div>
      <label style={{ margin:1 }}>Amount Pending</label> &nbsp; &nbsp; &nbsp; &nbsp;
        <span>10000</span>
      </div><br /> */}
      <div>
      <label style={{ margin:1 }}><strong>Type</strong></label> &nbsp; &nbsp; &nbsp; &nbsp;
      <span>Renewal type</span>
        {/* <Select placeholder="select your type" style={{width:'50%'}}>
          <Option key="1">Fresh Type</Option>
          <Option key="2">Renewal Type</Option>
        </Select> */}
      </div><br />
      
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

export default RPPModal;
