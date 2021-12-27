import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { Label } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './index.css';
import { faLocationArrow, faFileCsv } from '@fortawesome/pro-duotone-svg-icons';

const FeeDownloadModal = ({ modal, toggle }) => {
  const [instituteSelect, setInstituteSelect] = useState('--SELECT--');
  const [designationSelect, setDesignationSelect] = useState('--SELECT--');
  const [data, setData] = useState({
    v_status: 0,
    first_name: '',
    last_name: '',
  });

  const handleCancel = () => {
    setInstituteSelect('--SELECT--');
    setDesignationSelect('--SELECT--');

    setData({
      v_status: 0,
      first_name: '',
      last_name: '',
    });
    toggle();
  };
  console.log(modal);
  return (
    <div>
      <div
        onClick={handleCancel}
        style={{ display: 'flex', alignItems: 'center', marginRight: '12px', cursor: 'pointer' }}
      >
        <FontAwesomeIcon icon={faFileCsv} style={{ fontSize: 20, color: '#78C000 ' }} />
        &nbsp;CSV
      </div>

      <Modal destroyOnClose={true} width="500px" title="Receipt View" visible={modal} onOk={toggle} onCancel={toggle}>
        <div className="fee_download_modal_div">
          <div className="fee_download_title_div_main">
            <div className="fee_download_title_div">
              <h5 className="fee_download_title_content">School Details</h5>
            </div>
            <div className="fee_download_modal_logo_main">
              <div className="fee_download_modal_logo">
                <div></div>
                <div className="fee_download_modal_logo_content">
                  <h5>Everwin Group Of Schools</h5>
                  <Label>Kolathur</Label>
                </div>
              </div>
              <div>
                <Label>Date</Label>
                <h6>3rd Oct 2020</h6>
              </div>
            </div>
          </div>

          <div className="fee_download_title_div_main">
            <div className="fee_download_title_div">
              <h5 className="fee_download_title_content">Student Details</h5>
            </div>
            <div className="fee_download_modal_logo_main">
              <div>
                <Label className="download_modal_title">Academic Year</Label>
                <h6>Kolathur</h6>
              </div>
              <div>
                <Label className="download_modal_title">Student Name</Label>
                <h6>Maya</h6>
              </div>
              <div>
                <Label className="download_modal_title">Level</Label>
                <h6>II</h6>
              </div>
              <div>
                <Label className="download_modal_title">Class</Label>
                <h6>Marvellous</h6>
              </div>
            </div>
          </div>

          <div className="fee_download_title_div_main">
            <div className="fee_download_title_div">
              <h5 className="fee_download_title_content">Fee Details</h5>
            </div>
            <div className="footer_download_modal">
              <Row>
                <Col sm="6">
                  <Label className="footer_download_modal_lable">Total Paid</Label>
                </Col>
                <Col sm="6">
                  <Label className="footer_download_modal_lable">Rs.6500.00</Label>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <Label className="footer_download_modal_lable">Discount</Label>
                </Col>
                <Col sm="6">
                  <Label className="footer_download_modal_lable">10%</Label>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <Label className="footer_download_modal_lable">Fine</Label>
                </Col>
                <Col sm="6">
                  <Label className="footer_download_modal_lable">Rs.100</Label>
                </Col>
              </Row>

              <Row>
                <Col sm="6">
                  <Label className="footer_download_modal_lable">Total Paid Amount</Label>
                </Col>
                <Col sm="6">
                  <Label className="footer_download_modal_lable">Rs.25000</Label>
                </Col>
              </Row>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FeeDownloadModal;
