import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'antd';
import { Select } from 'antd';
import { Input, InputNumber, DatePicker } from 'antd';
import { Form } from 'antd';
import Swal from 'sweetalert2';
import moment from 'moment';
import { findRegUser } from '../../api/api';
const { Option } = Select;
function CreateAdmission({ isVisible, isedit, record2, grade, handleOk, handleCancel, year }) {
  let intialValue = {
    testDate: null,
    testRemark: null,
    RelationShip: null,
    batch: null,
    class: null,
    admissionDate: null,
    admission_no: null,
    application_no: null,
    feeDate: null,
    feeStatus: null,
    occupation: null,
    mother_name: null,
    mother_mno: null,
    mother_educational_Relationship: null,
    mother_occupation: null,
    existingParent: 0,
    father_mno: null,
    father_name: null,
    first_name: null,
    gender: null,
    last_name: null,
    source: null,
    msg:
      'ENQUIRY: Dear Parent, we thank you for your interest in Everwin education. We look forward to serving you now and forever.',
    changeUpdate: null,
    status: null,
    statusDate: null,
    is_active: 0,
    guardian_id: null,
    registeredMob: null,
    onlineForm: 0,
    statusRemark: [],
  };
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  let [checkno, setCheckNo] = useState(null);
  let date = new Date();
  let [record, setRecord] = useState(record2 ? record2 : {});
  let [exist, setExist] = useState(false);
  let [feestatus, setFeeStatus] = useState(false);
  let [admissionStatus, setAdmissionStatus] = useState(false);
  let checkNumber = value => {
    setCheckNo(value);
  };
  useEffect(() => {
    if (record) {
      if (record.status === 1) {
        setFeeStatus(true);
      } else if (record.status === 2) {
        setFeeStatus(true);
        setAdmissionStatus(true);
      } else {
        setFeeStatus(false);
        setAdmissionStatus(false);
      }
      if (record.existingParent === 1) {
        setExist(true);
        setCheckNo(record.father_mno);
      }
    }
    form.setFieldsValue(record);
  }, [record, form]);
  useEffect(() => {
    if (record2) {
      // let val = record2;
      // val.feeDate = record2.feeDate ? moment(new Date(record.feeDate)) :  moment(date);
      // val.testDate = record2.testDate ? moment(new Date(record.testDate)) :   moment(date);
      // setRecord({ ...record, ['feeDate']: val.feeDate, ['testDate']: val.testDate });
      setRecord(record2);
      //  form.setFieldsValue(val);
    }
  }, [record2]);
  let StatusRemark = e => {
    let remark = e.target.value;
    let val = { statusDate: date, remarks: remark, status: record.status };
    let arr = record ? (record.statusRemark ? record.statusRemark : []) : [];
    arr.push(val);
    setRecord({ ...record, ['statusDate']: date, ['statusRemark']: arr });
  };
  let ChangeStatus = value => {
    changeMessage(value);
    if (value === 1) {
      if (record) {
        if (record.id) {
          let dat = {};
          dat.feeDate = moment(date, 'YYYY-MM-DD');
          dat.statusDate = moment(date, 'YYYY-MM-DD');
          dat.status = value;
          setRecord({ ...record, ['feeDate']: dat.feeDate, ['statusDate']: dat.statusDate, ['status']: value });
          setFeeStatus(true);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Application is Found',
            text: 'First File the Application',
          });
          return;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No Application is Found',
          text: 'First File the Application',
        });
        return;
      }
    } else if (value === 2) {
      if (record) {
        if (record.feeDate) {
          setFeeStatus(true);
          setAdmissionStatus(true);
          let dat = {};
          dat.statusDate = moment(date, 'YYYY-MM-DD');
          dat.status = value;
          setRecord({ ...record, ['statusDate']: dat.statusDate, ['status']: value });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'No Application is Found',
            text: 'First File the Application',
          });
          return;
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'No Application is Found',
          text: 'First File the Application',
        });
        return;
      }
    } else {
      let dat = record;
      dat.statusDate = moment(date, 'YYYY-MM-DD');
      dat.status = value;
      setRecord({ ...record, ['statusDate']: dat.statusDate, ['status']: value });
      setFeeStatus(false);
      setAdmissionStatus(false);
    }
  };
  let CheckExist = () => {
    if (checkno === null) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Number',
        text: 'Please Enter the Phone Number',
      });
    } else if (checkno.toString().length <= 9) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Number',
        text: 'Number Does Not Contains 10 Digit',
      });
    } else if (checkno.toString().length > 10) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Number',
        text: 'Number  Contains more than 10 Digit',
      });
    } else {
      findRegUser(checkno)
        .then(res => {
          let dat = {};
          dat.existingParent = 1;
          dat.father_name = res.data.parent.first_name ? res.data.parent.first_name : null;
          dat.father_mno = res.data.parent.mobile_number ? res.data.parent.mobile_number : null;
          dat.registeredMob = res.data.parent.mobile_number ? res.data.parent.mobile_number : null;
          dat.guardian_id = res.data.parent.id ? res.data.parent.id : null;
          dat.occupation = res.data.parent.occupation ? res.data.parent.occupation : null;
          dat.mother_educational_Relationship = res.data.parent.srelationship ? res.data.parent.srelationship : null;
          dat.mother_occupation = res.data.parent.mother_occupation ? res.data.parent.mother_occupation : null;
          dat.mother_mno = res.data.parent.mother_mobile_number ? res.data.parent.mother_mobile_number : null;
          dat.building_no = res.data.parent.building_no ? res.data.parent.building_no : null;
          dat.address = res.data.parent.address ? res.data.parent.address : null;
          dat.locality = res.data.parent.locality ? res.data.parent.locality : null;
          dat.city = res.data.parent.city ? res.data.parent.city : null;
          dat.pincode = res.data.parent.pincode ? res.data.parent.pincode : null;
          dat.mother_name = res.data.parent.mother_first_name ? res.data.parent.mother_first_name : null;
          setRecord({
            ...record,
            ['existingParent']: 1,
            ['occupation']: dat.occupation,
            ['guardian_id']: dat.guardian_id,
            ['father_mno']: dat.father_mno,
            ['registeredMob']: dat.registeredMob,
            ['father_name']: dat.father_name,
            ['city']: dat.city,
            ['locality']: dat.locality,
            ['pincode']: dat.pincode,
            ['address']: dat.address,
            ['building_no']: dat.building_no,
            ['mother_mno']: dat.mother_mno,
            ['mother_occupation']: dat.mother_occupation,
            ['mother_educational_Relationship']: dat.mother_educational_Relationship,
            ['mother_name']: dat.mother_name,
          });
          Swal.fire({
            icon: 'success',
            title: 'User Found',
          });
        })
        .catch(e => {
          console.log(e);
          Swal.fire({
            icon: 'error',
            title: 'Invalid Number',
            text: 'Mobile Number Not Found',
          });
        });
    }
  };
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  let existParent = value => {
    if (value === 0) {
      setExist(false);
    } else {
      setExist(true);
    }
    handleSelect(value, 'existingParent');
  };
  let handleSelect = (value, name) => {
    setRecord({ ...record, [name]: value });
  };
  let changeMessage = value => {
    let message;
    if (value === 0) {
      message =
        'ENQUIRY: Dear Parent, we thank you for your interest in Everwin education. We look forward to serving you now and forever.';
    } else if (value === 1) {
      message =
        'APPLICATION: Dear Parent, we thank you for your interest in Everwin education. We look forward to serving you now and forever.';
    } else if (value === 1) {
      message =
        'ADMISSION: Dear Parent, we thank you for your interest in Everwin education. We look forward to serving you now and forever.';
    } else {
      message = 'Dear Parent, we thank you for your interest in Everwin education. We look forward to serving you';
    }
    setRecord({ ...record, ['msg']: message });
  };
  // let handleOk1 = () =>{
  //   handleOk(record, setRecord, intialValue)
  // }
  return (
    <Modal
      destroyOnClose={true}
      title="Edit Application"
      visible={isVisible}
      // onOk={() => handleOk(record, setRecord,intialValue)}
      onCancel={handleCancel}
      // okText="Update Application"
      cancelText="Cancel"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="Profileform">
          Update Application
        </Button>,
      ]}
      width={'50%'}
    >
      <Form
        preserve={false}
        form={form}
        id="Profileform"
        layout="vertical"
        initialValues={record}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        onFinish={() => handleOk(record)}
      >
        <Form.Item
          label="Admission For Academic Year"
          name="batch"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          required
          tooltip="This is a required field"
        >
          <Select
            placeholder="Select Year"
            // defaultValue={record ? record.batch : ''}
            onChange={value => {
              handleSelect(value, 'batch');
            }}
            style={{ width: '100%' }}
          >
            {year.map(e => {
              return <Option value={e.year}>{e.year}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="First Name"
          required
          name="first_name"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          tooltip="This is a required field"
        >
          <Input
            // defaultValue={record ? record.first_name : ''}
            onChange={e => {
              handleSelect(e.target.value, 'first_name');
            }}
            placeholder="Student's First Name"
          />
        </Form.Item>
        <Form.Item
          label="Last Name"
          name="last_name"
          required
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          tooltip={{
            title: 'Tooltip with customize icon',
          }}
        >
          <Input
            // defaultValue={record ? record.last_name : ''}
            onChange={e => {
              handleSelect(e.target.value, 'last_name');
            }}
            placeholder="Student's Last Name"
          />
        </Form.Item>
        <Form.Item
          label="Gender"
          name="gender"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          required
          tooltip="This is a required field"
        >
          <Select
            placeholder="Select Gender"
            // defaultValue={record ? record.gender : ''}
            onChange={value => {
              handleSelect(value, 'gender');
            }}
            style={{ width: '100%' }}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Status"
          name="status"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          required
          tooltip="This is a required field"
        >
          <Select
            placeholder="Select"
            value={record ? record.status : ''}
            onChange={ChangeStatus}
            style={{ width: '100%' }}
          >
            <Option value={0}>Enquiry</Option>
            <Option value={1}>Application</Option>
            <Option value={2}>Admission</Option>
            <Option value={3}>Rejected</Option>
            <Option value={4}>Not Interest</Option>
          </Select>
        </Form.Item>
        {feestatus === true ? (
          admissionStatus === true ? (
            <>
              <Form.Item
                label="Application No"
                required
                name="application_no"
                rules={[{ required: true, message: 'Please enter the detail!' }]}
                tooltip="This is a required field"
              >
                <Input
                  // defaultValue={record ? record.first_name : ''}
                  onChange={e => {
                    handleSelect(e.target.value, 'application_no');
                  }}
                  placeholder="Application No"
                />
              </Form.Item>
              <Form.Item
                label="Admission No"
                required
                name="admission_no"
                rules={[{ required: true, message: 'Please enter the detail!' }]}
                tooltip="This is a required field"
              >
                <Input
                  // defaultValue={record ? record.first_name : ''}
                  onChange={e => {
                    handleSelect(e.target.value, 'admission_no');
                  }}
                  placeholder="Admission No"
                />
              </Form.Item>
            </>
          ) : (
            <Form.Item
              label="Application No"
              required
              name="application_no"
              rules={[{ required: true, message: 'Please enter the detail!' }]}
              tooltip="This is a required field"
            >
              <Input
                // defaultValue={record ? record.first_name : ''}
                onChange={e => {
                  handleSelect(e.target.value, 'application_no');
                }}
                placeholder="Application No"
              />
            </Form.Item>
          )
        ) : (
          <></>
        )}
        <Form.Item
          label="Level"
          name="class"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          required
          tooltip="This is a required field"
        >
          <Select
            // defaultValue={record ? record.class : ''}
            placeholder="Select Level"
            onChange={value => {
              handleSelect(value, 'class');
            }}
            style={{ width: '100%' }}
          >
            {grade.map((g, i) => {
              return (
                <Option key={i} value={g.id}>
                  {g.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="Existing Parent"
          name="existingParent"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          required
          tooltip="This is a required field"
        >
          <Select
            placeholder="Select"
            // defaultValue={record ? record.existingParent : ''}
            onChange={existParent}
            style={{ width: '100%' }}
          >
            <Option value={0}>No</Option>
            <Option value={1}>Yes</Option>
          </Select>
        </Form.Item>
        {feestatus === true ? (
          <>
            <Form.Item
              label="Test Date"
              name="testDate"
              rules={[{ required: false, message: 'Please enter the detail!' }]}
              required
              tooltip="This is a required field"
            >
              {' '}
              <DatePicker
                format="YYYY-MM-DD"
                size="middle"
                // key={
                //   record
                //     ? record.testDate
                //       ? record.testDate
                //       : Math.floor(Math.random() * 50)
                //     : Math.floor(Math.random() * 60)
                // }
                onChange={(date, dateString) => {
                  handleSelect(date, 'testDate');
                }}
                defaultValue={moment(record ? (record.testDate ? record.testDate : date) : date, 'YYYY-MM-DD')}
                style={{ width: '100%', height: '46px' }}
              />{' '}
            </Form.Item>
            <Form.Item
              label="Test Remarks"
              name="testRemark"
              required
              rules={[{ required: true, message: 'Please enter the detail!' }]}
              tooltip="This is a required field"
            >
              <Input
                onChange={e => {
                  handleSelect(e.target.value, 'testRemark');
                }}
              />
            </Form.Item>
            <Form.Item
              label="Fee Date"
              name="feeDate"
              rules={[{ required: false, message: 'Please enter the detail!' }]}
              required
              tooltip="This is a required field"
            >
              {' '}
              <DatePicker
                format="YYYY-MM-DD"
                size="middle"
                // key={
                //   record
                //     ? record.feeDate
                //       ? record.feeDate
                //       : Math.floor(Math.random() * 50)
                //     : Math.floor(Math.random() * 60)
                // }
                onChange={(date, dateString) => {
                  handleSelect(date, 'feeDate');
                }}
                defaultValue={moment(record ? (record.feeDate ? record.feeDate : date) : date, 'YYYY-MM-DD')}
                style={{ width: '100%', height: '46px' }}
              />{' '}
            </Form.Item>
            <Form.Item
              label="Fee Status"
              name="feeStatus"
              rules={[{ required: true, message: 'Please enter the detail!' }]}
            >
              <Select
                size="middle"
                onChange={value => {
                  handleSelect(value, 'feeStatus');
                }}
                // defaultValue={record.gender ? record.gender : ''}
                name="feeStatus"
                placeholder="Select a option"
                allowClear
                style={{ width: '100%' }}
              >
                <Option value="Completed">Completed</Option>
                <Option value="Pending">Pending</Option>
              </Select>
            </Form.Item>
          </>
        ) : (
          ''
        )}

        {exist === true ? (
          <Form.Item
            label="Woocampus Register Mobile"
            name="registeredMob"
            rules={[{ required: false, message: 'Please enter the detail!' }]}
            tooltip="This is a required field"
          >
            <InputNumber
              type="number"
              defaultValue={record ? (record.father_mno ? record.father_mno : '') : ''}
              style={{ width: '100%', marginBottom: '5px' }}
              onChange={checkNumber}
              placeholder="Enter mobile number"
            />
            <br />
            <Button
              className="primary"
              size="large"
              style={{ background: 'lightblue', width: '100px' }}
              onClick={CheckExist}
            >
              Click
            </Button>
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item
          label="Guardian 1 Parent Name"
          name="father_name"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          required
          tooltip="This is a required field"
        >
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'father_name');
            }}
            // defaultValue={record ? record.father_name : ''}
            placeholder="Enter Parent Name"
          />
        </Form.Item>
        <Form.Item
          label="Guardian 1 Relationship"
          name="RelationShip"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          required
          tooltip="This is a required field"
        >
          <Select
            onChange={value => {
              handleSelect(value, 'RelationShip');
            }}
            // defaultValue={record ? record.RelationShip : ''}
            placeholder="Select"
            style={{ width: '100%' }}
          >
            <Option value="Mother">Mother</Option>
            <Option value="Father">Father</Option>
            <Option value="Other">Other</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Guardian 1  Occupation"
          name="occupation"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
        >
          <Select
            onChange={value => {
              handleSelect(value, 'occupation');
            }}
            size="middle"
            placeholder="Select a Occupation"
            allowClear
            style={{ width: '100%' }}
          >
            <Option value="Salaried">Salaried</Option>
            <Option value="Self_Employed">Self_Employed</Option>
            <Option value="Home Maker">Home Maker</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Guardian 1 Mobile No"
          required
          name="father_mno"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          tooltip="This is a required field"
        >
          <InputNumber
            type="number"
            onChange={value => {
              setRecord({ ...record, ['father_mno']: value, ['registeredMob']: value });
            }}
            // defaultValue={record ? record.father_mno : ''}
            style={{ width: '100%' }}
            placeholder="Enter mobile number"
          />
        </Form.Item>
        {admissionStatus === true ? (
          <>
            <Form.Item
              label="Guardian 2 Parent Name"
              name="mother_name"
              rules={[{ required: true, message: 'Please enter the detail!' }]}
              required
              tooltip="This is a required field"
            >
              <Input
                onChange={e => {
                  handleSelect(e.target.value, 'mother_name');
                }}
                // defaultValue={record ? record.father_name : ''}
                placeholder="Enter Parent Name"
              />
            </Form.Item>
            <Form.Item
              label="Guardian 2 Relationship"
              name="mother_educational_Relationship"
              rules={[{ required: true, message: 'Please enter the detail!' }]}
              required
              tooltip="This is a required field"
            >
              <Select
                onChange={value => {
                  handleSelect(value, 'mother_educational_Relationship');
                }}
                // defaultValue={record ? record.RelationShip : ''}
                placeholder="Select"
                style={{ width: '100%' }}
              >
                <Option value="Mother">Mother</Option>
                <Option value="Father">Father</Option>
                <Option value="Other">Other</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Guardian 2  Occupation"
              name="mother_occupation"
              rules={[{ required: true, message: 'Please enter the detail!' }]}
            >
              <Select
                onChange={value => {
                  handleSelect(value, 'mother_occupation');
                }}
                size="middle"
                placeholder="Select a Occupation"
                allowClear
                style={{ width: '100%' }}
              >
                <Option value="Salaried">Salaried</Option>
                <Option value="Self_Employed">Self_Employed</Option>
                <Option value="Home Maker">Home Maker</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Guardian 2 Mobile No"
              required
              name="mother_mno"
              rules={[{ required: true, message: 'Please enter the detail!' }]}
              tooltip="This is a required field"
            >
              <InputNumber
                type="number"
                onChange={value => {
                  setRecord({ ...record, ['mother_mno']: value });
                }}
                // defaultValue={record ? record.father_mno : ''}
                style={{ width: '100%' }}
                placeholder="Enter mobile number"
              />
            </Form.Item>
            <Form.Item
              label="Building No And Details"
              name="building_no"
              rules={[{ required: true, message: 'Please enter the detail!' }]}
            >
              <Input
                onChange={e => {
                  handleSelect(e.target.value, 'building_no');
                }}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item
              label="Street name"
              name="address"
              rules={[{ required: true, message: 'Please enter the detail!' }]}
            >
              <Input
                onChange={e => {
                  handleSelect(e.target.value, 'address');
                }}
                style={{ width: '100%' }}
              />
            </Form.Item>
            <Form.Item label="Area" name="locality" rules={[{ required: true, message: 'Please enter the detail!' }]}>
              <Input
                onChange={e => {
                  handleSelect(e.target.value, 'locality');
                }}
                style={{ width: '100%' }}
              />
            </Form.Item>
            {/* <Form.Item label="Landmark" name="landmark" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'landmark');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item> */}
            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter the detail!' }]}>
              <Input
                onChange={e => {
                  handleSelect(e.target.value, 'city');
                }}
                style={{ width: '100%' }}
              />
            </Form.Item>
            {/* <Form.Item label="State" name="state" rules={[{ required: true, message: 'Please enter the detail!' }]}>
          <Input
            onChange={e => {
              handleSelect(e.target.value, 'state');
            }}
            style={{ width: '100%' }}
          />
        </Form.Item> */}
            <Form.Item label="Pincode" name="pincode" rules={[{ required: true, message: 'Please enter the detail!' }]}>
              <Input
                onChange={e => {
                  handleSelect(e.target.value, 'pincode');
                }}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </>
        ) : (
          ''
        )}
        <Form.Item
          label="Source"
          name="source"
          rules={[{ required: true, message: 'Please enter the detail!' }]}
          required
          tooltip="This is a required field"
        >
          <Select
            // defaultValue={record ? record.source : ''}
            placeholder="From where did you hear about us"
            onChange={value => {
              handleSelect(value, 'source');
            }}
            style={{ width: '100%' }}
          >
            <Option value="Google Ads">Google Ads</Option>
            <Option value="Outdoor Advt">Outdoor Advt</Option>
            <Option value=" Newspaper Advt"> Newspaper Advt</Option>
            <Option value="Facebook">Facebook</Option>
            <Option value="Word of mouth">Word of mouth</Option>
            <Option value="Others">Others</Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Status Remarks"
          rules={[{ required: false, message: 'Please enter the detail!' }]}
          tooltip="This is a required field"
        >
          <Input onPressEnter={StatusRemark} />
        </Form.Item>
        {/* <Form.Item label="SMS" name="status" required tooltip="This is a required field">
          <Select
            // key={update}
            placeholder="Select"
            onChange={changeMessage}
            style={{ width: '100%' }}
          >
            <Option value={0}>Enquiry</Option>
            <Option value={1}>Application</Option>
            <Option value={2}>Admission</Option>
          </Select>
        </Form.Item> */}
        {/* <Form.Item label="Message"  tooltip="This is a required field">
          <TextArea
            value={record ? record.msg?record.msg:'' : ''}
            // key={record ? (record.msg ? record.msg : Math.floor(Math.random() * 50)) : Math.floor(Math.random() * 60)}
            style={{ color: 'black', fontWeight: 'bold' }}
            disabled
            rows={2}
          />
        </Form.Item> */}
      </Form>
    </Modal>
  );
}

export default CreateAdmission;
