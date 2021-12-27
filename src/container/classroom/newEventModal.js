import React, { useState, Fragment, useEffect } from 'react';
import { Modal, Button, DatePicker, Popconfirm } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form } from 'antd';
import { useSelector } from 'react-redux';
import { onChangeDate, onChangeSelect, onChangeInput } from '../../components/updateFunctions/functions/index';
import moment from 'moment';
const { Option } = Select;
function DocumentsModal({
  visible,
  handleOk,
  handleCancel,
  tokendata,
  handleInsti2,
  handleDate,
  handleDate2,
  handleTitle,
  handlenote,
  handleLevel,
  isEventEditMode,
  setisEventEditMode,
  handleDelete,
  Modaltitle,
  handleOk2,
  handleColor,
  record2,
  setRecord2
}) {
  // let [record, setRecord2] = useState(null);
  useEffect(() => {
  }, [record2]);
  let color;
  if (record2) {
    if (record2.color === '#0071c5') {
      color = 'Education';
    } else if (record2.color === '#FFD700') {
      color = 'Expo';
    } else if (record2.color === '#008000') {
      color = 'Event';
    } else if (record2.color === '#FF0000') {
      color = 'Holiday';
    } else if (record2.color === '#FF8C00') {
      color = 'Others';
    }
  }
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Modal destroyOnClose={true}
      title={Modaltitle}
      visible={visible}
      onOk={handleOk}
      onCancel={()=>handleCancel(setRecord2)}
      afterClose={() => setisEventEditMode(false)}
      cancelText="Cancel"
      width={'80%'}
      footer={[
        isEventEditMode ? (
          <Fragment>
            <Button onClick={() => handleDelete()} type="primary" key="1">
              Delete
            </Button>
            ,
            <Button
              onClick={() => {
                handleOk2(record2, setRecord2);
              }}
              type="primary"
              key="2"
            >
              Update
            </Button>
            ,
            <Button
              onClick={() => {
                handleCancel(setRecord2);
              }}
              key="3"
            >
              Cancel
            </Button>
            ,
          </Fragment>
        ) : (
          <Fragment>
            <Button
              onClick={() => {
                handleOk();
              }}
              type="primary"
            >
              OK
            </Button>
            ,
            <Button onClick={() => {
              handleCancel(setRecord2);
            }} type="primary">
              Cancel
            </Button>
          </Fragment>
        ),
      ]}
    >
      {isEventEditMode ? (
        record2 ? (
          <Form
            preserve={false}
            form={form}
            layout="vertical"
            initialValue={[]}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
          >
            {tokendata === '1' ? (
              <Form.Item label="Institute" required tooltip="This is a required field">
                <Select
                  // key={record2.organization_id}
                  defaultValue={record2.organization_id}
                  mode="multiple"
                  onChange={value => {
                    onChangeSelect(value, 'organization_id', setRecord2, record2);
                  }}
                  allowClear
                  required
                  placeholder="Select Institute"
                  style={{ width: '100%' }}
                  tooltip="This is a required field"
                >
                  {org.map((e, key) => {
                    return (
                      <Option key={key} value={e.organization_id}>
                        {e.instituteName}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
            ) : (
              ''
            )}
            <Form.Item label="Level" required tooltip="This is a required field">
              <Select
                // key={record2.grade_id}
                defaultValue={record2.grade_id}
                onChange={handleLevel}
                mode="multiple"
                tooltip="This is a required field"
                allowClear
                required
                placeholder="Select Level"
                style={{ width: '100%' }}
              >
                {grade.map((e, key) => {
                  return (
                    <Option key={key} value={e.id}>
                      {e.id}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item label="Event Type" required tooltip="This is a required field">
              <Select
                // key={record2.color}
                defaultValue={color}
                onChange={value => {
                  onChangeSelect(value, 'color', setRecord2, record2);
                }}
                required
                allowClear
                placeholder="Select Event Type"
                style={{ width: '100%' }}
              >
                <Option key={1} value={'#0071c5'}>
                  {' '}
                  <div style={{ color: '#0071c5' }}> Education</div>
                </Option>
                <Option key={2} value={'#FFD700'}>
                  {' '}
                  <div style={{ color: '#FFD700' }}> Expo</div>
                </Option>
                <Option key={3} value={'#008000'}>
                  {' '}
                  <div style={{ color: '#008000' }}> Event</div>
                </Option>
                <Option key={4} value={'#FF0000'}>
                  {' '}
                  <div style={{ color: '#FF0000' }}> Holiday</div>
                </Option>
                <Option key={5} value={'#FF8C00'}>
                  {' '}
                  <div style={{ color: '#FF8C00' }}> Others</div>
                </Option>
              </Select>
            </Form.Item>
            <Form.Item label="StartDate" required tooltip="This is a required field">
              <DatePicker
                // key={record2.start}
                defaultValue={moment(record2.start, 'YYYY/MM/DD HH:mm:ss')}
                style={{ width: '100%', height: '50px' }}
                tooltip="This is a required field"
                format="YYYY/MM/DD HH:mm:ss"
                showTime={{ format: 'HH:mm' }}
                required
                onChange={(date, dateString) => onChangeDate(date, dateString, 'start', setRecord2, record2)}
              />
            </Form.Item>
            <Form.Item label="EndDate" required tooltip="This is a required field">
              <DatePicker
                // key={record2.end}
                defaultValue={moment(record2.end, 'YYYY/MM/DD HH:mm:ss')}
                style={{ width: '100%', height: '50px' }}
                tooltip="This is a required field"
                format="YYYY/MM/DD HH:mm:ss"
                required
                showTime={{ format: 'HH:mm' }}
                onChange={(date, dateString) => onChangeDate(date, dateString, 'end', setRecord2, record2)}
              />
            </Form.Item>
            <Form.Item label="Title" required tooltip="This is a required field">
              <Input
                // key={record2.title}
                defaultValue={record2.title}
                placeholder="Enter Title"
                required
                tooltip="This is a required field"
                onChange={e => {
                  onChangeInput(e, 'title', setRecord2, record2);
                }}
              />
            </Form.Item>

            <Form.Item label="Description" required tooltip="This is a required field">
              <Input
                // key={record2.description}
                defaultValue={record2.description}
                placeholder="Description"
                required
                tooltip="This is a required field"
                onChange={e => {
                  onChangeInput(e, 'description', setRecord2, record2);
                }}
              />
            </Form.Item>
          </Form>
        ) : null
      ) : (
        <Form
          preserve={false}
          form={form}
          layout="vertical"
          initialValue={[]}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          {tokendata === '1' ? (
            <Form.Item label="Institute" required tooltip="This is a required field">
              <Select
                // key={105}
                mode="multiple"
                onChange={handleInsti2}
                allowClear
                required
                placeholder="Select Institute"
                style={{ width: '100%' }}
                tooltip="This is a required field"
              >
                {org.map((e, key) => {
                  return (
                    <Option key={key} value={e.organization_id}>
                      {e.instituteName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
          ) : (
            ''
          )}
          <Form.Item label="Level" required tooltip="This is a required field">
            <Select
              // key={21}
              onChange={handleLevel}
              mode="multiple"
              tooltip="This is a required field"
              allowClear
              required
              placeholder="Select Level"
              style={{ width: '100%' }}
            >
              {grade.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.id}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Event Type" required tooltip="This is a required field">
            <Select
              // key={22}
              onChange={handleColor}
              required
              allowClear
              placeholder="Select Event Type"
              style={{ width: '100%' }}
            >
              <Option key={1} value={'#0071c5'}>
                {' '}
                <div style={{ color: '#0071c5' }}> Education</div>
              </Option>
              <Option key={2} value={'#FFD700'}>
                {' '}
                <div style={{ color: '#FFD700' }}> Expo</div>
              </Option>
              <Option key={3} value={'#008000'}>
                {' '}
                <div style={{ color: '#008000' }}> Event</div>
              </Option>
              <Option key={4} value={'#FF0000'}>
                {' '}
                <div style={{ color: '#FF0000' }}> Holiday</div>
              </Option>
              <Option key={5} value={'#FF8C00'}>
                {' '}
                <div style={{ color: '#FF8C00' }}> Others</div>
              </Option>
            </Select>
          </Form.Item>
          <Form.Item label="StartDate" required tooltip="This is a required field">
            <DatePicker
              // key={458}
              style={{ width: '100%', height: '50px' }}
              tooltip="This is a required field"
              format="DD/MM/YYYY HH:mm:ss"
              showTime={{ format: 'HH:mm' }}
              required
              onChange={handleDate}
            />
          </Form.Item>
          <Form.Item label="EndDate" required tooltip="This is a required field">
            <DatePicker
              // key={564}
              style={{ width: '100%', height: '50px' }}
              tooltip="This is a required field"
              format="DD/MM/YYYY HH:mm:ss"
              required
              showTime={{ format: 'HH:mm' }}
              onChange={handleDate2}
            />
          </Form.Item>
          <Form.Item label="Title" required tooltip="This is a required field">
            <Input
              // key={56}
              placeholder="Enter Title"
              required
              tooltip="This is a required field"
              onChange={handleTitle}
            />
          </Form.Item>

          <Form.Item label="Description" required tooltip="This is a required field">
            <Input
              // key={498}
              placeholder="Description"
              required
              tooltip="This is a required field"
              onChange={handlenote}
            />
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default DocumentsModal;
