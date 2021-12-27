import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Select, Space, Modal, Form, Pagination } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import { faUpload, faPencil, faFileExcel, faFilePdf, faUserCheck } from '@fortawesome/pro-duotone-svg-icons';
import { ChartjsPieChart } from '../../components/charts/chartjs';
import './index.css';
import moment from 'moment';
import CreateAdmission from './newadmissionmodal';
import EnqGraph from './Charts/Enquries';
import {
  getCurrentYear,
  decodedata,
  getAllApplication,
  postApplication,
  editApplication,
  acceptExistApplication,
  acceptApplication,
  cntadmissionStatus,
  getClass,
  getAllYear,
} from '../../api/api';
import Swal from 'sweetalert2';
import _ from 'lodash';
// import { useStateRef } from 'use-state-ref';
const { Option } = Select;
let Application = () => {
  let [currentYear, setCurrentYear] = useState(null);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [page2, setpage] = useState(1);
  let [page3, setpage2] = useState(1);
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  let [total, setTotal] = useState(10);
  let [total2, setTotal2] = useState(10);
  let [status, setstatus] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  let [sname, setSname] = useState(null);
  let [section, setSection] = useState([]);
  const [isVisible3, setisVisible3] = useState(false);
  let [acceptGrade, setAcceptGrade] = useState(null);
  let [acceptSection, SetAcceptSection] = useState(null);
  let [acceptVal, setAcceptVal] = useState(null);
  let [data, setData] = useState([]);
  let [tokendata, setTokendata] = useState(null);
  let [record2, setRecord2] = useState(null);
  let [selectedOrg, setSelectedOrg] = useState(1);
  let [selectedGrade, setSelectedGrade] = useState(null);
  let [update, setUpdate] = useState(0);
  let [data2, setdata2] = useState([]);
  let [chartPie, setChartPie] = useState([]);
  let [year, setYear] = useState([]);
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  useEffect(() => {
    getAllYear(selectedOrg)
      .then(res => {
        setYear(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    let da = {
      orgId: selectedOrg,
      grade: selectedGrade,
      page: page3,
      status: status,
    };
    getAllApplication(da)
      .then(res => {
        res.data.application.map((e, key) => {
          res.data.application[key].sino = key + 1 + (page3 === 1 ? 0 : (page3 - 1) * 10);
        });
        setdata2(res.data.application);
        setTotal2(res.data.count);
      })
      .catch(e => {
        console.log(e);
      });
  }, [status]);
  const callback = key => {
    let val = Number(key) - 2;
   let val2 = val<0?0:val
    setstatus(val2)
  };
  useEffect(() => {
    getCurrentYear()
      .then(res => {
        setCurrentYear(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  useEffect(() => {}, [data2, chartPie]);
  useEffect(() => {
    let da = {
      orgId: selectedOrg,
    };
    cntadmissionStatus(da)
      .then(res => {
        let val = res.data;
        let pieval = [];
        if (val.length === 5) {
          val.map((e, key) => {
            pieval[key] = e.count;
          });
          setChartPie(pieval);
        } else {
          let values = [0, 1, 2, 3, 4];
          let len = val.length;
          values.map((e, key) => {
            let check = false;
            val.map((e1, key2) => {
              if (e1._id === e) {
                pieval[key] = Number(e1.count);
                check = true;
              } else if (key2 === len - 1) {
                if (check === true) {
                  return;
                } else {
                  pieval[key] = 0;
                }
              }
            });
          });
          setChartPie(pieval);
        }
      })
      .catch(e => {
        console.log(e);
      });
    // countApplication({ orgId: selectedOrg })
    //   .then(res => {
    //     setAppCount(res.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    // countAdmission({ orgId: selectedOrg })
    //   .then(res => {
    //     setAdmCount(res.data);
    //   })
    //   .catch(e => {
    //     console.log(e);
    //   });
    setTokendata(decodedata.role_id);
  }, [update, selectedOrg, selectedGrade]);
  useEffect(() => {
    let da = {
      orgId: selectedOrg,
      grade: selectedGrade,
      page: page2,
      status: null,
    };
    getAllApplication(da)
      .then(res => {
        res.data.application.map((e, key) => {
          res.data.application[key].sino = key + 1 + (page2 === 1 ? 0 : (page2 - 1) * 10);
        });
        setData(res.data.application);
        setTotal(res.data.count);
      })
      .catch(e => {
        console.log(e);
      });
  }, [update, selectedOrg, selectedGrade, page2]);
  let handleClassGrade = val => {
    setAcceptGrade(val);
    let dat = { level: val, id: selectedOrg };
    getClass(dat)
      .then(res => {
        setSection(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  };
  let handleStatus = val => {
    if (val === 0) {
      return (
        <span style={{color:'red'}}><strong>Enquiry</strong></span>
      );
      // return 'Enquiry';
    } else if (val === 1) {
      return(
        <span style={{color:'lightyellow'}}><strong>Application</strong></span>
      );
      // return 'Application';
    } else if (val === 2) {
      return(
        <span style={{color:'green'}}><strong>Admission</strong></span>

      );
      // return 'Admission';
      
    } else if (val === 3) {
      return 'Rejected';
    } else {
      return 'Not Interest';
    }
  };
  const columns = [
    {
      title: 'SI. No',
      dataIndex: 'sino',
      key: 'sino',
    },
    {
      title: 'Date',
      render: (text, record) => handleDate2(record),
      key: 'date',
    },

    {
      title: 'Addmission No',
      // dataIndex: 'admission_no',application_no
      render: (text, record) => {
        if (record.admission_no) {
          return record.admission_no;
        } else if (record.application_no) {
          return record.application_no;
        }
      },
      key: 'addmissionno',
    },
    {
      title: 'Batch',
      dataIndex: 'batch',
      key: 'batch',
    },
    {
      title: 'Student Name',
      dataIndex: 'first_name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Parent Name',
      dataIndex: 'father_name',
      key: 'parentname',
    },
    {
      title: 'Source',
      dataIndex: 'source',
      key: 'source',
    },
    {
      title: 'Mobile No',
      dataIndex: 'father_mno',
      key: 'mobile',
    },
    {
      title: 'Fee',
      // dataIndex: 'feeStatus',
      render: (text, record) => {
        if (record.feeStatus) {
          return record.feeStatus;
        } else {
          return 'Pending';
        }
      },
      key: 'paid',
    },

    {
      title: 'Status',
      // dataIndex: 'status',
      render: (text, record) => handleStatus(record.status),
      key: 'status',
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
              setisVisible2(true);
            }}
            style={{ fontSize: 15, color: 'green ' }}
          />
          {record.status === 2 && record.is_active === 0 ? (
            <FontAwesomeIcon
              icon={faUserCheck}
              onClick={() => {
                handleAccept(record);
              }}
              style={{ fontSize: 15, color: 'red ' }}
            />
          ) : (
            <></>
          )}
        </Space>
      ),
    },
  ];
  let handleSection = val => {
    SetAcceptSection(val);
  };
  let handleOk2 = () => {
    if (acceptGrade === null) {
      Swal.fire({
        icon: 'error',
        title: 'First Select Class',
      });
    } else if (acceptSection === null) {
      Swal.fire({
        icon: 'error',
        title: 'First Select Section',
      });
    } else {
      if (acceptVal.existingParent === 1) {
        let val = {
          admission_number: acceptVal.admission_no,
          batch: acceptVal.batch,
          docFile: [],
          first_name: acceptVal.first_name,
          gender: acceptVal.gender,
          grade_id: acceptVal.class,
          guardian_id: acceptVal.guardian_id,
          last_name: acceptVal.last_name,
          pro_grade_id: acceptGrade,
          pro_section_id: acceptSection,
          section_id: acceptSection,
        };
        let da = {
          id: acceptVal.id,
          stu: val,
        };
        Swal.fire({
          icon: 'info',
          title: 'It Will Move the Student You Cannot Reverse This',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then(result => {
          if (result.isConfirmed) {
            acceptExistApplication(da)
              .then(res => {
                if (res) {
                  setUpdate(update + 1);
                  Swal.fire({
                    icon: 'success',
                    title: 'Data Updated Successfully',
                  });
                  setisVisible3(false);
                }
              })
              .catch(e => {
                Swal.fire({
                  icon: 'error',
                  title: 'Database Error Retry',
                  text: { e },
                });
              });
          }
        });
      } else {
        let val = {
          admission_number: acceptVal.admission_no,
          batch: acceptVal.batch,
          docFile: [],
          first_name: acceptVal.first_name,
          gender: acceptVal.gender,
          grade_id: acceptVal.class,
          last_name: acceptVal.last_name,
          pro_grade_id: acceptGrade,
          pro_section_id: acceptSection,
          section_id: acceptSection,
        };
        let val2 = { first_name: acceptVal.father_name, mobile_number: acceptVal.father_mno };
        let da = {
          id: acceptVal.id,
          guar: val2,
          stu: val,
        };
        Swal.fire({
          icon: 'info',
          title: 'It Will Move the Student You Cannot Reverse This',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then(result => {
          if (result.isConfirmed) {
            acceptApplication(da)
              .then(res => {
                if (res) {
                  setUpdate(update + 1);
                  Swal.fire({
                    icon: 'success',
                    title: 'Data Updated Successfully',
                  });
                  setisVisible3(false);
                }
              })
              .catch(e => {
                Swal.fire({
                  icon: 'error',
                  title: 'Database Error Retry',
                  text: { e },
                });
              });
          }
        });
      }
    }
  };
  let handleAccept = val => {
    if (val.batch != currentYear) {
      Swal.fire({
        icon: 'error',
        title: 'This is Next Year Batch ',
        text: 'You Cannot Move This Student Right Now',
      });
    } else {
      let name = val.first_name + ' ' + val.last_name;
      setSname(name);
      setAcceptVal(val);
      setisVisible3(true);
    }
  };
  const handleOk = val => {
    if (val.status === 0) {
      if (val.id) {
        {
          Swal.fire({
            icon: 'info',
            title: 'It Will Update The Application',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No',
          }).then(result => {
            if (result.isConfirmed) {
              val.changeUpdate = 1;
              editApplication(val)
                .then(res => {
                  if (res) {
                    setUpdate(update + 1);
                    Swal.fire({
                      icon: 'success',
                      title: 'Data Updated Successfully',
                    });
                    setisVisible2(false);
                  }
                })
                .catch(e => {
                  Swal.fire({
                    icon: 'error',
                    title: 'Database Error Retry',
                    text: { e },
                  });
                });
            }
          });
        }
      } else {
        Swal.fire({
          icon: 'info',
          title: 'It Will Save The Application',
          showCancelButton: true,
          confirmButtonText: 'Yes',
          cancelButtonText: 'No',
        }).then(result => {
          if (result.isConfirmed) {
            postApplication(val)
              .then(res => {
                if (res) {
                  setUpdate(update + 1);
                  Swal.fire({
                    icon: 'success',
                    title: 'Data Created Successfully',
                  });
                  setisVisible(false);
                  setRecord(intialValue);
                }
              })
              .catch(e => {
                Swal.fire({
                  icon: 'error',
                  title: 'Database Error Retry',
                  text: { e },
                });
              });
          }
        });
      }
    } else {
      Swal.fire({
        icon: 'info',
        title: 'It Will Update The Application',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          val.changeUpdate = 1;
          editApplication(val)
            .then(res => {
              if (res) {
                setUpdate(update + 1);
                Swal.fire({
                  icon: 'success',
                  title: 'Data Updated Successfully',
                });
                setisVisible2(false);
                setRecord(intialValue);
              }
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
                text: { e },
              });
            });
        }
      });
    }
  };
  const onGradeChange = value => {
    setSelectedGrade(value);
  };
  const onOrgChange = value => {
    setSelectedOrg(value);
  };
  const handleDate2 = data => {
    let date = data.admissionDate;
    let da = moment(date).format('DD/MMM/YYYY');
    return da;
  };
  const handleCancel = () => {
    setisVisible(false);
    setisVisible2(false);
    setisVisible3(false);
  };
  return (
    <div>
      <CreateAdmission
        isVisible={isVisible}
        isedit={false}
        record2={null}
        handleOk={handleOk}
        grade={grade}
        handleCancel={handleCancel}
        year={year}
      />
      <CreateAdmission
        isVisible={isVisible2}
        isedit={true}
        record2={record2}
        handleOk={handleOk}
        grade={grade}
        handleCancel={handleCancel}
        year={year}
      />
      <Main>
        <br />
        <Row gutter={25}>
          <Col xxl={12} md={12} sm={24} xs={24}>
            <Cards title="Enquries Recieved">
              <EnqGraph />
            </Cards>
          </Col>
          <Col xxl={12} md={12} sm={24} xs={24}>
            <Cards title="Admissions">
              <ChartjsPieChart
                labels={['Enquiry', 'Application', 'Admitted', 'Rejected', 'Not Intrested']}
                datasets={[
                  {
                    data: chartPie,
                    backgroundColor: ['#560bd0', '#007bff', '#00cccc', '#cbe0e3', '#74de00'],
                  },
                ]}
              />
            </Cards>
          </Col>
        </Row>

        <Row style={{ marginBottom: '20px' }}>
          {/* <Filters />
           */}
          {tokendata == '1' ? (
            <Col>
              <Select
                showSearch
                size={'middle'}
                style={{ width: '400px', marginRight: '20px' }}
                placeholder="Select Institute"
                // value={}
                onChange={onOrgChange}
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
          ) : (
            ''
          )}
          <Col>
            <Select
              size={'middle'}
              showSearch
              style={{ width: '400px' }}
              placeholder="Select Class"
              // defaultValue={selecedGrade}
              onChange={onGradeChange}
            >
              {grade.map((g, i) => {
                return (
                  <Option key={i} value={g.id}>
                    {g.id}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards headless>
              <Row style={{ justifyContent: 'space-around' }}>
                <Button size="small" type="dashed">
                  <FeatherIcon icon="mail" size={14} />
                  SMS
                </Button>
                <Button onClick={() => setisVisible(true)} size="small" type="dashed">
                  <FeatherIcon icon="plus" size={14} />
                  Create
                </Button>
                <Button size="small" type="dashed">
                  <FeatherIcon icon="settings" size={14} />
                  Setting
                </Button>
                <Button size="small" type="dashed">
                  <FeatherIcon icon="download" size={14} />
                  Download
                </Button>{' '}
                <Button size="small" type="dashed">
                  <FeatherIcon icon="upload" size={14} />
                  Upload
                </Button>
              </Row>
              <br />
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="All" key="1">
                  <div className="row_page_divison">
                    <div className="upload_down_icon">
                      {/* <FeeDownloadModal modal={modal} toggle={toggle} /> */}
                      <div style={{ display: 'flex', alignItems: 'center', marginRight: '12px' }}>
                        <FontAwesomeIcon
                          icon={faFilePdf}
                          style={{ fontSize: 20, color: '#c3272b  ', marginRight: '6px' }}
                        />{' '}
                        PDF
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', marginRight: '12px' }}>
                        <FontAwesomeIcon
                          icon={faFileExcel}
                          style={{ fontSize: 20, color: '#78C000 ', marginRight: '6px' }}
                        />
                        Excel
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <FontAwesomeIcon
                          icon={faUpload}
                          style={{ fontSize: 20, color: '#ffd43b  ', marginRight: '6px' }}
                        />
                        Upload
                      </div>
                    </div>
                  </div>
                  <CustomTable col={columns} pagination={false} data={data} />
                  <Row justify="end">
                    <Pagination
                      defaultCurrent={1}
                      total={total}
                      onChange={page => {
                        setpage(page);
                      }}
                    />
                  </Row>
                </TabPane>
                <TabPane tab="Enquiry" key="2">
                  <CustomTable col={columns} pagination={false} data={data2} />
                  <Row justify="end">
                    <Pagination
                      defaultCurrent={1}
                      total={total2}
                      onChange={page => {
                        setpage2(page);
                      }}
                    />
                  </Row>
                </TabPane>
                <TabPane tab="Application" key="3">
                  <CustomTable col={columns} pagination={false} data={data2} />
                  <Row justify="end">
                    <Pagination
                      defaultCurrent={1}
                      total={total2}
                      onChange={page => {
                        setpage2(page);
                      }}
                    />
                  </Row>
                </TabPane>
                <TabPane tab="Admission" key="4">
                  <CustomTable col={columns} pagination={false} data={data2} />
                  <Row justify="end">
                    <Pagination
                      defaultCurrent={1}
                      total={total2}
                      onChange={page => {
                        setpage2(page);
                      }}
                    />
                  </Row>
                </TabPane>
                <TabPane tab="Not Intrested" key="5">
                  <CustomTable col={columns} pagination={false} data={data2} />
                  <Row justify="end">
                    <Pagination
                      defaultCurrent={1}
                      total={total2}
                      onChange={page => {
                        setpage2(page);
                      }}
                    />
                  </Row>
                </TabPane>
                <TabPane tab="Rejected" key="6">
                  <CustomTable col={columns} pagination={false} data={data2} />
                  <Row justify="end">
                    <Pagination
                      defaultCurrent={1}
                      total={total2}
                      onChange={page => {
                        setpage2(page);
                      }}
                    />
                  </Row>
                </TabPane>
              </Tabs>
            </Cards>
          </Col>
        </Row>
      </Main>
      <Modal
        destroyOnClose={true}
        title={'Student Name ' + sname}
        visible={isVisible3}
        onOk={() => handleOk2()}
        onCancel={handleCancel}
        okText="Submit"
        cancelText="Cancel"
        width={500}
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
          <Form.Item label="Level" required tooltip="This is a required field">
            <Select onChange={handleClassGrade} placeholder="Select Level" style={{ width: '100%' }}>
              {grade.map((g, i) => {
                return <Option value={g.id}>{g.id}</Option>;
              })}
            </Select>
          </Form.Item>
          <Form.Item label="Section" required tooltip="This is a required field">
            <Select placeholder="Select Section" onChange={handleSection} style={{ width: '100%' }}>
              {section.map((g, i) => {
                return (
                  <Option key={i} value={g._id}>
                    {g.name}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Application;
