import React, { useState, useEffect } from 'react';
import { Modal, Button, Select, Input, Row, Col } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/pro-duotone-svg-icons';
const ClassroomModal = ({
  tokendata,
  isVisible,
  handleOk,
  handleCancel,
  org,
  grade,
  handleTotalSectionStudent,
  handleName,
  handleLevel2,
  handleInsti2,
}) => {
  let [batch, setBatch] = useState([]);
  let [batchName, setBatchName] = useState(null);
  let [update, setupdate] = useState(0);
  let handlebatchName = e => {
    setBatchName(e.target.value);
  };
  let handleAdd = () => {
    if (batch.length > 0) {
      setBatch([...batch, { groupName: batchName }]);
      setBatchName(null);
    } else {
      setBatch([{ groupName: batchName }]);
      setBatchName(null);
    }
  };
  let handleDelete = key => {
    if (batch.length === 1 || batch.length < 1) {
      setBatch([]);
      setupdate(update + 1);
    } else {
      let dat3 = batch;
      dat3.splice(key, 1);
      setBatch(dat3);
      setupdate(update + 1);
    }
  };
  useEffect(() => {}, [batch, update]);
  return (
    <Modal
      destroyOnClose={true}
      title="Create Classroom"
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" onClick={() => {handleOk(batch,setBatch);setBatchName(null);}} type="primary">
          CREATE
        </Button>,
      ]}
      width={800}
    >
      {tokendata == '1' ? (
        <>
          <div>
            <label style={{ padding: 10 }}>Institute</label> &nbsp;
            <Select defaultValue=" " size="small" onChange={handleInsti2} style={{ width: '100%' }}>
              {org.map((e, key) => {
                return (
                  <Option key={key} value={e.organization_id}>
                    {e.instituteName}
                  </Option>
                );
              })}
            </Select>
          </div>
          <br />
        </>
      ) : (
        <> </>
      )}
      <br />

      <div>
        <label style={{ margin: 1 }}>Grade</label> &nbsp;
        <br />
        <Select onChange={handleLevel2} size="small" style={{ width: '100%' }}>
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
        <label style={{ margin: 1 }}>ClassName</label> &nbsp; <br />
        <Input style={{ width: '100%', 'text-transform': 'uppercase' }} onChange={handleName} />
      </div>
      <br />
      <div>
        <label style={{ margin: 1 }}>Total Student</label> &nbsp; <br />
        <Input type={'number'} style={{ width: '100%' }} onChange={handleTotalSectionStudent} />
      </div>
      <br />
      <div>
        <label style={{ margin: 1 }}>Batch Name</label> &nbsp; <br />
        <Row>
          <Col span={24}>
            <Input style={{ width: '70%' }} value={batchName} onChange={handlebatchName} />
            <FontAwesomeIcon
              icon={faPlus}
              onClick={() => handleAdd()}
              style={{ fontSize: 25, color: 'blue ', width: '5%', marginRight: 1, marginLeft: 1 }}
            />
          </Col>
        </Row>
      </div>
      <br />
      {batch.map((e, key) => {
        return (
          <>
            <Col>
              <Input value={e.groupName} disabled style={{ width: '70%', color: 'red' }} />
              <FontAwesomeIcon
                icon={faTrash}
                onClick={() => handleDelete(key)}
                style={{ fontSize: 25, color: 'Red ', marginRight: 1, marginLeft: 1, marginTop: 2, width: '5%' }}
              />
            </Col>
            <br />
          </>
        );
      })}
    </Modal>
  );
};

export default ClassroomModal;
