import React, { useState, useEffect } from 'react';
import { Select, Input, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { onChangeDate, onChangeSelect, onChangeInput } from '../../components/updateFunctions/functions/index';
const { Option } = Select;
const { TextArea } = Input;
const ExtraCurricularModal = props => {
  let {
    tokendata,
    clas,
    handleClas,
    student,
    handleinsti,
    handleRem,
    handleRes,
    handleDate,
    handleStudent,
    handleComp,
    handleLevel,
    handleType,
    record2,
    setRecord2,
    secLevel,
    secid,
  } = props;

  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [record, setRecord] = useState(null);
  useEffect(() => {
    setRecord(record2);
  }, [record2]);
  return (
    <>
      {record ? (
        <div>
          {tokendata === '1' ? (
            <>
              <div>
                <label style={{ padding: 1, fontSize: 15 }}>Institute</label> &nbsp;
                <br />
                <Select
                  key={record.organization_id}
                  defaultValue={record.organization_id}
                  size="middle"
                  style={{ width: '100%' }}
                  onChange={value => {
                    handleinsti(value);
                    onChangeSelect(value, 'organization_id', setRecord2, record2);
                  }}
                >
                  {org.map((e, key) => {
                    return (
                      <Option key={key} value={e.organization_id}>
                        {e.instituteName}
                      </Option>
                    );
                  })}
                </Select>
              </div>{' '}
              <br />
            </>
          ) : (
            <> </>
          )}
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Date</label> &nbsp;
            <br />
            <DatePicker
              key={record.entry_date}
              onChange={(date, dateString) => onChangeDate(date, dateString, 'entry_date', setRecord2, record2)}
              size="middle"
              defaultValue={moment(record.entry_date)}
              format="DD-MMM-YYYY"
              style={{ width: '100%' }}
            />
          </div>{' '}
          <br />
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Level</label> &nbsp;
            <br />
            <Select
              key={record.grade}
              value={secLevel}
              onChange={value => {
                handleLevel(value);
                onChangeSelect(value, 'grade', setRecord2, record2);
              }}
              size="middle"
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
          </div>
          <br />
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Class</label> &nbsp; <br />
            <Select
              key={record.class}
              value={secid}
              size="middle"
              onChange={value => {
                handleClas(value);
                onChangeSelect(value, 'section_id', setRecord2, record2);
              }}
              style={{ width: '100%' }}
            >
              {clas.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <br />
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Student</label> &nbsp; <br />
            <Select
              key={record.studentName}
              defaultValue={record.studentName}
              onChange={value => {
                onChangeSelect(value, 'student_id', setRecord2, record2);
              }}
              size="middle"
              style={{ width: '100%' }}
            >
              {student.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.first_name}
                  </Option>
                );
              })}
            </Select>
          </div>
          <br />
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Competition</label> &nbsp; <br />
            <Input
              key={record.competition}
              defaultValue={record.competition}
              style={{ width: '100%' }}
              onChange={e => {
                onChangeInput(e, 'competition', setRecord2, record2);
              }}
              size="middle"
            />
          </div>
          <br />
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Competition Type</label> &nbsp; <br />
            <Select
              key={record.type}
              defaultValue={record.type}
              onChange={value => {
                onChangeSelect(value, 'type', setRecord2, record2);
              }}
              size="middle"
              style={{ width: '100%' }}
            >
              <Option value="Intra School">Intra School</Option>
              <Option value="Inter School">Inter School</Option>
              <Option value="Zonal Level">Zonal Level</Option>
              <Option value="District Level">District Level</Option>
              <Option value="State Level">State Level</Option>
              <Option value="National Level">National Level</Option>
              <Option value="International">International</Option>
              <Option value="Other">Other</Option>
            </Select>
          </div>
          <br />
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Result</label> &nbsp; <br />
            <Input
              key={record.result}
              defaultValue={record.result}
              style={{ width: '100%' }}
              onChange={e => {
                onChangeInput(e, 'result', setRecord2, record2);
              }}
              size="middle"
            />
          </div>
          <br />
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Remarks</label> &nbsp; <br />
            <TextArea
              rows={4}
              key={record.remarks}
              defaultValue={record.remarks}
              style={{ width: '100%' }}
              onChange={e => {
                onChangeInput(e, 'remarks', setRecord2, record2);
              }}
              size="middle"
            />
          </div>
          <br />
        </div>
      ) : null}
    </>
  );
};

export default ExtraCurricularModal;
