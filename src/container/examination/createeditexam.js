import React, { useState, useEffect } from 'react';
import { Modal, Button, Row, Col } from 'antd';
import { Select } from 'antd';
import { Input } from 'antd';
import { Form } from 'antd';
import { getAllType, decodedata } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const { Option } = Select;
function CreateEditExam({
  grade,
  org,
  isVisible,
  handleSave,
  handleCancel,

  setExmAllDetails,
  isEdit,
  exmAllDetails,
}) {
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('');
  let [type, setType] = useState([]);
  let [subExam, SetSubExam] = useState([]);
  let [ismain, setIsmain] = useState(0);
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleType = id => {
    if (exmAllDetails.grade_id === '') {
      handleSelectChange('', 'type');
      Swal.fire({
        icon: 'error',
        title: 'First Select Class',
      });
    } else {
      type.map(e => {
        if (e.title === id) {
          if (e.isMain === 1) {
            setIsmain(1);
          } else {
            setIsmain(0);
          }
        }
        if (e.isMain === 0) {
          if (exmAllDetails.grade_id != '') {
            let type = [];
            exmList.examLists.map(e1 => {
              if (e1.type === e.title) {
                if (e1.grade_id === exmAllDetails.grade_id) {
                  type.push(e1);
                }
              }
            });
            SetSubExam(type);
          }
        }
      });
      handleSelectChange(id, 'type');
    }
  };
  const handleInternal = val => {
    console.log('handleInternal', val, 'subExam', subExam);
    let values = [];
    let arr = exmAllDetails;
    subExam.map((e, key) => {
      if (e.title === val[key]) {
        let va = { Etype: val[key], id: e._id };
        values.push(va);
      }
    });
    arr['internalExam'] = values;
    arr['noofInternalExam'] = val.length;
    setExmAllDetails(arr);
  };
  const handleSelectChange = (e, name) => {
    setExmAllDetails({ ...exmAllDetails, [name]: e });
  };
  // console.log("decode",decodedata)
  const handleChange = e => {
    const { value, name } = e.target;
    // console.log(name);
    setExmAllDetails({ ...exmAllDetails, [name]: value });
  };

  const [fields, setFields] = useState([]);

  function handleFieldsChange(i, event) {
    const values = [...fields];
    const { value } = event.target;
    values[i].itype = value;
    setFields(values);
    setExmAllDetails({ ...exmAllDetails, internalMarkField: values });
  }

  function handleAdd() {
    const values = [...fields];
    values.push({ itype: null });
    setFields(values);
  }

  function handleRemove(i) {
    const values = [...fields];
    values.splice(i, 1);
    setFields(values);
    setExmAllDetails({ ...exmAllDetails, internalMarkField: values });
  }

  const exmList = useSelector(state => state.examLists);
  useEffect(() => {
    setFields([...exmAllDetails.internalMarkField]);
    getAllType(decodedata.orgId)
      .then(res => {
        setType(res.data);
        if (isEdit) {
          if (exmAllDetails.type) {
            res.data.map(e => {
              if (e.title === exmAllDetails.type) {
                if (e.isMain === 1) {
                  setIsmain(1);
                } else {
                  setIsmain(0);
                }
              }
              if (e.isMain === 0) {
                let type = [];
                exmList.examLists.map(e1 => {
                  if (e1.type === e.title) {
                    if (e1.grade_id === exmAllDetails.grade_id) {
                      type.push(e1);
                    }
                  }
                });
                SetSubExam(type);
              }
            });
          }
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  // useEffect(() => { }, [subExam]);
  return (
    <Modal
      destroyOnClose={true}
      title={isEdit ? 'Edit Exam' : 'Create Exam'}
      visible={isVisible}
      onCancel={handleCancel}
      onOk={handleSave}
      cancelText="Cancel"
      width={1000}
    >
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
        <Form.Item label="Institue" required tooltip="This is a required field">
          <Select
            // key={exmAllDetails.title + 'fghjjh'}
            placeholder="Select Institue"
            defaultValue={exmAllDetails.organization_id}
            name="organization_id"
            onChange={e => handleSelectChange(e, 'organization_id')}
            mode="multiple"
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
        <Form.Item label="Class" required tooltip="This is a required field">
          <Select
            defaultValue={exmAllDetails.grade_id}
            onChange={e => handleSelectChange(e, 'grade_id')}
            placeholder="Select Class"
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

        <Form.Item label="Type" required tooltip="This is a required field">
          <Select
            defaultValue={exmAllDetails.type}
            onChange={handleType}
            placeholder="Select Type"
            style={{ width: '100%' }}
          >
            {type.map((g, i) => {
              return (
                <Option key={i} value={g.title}>
                  {g.title}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        {ismain === 0 ? (
          ''
        ) : isEdit ? (
          <Form.Item label="Select Internal Exam To Add" required tooltip="This is a required field">
            <Select
              defaultValue={exmAllDetails.internalExam.map(e => {
                return e.Etype;
              })}
              onChange={handleInternal}
              style={{ width: '100%' }}
              mode="multiple"
            >
              {subExam.map((g, i) => {
                return (
                  <Option key={i} value={g.title}>
                    {g.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : (
          <Form.Item label="Select Internal Exam To Add" required tooltip="This is a required field">
            <Select
              onChange={handleInternal}
              placeholder="Select Internal Exam"
              style={{ width: '100%' }}
              mode="multiple"
            >
              {subExam.map((g, i) => {
                return (
                  <Option key={i} value={g.title}>
                    {g.title}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        )}
        <Form.Item
          label="Title"
          tooltip="This is a required field"
          //rules={[{ required: true, message: 'Please input your Title!', type: 'text' }]}
        >
          <Input value={exmAllDetails.title} onChange={handleChange} name="title" placeholder="Title" />
        </Form.Item>

        <Form.Item
          label="Click To Add Internal Field"
          //rules={[{ required: true, message: 'Please input your Title!', type: 'text' }]}
        >
          {/* <label for="AddButton">Click To Add Internal Field</label> */}
          {/* <button type="button" id="AddButton" > */}

          <FontAwesomeIcon
            id="AddButton"
            icon={faPlus}
            style={{ fontSize: 25 }}
            onClick={() => handleAdd()}
          ></FontAwesomeIcon>
          {/* </button> */}
        </Form.Item>

        {fields.map((field, idx) => {
          return (
            <>
              <Form.Item
                label={`InternalField-${idx + 1}`}
                tooltip="This is a required field"
                //rules={[{ required: true, message: 'Please input your Title!', type: 'text' }]}
              >
                <Input value={field.itype} onChange={e => handleFieldsChange(idx, e)} placeholder="InternalField" />
              </Form.Item>
              <FontAwesomeIcon
                icon={faTrash}
                style={{ fontSize: 25, color: 'red' }}
                onClick={() => handleRemove(idx)}
              ></FontAwesomeIcon>
            </>
          );
        })}
      </Form>
    </Modal>
  );
}

export default CreateEditExam;
