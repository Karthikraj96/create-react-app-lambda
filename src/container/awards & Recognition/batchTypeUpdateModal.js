import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Input, DatePicker, Form,Upload,Row,Col } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { onChangeDate, onChangeSelect, onChangeInput } from '../../components/updateFunctions/functions/index';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDocument21 } from '../../components/updateFunctions/functions/index';
const { Option } = Select;
const layout = {
  labelCol: { span: 3 },
};
function BatchTypeUpdateModal({ isVisible, record, setisVisible, handleOk, handleFile, handleFileRemove }) {
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
    <Modal
      destroyOnClose={true}
      title="Update BatchType"
      visible={isVisible}
      onOk={() => handleOk(record2)}
      onCancel={() => setisVisible(false)}
      okText="Update"
      width={800}
    >
      <Form
        preserve={false}
        {...layout}
        form={form}
        layout="vertical"
        initialValues={record}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
      >
        <Form.Item label="BatchType" name="badgeTitle" required tooltip="This is a required field">
          <Input
            placeholder="Enter Title"
            onChange={e => {
              handleSelect(e.target.value, 'badgeTitle');
            }}
          />
        </Form.Item>
        {record2 ? (
          record2.badgePic ? (
            record2.badgePic.length > 0 ? (
              <>
                <Form.Item label="Already Uploaded" tooltip="This is a required field">
                  <Row>
                    <Col span={20}>
                      <Input key={record2.badgePic} disabled={true} defaultValue={record2.badgePic} width={'80%'} />
                    </Col>
                    <Col span={2} style={{ margin: '10px' }}>
                      <FontAwesomeIcon
                        icon={faTrash}
                        key={Math.floor(Math.random() * 10)}
                        onClick={() => {
                          deleteDocument21('doc', record2.badgePic, 'badgePic', setRecord, record2)
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
export default BatchTypeUpdateModal;
