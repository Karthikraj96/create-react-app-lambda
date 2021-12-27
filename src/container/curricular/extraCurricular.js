import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col, Modal, Select, Space } from 'antd';
import { getExtra, getClass, getStudents, createExtraActi, deleteExtraActi, decodedata } from '../../api/api';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Main } from '../styled';
import CustomTable from '../fee/dashboard/Components/Table';
import Update from './update';
import Swal from 'sweetalert2';
import moment from 'moment';
import { faPencil, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import ExtraCurricularModal from './extraCurricularModal';

const { Option } = Select;

const ExtraCurricular = () => {
  const handleDate2 = data => {
    let date = data.entry_date;
    let da = moment(date).format('DD-MMM-YYYY');
    return da;
  };
  const columns = [
    {
      title: 'Date',
      key: 'date',
      render: (text, record) => handleDate2(record),
    },
    {
      title: 'Student',
      dataIndex: 'studentName',
      key: 'studentName',
    },
    {
      title: 'Competition',
      dataIndex: 'competition',
      key: 'competition',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Result',
      dataIndex: 'result',
      key: 'result',
    },
    {
      title: 'Remarks',
      dataIndex: 'remarks',
      key: 'remarks',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => {
              setRecord2(record);
              handle(record);
              setsecid(record.class)
              setSeclevel(record.grade)
            }}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              let data = record.id;
              handle2(data);
            }}
            style={{ fontSize: 15, color: 'red ' }}
          />
        </Space>
      ),
    },
  ];

  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [clas, setClas] = useState([]);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  let [secid, setsecid] = useState('');
  let [selDate, setSeldate] = useState('');
  let [secinsti, setSecinsti] = useState(decodedata.orgId);
  let [tokendata, setTokendata] = useState(null);
  let [record2, setRecord2] = useState(null);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [secLevel, setSeclevel] = useState('');
  let [update, setUpdate] = useState(0);
  let [SecStudent, setSecStudent] = useState('');
  let [secType, setSectype] = useState('');
  let [secComp, setSeccomp] = useState('');
  let [secRes, setSecres] = useState('');
  let [secRem, setSecrem] = useState('');
  let [comp, setcomp] = useState([]);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [selectedClass, setselectedClass] = useState(null);
  let [selectedType, setselectedType] = useState(null);
  let [student, setStudent] = useState([]);
  const handleClas = value => {
    setsecid(value);
    let data = {
      section_id: value,
    };
    getStudents(data)
      .then(res => {
        setStudent(res.data);
      })
      .catch(e => {
        console.log('error', e);
      });
  };
  const handle2 = data3 => {
    Swal.fire({
      icon: 'error',
      title: 'Are you sure You want to delete this',
      text: 'It will Be Permanetly Deleted!!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        deleteExtraActi(data3)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
            }
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
            });
          });
      }
    });
  };
  const handle = data2 => {
    setisCreateModalVisible2(!isCreateModalVisible2);
    setSeclevel(data2.grade);
    setSecinsti(data2.organization_id);
    handleClas(data2.section_id);
  };

  const handleinsti = value => {
    setSecinsti(value);
    setSeclevel(null);
    setsecid(null);
  };
  const handleRem = value => {
    setSecrem(value.target.value);
  };
  const handleDate = (date, dateString) => {
    setSeldate(date);
  };
  const handleRes = value => {
    setSecres(value.target.value);
  };
  const handleComp = value => {
    setSeccomp(value.target.value);
  };
  const handleType = value => {
    setSectype(value);
  };
  const handlelevel = value => {
    setSeclevel(value);
    setsecid(null);
  };
  const handleStudent = id => {
    setSecStudent(id);
  };

  const handleLevel = value => {
    setselectedLevel(value);
    setData([]);
    setselectedClass(null);
  };
  const handleclass = value => {
    setselectedClass(value);
    setData([]);
  };
  const handlecomp = value => {
    setselectedType(value);
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    let data2 = {
      id: secinsti ? secinsti : decodedata.id,
      level: secLevel,
    };
    getClass(data2)
      .then(response => {
        setClas(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [secLevel, selectedClass]);
  useEffect(() => {
    let decodedata2 = decodedata;
    setTokendata(decodedata2.role_id);
    let data2 = {
      id: 1,
      level: selectedLevel,
    };
    getClass(data2)
      .then(response => {
        setClas(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    let data3 = {
      type: selectedType,
      section_id: selectedClass,
      orgId: selectedOrg,
    };
    getExtra(data3).then(res => {
      setData(res.data);
    });
  }, [selectedClass, selectedLevel, selectedType, update, selectedOrg]);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
    setSeclevel(null);
    setsecid(null);
  };
  const toggleCreate2 = () => {
    setisCreateModalVisible2(!isCreateModalVisible2);
    setRecord2(null);
    setSeclevel(null);
    setsecid(null);
  };
  const handleOk = () => {
    let data = {
      entry_date: selDate,
      competition: secComp,
      type: secType,
      result: secRes,
      organization_id: secinsti,
      remarks: secRem,
      student_id: SecStudent,
      section_id: secid,
    };
    Swal.fire({
      icon: 'info',
      title: 'It Will Create the Activity',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        createExtraActi(data)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Data Created Successfully',
              });
              setUpdate(update + 1);
              setisCreateModalVisible(!isCreateModalVisible);
            }
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
            });
          });
      }
    });
  };
  const handleOk2 = () => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update the Activity',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        createExtraActi(record2)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
              setUpdate(update + 1);
              setisCreateModalVisible2(!isCreateModalVisible2);
              setRecord2(null);
              setSeclevel(null);
              setSecinsti(null);
              handleClas(null);
            }
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
            });
          });
      }
    });
  };
  const handleInsti = value => {
    setselectedOrg(value);
    setselectedLevel(null);
    setData([]);
    setselectedClass(null);
  };
  return (
    <div>
      <PageHeader
        ghost
        title="ExtraCurricular"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <span style={{ fontSize: 15 }}>Admin</span> */}
            <Button size="small" type="primary" onClick={toggleCreate}>
              <FeatherIcon icon="plus" size={14} />
              Add Curricular
            </Button>
          </div>,
        ]}
      />
      <Main>
        <ExtraCurricularModal
          isVisible={isCreateModalVisible}
          student={student}
          handleOk={handleOk}
          handleClas={handleClas}
          handleCancel={toggleCreate}
          clas={clas}
          handleinsti={handleinsti}
          handleRem={handleRem}
          handleRes={handleRes}
          handleDate={handleDate}
          handleStudent={handleStudent}
          handleComp={handleComp}
          handleLevel={handlelevel}
          handleType={handleType}
          tokendata={tokendata}
          secid={secid}
          secLevel={secLevel}
        />
        <Row style={{ marginTop: 15 }}>
          <Col span={24} style={{ marginTop: 10 }}>
            <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
              <Row>
                {tokendata == '1' ? (
                  <Col span={6}>
                    {' '}
                    <span style={{ fontSize: 15, padding: 8 }}>Institute</span>
                    <br />
                    <Select style={{ width: '80%', margin: 8 }} allowClear={true} onChange={handleInsti}>
                      {org.map((e, key) => {
                        return (
                          <Option key={key} value={e.organization_id}>
                            {e.instituteName}
                          </Option>
                        );
                      })}
                    </Select>
                  </Col>
                ) : (
                  <> </>
                )}
                <Col span={6}>
                  {' '}
                  <span style={{ fontSize: 15, padding: 8 }}>Level</span>
                  <br />
                  <Select style={{ width: '80%', margin: 8 }} allowClear={true} onChange={handleLevel}>
                    {grade.map((e, key) => {
                      return (
                        <Option key={key} value={e.id}>
                          {e.id}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col span={6}>
                  {' '}
                  <span style={{ fontSize: 15, padding: 8 }}>Class</span>
                  <br />
                  <Select
                    style={{ width: '80%', margin: 8 }}
                    allowClear={true}
                    allowClear={true}
                    onChange={handleclass}
                  >
                    {clas.map((e, key) => {
                      return (
                        <Option key={key} value={e.id}>
                          {e.name}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col span={6}>
                  <span style={{ fontSize: 15, padding: 8 }}>Competition Type</span>
                  <br />
                  <Select style={{ width: '80%', margin: 8 }} allowClear={true} onChange={handlecomp}>
                    <Option value="Intra School">Intra School</Option>
                    <Option value="Inter School">Inter School</Option>
                    <Option value="Zonal Level">Zonal Level</Option>
                    <Option value="District Level">District Level</Option>
                    <Option value="State Level">State Level</Option>
                    <Option value="National Level">National Level</Option>
                    <Option value="International">International</Option>
                    <Option value="Other">Other</Option>
                  </Select>
                </Col>
              </Row>
              <br />
              <CustomTable col={columns} data={data} />
            </div>
          </Col>
        </Row>
        {/* </div> */}
      </Main>
      <Modal
        destroyOnClose={true}
        visible={isCreateModalVisible2}
        title="Update Extra Curricular"
        centered
        onCancel={toggleCreate2}
        footer={[
          <Button key="back" onClick={toggleCreate2}>
            Back
          </Button>,
          <Button key="submit" type="primary" onClick={handleOk2}>
            Update Activity
          </Button>,
        ]}
        width={1000}
      >
        <Update
          tokendata={tokendata}
          student={student}
          handleOk={handleOk2}
          handleClas={handleClas}
          handleCancel={toggleCreate2}
          clas={clas}
          handleinsti={handleinsti}
          handleRem={handleRem}
          handleRes={handleRes}
          handleDate={handleDate}
          handleStudent={handleStudent}
          handleComp={handleComp}
          handleLevel={handlelevel}
          handleType={handleType}
          record2={record2}
          setRecord2={setRecord2}
          secid={secid}
          secLevel={secLevel}
        />
      </Modal>
    </div>
  );
};

export default ExtraCurricular;
