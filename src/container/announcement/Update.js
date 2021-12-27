import React, { useState, useEffect } from 'react';
import { Modal, Button, Upload, DatePicker, Row, Col } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form } from 'antd';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import {
  onChangeDate,
  onChangeSelect,
  onChangeInput,
  deleteDocument21,
} from '../../components/updateFunctions/functions/index';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
const { TextArea } = Input;
const { Option } = Select;
function UpdateAnnouncement({ isVisible, record2, handleOk, tokendata, setRecord2, handleFileRemove, handleFile, handleCancel }) {
  const [form] = Form.useForm();
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [record, setRecord] = useState(null);
  let [isdelete, setIsdelete] = useState(false);
  let [state, setState] = useState({
    fileList: [],
  });
  useEffect(() => {
    setRecord(record2);
  }, [record2]);
  useEffect(() => {
    setRecord(record);
  }, [isdelete]);
  const { fileList } = state;

  const props = {
    onRemove: file => {
      setState(state => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        handleFileRemove();
        return {
          fileList: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setState({
        fileList: [file],
      });
      handleFile(file);
      return false;
    },
    fileList,
  };
  const handleok2 = (record, setRecord2, setState) => {
      handleOk(record, setRecord2, setState);
  };
  return (
    <Modal destroyOnClose={true}
      title="Update New Announcement"
      visible={isVisible}
      onOk={() => {
        handleok2(record, setRecord2, setState);
      }}
      okText="Update"
      onCancel={() => handleCancel(setRecord2, setState)}
      width={1000}
    >
      {record ? (
        <Form preserve={false} form={form} layout="vertical">
          {tokendata == '1' ? (
            <Form.Item label="Institute" required tooltip="This is a required field">
              <Select
                mode="multiple"
                defaultValue={record.organization_id}
                style={{ width: '100%', height: '50px' }}
                onChange={value => {
                  onChangeSelect(value, 'organization_id', setRecord, record);
                }}
                allowClear
                placeholder="Select Institute"
                style={{ width: '100%' }}
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
          <Form.Item label="Date" required tooltip="This is a required field">
            <DatePicker
              defaultValue={moment(record.date, 'YYYY/MM/DD')}
              format="YYYY/MM/DD"
              style={{ width: '100%', height: '50px' }}
              onChange={(date, dateString) => onChangeDate(date, dateString, 'date', setRecord, record)}
            />
          </Form.Item>

          <Form.Item label="Grade" required tooltip="This is a required field">
            <Select
              mode="multiple"
              defaultValue={record.grade_id}
              onChange={value => {
                onChangeSelect(value, 'grade_id', setRecord, record);
              }}
              allowClear
              placeholder="Select Grades"
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

          <Form.Item label="Title" required tooltip="This is a required field">
            <Input
              placeholder="Enter title"
              defaultValue={record.title}
              onChange={e => {
                onChangeInput(e, 'title', setRecord, record);
              }}
            />
          </Form.Item>
          <Form.Item label="Announcement" required tooltip="This is a required field">
            <TextArea
              rows={4}
              defaultValue={record.announce}
              onChange={e => {
                onChangeInput(e, 'title', setRecord, record);
              }}
            />
          </Form.Item>
          {record ? (
            record.filename ? (
              <>
                <Form.Item label="Already Uploaded" tooltip="This is a required field">
                  <Row>
                    <Col span={20}>
                      <Input
                        key={record.organization_id + 415}
                        disabled={true}
                        defaultValue={record.filename}
                        width={800}
                      />
                    </Col>
                    <Col span={2} style={{ margin: '10px' }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        onClick={() =>
                          deleteDocument21('announce', record.filename, 'filename', setRecord, record, setIsdelete)
                        }
                        style={{ fontSize: 25, color: 'red ' }}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </>
            ) : (
              <Form.Item label="Attachment " required tooltip="This is a required field">
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Select File</Button>
                </Upload>
              </Form.Item>
            )
          ) : null}
        </Form>
      ) : null}
    </Modal>
  );
}

export default UpdateAnnouncement;
