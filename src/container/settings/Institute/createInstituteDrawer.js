import React, { useEffect, useState } from 'react';
import { Button, Row, Col, Select, Input, DatePicker, Drawer } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
import { modifyHrInstituteSetup2 } from '../../../api/api';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUniversity, faSearchLocation, faMoneyCheckAlt, faAddressCard } from '@fortawesome/pro-duotone-svg-icons';
const { Option } = Select;
import Swal from 'sweetalert2';
const { RangePicker } = DatePicker;
import _ from 'lodash';
function Institute_details({ isVisible, handleCancel, record2,handleOk}) {
  let [record, setRecord] = useState(null);
  useEffect(() => {
    setRecord(record2);
  }, [record2]);
  let cancel = () => {
    setRecord(null);
    handleCancel();
  };
  let onChange = (date, dateString) => {
    if (Array.isArray(date)) {
      let dat = record;
      _.set(dat, 'academicYear.start', date[0])
      _.set(dat, 'academicYear.end', date[1])
      setRecord(dat);
    } else {
      let dat = record;
      dat.yearOfEstablishment = date.toISOString();
      setRecord(dat);
    }
  };
  let onChangeSelect = value => {
    let dat = record;
    dat.instituteType = value;
    setRecord(dat);
  };
  let onChangeInput = (e, string) => {
    let da = e.target.value; 
    let dat = record; 
    _.set(dat, string, da);
    setRecord(dat);
  };

  let ok = () => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update The Details',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        modifyHrInstituteSetup2(record)
          .then(res => {
            if (res) {
              handleOk();
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
            }
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
              text: { e },
            });
          });
      }
    });
  };
  return (
    <>
      {record ? (
        <Drawer
          title="Update Institute"
          width={700}
          destroyOnClose={true}
          onClose={cancel}
          visible={isVisible}
          footer={
            <div
              style={{
                textAlign: 'right',
              }}
            >
              <Button style={{ marginRight: 8 }} onClick={cancel} type="warning">
                Cancel
              </Button>
              <Button type="primary" onClick={ok}>
                Update
              </Button>
            </div>
          }
        >
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <FontAwesomeIcon icon={faUniversity} style={{ fontSize: 15, color: 'blue ' }} /> &nbsp; &nbsp;{' '}
              <label>Institution Details</label>
              <div style={{ padding: 5, marginTop: 20 }}>
                <label>Organization ID</label>
                <br />
                <Input
                  key={record.organization_id}
                  placeholder="organization ID"
                  defaultValue={record.organization_id}
                  disabled="true"
                  prefix={<UserOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Institute ID</label>
                <br />
                <Input
                  key={record.instituteId}
                  placeholder="institute ID"
                  disabled="true"
                  defaultValue={record.instituteId}
                  prefix={<UserOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Institute Name</label>
                <br />
                <Input
                  key={record.instituteName}
                  placeholder="Institute Name"
                  onChange={e => {
                    onChangeInput(e, 'instituteName');
                  }}
                  defaultValue={record.instituteName}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Year of Establishment</label>
                <br />

                <DatePicker
                  key={record.yearOfEstablishment}
                  format='YYYY/MM/DD'
                  defaultValue={moment(record.yearOfEstablishment, 'YYYY/MM/DD')}
                  onChange={(date, dateString) => {
                    onChange(date, dateString, 'yearOfEstablishment');
                  }}
                  style={{ width: '100%' }}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Board of Education</label>
                <br />
                <Select
                  onChange={onChangeSelect}
                  placeholder="CBSE"
                  key={record.instituteType}
                  defaultValue={record.instituteType}
                  style={{ width: '100%' }}
                >
                  <Option key="CBSE" value="1">
                    CBSE
                  </Option>
                  <Option key="Matric" value="2">
                    Matric
                  </Option>
                </Select>
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Location</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'branch');
                  }}
                  placeholder="Location"
                  key={record.branch}
                  defaultValue={record.branch}
                  prefix={<LockOutlined />}
                />
              </div>
              <br />
            </Col>
          </Row>
          {/* //Academic setup details */}
          <Row>
            <Col span={24}>
              <FontAwesomeIcon icon={faUniversity} style={{ fontSize: 15, color: 'blue ' }} /> &nbsp; &nbsp;{' '}
              <label>Academic setup</label>
              <div style={{ padding: 5, marginTop: 20 }}>
                <label>Academic year</label>
                <br />
                <RangePicker
                  key={record.academicYear.start}
                  defaultValue={[
                    moment(record.academicYear.start, 'YYYY-MM-DD  [GMT]Z'),
                    moment(record.academicYear.end, 'YYYY-MM-DD  [GMT]Z'),
                  ]}
                  format="YYYY-MM-DD"
                  onChange={(date, dateString) => {
                    onChange(date, dateString, 'academicYear.start');
                  }}
                  width={'100%'}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Admission prefix</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'academicYear.admissionPrefix');
                  }}
                  key={record.academicYear.admissionPrefix}
                  placeholder="Admission prefix"
                  defaultValue={record.academicYear.admissionPrefix}
                  prefix={<UserOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Admission Start</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'academicYear.admissionStart');
                  }}
                  key={record.academicYear.admissionStart}
                  placeholder="Admission Start"
                  defaultValue={record.academicYear.admissionStart}
                  prefix={<UserOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Teacher prefix</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'teacherPrefix');
                  }}
                  key={record.teacherPrefix}
                  placeholder="Teacher prefix"
                  defaultValue={record.teacherPrefix}
                  prefix={<UserOutlined />}
                />
              </div>
              <br />
            </Col>
          </Row>
          {/* //Admin user setup details */}
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <FontAwesomeIcon icon={faUniversity} style={{ fontSize: 15, color: 'blue ' }} /> &nbsp; &nbsp;{' '}
              <label>Admin User setup</label>
              <div style={{ padding: 5, marginTop: 20 }}>
                <label>Username</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'usersDetails[0].username');
                  }}
                  placeholder="Username"
                  key={record.usersDetails[0].username}
                  value={record.usersDetails[0].username}
                  // defaultValue={record.usersDetails[0].username}
                  prefix={<UserOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Password</label>
                <br />
                <Input.Password
                  onChange={e => {
                    onChangeInput(e, 'usersDetails[0].pass_unhash');
                  }}
                  placeholder="Password"
                  key={record.usersDetails[0].pass_unhash}
                  value={record.usersDetails[0].pass_unhash}
                  // defaultValue={record.usersDetails[0].password}
                  prefix={<LockOutlined />}
                />
              </div>
              <br />
            </Col>
          </Row>
          {/* //Location  details */}
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <FontAwesomeIcon icon={faSearchLocation} style={{ fontSize: 15, color: 'blue ' }} /> &nbsp; &nbsp;{' '}
              <label>Location Details</label>
              <div style={{ padding: 5, marginTop: 20 }}>
                <label>Building No</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'buildingNo');
                  }}
                  placeholder="Building no"
                  key={record.buildingNo}
                  defaultValue={record.buildingNo}
                  prefix={<UserOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Street Name</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'streetName');
                  }}
                  placeholder="Street Name"
                  defaultValue={record.streetName}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Area</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'area');
                  }}
                  placeholder="Area"
                  key={record.area}
                  defaultValue={record.area}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Land Mark</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'landmark');
                  }}
                  placeholder="land mark"
                  key={record.landmark}
                  defaultValue={record.landmark}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>City</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'city');
                  }}
                  placeholder="City"
                  key={record.city}
                  defaultValue={record.city}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Pincode</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'pincode');
                  }}
                  placeholder="pincode"
                  key={record.pincode}
                  defaultValue={record.pincode}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>State</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'state');
                  }}
                  placeholder="state"
                  key={record.state}
                  defaultValue={record.state}
                  prefix={<LockOutlined />}
                />
              </div>
              <br />
            </Col>
          </Row>
          {/* //Bank  details */}
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <FontAwesomeIcon icon={faMoneyCheckAlt} style={{ fontSize: 15, color: 'blue ' }} /> &nbsp; &nbsp;{' '}
              <label>Bank Details</label>
              <div style={{ padding: 5, marginTop: 20 }}>
                <label>Name</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'bankName');
                  }}
                  placeholder="Bank Name"
                  key={record.bankName}
                  defaultValue={record.bankName}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Branch</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'bankBranch');
                  }}
                  placeholder="Branch"
                  key={record.bankBranch}
                  defaultValue={record.bankBranch}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Account Number</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'bankAccountNo');
                  }}
                  placeholder="Account number"
                  key={record.bankAccountNo}
                  defaultValue={record.bankAccountNo}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>IFSC</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'bankIfsc');
                  }}
                  placeholder="IFSC"
                  key={record.bankIfsc}
                  defaultValue={record.bankIfsc}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
            </Col>
          </Row>
          {/* //Contact  details */}
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <FontAwesomeIcon icon={faAddressCard} style={{ fontSize: 15, color: 'blue ' }} /> &nbsp; &nbsp;{' '}
              <label>Contact Details</label>
              <div style={{ padding: 5, marginTop: 20 }}>
                <label>Website</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'website');
                  }}
                  placeholder="website"
                  key={record.website}
                  defaultValue={record.website}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Landline</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'landline');
                  }}
                  placeholder="landline"
                  key={record.landline}
                  defaultValue={record.landline}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Email</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'email');
                  }}
                  placeholder="Email"
                  key={record.email}
                  defaultValue={record.email}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Mobile</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'mobile');
                  }}
                  placeholder="mobile"
                  key={record.mobile}
                  defaultValue={record.mobile}
                  prefix={<MailOutlined />}
                />
              </div>
              <br />
            </Col>
          </Row>
          {/* //Social media  details */}
          <Row style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
            <Col style={{ width: '100%' }}>
              <FontAwesomeIcon icon={faAddressCard} style={{ fontSize: 15, color: 'blue ' }} /> &nbsp; &nbsp;{' '}
              <label>Social Media Details</label>
              <div style={{ padding: 5, marginTop: 20 }}>
                <label>Facebook</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'socialFacebook');
                  }}
                  placeholder="Facebook"
                  key={record.socialFacebook}
                  defaultValue={record.socialFacebook}
                  prefix={<FacebookOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Twitter</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'socialTwitter');
                  }}
                  placeholder="Twitter"
                  key={record.socialTwitter}
                  defaultValue={record.socialTwitter}
                  prefix={<TwitterOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Linked In</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'socialLinkedIn');
                  }}
                  placeholder="linkedin"
                  key={record.socialLinkedIn}
                  defaultValue={record.socialLinkedIn}
                  prefix={<LinkedinOutlined />}
                />
              </div>
              <br />
              <div style={{ padding: 5 }}>
                <label>Instagram</label>
                <br />
                <Input
                  onChange={e => {
                    onChangeInput(e, 'socialInstagram');
                  }}
                  placeholder="instagram"
                  key={record.socialInstagram}
                  defaultValue={record.socialInstagram}
                  prefix={<InstagramOutlined />}
                />
              </div>
            </Col>
          </Row>
        </Drawer>
      ) : null}
    </>
  );
}
export default Institute_details;
