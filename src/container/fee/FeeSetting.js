import React, { Fragment, useEffect, useState } from 'react';
import { Main } from '../styled';
import CustomTable from './dashboard/Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt, faEye } from '@fortawesome/pro-duotone-svg-icons';
import moment from 'moment';
import { decodedata, addFeeType, getAllFeeType, getAllOrgParticular, addParticular, getAllYear } from '../../api/api';
import './dashboard/index.css';
import { useSelector } from 'react-redux';
import { Select } from 'antd';
import { Row, Col, Card, Space, Button, Drawer } from 'antd';
import Fee from './feeTypeCreate';
import PartiCulars from './feeParticulars';
import Swal from 'sweetalert2';
const { Option } = Select;
let FeeSetting = () => {
  let org = useSelector(store => store.getOrgReducer);
  let [tokendata, setTokendata] = useState(null);
  let [selectedOrg, setSelectedOrg] = useState(decodedata.orgId);
  let [update, setUpdate] = useState(0);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  let [data, setData] = useState([]);
  let [data1, setData1] = useState([]);
  let [year, setYear] = useState([]);
  let [selectedYear, setSelectedYear] = useState(null);
  let [record2, setRecord2] = useState({
    organization_id: selectedOrg,
    installments: null,
    fee: null,
    year: selectedYear,
    date_array: [],
    validity: '',
  });
  let [record3, setRecord3] = useState({ organization_id: selectedOrg, particulars: null, year: selectedYear });
  let [drawVisible, setDrawVisible] = useState(false);
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
      year: selectedYear,
    };
    getAllFeeType(data12)
      .then(res => {
        let dat = res.data;
        dat.forEach((photo, index) => {
          photo.serial = index + 1;
        });
        setData(dat);
        dat = undefined;
      })
      .catch(e => {
        console.log(e);
      });
    getAllOrgParticular(data12)
      .then(res => {
        let dat = res.data;
        dat.forEach((photo, index) => {
          photo.serial = index + 1;
        });
        setData1(dat);
        dat = undefined;
      })
      .catch(e => {
        console.log(e);
      });
  }, [update, selectedOrg, selectedYear]);
  let handleSelectYear = value => {
    setSelectedYear(value);
  };
  const columns = [
    {
      title: 'Serial No',
      key: 'serial',
      dataIndex: 'serial',
    },
    {
      title: 'Acadamic Year',
      key: 'serial',
      dataIndex: 'year',
    },
    {
      title: 'Fee Type',
      dataIndex: 'fee',
      key: 'type',
    },
    {
      title: 'Installments',
      dataIndex: 'installments',
      key: 'sino',
    },
    {
      title: 'Fee Date',
      render: (text, record) => {
        return moment(record.date_array[0]).format('DD/MM/YYYY');
      },
      key: 'Date',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />  */}
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => {
              let val = record;
              record.date_array.map((e, key) => {
                let installmentsdates = 'installmentsdates' + (key + 1);
                val[installmentsdates] = moment(e);
              });
              val.validity = moment(record.validity);
              setRecord2(val);
              setisCreateModalVisible(true);
            }}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => {
              setRecord2(record);
              setDrawVisible(true);
            }}
            style={{ fontSize: 15, color: 'blue ' }}
          />
        </Space>
      ),
    },
  ];
  const columns1 = [
    {
      title: 'Serial No',
      key: 'serial',
      dataIndex: 'serial',
    },

    {
      title: 'Particular',
      key: 'particulars',
      dataIndex: 'particulars',
    },
    {
      title: 'Action',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          {/* <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} /> */}
          <FontAwesomeIcon
            icon={faPencilAlt}
            onClick={() => {
              setRecord3(record);
              setisCreateModalVisible2(true);
            }}
            style={{ fontSize: 15, color: 'green ' }}
          />
          {/* <FontAwesomeIcon icon={faTrashAlt} style={{ fontSize: 15, color: 'red ' }} /> */}
        </Space>
      ),
    },
  ];
  const handleInsti = value => {
    setSelectedOrg(value);
  };
  const handleCancel = () => {
    setisCreateModalVisible(false);
    setisCreateModalVisible2(false);
    setRecord2({ organization_id: selectedOrg, installments: null, fee: null, year: selectedYear, date_array: [] });
    setRecord3({ organization_id: selectedOrg, particulars: null, year: selectedYear });
    setDrawVisible(false);
    setUpdate(update + 1);
  };
  const handleOk2 = value => {
    Swal.fire({
      icon: 'info',
      title: value.id ? 'It Will Update Particulars' : 'It Will Create Particulars',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        addParticular(value)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: value.id ? 'Data Updated SuccessFully' : 'Data Created Successfully',
            });
            setisCreateModalVisible2(false);
            setUpdate(update + 1);
            setRecord3({ organization_id: selectedOrg, particulars: null });
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
  const handleOk = value => {
    Swal.fire({
      icon: 'info',
      title: value.id ? 'It Will Update FeeType' : 'It Will Create FeeType',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        addFeeType(value)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: value.id ? 'Data Updated SuccessFully' : 'Data Created Successfully',
            });
            setisCreateModalVisible(false);
            setUpdate(update + 1);
            setRecord2({ organization_id: selectedOrg, installments: null, fee: null });
          })
          .catch(e => {
            console.log(e);
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
            });
          });
      }
    });
  };
  return (
    <Fragment>
      <Main style={{ marginTop: '20px' }}>
        <Row gutter={25}>
          <Card style={{ width: '100%' }} title="Fee Payment Type">
            {tokendata == '1' ? (
              <Row>
                <Col lg={8} xl={8} xxl={8} sm={8} xs={24}>
                  <Select
                    value={selectedOrg}
                    onChange={handleInsti}
                    style={{ width: '80%', margin: '2', float: 'left' }}
                  >
                    {org.map((e, key) => {
                      return (
                        <Option key={key} value={e.organization_id}>
                          {e.instituteName}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col lg={8} xl={8} xxl={8} sm={8} xs={24}>
                  <Select
                    value={selectedYear}
                    onChange={handleSelectYear}
                    style={{ width: '80%', margin: '2', float: 'left' }}
                  >
                    {year.map((e, key) => {
                      return (
                        <Option key={key} value={e.year}>
                          {e.year}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col lg={8} xl={8} xxl={8} sm={8} xs={24}>
                  <Button style={{ float: 'right' }} onClick={() => setisCreateModalVisible(true)} type="primary">
                    Create
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row>
                <Col lg={8} xl={8} xxl={8} sm={8} xs={24}>
                  <Select
                    value={selectedOrg}
                    onChange={handleInsti}
                    style={{ width: '80%', margin: '2', float: 'left' }}
                  >
                    {org.map((e, key) => {
                      return (
                        <Option key={key} value={e.organization_id}>
                          {e.instituteName}
                        </Option>
                      );
                    })}
                  </Select>
                </Col>
                <Col lg={8} xl={8} xxl={8} sm={8} xs={24}>
                  <Button style={{ float: 'right' }} onClick={() => setisCreateModalVisible(true)} type="primary">
                    Create
                  </Button>
                </Col>
              </Row>
            )}

            <br />
            {/* <EditableTable /> */}
            <CustomTable col={columns} data={data} />
          </Card>{' '}
          {/* <Card style={{ width: '100%', marginTop: '20px' }} title="Term Type">
            <Row>
              <Col lg={16} xl={16} xxl={16} sm={16} xs={24}>
                Create Fee Type :{' '}
                <Input style={{ width: '300px', height: '40px', marginLeft: '5px' }} placeholder="Payment Type" />
              </Col>
              <Col lg={8} xl={8} xxl={8} sm={8} xs={24}>
                <Button style={{ float: 'right' }} type="primary">
                  Create
                </Button>
              </Col>
            </Row>
            <br />
            <CustomTable col={columns1} data={data1} />
          </Card>{' '} */}
          <Card style={{ width: '100%', marginTop: '20px' }} title="Fee Particulars">
            <Row justify="end">
              <Col lg={8} xl={8} xxl={8} sm={8} xs={24}>
                <Button
                  style={{ float: 'right' }}
                  onClick={() => {
                    setisCreateModalVisible2(true);
                  }}
                  type="primary"
                >
                  Create
                </Button>
              </Col>
            </Row>
            <br />
            <CustomTable col={columns1} data={data1} />
          </Card>{' '}
        </Row>
      </Main>
      <Fee
        isVisible={isCreateModalVisible}
        setRecord={setRecord2}
        handleOk={handleOk}
        record={record2}
        handleCancel={handleCancel}
        year={year}
        org={org}
        tokendata={tokendata}
      ></Fee>
      <PartiCulars
        isVisible={isCreateModalVisible2}
        setRecord={setRecord3}
        handleOk={handleOk2}
        record={record3}
        handleCancel={handleCancel}
        year={year}
        org={org}
        tokendata={tokendata}
      ></PartiCulars>
      <Drawer title="View Payment Schedule" width={400} onClose={handleCancel} visible={drawVisible}>
        <Row>
          <Col span={24}>
            <div>
              <label style={{ margin: 1, fontWeight: 'bold' }}>Fee Type</label> &nbsp; &nbsp; &nbsp; &nbsp;
              <span> {record2.fee}</span>
            </div>
            <br />
            <div>
              <label style={{ margin: 1, fontWeight: 'bold' }}>Installments</label> &nbsp; &nbsp; &nbsp; &nbsp;
              <span>{record2.installments}</span>
            </div>
            <br />
            <div>
              {record2.date_array.map((e, key) => {
                if (record2.installments == 1) {
                  return (
                    <>
                      <label style={{ margin: 1, fontWeight: 'bold' }}>Fee Date</label> &nbsp; &nbsp; &nbsp; &nbsp;
                      <span>{moment(e).format('DD/MM/YYYY')} </span>
                    </>
                  );
                } else {
                  return (
                    <>
                      {' '}
                      <label style={{ margin: 1, fontWeight: 'bold' }}>Fee Date {' ' + (key + 1)}</label> &nbsp; &nbsp;
                      &nbsp; &nbsp;<span>{moment(e).format('DD/MM/YYYY')} </span>
                      <br />
                    </>
                  );
                }
              })}
            </div>
            <br />
            <br />
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  );
};

export default FeeSetting;
