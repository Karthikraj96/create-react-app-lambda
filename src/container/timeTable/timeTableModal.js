import React, { useEffect, useState } from 'react';
import { Modal, Button, Select, Input, Upload, DatePicker, TimePicker } from 'antd';
import { useSelector } from 'react-redux';
import { getClass, getSubject2, getTeacherList, getTeacherSectionAllocation } from '../../api/api';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-duotone-svg-icons';
const { Option } = Select;
const TimetableModal = ({
  isVisible,
  handleCancel,
  tokendata,
  record,
  selectedSection1,
  selectedGrade1,
  selectedOrg1,
  handleAllocation,
  handleAllocationDelete,
}) => {
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [update, setUpdate] = useState(0);
  let [section, setSection] = useState([]);
  let [subject, setSubject] = useState([]);
  let [teacher, setTeacher] = useState([]);
  let [selectedSection, setSelectedSection] = useState(selectedSection1);
  let [selectedOrg, setSelectedOrg] = useState(selectedOrg1);
  let [selectedGrade, setSelectedGrade] = useState(selectedGrade1);
  let [fields, setFields] = useState(record);
  let [isdelete, setisDelete] = useState(false);
  let [deleteUpdate, setDeleteUpdate] = useState(0);
  useEffect(() => {
    if (record) {
      setFields(record);
    }
  }, [record]);
  useEffect(() => {}, [fields, deleteUpdate]);
  useEffect(() => {
    getTeacherList()
      .then(res => {
        setTeacher(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    let dat = { level: selectedGrade ? selectedGrade : selectedGrade1, id: selectedOrg ? selectedOrg : selectedOrg1 };
    getClass(dat)
      .then(res => {
        setSection(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    getSubject2(dat)
      .then(res => {
        setSubject(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [update, selectedGrade, selectedOrg, selectedGrade1, selectedSection1]);
  useEffect(() => {
    if (selectedSection) {
      if (!isdelete) {
        let dat = {
          section_id: selectedSection,
          orgId: selectedOrg,
        };
        getTeacherSectionAllocation(dat)
          .then(res => {
            setFields(res.data);
            setUpdate(update + 1);
          })
          .catch(e => {
            console.log(e);
          });
      }
    }
  }, [selectedSection, isdelete]);
  let handleSub = (string, key, value, event) => {
    let arr = fields[key];
    if (string === 'Subject') {
      arr.subject_id = value;
      arr.subject_name = event.key;
    } else if (string === 'Teacher') {
      arr.teacher_id = event.key;
      arr.teacher_name = event.children;
      arr.classTeacher = '';
    } else {
      if (value === '') {
        arr.classTeacher = '';
      } else {
        arr.classTeacher = value;
      }
    }
    setFields([...fields.slice(0, key), arr, ...fields.slice(key + 1)]);
    setDeleteUpdate(update + 1);
  };
  const onGradeChange = value => {
    setSelectedGrade(value);
  };
  const onOrgChange = value => {
    setSelectedOrg(value);
  };
  let handleAdd = () => {
    let key = fields.length;
    let val = {
      grade_id: selectedGrade ? selectedGrade : selectedGrade1,
      section_id: selectedSection ? selectedSection : selectedSection1,
      classTeacher: null,
      subject_id: null,
      teacher_id: null,
      teacher_name: null,
      subject_name: null,
    };
    setFields([...fields.slice(0, key), val, ...fields.slice(key + 1)]);
  };
  let handleSection = value => {
    setSelectedSection(value);
  };
  let handleRemove = i => {
    let values = fields;
    if (values[i]._id) {
      let _id = values[i]._id;
      handleAllocationDelete(_id);
      values.splice(i, 1);
      setFields(values);
      setDeleteUpdate(deleteUpdate + 1);
      setisDelete(false);
    } else {
      values.splice(i, 1);
      setisDelete(true);
      setFields(values);
      setDeleteUpdate(deleteUpdate + 1);
    }
  };
  return (
    <Modal
      destroyOnClose={true}
      title="Create / Edit Allocation"
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" onClick={() => handleAllocation(fields)} type="primary">
          Allocate
        </Button>,
      ]}
      width={800}
    >
      <label style={{ margin: 1 }}>Institute</label>
      {tokendata == '1' ? (
        <div>
          <Select
            size={'middle'}
            style={{ width: '100%' }}
            placeholder="Select Institute"
            value={selectedOrg}
            onChange={onOrgChange}
          >
            {org.map((e, key) => {
              return (
                <Option key={e._id} value={e.organization_id}>
                  {e.instituteName}
                </Option>
              );
            })}
          </Select>
        </div>
      ) : (
        ''
      )}
      <br />
      <label style={{ margin: 1 }}>Level</label>{' '}
      <div>
        <Select
          size={'middle'}
          style={{ width: '100%' }}
          placeholder="Select Class"
          value={selectedGrade ? selectedGrade : selectedGrade1}
          onChange={onGradeChange}
        >
          {grade.map((g, i) => {
            return (
              <Option key={g._id} value={g.id}>
                {g.id}
              </Option>
            );
          })}
        </Select>
      </div>{' '}
      <br />
      <label style={{ margin: 1 }}>Class</label>{' '}
      <div>
        <Select
          size={'middle'}
          placeholder="Select Section"
          defaultValue={selectedSection1}
          onChange={handleSection}
          style={{ width: '100%' }}
        >
          {section.map((g, i) => {
            return (
              <Option key={g._id} value={g._id}>
                {g.name}
              </Option>
            );
          })}
        </Select>
      </div>{' '}
      <br />
      <div>
        <label style={{ margin: 1 }}>Click to Allocate Techer and Subject</label>{' '}
        <FontAwesomeIcon
          id="AddButton"
          icon={faPlus}
          style={{ fontSize: 25, margin: 1 }}
          onClick={() => handleAdd()}
        ></FontAwesomeIcon>
      </div>
      {fields.map((e, key) => {
        if (e) {
          return (
            <>
              <Select
                size="middle"
                style={{ width: '30%' }}
                onChange={(value, event) => handleSub('Subject', key, value, event)}
                value={e.subject_name}
                showSearch
                key={key + 10}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                {subject.map(e1 => (
                  <Option key={e1.name} value={e1.id}>
                    {e1.name}
                  </Option>
                ))}
              </Select>
              {/* <label style={{ margin: 1 }}>Teacher </label>{' '} */}
              <Select
                size="middle"
                onChange={(value, event) => handleSub('Teacher', key, value, event)}
                style={{ width: '30%' }}
                value={e.teacher_name}
                showSearch
                key={e._id}
                optionFilterProp="children"
                filterOption={(input, option) => {
                  if (option.props.children) {
                    return (
                      option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 ||
                      option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    );
                  } else {
                    return option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                  }
                }}
              >
                {teacher.map(e2 => (
                  <Option key={e2._id} value={e2.employee_number}>
                    {e2.first_name + ' ' + (e2.last_name?e2.last_name:null) + ', ' + e2.employee_number}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Is Class Teacher"
                key={key}
                value={e.classTeacher}
                style={{ width: '20%', margin: 2 }}
                onChange={(value, event) => handleSub('classTeacher', key, value, event)}
              >
                <Option value={''}>No</Option>
                <Option value={selectedSection ? selectedSection : selectedSection1}>Yes</Option>
              </Select>
              <FontAwesomeIcon
                icon={faTrash}
                key={key + 1}
                style={{ fontSize: 25, color: 'red', width: '8%', margin: 2, marginTop: 4 }}
                onClick={() => handleRemove(key)}
              ></FontAwesomeIcon>
              <br />
            </>
          );
        } else {
          return;
        }
      })}
    </Modal>
  );
};

export default TimetableModal;
