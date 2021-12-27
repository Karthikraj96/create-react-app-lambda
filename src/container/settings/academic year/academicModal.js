import React, { useEffect, useState } from 'react';
import { Modal, Row, Col, DatePicker } from 'antd';
import moment from 'moment';
const { RangePicker } = DatePicker;
let AcademicModal = ({ isVisible, handleOk, handleCancel, record, setRecord, selectedOrg }) => {
  let [val, setVal] = useState([]);
  useEffect(() => {
    if (record) {
      if (record.id) {
        let v = record.year.split('-');
        setVal(v);
        v = undefined;
      }
    }
  }, [record]);
  console.log("value",val)
  let onChange = (date, dateString) => {
    if (record) {
      if (record.id) {
        let year = dateString[0] + '-' + dateString[1];
        setRecord({ ...record, ['year']: year });
      } else {
        let data = {
          organization_id: selectedOrg,
          year: dateString[0] + '-' + dateString[1],
        };
        setRecord(data);
      }
    } else {
      let data = {
        organization_id: selectedOrg,
        year: dateString[0] + '-' + dateString[1],
      };
      setRecord(data);
    }
  };
  return (
    <Modal
      destroyOnClose={true}
      style={{ top: 20 }}
      title={record ? (record.id ? 'Edit Academic Year' : 'Add Academic Year') : 'Add Academic Year'}
      visible={isVisible}
      onOk={handleOk}
      onCancel={handleCancel}
      okText={record ? (record.id ? 'Edit' : 'Create') : 'Create'}
      cancelText="Cancel"
      width={800}
    >
      {/* //Institute details */}

      <Row>
        <Col span={24}>
          <div>
            <label>Academic Year</label>
            <br />
            {record ? (
              record.id ? (
                <RangePicker
                  picker="year"
                  value={[moment(val[0]), moment(val[1])]}
                  onChange={onChange}
                  style={{ width: '100%' }}
                />
              ) : (
                <RangePicker picker="year" onChange={onChange} style={{ width: '100%' }} />
              )
            ) : (
              <RangePicker picker="year" onChange={onChange} style={{ width: '100%' }} />
            )}

            {/* <DatePicker showTime onChange={onChange} style={{ width: '100%' }} /> */}
          </div>
        </Col>
      </Row>
    </Modal>
  );
};
export default AcademicModal;
