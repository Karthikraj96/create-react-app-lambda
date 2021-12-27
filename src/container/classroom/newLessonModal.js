import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import { Modal, Button, Row, Col } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form, Upload } from 'antd';
import './modalstyle.css';
import { DatePicker } from 'antd';
import { getChapter } from '../../api/api';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './lesson.css'
import {
  onChangeDate,
  onChangeSelect,
  onChangeInput,
  deleteDocument21,
} from '../../components/updateFunctions/functions/index';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
function NewLessons({
  handleDate,
  isVisible,
  handleType,
  org2,
  tokendata,
  handleOk,
  handleCancel,
  handleFileRemove,
  handleFileRemove2,
  handleFile,
  handleFile2,
  handleLevel,
  handleSubject,
  handleChapter,
  handleAssignment,
  title,
  oktext,
  subject,
  handleChapter2,
  handleTopic2,
  handleTopic,
  handleInsti,
  record,
  setRecord,
}) {
  let [selectedSubject2, setselectedSubject2] = useState(null);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [state, setState] = useState({
    fileList: [],
  });
  let [state2, setState2] = useState({
    fileList2: [],
  });
  let [chap, setChap] = useState([]);
  let [value, setValue] = useState('');
  let [topics, setTopics] = useState([]);
  const { fileList } = state;
  const { fileList2 } = state2;
  const [form] = Form.useForm();
  let [update, setUpdate] = useState(0);
  const [requiredMark, setRequiredMarkType] = useState('required');
  useEffect(() => {
    if (selectedSubject2) {
      getChapter(selectedSubject2)
        .then(res => {
          let dat = res.data;
          let da = dat.map(e => {
            return e.topics;
          });
          setTopics(da);
          setChap(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [selectedSubject2]);
  useEffect(() => { }, [record, update]);
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
  const props2 = {
    onRemove: file => {
      setState2(state2 => {
        const index = state2.fileList2.indexOf(file);
        const newFileList = state2.fileList2.slice();
        newFileList.splice(index, 1);
        handleFileRemove2();
        return {
          fileList2: newFileList,
        };
      });
    },
    beforeUpload: file => {
      setState2(state2 => ({
        fileList2: [...state2.fileList2, file],
      }));
      handleFile2(file);
      return false;
    },
    fileList2,
  };
  const handlesub = data => {
    setselectedSubject2(data);
    handleSubject(data);
  };
  const handlesub2 = data => {
    setValue(data);
    handleAssignment(data);
  };
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  let date = new Date();
  let dataVal = (
    <Form.Item label="Attachment" required tooltip="This is a required field">
      <Upload {...props}>
        <Button icon={<UploadOutlined />}>Select Attachment</Button>
      </Upload>
    </Form.Item>
  );
  let dataVal2 = (
    <Form.Item label="AnswerKey" required tooltip="This is a required field">
      <Upload {...props2}>
        <Button icon={<UploadOutlined />}>Select AnswerKey</Button>
      </Upload>
    </Form.Item>
  );
  return (
    <Modal destroyOnClose={true}
      title={title}
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={oktext}
      cancelText="Cancel"
      width={'80%'}
    >
      {record ? (
        <Form
          preserve={false}
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Form.Item label="Entry Date" required tooltip="This is a required field">
            <DatePicker
              format="DD/MM/YYYY HH:mm:ss"
              onChange={handleDate}
              showTime={{ format: 'HH:mm' }}
              defaultValue={moment(record ? (record.entry_date ? record.entry_date : date) : date)}
              style={{ width: '100%', paddingLeft: 5 }}
            />
          </Form.Item>
          {tokendata == '1' ? (
            <>
              <Form.Item label="Institute Type" required tooltip="This is a required field">
                <Select placeholder="Select Type" defaultValue="CBSE" onChange={handleType} style={{ width: '100%' }}>
                  <Option value="CBSE">CBSE</Option>
                  <Option value="MATRICULATION">MATRICULATION</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Institute " required tooltip="This is a required field">
                <Select
                  placeholder="Select Institute"
                  defaultValue={record.organization_id ? record.organization_id : 1}
                  onChange={handleInsti}
                  style={{ width: '100%' }}
                >
                  {org2.length > 0
                    ? org2.map((e, key) => {
                      return (
                        <Option key={key} value={e.organization_id}>
                          {e.instituteName}
                        </Option>
                      );
                    })
                    : org.map((e, key) => {
                      return (
                        <Option key={key} value={e.organization_id}>
                          {e.instituteName}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </>
          ) : (
            <> </>
          )}
          <Form.Item label="Level" required tooltip="This is a required field">
            <Select
              placeholder="Select Level"
              defaultValue={record ? (record.grade_id ? record.grade_id : '') : ''}
              onChange={handleLevel}
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
          <Form.Item label="Subject" required tooltip="This is a required field">
            <Select
              placeholder="Select Subject"
              defaultValue={record ? (record.subject_name ? record.subject_name : '') : ''}
              onChange={handlesub}
              style={{ width: '100%' }}
            >
              {subject.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Chapter" required tooltip="This is a required field">
            {chap.length > 0 ? (
              <Select
                placeholder="Select Chapter"
                defaultValue={record ? (record.chapter_id ? record.chapter_id : '') : ''}
                onChange={handleChapter}
                style={{ width: '100%' }}
              >
                {chap.map((e, key) => {
                  return (
                    <Option key={key} value={e.title}>
                      {e.title}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Input
                placeholder="Type Chapter Here"
                defaultValue={record ? (record.chapter_id ? record.chapter_id : '') : ''}
                onChange={handleChapter2}
              />
            )}
          </Form.Item>
          <Form.Item label="Topic" required tooltip="This is a required field">
            {topics.length > 0 ? (
              <Select
                placeholder="Select Topic"
                defaultValue={record ? (record.topics ? record.topics : '') : ''}
                onChange={handleTopic}
                style={{ width: '100%' }}
              >
                {topics[0].map((e, key) => {
                  return (
                    <Option key={key} value={e.title}>
                      {e.title}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Input
                placeholder="Type Topic Here"
                defaultValue={record ? (record.topics ? record.topics : '') : ''}
                onChange={handleTopic2}
              />
            )}
          </Form.Item>
          <Form.Item label="Assignment" required tooltip="This is a required field">
            <ReactQuill
              theme="snow"
              Row="5"
              defaultValue={record.description ? record.description : value}
              onChange={handlesub2}
            />
          </Form.Item>
          {record ? (
            record.attachFile ? (
              record.attachFile.length > 0 ? (
                <>
                  <Form.Item label="Already Uploaded" tooltip="This is a required field">
                    <Row>
                      <Col span={20}>
                        <Input key={record.attachFile} disabled={true} defaultValue={record.attachFile} width={'80%'} />
                      </Col>
                      <Col span={2} style={{ margin: '10px' }}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          key={Math.floor(Math.random() * 10)}
                          onClick={() => {
                            deleteDocument21(record.grade_id, record.attachFile, 'attachFile', setRecord, record);
                            setUpdate(update + 1);
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

          {record ? (
            record.ansKey ? (
              record.ansKey.length > 0 ? (
                <>
                  <Form.Item label="Already Uploaded" tooltip="This is a required field">
                    <Row>
                      <Col span={20}>
                        <Input key={record.ansKey} disabled={true} defaultValue={record.ansKey} width={'80%'} />
                      </Col>
                      <Col span={2} style={{ margin: '10px' }}>
                        <FontAwesomeIcon
                          icon={faTrash}
                          key={Math.floor(Math.random() * 10)}
                          onClick={() => {
                            deleteDocument21(record.grade_id, record.ansKey, 'ansKey', setRecord, record);
                            setUpdate(update + 1);
                          }}
                          style={{ fontSize: 25, color: 'red ' }}
                        />
                      </Col>
                    </Row>
                  </Form.Item>
                </>
              ) : (
                dataVal2
              )
            ) : (
              dataVal2
            )
          ) : (
            dataVal2
          )}
        </Form>
      ) : (
        <Form
          preserve={false}
          form={form}
          layout="vertical"
          initialValues={{
            requiredMarkValue: requiredMark,
          }}
          onValuesChange={onRequiredTypeChange}
          requiredMark={requiredMark}
        >
          <Form.Item label="Entry Date" required tooltip="This is a required field">
            <DatePicker
              format="DD/MM/YYYY HH:mm:ss"
              onChange={handleDate}
              showTime={{ format: 'HH:mm' }}
              style={{ width: '100%', paddingLeft: 5 }}
            />
          </Form.Item>
          {tokendata == '1' ? (
            <>
              <Form.Item label="Institute Type" required tooltip="This is a required field">
                <Select placeholder="Select Type" onChange={handleType} style={{ width: '100%' }}>
                  <Option value="CBSE">CBSE</Option>
                  <Option value="MATRICULATION">MATRICULATION</Option>
                </Select>
              </Form.Item>
              <Form.Item label="Institute " required tooltip="This is a required field">
                <Select placeholder="Select Institute" onChange={handleInsti} style={{ width: '100%' }}>
                  {org2.length > 0
                    ? org2.map((e, key) => {
                      return (
                        <Option key={key} value={e.organization_id}>
                          {e.instituteName}
                        </Option>
                      );
                    })
                    : org.map((e, key) => {
                      return (
                        <Option key={key} value={e.organization_id}>
                          {e.instituteName}
                        </Option>
                      );
                    })}
                </Select>
              </Form.Item>
            </>
          ) : (
            <> </>
          )}
          <Form.Item label="Level" required tooltip="This is a required field">
            <Select placeholder="Select Level" onChange={handleLevel} style={{ width: '100%' }}>
              {grade.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.id}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Subject" required tooltip="This is a required field">
            <Select placeholder="Select Subject" onChange={handlesub} style={{ width: '100%' }}>
              {subject.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Chapter" required tooltip="This is a required field">
            {chap.length > 0 ? (
              <Select placeholder="Select Chapter" onChange={handleChapter} style={{ width: '100%' }}>
                {chap.map((e, key) => {
                  return (
                    <Option key={key} value={e.title}>
                      {e.title}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Input placeholder="Type Chapter Here" onChange={handleChapter2} />
            )}
          </Form.Item>
          <Form.Item label="Topic" required tooltip="This is a required field">
            {topics.length > 0 ? (
              <Select placeholder="Select Chapter" onChange={handleTopic} style={{ width: '100%' }}>
                {topics[0].map((e, key) => {
                  return (
                    <Option key={key} value={e.title}>
                      {e.title}
                    </Option>
                  );
                })}
              </Select>
            ) : (
              <Input placeholder="Type Topic Here" onChange={handleTopic2} />
            )}
          </Form.Item>
          <Form.Item label="Assignment" required tooltip="This is a required field">
            <ReactQuill theme="snow" value={value} onChange={handlesub2} />
          </Form.Item>
          <Form.Item label="Attachment" required tooltip="This is a required field">
            <Upload {...props}>
              <Button icon={<UploadOutlined />}>Select Attachment</Button>
            </Upload>
          </Form.Item>
          <Form.Item label="AnswerKey" required tooltip="This is a required field">
            <Upload {...props2}>
              <Button icon={<UploadOutlined />}>Select AnswerKey</Button>
            </Upload>
          </Form.Item>
        </Form>
      )}
    </Modal>
  );
}

export default NewLessons;
