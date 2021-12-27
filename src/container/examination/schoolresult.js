import React, { useEffect, useState } from 'react';
import { Row, Col, Progress } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { useHistory, useLocation } from 'react-router-dom';
import { Fragment } from 'react';
import _ from 'lodash';
import { Space } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import {
  decodedata,
  getAllExams,
  getClass,
  getExamSchedule,
  getStudents,
  getpaBest2,
  getPreTotal,
  UpdateMaxValue,
  getAvgmark,
  getSectionFullResult2,
} from '../../api/api';
import { useStateRef } from 'use-state-ref';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
const { Option } = Select;
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
let SchoolResult = () => {
  const location = useLocation();
  let [tokendata, setTokendata] = useState(null);
  let [avgmark, setAvgmark] = useState(0);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [subject, setSubject] = useState([]);
  let [clas, setClas] = useState([]);
  let [student, setStudents] = useState(null);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [selectedExam, setselectedExam] = useState(null);
  let [exam, setExam] = useState([]);
  let [sectionId, setSectionId] = useState(null);
  let [data, setData] = useState([]);
  let [avgData, setAvgData] = useState([]);
  const stateRef = useStateRef(avgData);
  let [markf, setMarkf] = useState(null);
  let [className, setClassName] = useState(null);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    if (selectedLevel) {
      let data2 = {
        id: selectedOrg,
        level: selectedLevel,
      };
      getClass(data2)
        .then(response => {
          setClas(response.data);
        })
        .catch(e => {
          console.log(e);
        });
      let data = {
        org: selectedOrg,
        grade: selectedLevel,
      };
      getAllExams(data)
        .then(res => {
          setExam(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [selectedOrg, selectedLevel]);
  useEffect(() => {
    if (selectedExam) {
      getExamSchedule(selectedExam)
        .then(res => {
          setSubject(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [selectedExam]);
  useEffect(() => {}, [subject]);
  useEffect(() => {
    if (sectionId) {
      let arr = [];
      let dataAvg = [];
      let markfield = [];
      let max = 0;
      let sub = 0;
      let intermark = 0;
      if (selectedExam) {
        exam.map(e => {
          if (e._id === selectedExam) {
            e.internalTest.map(e1 => {
              intermark = intermark + e1.mark;
            });
          }
        });
      }
      if (subject[0]) {
        subject[0].Internalmark.map(e => {
          sub = sub + e.mark;
          let val = {
            mField: e.mField,
            mark: 0,
            maxMark: e.mark,
          };
          markfield.push(val);
        });
      }
      let updatemax = [];
      let da = {
        exam_id: selectedExam,
        section_id: sectionId,
      };
      getSectionFullResult2(da)
        .then(res => {
          dataAvg = res.data;
          subject.map((e,key)=>{
            res.data.map((e1,key1)=>{
              if(e.subject_id === e1.subject_id){
                subject[key].classaverage = res.data[key1].classaverage;
                subject[key].top10avg = res.data[key1].top10avg;
                subject[key].last10avg = res.data[key1].last10avg;
              }
            })
          })
          subject.map(e => {
            if (e.isInternalNotneed === 1) {
              if (e.isInternalTest === 0) {
                max = sub + intermark + e.theory_mark;
                let va = {
                  max: max,
                  _id: e._id,
                };
                updatemax.push(va);
              } else {
                max = sub + e.theory_mark;
                let va = {
                  max: max,
                  _id: e._id,
                };
                updatemax.push(va);
              }
            } else {
              max = sub + e.theory_mark;
              let va = {
                max: max,
                _id: e._id,
              };
              updatemax.push(va);
            }
            let dat = {
              section_id: sectionId,
              subject: e.subject_id,
              exam_schedule_id: e._id,
              exam_id: e.exam_id,
              classaverage: e.classaverage,
              top10avg: e.top10avg,
              last10avg: e.last10avg,
              markField: markfield,
              markConvert: e.convertMark,
              max: max,
              tmax: e.theory_mark,
              pass_m: e.pass_m,
            };
            max = 0;
            arr.push(dat);
          });
          UpdateMaxValue(updatemax)
            .then(res => {})
            .catch(e => {
              console.log(e);
            });
          setMarkf(markfield);
          setData(arr);
        })
        .catch(e => {
          console.log(e);
          let arr2=[]
         if(subject.length<=0){
          Swal.fire({
            icon:'error',
            title:'No Exam Schedule is Found'
          })
         }
         else{
          subject.map(e => {
            if (e.isInternalNotneed === 1) {
              if (e.isInternalTest === 0) {
                max = sub + intermark + e.theory_mark;
                let va = {
                  max: max,
                  _id: e._id,
                };
                updatemax.push(va);
              } else {
                max = sub + e.theory_mark;
                let va = {
                  max: max,
                  _id: e._id,
                };
                updatemax.push(va);
              }
            } else {
              max = sub + e.theory_mark;
              let va = {
                max: max,
                _id: e._id,
              };
              updatemax.push(va);
            }
            let dat = {
              section_id: sectionId,
              subject: e.subject_id,
              exam_schedule_id: e._id,
              exam_id: e.exam_id,
              classaverage: 0,
              top10avg: 0,
              last10avg: 0,
              markField: markfield,
              markConvert: e.convertMark,
              max: max,
              tmax: e.theory_mark,
              pass_m: e.pass_m,
            };
            max = 0;
            arr2.push(dat);
          });
        
          UpdateMaxValue(updatemax)
            .then(res => {})
            .catch(e => {
              console.log(e);
            });
          setMarkf(markfield);
          setData(arr2);
         }
        });
      
      let dat = {
        ord: selectedOrg,
        section_id: sectionId,
      };
      getStudents(dat)
        .then(res => {
          setStudents(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [sectionId, selectedExam, selectedLevel, selectedOrg]);
  const handleSubject = value => {
    setSectionId(value);
    clas.map(e => {
      if (e._id === value) {
        setClassName(e.name);
      }
    });
  };
  const handleExam = value => {
    setselectedExam(value);
    setSectionId(null)
    setClassName(null)
    let internalexam = null;
    exam.map((e, key) => {
      if (e._id === value) {
        if (e.internalExam.length > 0) {
          internalexam = e.internalExam;
        }
      }
    });
    if (internalexam) {
      let data = {
        internalExam: internalexam,
      };
      getAvgmark(data)
        .then(res => {
          setAvgmark(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  };
  const history = useHistory();
  const handleEye = async record => {
    let data = [];
    let internal = [];
    let iexam = [];
    let ifind = false;
    let subexam = false;
    let bestofPA;
    let examName;
    exam.map(e => {
      if (e._id === selectedExam) {
        if (e.internalExam.length > 0) {
          subexam = true;
          internal.push(e.internalExam);
        }
        if (e.internalTest.length > 0) {
          iexam.push(e.internalTest);
        }
        examName = e;
      }
    });

    // let iexamData = [];
    if (iexam.length > 0) {
      iexam.map((e, key) => {
        if (e[key].Ttype === record.subject) {
          ifind = true;
        }
      });
    }
    if (ifind === false) {
      if (subexam === true) {
        let paData = {
          internalExam: examName.internalExam,
          section_id: student[0].section_id,
          subjectId: record.subject,
          avgmark: avgmark,
        };
        // bestofPA
        getpaBest2(paData)
          .then(response => {
            bestofPA = response.data;
          })
          .catch(e => {
            if(e.response.status== 404){
              Swal.fire({
                icon:'error',
                title:'First Enter The Marks for Previous Internal Exam'
              })
            }
            else{
              Swal.fire({
                icon:'error',
                title:'Database Error'
              })
            }
          });
      }
      if (iexam.length > 0) {
        let interexamresult = {
          exam_schedule_id: iexam[0][0].id,
          section_id: student[0].section_id,
          subject: iexam[0][0].Ttype,
        };
        getPreTotal(interexamresult)
          .then(res => {
            if (res.data.length === 0) {
              Swal.fire({
                icon: 'error',
                title: ' Internal Test Mark is Not Enterted',
                text: 'Without Internal Test Mark It Will Not Work Properly',
              });
            } else {
              student.map((e, key) => {
                let da = {
                  student_id: e._id,
                  rollno: e.roll_number,
                  studentName: e.first_name,
                  marks_scored: 0,
                  marks_total: record.max,
                  total: 0,
                  PAavgmark: avgmark,
                  bestofPA: subexam ? bestofPA[key].bestPa : 0,
                  ifind: res.data[key].mark,
                  answersheet: [],
                  answersheetlocation: null,
                  exam_schedule_id: record.exam_schedule_id,
                  exam_id: record.exam_id,
                  markField: markf,
                  // markConvert:record.markConvert,
                  key: key,
                  theory_mark: 0,
                  tmax: record.tmax,
                  pass_m: record.pass_m,
                  // student_section:e.section_id,
                  // subject:record.subject
                };
                data.push(da);
              });

              let val = {
                data: data,
                bestofPA: bestofPA,
                state: location.state,
                internal: internal,
                ifind: ifind,
                PAavgmark: avgmark,
                iexam2:iexam[0],
                iexam: res.data[0].maxMark,
                subexam: subexam,
                exam_schedule_id: record.exam_schedule_id,
                section_id: student[0].section_id,
                section_name: className,
                mark: markf,
                grade_id:selectedLevel,
                subject: record.subject,
                examName: examName,
              };
              history.push({ pathname: '/admin/examination/markentry', state: val });
            }
          })
          .catch(e => {
            console.log(e);
          });
      } else {
        student.map((e, key) => {
          let da = {
            student_id: e._id,
            rollno: e.roll_number,
            studentName: e.first_name,
            marks_scored: 0,
            marks_total: record.max,
            total: 0,
            ifind: ifind,
            PAavgmark: avgmark,
            bestofPA: bestofPA ? bestofPA[key].bestPa : 0,
            answersheet: [],
            answersheetlocation: null,
            exam_schedule_id: record.exam_schedule_id,
            exam_id: record.exam_id,
            markField: markf,
            // markConvert:record.markConvert,
            key: key,
            theory_mark: 0,
            tmax: record.tmax,
            pass_m: record.pass_m,
            // student_section:e.section_id,
            // subject:record.subject
          };
          data.push(da);
        });
        let val = {
          data: data,
          bestofPA: bestofPA,
          state: location.state,
          internal: internal,
          ifind: true,
          PAavgmark: avgmark,
          subexam: subexam,
          exam_schedule_id: record.exam_schedule_id,
          section_id: student[0].section_id,
          section_name: className,
          mark: markf,
          iexam2:iexam[0],
          grade_id:selectedLevel,
          iexam: null,
          subject: record.subject,
          examName: examName,
        };
        history.push({ pathname: '/admin/examination/markentry', state: val });
      }
    } else {
      if (subexam === true) {
        let paData = {
          internalExam: examName.internalExam,
          section_id: student[0].section_id,
          subjectId: record.subject,
          avgmark: avgmark,
        };
        // bestofPA
        getpaBest2(paData)
          .then(response => {
            bestofPA = response.data;
            student.map((e, key) => {
              let da = {
                student_id: e._id,
                rollno: e.roll_number,
                studentName: e.first_name,
                marks_scored: 0,
                marks_total: record.max,
                total: 0,
                bestofPA: bestofPA ? bestofPA[key].bestPa : 0,
                // ifind:ifind,
                answersheet: [],
                answersheetlocation: null,
                exam_schedule_id: record.exam_schedule_id,
                exam_id: record.exam_id,
                markField: markf,
                // markConvert:record.markConvert,
                key: key,
                theory_mark: 0,
                tmax: record.tmax,
                pass_m: record.pass_m,
                PAavgmark: avgmark,
                // student_section:e.section_id,
                // subject:record.subject
              };
              data.push(da);
            });
            let val = {
              data: data,
              bestofPA: bestofPA,
              state: location.state,
              internal: internal,
              ifind: ifind,
              subexam: subexam,
              PAavgmark: avgmark,
              exam_schedule_id: record.exam_schedule_id,
              section_id: student[0].section_id,
              section_name: className,
              mark: markf,
              grade_id:selectedLevel,
              iexam2:iexam[0],
                // iexam2: res.data[0].maxMark,
              subject: record.subject,
              examName: examName,
            };
            history.push({ pathname: '/admin/examination/markentry', state: val });
          })
          .catch(e => {
            if(e.response.status== 404){
              Swal.fire({
                icon:'error',
                title:'First Enter The Marks for Previous Internal Exam'
              })
            }
            else{
              Swal.fire({
                icon:'error',
                title:'Database Error'
              })
            }
          });
      } else {
        student.map((e, key) => {
          let da = {
            student_id: e._id,
            rollno: e.roll_number,
            studentName: e.first_name,
            marks_scored: 0,
            marks_total: record.max,
            total: 0,
            bestofPA: bestofPA ? bestofPA[key].bestPa : 0,
            // ifind:ifind,
            answersheet: [],
            answersheetlocation: null,
            exam_schedule_id: record.exam_schedule_id,
            exam_id: record.exam_id,
            markField: markf,
            // markConvert:record.markConvert,
            key: key,
            PAavgmark: avgmark,
            theory_mark: 0,
            tmax: record.tmax,
            pass_m: record.pass_m,
            // student_section:e.section_id,
            // subject:record.subject
          };
          data.push(da);
        });
        let val = {
          data: data,
          state: location.state,
          bestofPA: bestofPA,
          internal: internal,
          ifind: ifind,
          PAavgmark: avgmark,
          subexam: subexam,
          exam_schedule_id: record.exam_schedule_id,
          section_id: student[0].section_id,
          section_name: className,
          mark: markf,
          iexam2:iexam[0],
          grade_id:selectedLevel,
          // iexam2: res.data[0].maxMark,
          subject: record.subject,
          examName: examName,
        };
        history.push({ pathname: '/admin/examination/markentry', state: val });
      }
    }
  };
  const handleInsti = value => {
    setselectedOrg(value);
    setselectedLevel(null);
    setselectedExam(null)
    setSectionId(null)
    setClassName(null)
  };
  const handleGrade = value => {
    setselectedLevel(value);
    setselectedExam(null)
    setSectionId(null)
    setClassName(null)
  };
  const columns = [
    {
      title: 'Subject',
      dataIndex: 'subject',
      key: 'subject',
    },

    {
      title: 'Class Average',

      key: 'classaverage',
      render: (text, record) => {
        return (
          <Space size="middle">
            <Progress type="circle" percent={record.classaverage} width={80} />
          </Space>
        );
      },
    },
    {
      title: 'Top 10 Average',
      key: 'top10avg',
      render: (text, record) => (
        <Space size="middle">
          <Progress type="circle" strokeColor="green" percent={record.top10avg} width={80} />
        </Space>
      ),
    },
    {
      title: 'Last 10 Average',

      key: 'last10avg',
      render: (text, record) => (
        <Space size="middle">
          <Progress type="circle" strokeColor="red" percent={record.last10avg} width={80} />
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',
      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            onClick={() => handleEye(record)}
            icon={faEye}
            style={{ fontSize: 15, color: 'Dodgerblue ' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <PageHeader
        ghost
        title="School Result"
        buttons={[
          <Row gutter={25}>
            {tokendata == '1' ? (
              <Col>
                <Select
                  showSearch
                  style={{ width: '180px' }}
                  placeholder="Select Institute"
                  optionFilterProp="children"
                  onChange={handleInsti}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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
                showSearch
                style={{ width: '180px' }}
                placeholder="Select Class"
                optionFilterProp="children"
                onChange={handleGrade}
              >
                {grade.map((e, key) => {
                  return (
                    <Option key={key} value={e.id}>
                      {e.id}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col>
              <Select
                showSearch
                style={{ width: '180px' }}
                placeholder="Exam"
                optionFilterProp="children"
                onChange={handleExam}
              >
                {exam.map((e, key) => {
                  return (
                    <Option key={e.title} value={e._id}>
                      {e.title}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            <Col>
              <Select
                showSearch
                style={{ width: '180px' }}
                placeholder="Section"
                optionFilterProp="children"
                onChange={handleSubject}
              >
                {clas.map((e, key) => {
                  return (
                    <Option key={e.name} value={e._id}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            </Col>
          </Row>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Cards headless>
            <CustomTable col={columns} pagination={false} data={data} />
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
};

export default SchoolResult;
