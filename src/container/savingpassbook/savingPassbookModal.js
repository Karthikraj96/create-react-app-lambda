import React from 'react';
import { Modal, Button, Select, Input, DatePicker } from 'antd';
const { Option } = Select;
const onChange = (date, dateString) => {
  console.log(date, dateString);
};

const SavingPassbookModal = ({handleName,handleAmount,handleMark,handleType, isVisible,tokendata,handleDate ,handleOk,handleInsti,handleLevel, handleCancel,grade,org, }) => {
  return (
    <Modal destroyOnClose={true}
      title="Create Contest"
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" onClick={handleOk} type="primary">
          CREATE
        </Button>,
      ]}
      width={800}
    >
     {tokendata == '1' ? (
        <>
          <div>
            <label style={{ padding: 10 }}>Institute</label> &nbsp;
            <Select  mode="multiple"  onChange={handleInsti} style={{ width: '100%' }}>
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
      <div>
        <label style={{ margin:1}}>Date</label> &nbsp;
        <br />
        <DatePicker onChange={handleDate} format="DD/MM/YYYY" style={{ width: '100%' }} />
      </div>{' '}
      <br />
      <div>
        <label style={{ margin:1 }}>Grade</label> &nbsp;
        <br />
        <Select  mode="multiple"  onChange={handleLevel} style={{ width: '100%' }}>
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
        <label style={{ margin:1 }}>Contest-Type</label> &nbsp; <br />
        <Select defaultValue="" onChange={handleType}style={{ width: '100%' }}>
          <Option  value={'automatic'}>automatic	</Option>
          <Option  value={'manual'}>manual</Option>
        </Select>
      </div>
      <br />
      <div>
        <label style={{ margin:1 }}>Contest Name</label> &nbsp; <br />
        <Input onChange={handleName}style={{ width: '100%' }} />
      </div>
      <br />
      <div>
        <label style={{ margin:1 }}>Amount</label> &nbsp; <br />
        <Input onChange={handleAmount}style={{ width: '100%' }} />
      </div>
      <br />
      <div>
        <label style={{ margin:1 }}>Max Mark</label> &nbsp; <br />
        <Input onChange={handleMark}style={{ width: '100%' }} />
      </div>
      <br />
    </Modal>
  );
};

export default SavingPassbookModal;
