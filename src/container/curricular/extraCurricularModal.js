import React, { useEffect } from 'react';
import { Modal, Button, Select, Input, DatePicker } from 'antd';
import { useSelector } from 'react-redux';
const { Option } = Select;

const { TextArea } = Input;

const ExtraCurricularModal = props => {
  let {
    tokendata,
    isVisible,
    handleOk,
    handleCancel,
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
    secLevel,
    secid,
  } = props;
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  useEffect(() => {}, [props]);
  return (
    <Modal
      destroyOnClose={true}
      title="Create Curricular"
      visible={isVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="submit" onClick={handleOk} type="primary">
          Create
        </Button>,
      ]}
      width={800}
    >
      {tokendata == '1' ? (
        <>
          <div>
            <label style={{ padding: 1, fontSize: 15 }}>Institute</label> &nbsp;
            <br />
            <Select defaultValue="" size="middle" style={{ width: '100%' }} onChange={handleinsti}>
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
        <DatePicker onChange={handleDate} size="middle" format="DD-MM-YYYY" style={{ width: '100%' }} />
      </div>{' '}
      <br />
      <div>
        <label style={{ padding: 1, fontSize: 15 }}>Level</label> &nbsp;
        <br />
        <Select value={secLevel} onChange={handleLevel} size="middle" style={{ width: '100%' }}>
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
        <Select value={secid} size="middle" onChange={handleClas} style={{ width: '100%' }}>
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
        <Select defaultValue="" onChange={handleStudent} size="middle" style={{ width: '100%' }}>
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
        <Input style={{ width: '100%' }} onChange={handleComp} size="middle" />
      </div>
      <br />
      <div>
        <label style={{ padding: 1, fontSize: 15 }}>Competition Type</label> &nbsp; <br />
        <Select defaultValue="" onChange={handleType} size="middle" style={{ width: '100%' }}>
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
        <Input style={{ width: '100%' }} onChange={handleRes} size="middle" />
      </div>
      <br />
      <div>
        <label style={{ padding: 1, fontSize: 15 }}>Remarks</label> &nbsp; <br />
        <TextArea rows={4} style={{ width: '100%' }} onChange={handleRem} size="middle" />
      </div>
      <br />
      {/* <div>
      <label style={{padding:1,fontSize: 152}} >Attachment</label> &nbsp; 
      <Upload {...props}>
                   <span> <Button icon={<UploadOutlined />}>Click to Upload</Button></span>
                  </Upload> 
        </div> */}
    </Modal>
  );
};

export default ExtraCurricularModal;
