import React, { useEffect, useState } from 'react';
import { Modal, Button, DatePicker, Upload, Row, Col } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDocument21 } from '../../components/updateFunctions/functions/index';
const { Option } = Select;

function DocumentsModal({
  isVisible,
  record,
  setisVisible,
  handleOk,
  handleFile,
  handleFileRemove,
  tokendata,
}) {
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [state, setState] = useState({
    fileList: [],
  });
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
      setState(state => ({
        fileList: [...state.fileList, file],
      }));
      handleFile(file);
      return false;
    },
    fileList,
  };
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  let [update, setUpdate] = useState(0)
  let [record2, setRecord] = useState(record);
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  let date = new Date();

  let handleSelect = (value, name) => {
    setRecord({ ...record2, [name]: value });
  };
  let dataVal = (
    <Form.Item label="Attachment" name="doc" required tooltip="This is a required field">
      <Upload {...props}>
        <Button icon={<UploadOutlined />} style={{ marginTop: '15%' }}>
          Select File
        </Button>
      </Upload>
    </Form.Item>
  );
  useEffect(() => {
    form.setFieldsValue(record2);
  }, [record2, form, update]);
  useEffect(() => {
    if (record) {
      setRecord(record);
    }
  }, [record]);
  return (
    <Modal destroyOnClose={true}
      title="Update Document"
      visible={isVisible}
      onOk={() => handleOk(record2)}
      onCancel={() => setisVisible(false)}
      okText="Update"
      width={1000}
    >
      <Form
        preserve={false}
        form={form}
        layout="vertical"
        initialValues={record}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        {tokendata == '1' ? (
          <Form.Item label="Institute" name="organization_id" required tooltip="This is a required field">
            <Select
              mode="multiple"
              onChange={value => {
                handleSelect(value, 'organization_id');
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
            style={{ width: '100%', height: '50px', paddingLeft: 5 }}
            onChange={(date, dateString) => {
              handleSelect(date, 'entry_date');
            }}
            defaultValue={moment(record ? (record.entry_date ? record.entry_date : date) : date)}
            format="DD-MM-YYYY"
          />
        </Form.Item>
        <Form.Item label="Title" name="title" required tooltip="This is a required field">
          <Input
            placeholder="Enter Title"
            onChange={e => {
              handleSelect(e.target.value, 'title');
            }}
          />
        </Form.Item>
        <Form.Item label="Level" name="grade_id" required tooltip="This is a required field">
          <Select
            onChange={value => {
              handleSelect(value, 'grade_id');
            }}
            allowClear
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

        <Form.Item label="Note" name="note" required tooltip="This is a required field">
          <Input
            placeholder="Enter Note"
            onChange={e => {
              handleSelect(e.target.value, 'note');
            }}
          />
        </Form.Item>
        {record2 ? (
          record2.filename ? (
            record2.filename.length > 0 ? (
              <>
                <Form.Item label="Already Uploaded" tooltip="This is a required field">
                  <Row>
                    <Col span={20}>
                      <Input key={record2.filename} disabled={true} defaultValue={record2.filename} width={'80%'} />
                    </Col>
                    <Col span={2} style={{ margin: '10px' }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        key={Math.floor(Math.random() * 10)}
                        onClick={() => {
                          deleteDocument21('doc', record2.filename, 'filename', setRecord, record2)
                          setUpdate(update + 1)
                        }}
                        style={{ fontSize: 25, color: 'red ' }}
                      />
                    </Col>
                  </Row>
                </Form.Item>
              </>
            ) : (
              dataVal
            )
          ) : (
            dataVal
          )
        ) : (
          dataVal
        )}
      </Form>
    </Modal>
  );
}

export default DocumentsModal;
