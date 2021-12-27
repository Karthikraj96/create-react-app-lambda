import React, { useState, useEffect } from 'react';
import { Modal } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form } from 'antd';
import { onChangeSelect, onChangeInput } from '../../components/updateFunctions/functions/index';
import { addSchoolexamtype } from '../../api/api';
import Swal from 'sweetalert2';
const { Option } = Select;
function CreateEditExamType({ isVisible, isEdit, handleCancel, record2, tokendata, org, setRecord2 }) {
  let [record, setRecord] = useState([]);
  let [record3, setRecord3] = useState([]);
  let [ismain, setismain] = useState(1);
  let [isinternal, setInternal] = useState(0);
  useEffect(() => {
    setRecord(record2);
  }, [record2]);
  useEffect(() => {
    setRecord3({
      isMain: 0,
      isInternalExam: 0,
      avgMark: 0,
      organization_id: [null],
      title: null,
    });
  }, []);
  useEffect(() => { }, [ismain, isinternal, record]);
  const handleCancel2 = () => {
    handleCancel();
    setRecord2(null);
  };
  const handleok2 = () => {
    let title = isEdit ? 'Are You Sure You want to Update this' : 'Are You Sure You want to Save this';
    let title2 = isEdit ? 'Data Updated Succesfully' : 'Data Saved Succesfully';
    let data = isEdit ? record : record3;
    Swal.fire({
      icon: 'info',
      title: title,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        addSchoolexamtype(data)
          .then(response => {
            handleCancel();
            Swal.fire({
              icon: 'success',
              title: title2,
            });
            setRecord2(null);
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      }
    });
  };
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  return (
    <Modal destroyOnClose={true}
      title={isEdit ? 'Update Exam Type' : 'Create Exam Type'}
      visible={isVisible}
      onOk={handleok2}
      onCancel={handleCancel2}
      okText={isEdit ? 'Update' : 'Save'}
      cancelText="Cancel"
      width={1000}
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
          {tokendata == '1' ? (
            <Form.Item label="Institute" required tooltip="This is a required field">
              <Select
                mode="multiple"
                defaultValue={record.organization_id}
                style={{ width: '100%', height: '50px' }}
                onChange={value => {
                  onChangeSelect(value, 'organization_id', setRecord, record);
                }}
                // key={record.organization_id[0]}
                allowClear
                placeholder="Select Institute"
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
          <Form.Item label="Title" required tooltip="This is a required field">
            <Input
              placeholder="Exam Title"
              key={record.title}
              defaultValue={record.title}
              onChange={e => {
                onChangeInput(e, 'title', setRecord, record);
              }}
            />
          </Form.Item>

          <Form.Item label="Main Exam" required tooltip="This is a required field">
            <Select
              key={record.isMain}
              defaultValue={record.isMain}
              onChange={value => {
                setismain(value);
                onChangeSelect(value, 'isMain', setRecord, record);
              }}
              placeholder="Is this Main Exam"
              style={{ width: '100%' }}
            >
              <Option value={1}>Yes</Option>
              <Option value={0}>No</Option>
            </Select>
          </Form.Item>
          {record.isMain == 0 ? (
            <Form.Item label="Internal Exam" required tooltip="This is a required field">
              <Select
                key={record.isInternalExam}
                defaultValue={record.isInternalExam}
                onChange={value => {
                  setInternal(value);
                  onChangeSelect(value, 'isInternalExam', setRecord, record);
                }}
                placeholder="Is this Internal Exam"
                style={{ width: '100%' }}
              >
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>
            </Form.Item>
          ) : null}
          {record.isInternalExam == 0 ? null : (
            <Form.Item label="Average Exam" required tooltip="This is a required field">
              <Input
                key={record.avgMark}
                defaultValue={record.avgMark}
                placeholder="Enter Average"
                onChange={e => {
                  onChangeInput(e, 'avgMark', setRecord, record);
                }}
                style={{ width: '100%' }}
              />
            </Form.Item>
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
          {tokendata == '1' ? (
            <Form.Item label="Institute" required tooltip="This is a required field">
              <Select
                mode="multiple"
                key={1}
                style={{ width: '100%', height: '50px' }}
                onChange={value => {
                  onChangeSelect(value, 'organization_id', setRecord3, record3);
                }}
                allowClear
                placeholder="Select Institute"
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
          <Form.Item label="Title" required tooltip="This is a required field">
            <Input
              key={2}
              placeholder="Exam Title"
              onChange={e => {
                onChangeInput(e, 'title', setRecord3, record3);
              }}
            />
          </Form.Item>

          <Form.Item label="Main Exam" required tooltip="This is a required field">
            <Select
              key={3}
              onChange={value => {
                setismain(value);
                onChangeSelect(value, 'isMain', setRecord3, record3);
              }}
              placeholder="Is this Main Exam"
              style={{ width: '100%' }}
            >
              <Option value={1}>Yes</Option>
              <Option value={0}>No</Option>
            </Select>
          </Form.Item>
          {ismain === 0 ? (
            <Form.Item label="Internal Exam" required tooltip="This is a required field">
              <Select
                key={ismain + 12}
                onChange={value => {
                  setInternal(value);
                  onChangeSelect(value, 'isInternalExam', setRecord3, record3);
                }}
                placeholder="Is this Internal Exam"
                style={{ width: '100%' }}
              >
                <Option value={1}>Yes</Option>
                <Option value={0}>No</Option>
              </Select>
            </Form.Item>
          ) : null}
          {ismain === 1 ? null : isinternal === 0 ? null : (
            <Form.Item label="Average Exam" required tooltip="This is a required field">
              <Input
                key={isinternal + 11}
                placeholder="Enter Average"
                onChange={e => {
                  onChangeInput(e, 'avgMark', setRecord3, record3);
                }}
                style={{ width: '100%' }}
              />
            </Form.Item>
          )
            // :<>{''}</>
          }
        </Form>
      )}
    </Modal>
  );
}

export default CreateEditExamType;
