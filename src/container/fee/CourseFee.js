import React, { Fragment, useState, useEffect } from 'react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Main } from '../styled';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEye, faRupeeSign } from '@fortawesome/pro-duotone-svg-icons';
import { Row, Col, Card, Button, Space, Drawer } from 'antd';
import CustomTable from './dashboard/Components/Table';
import { decodedata, getAllOrgParticular, getAllYear, addCourseFeeType, getAllOrgCourseFee } from '../../api/api';
import Coursefeemodal from './Coursefeemodal';
import './dashboard/index.css';
import { Select } from 'antd';
import Swal from 'sweetalert2';
import { useSelector } from 'react-redux';
const { Option } = Select;
function CourseFee() {
  let org = useSelector(store => store.getOrgReducer);
  let [tokendata, setTokendata] = useState(null);
  let [selectedOrg, setSelectedOrg] = useState(decodedata.orgId);
  let [partData, setPartData] = useState([]);
  let [update, setUpdate] = useState(0);
  let history = useHistory();
  let [visible, setVisible] = useState(false);
  let [data, setData] = useState([]);
  let grade = useSelector(store => store.getGradesReducer);
  let [selectedGrade, setSelectedGrade] = useState(null);
  let [year, setYear] = useState([]);
  let [selectedYear, setSelectedYear] = useState(null);
  let [drawVisible, setDrawVisible] = useState(false);
  let [record2, setRecord] = useState({
    // organization_id:null,
    year: null,
    grade_id: null,
    fees_total: 0,
    term: [],
  });
  useEffect(() => {
    setTokendata(decodedata.role_id);
    getAllYear(selectedOrg)
      .then(res => {
        setYear(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg]);
  useEffect(() => {
    let data12 = {
      org: selectedOrg,
    };
    getAllOrgParticular(data12)
      .then(res => {
        setPartData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    let dataaa = {
      orgid: selectedOrg,
      year: selectedYear,
      grade: selectedGrade,
    };
    getAllOrgCourseFee(dataaa)
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [update, selectedOrg, selectedYear, selectedGrade]);
  const columns = [
    {
      title: 'Class',
      dataIndex: 'grade_id',
      key: 'class',
    },
    {
      title: 'Academic Year',
      dataIndex: 'year',
      key: 'academicyear',
    },
    {
      title: 'Fees',
      render: (text, record) => {
        return (
          <>
            <FontAwesomeIcon icon={faRupeeSign} /> {' ' + record.fees_total.toLocaleString('en-IN')}/-
          </>
        );
      },
      key: 'fype',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => {
              setRecord(record);
              setVisible(true);
            }}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => {
              setRecord(record);
              setDrawVisible(true);
            }}
            style={{ fontSize: 15, color: 'blue ' }}
          />
        </Space>
      ),
    },
  ];
  let handleyear = value => {
    setSelectedYear(value);
  };
  let handleOrg = value => {
    setSelectedOrg(value);
  };
  let handleGrade = value => {
    setSelectedGrade(value);
  };
  let handleCancel = () => {
    setRecord({
      year: null,
      grade_id: null,
      fees_total: 0,
      term: [],
    });
    setVisible(false);
    setDrawVisible(false);
  };
  let handleOk = value => {
    Swal.fire({
      icon: 'info',
      title: value.id ? 'It Will Update Course Fee' : 'It Will Create Course Fee',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        addCourseFeeType(value)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: value.id ? 'Data Updated SuccessFully' : 'Data Created Successfully',
            });
            setVisible(false);
            setUpdate(update + 1);
            setRecord({
              year: null,
              grade_id: null,
              fees_total: 0,
              term: [],
            });
          })
          .catch(e => {
            console.log(e.response);
            if (e.response.status === 401) {
              Swal.fire({
                icon: 'error',
                title: 'Already Created Course Fee For This Grade',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
              });
            }
          });
      }
    });
  };
  return (
    <Fragment>
      <PageHeader
        ghost
        title="Fee Information"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button onClick={() => history.push('/admin/fee/setting')} size="small" type="primary">
              Fee Settings
            </Button>
            <Button onClick={() => setVisible(true)} size="small" type="primary">
              Create Course Fee
            </Button>
          </div>,
        ]}
      />
      <Main style={{ marginTop: '20px' }}>
        <Row gutter={25}>
          <Card style={{ width: '100%' }} title="Course Fee By Academic Year">
            <Row
              style={{ background: '#f2f3f6', padding: '20px', borderRadius: '10px', marginBottom: '20px' }}
              gutter={25}
              justify="end"
            >
              {tokendata == '1' ? (
                <Col className="gutter-row" span={6} xxl={6} lg={6} md={6} sm={24} xs={24}>
                  <Select placeholder="Select Institute" onChange={handleOrg} style={{ width: '100%' }}>
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
                ''
              )}
              <Col className="gutter-row" span={6} xxl={6} lg={6} md={6} sm={24} xs={24}>
                <Select placeholder="Select Level" onChange={handleGrade} style={{ width: '100%' }}>
                  {grade.map((g, i) => {
                    return (
                      <Option key={12554 + i} value={g.id}>
                        {g.id}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col className="gutter-row" span={6} xxl={6} lg={6} md={6} sm={24} xs={24}>
                <Select placeholder="Select Year" onChange={handleyear} style={{ width: '100%' }}>
                  {year.map((e, key) => {
                    return (
                      <Option key={key} value={e.year}>
                        {e.year}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <div className="another_main_card">
              <CustomTable col={columns} data={data} />
            </div>
          </Card>
        </Row>
        <Coursefeemodal
          tokendata={tokendata}
          visible={visible}
          year={year}
          org={org}
          grade={grade}
          handleCancel={handleCancel}
          handleOk={handleOk}
          record={record2}
          setRecord={setRecord}
          partData={partData}
        />
      </Main>
      <Drawer title="View Course Fee" width={400} onClose={handleCancel} visible={drawVisible}>
        <Row>
          <Col span={24}>
            <div>
              <label style={{ margin: 1, fontWeight: 'bold' }}>Year</label> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
              <span> {record2.year}</span>
            </div>
            <br />
            <div>
              <label style={{ margin: 1, fontWeight: 'bold' }}>Grade</label> &nbsp; &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;
              <span>{record2.grade_id}</span>
            </div>
            <br />
            <div>
              <label style={{ margin: 1, fontWeight: 'bold' }}>Fees Total</label> &nbsp; &nbsp;
              <span>{record2.fees_total}</span>
            </div>
            <br />
            <br />
            {record2.term ? (
              record2.term.length > 0 ? (
                <Row style={{ padding: '20px', marginTop: '10px' }}>
                  <Card title="Fee Total Breakup">
                    {record2.term.map((e, key) => {
                      return (
                        <Row>
                          <Col style={{ padding: '20px' }}>{e.t_name} Total</Col>
                          <Col style={{ padding: '20px' }}>
                            <FontAwesomeIcon icon={faRupeeSign} /> {' '+e.t_total.toLocaleString('en-IN')}/-
                          </Col>
                        </Row>
                      );
                    })}
                    <br />
                    <Row style={{ background: '#f4f5f7', borderRadius: '10px' }}>
                      <Col style={{ padding: '20px' }}>Total Amount</Col>
                      <Col style={{ padding: '20px' }}>
                        <FontAwesomeIcon icon={faRupeeSign} /> {' '+record2.fees_total.toLocaleString('en-IN')}/-
                      </Col>
                    </Row>
                    <br />
                  </Card>
                </Row>
              ) : (
                <></>
              )
            ) : (
              ''
            )}
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  );
}

export default CourseFee;
