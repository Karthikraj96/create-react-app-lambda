import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Button, Select, Input, Upload, DatePicker, Row, Col } from 'antd';
import { faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { deleteDocument21 } from '../../components/updateFunctions/functions/index';
function RadioModal({ handleDate, handleInsti, handleSpeech, handleTitle, handleFile, record, setRecord, handleFileRemove, tokendata }) {
  let org = useSelector(store => store.getOrgReducer);
  let [state, setState] = useState({
    fileList: [],
  })
  const { fileList } = state;
  const props = {
    onRemove: file => {
      setState(state => {
        const index = state.fileList.indexOf(file);
        const newFileList = state.fileList.slice();
        newFileList.splice(index, 1);
        handleFileRemove()
        return {
          fileList: newFileList,

        };
      });
    },
    beforeUpload: file => {
      setState(state => ({
        fileList: [...state.fileList, file],
      }));
      handleFile(file)
      return false;
    },
    fileList,
  };
  let date = new Date()
  useEffect(() => { }, [record])
  return (
    <>
      {tokendata == '1' ? (<>
        <div>
          <label style={{ padding: 1 }}>Institute</label> &nbsp;
          <br />
          <Select defaultValue={record ? record.organization_id : ''} size="small" style={{ width: '100%' }} onChange={handleInsti}>
            {org.map((e, key) => {
              return (
                <Option key={key} value={e.organization_id}>
                  {e.instituteName}
                </Option>
              );
            })}
          </Select>
        </div>{' '}
        <br /></>) : <>{' '}</>}
      <div>
        <label style={{ padding: 1 }}>Date</label> &nbsp;
        <br />
        <DatePicker format="DD-MM-YYYY" defaultValue={record?moment(record.date):''} onChange={handleDate} style={{ width: '100%' }} />
      </div>{' '}
      <br />
      <div>
        <label style={{ padding: 1 }}>Title</label> &nbsp;
        <br />
        <Input defaultValue={record ? record.title : ''} onChange={handleTitle} style={{ width: '100%' }} />
      </div>
      <br />
      <div>
        <label style={{ padding: 1 }}>Description</label> &nbsp; <br />
        <Input defaultValue={record ? record.description : ''} onChange={handleSpeech} style={{ width: '100%' }} />
      </div>
      <br />
      {
        record ? record.audio ? <>
          <div>
            <label style={{ padding: 1 }}>Title</label> &nbsp;
            <br />
            <Input defaultValue={record ? record.audio : ''} disabled style={{ width: '90%' }} />
            <FontAwesomeIcon
              icon={faTrash}
              key={Math.floor(Math.random() * 10)}
              onClick={() => {
                deleteDocument21('radio', record.audio, 'audio', setRecord, record)
              }}
              style={{ fontSize: 25, color: 'red ',marginLeft: '2%',marginTop:'4%'  }}
            />
          </div>
        </> : (<div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <label style={{ padding: 20, marginRight: 0 }}>Audio File</label> &nbsp;
            <Col className="gutter-row" span={6}>
              <Upload  {...props}>
                <Button icon={<UploadOutlined />} style={{ marginTop: '15%'}}>
                  Select File
                </Button>
              </Upload>
            </Col>
          </Row>
        </div>) : (<div>
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <label style={{ padding: 20, marginRight: 0 }}>Audio File</label> &nbsp;
            <Col className="gutter-row" span={6}>
              <Upload  {...props}>
                <Button icon={<UploadOutlined />} style={{ marginTop: '15%' }}>
                  Select File
                </Button>
              </Upload>
            </Col>
          </Row>
        </div>)
      }


    </>
  );
};

export default RadioModal;
