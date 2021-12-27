import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Space } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Main } from '../styled';
import Swal from 'sweetalert2';
import { decodedata, getClass, getTeacherSectionAllocation, addAllocation2, deleteAllocation,addTimetable,getTimetable } from '../../api/api';
import CustomTable from '../fee/dashboard/Components/Table';
import { faPencil, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import TimetableModal from './timeTableModal';
import { useSelector } from 'react-redux';
const { Option } = Select;

const Timetable = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  let [update, setUpdate] = useState(0);
  let [allocation, setAllocation] = useState([]);
  let [data, setData] = useState([
    {
      day: 'MON',
      key: 0,
    },
    {
      day: 'TUE',
      key: 1,
    },
    {
      day: 'WED',
      key: 2,
    },
    {
      day: 'THU',
      key: 3,
    },
    {
      day: 'FRI',
      key: 4,
    },
    {
      day: 'SAT',
      key: 5,
    },
  ]);
  let [section, setSection] = useState([]);
  let [selectedSection, setSelectedSection] = useState(null);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [tokendata, setTokendata] = useState(null);
  let [selectedOrg, setSelectedOrg] = useState(1);
  let [selectedGrade, setSelectedGrade] = useState(null);
  useEffect(() => {}, [allocation]);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let dat = { level: selectedGrade, id: selectedOrg };
    getClass(dat)
      .then(res => {
        setSection(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [update, selectedGrade]);
  let handleSection = value => {
    setSelectedSection(value);
    let dat = {
      section_id: value,
      orgId: selectedOrg,
    };
    getTeacherSectionAllocation(dat)
      .then(res => {
        setAllocation(res.data);
        setUpdate(update + 1);
      })
      .catch(e => {
        console.log(e);
      });
  };
  useEffect(()=>{
    if(selectedSection){
      let dat = {section_id:selectedSection}
      getTimetable(dat).then(res=>{
        setData(res.data)
      }).catch(e=>{
        console.log(e)
      })
    }
  },[selectedSection,update])
  let val = (string, record, text) => {
    return (
      <Select
        onChange={(value, e) => {
          handleSub(string, record, value, e);
        }}
        value={record[string]?record[string].subject_name:null}
        placeholder="subject"
        style={{ width: '100%' }}
      >
        {allocation.map((g, i) => {
          return (
            <Option key={Math.floor(Math.random() * 500)} value={i}>
              {g.subject_name + ','+ g.teacher_name}
            </Option>
          );
        })}
      </Select>
    );
  };
  let handleAllocationDelete = dat => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure You want to delete this',
      text: 'It will Be Permanetly Deleted!!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        deleteAllocation(dat)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
              Swal.fire({
                icon: 'success',
                title: 'Successfully Deleted The Schedule',
              });
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
  let handleAllocation = dat => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure You want to Save / Update this',
      showCancelButton: true,
      confirmButtonText: 'Save/Update',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        addAllocation2(dat)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
              toggleCreate();
              Swal.fire({
                icon: 'success',
                title: 'Successfully Create / Update The Allocation',
              });
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
  let handleSub = (string, record, value, e) => {
    let key = record.key
    let arr = {}
    if(data[key][string]){
      if(data[key][string].id){
        arr.id = data[key][string].id
        arr._id = data[key][string]._id
      }
    }
    arr.day = record.day
    arr.teacher_name=allocation[value].teacher_name
    arr.subject_name=allocation[value].subject_name
    arr.hour=string
    arr.grade_id=selectedGrade
    arr.section_id=selectedSection
    arr.subject_id=allocation[value].subject_id
    arr.teacher_id=allocation[value].teacher_id
    arr.allocation_id= allocation[value]._id
    arr.organization_id= selectedOrg
    let array = data[key]
    array[string] = arr
    console.log("array",array)
    setData([...data.slice(0, key), array, ...data.slice(key + 1)]);
    array=null,arr=null
  };
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };

  const columns = [
    {
      title: "DAY",
      dataIndex: 'day',
      key: 'date',
    },
    {
      title: '1',
      // dataIndex: 'one',
      render: (text, record) => {
        // if(record[1]){
        //   return record[1].subject_name
        // }
        // else{
          return val('1', text, record);
        // }
      },
      key: 'contesttype',
      width: '10%',
      key: 'amount1',
    },
    {
      title: '2',
      // dataIndex: 'one',
      render: (text, record) => {
        // if(record[2]){
        //   return record[2].subject_name
        // }
        // else{
          return val('2', text, record);
        // }
      },
      key: 'contest',
      width: '10%',
      key: 'amount2',
    },
    {
      title: '3',
      // dataIndex: 'one',
      render: (text, record) => {
        // if(record[3]){
        //   return record[3].subject_name
        // }
        // else{
          return val('3', text, record);
        // }
      },
      key: 'grade',
      width: '10%',
      key: 'amount3',
    },
    {
      title: '4',
      // dataIndex: 'one',
      render: (text, record) => {
        // if(record[4]){
        //   return record[4].subject_name
        // }
        // else{
          return val('4', text, record);
        // }
      },
      key: 'amount5',
    },
    {
      title: '5',
      // dataIndex: 'one',
      render: (text, record) => {
        // if(record[5]){
        //   return record[5].subject_name
        // }
        // else{
          return val('5', text, record);
        // }
      },
      key: 'amount10',
    },
    {
      title: '6',
      // dataIndex: 'one',
      render: (text, record) => {
        // if(record[6]){
        //   return record[6].subject_name
        // }
        // else{
          return val('6', text, record);
        // }
      },
      key: 'amount9',
    },
    {
      title: '7',
      // dataIndex: 'one',
      render: (text, record) => {
        // if(record[7]){
        //   return record[7].subject_name
        // }
        // else{
          return val('7', text, record);
        // }
      },
      key: 'amount7',
    },
    {
      title: '8',
      // dataIndex: 'one',
      render: (text, record) => {
        // if(record[8]){
        //   return record[8].subject_name
        // }
        // else{
          return val('8', text, record);
        // }
      },
      key: 'amount8',
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   width: '20%',

    //   render: (text, record) => (
    //     <Space size="middle">
    //       {/* <FontAwesomeIcon icon={faTrophyAlt} style={{ fontSize: 15, color: 'gold ' }} /> */}
    //       {/* <FontAwesomeIcon icon={faPencil} style={{ fontSize: 15, color: 'green ' }} /> */}
    //       {/* <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} /> */}
    //     </Space>
    //   ),
    // },
  ];
  // const data = ;
  const onGradeChange = value => {
    setSelectedGrade(value);
  };
  const onOrgChange = value => {
    setSelectedOrg(value);
  };
  let handleSubmit =(dat) =>{
    let val = []
    dat.map((e,key)=>{
      for(let i=1;i<=8;i++){
        if(e[i]){
          val.push(e[i])
        }
      }
    })
    Swal.fire({
      icon: 'info',
      title: 'Are you sure You want to Save / Update this',
      showCancelButton: true,
      confirmButtonText: 'Save/Update',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        addTimetable(val)
          .then(res => {
            if (res) {
              setUpdate(update + 1);
              Swal.fire({
                icon: 'success',
                title: 'Successfully Create / Update The TimeTable',
              });
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
  }
  return (
    <div>
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCreate} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Allocate
          </Button>,
        ]}
        title="TimeTable"
       
      />
      <Main>
        <TimetableModal
          isVisible={isCreateModalVisible}
          tokendata={tokendata}
          handleOk={toggleCreate}
          handleCancel={toggleCreate}
          record={allocation}
          selectedSection1={selectedSection}
          selectedGrade1={selectedGrade}
          selectedOrg1={selectedOrg}
          handleAllocation={handleAllocation}
          handleAllocationDelete={handleAllocationDelete}
        />
        <Row key={1234554} justify="end">
          {tokendata == '1' ? (
            <Col style={{ margin: '1%' }} key={123554} xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
              <Select
                size={'middle'}
                style={{ width: '100%' }}
                placeholder="Select Institute"
                // value={}
                key={200}
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
          <Col style={{ margin: '1%' }} xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
            <Select
              size={'middle'}
              style={{ width: '100%' }}
              placeholder="Select Class"
              // defaultValue={selectedGrade}
              key={100}
              onChange={onGradeChange}
            >
              {grade.map((g, i) => {
                return (
                  <Option key={12554 + i} value={g.id}>
                    {g.id}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col style={{ margin: '1%' }} xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
            <Select
              size={'middle'}
              key={210}
              placeholder="Select Section"
              onChange={handleSection}
              style={{ width: '100%' }}
            >
              {section.map((g, i) => {
                return (
                  <Option key={12455725 + i} value={g._id}>
                    {g.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>

        <Cards headless style={{ margin: 1 }}>
          {allocation.length >= 1 ? (
            <div key={1110} style={{ textAlign: 'right' }}>
              <FontAwesomeIcon
                key={110}
                icon={faPencil}
                style={{ fontSize: 15, color: 'green ' }}
                onClick={toggleCreate}
              />
              <br />
            </div>
          ) : (
            ''
          )}
          <Row key={1410} gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }} style={{ margin: 1, padding: '1%' }}>
            {allocation.length > 0 ? (
              allocation.map((e, key) => {
                return (
                  <>
                    <Col className="gutter-row" span={6}>
                      <div>
                        <span key={key + 30}>{e.subject_name}</span> &nbsp;{' '}
                        <span key={key + 325}><strong>{e.teacher_name}</strong></span>
                      </div>
                    </Col>
                  </>
                );
              })
            ) : selectedSection ? (
              <p>First Allocate The Teacher to view </p>
            ) : (
              <p>First Select The Section to view </p>
            )}
          </Row>
        </Cards>

        <Row gutter={24}>
          <Col span={24}>
            <Cards headless>
              <CustomTable col={columns} pagination={false} data={data} />
            </Cards>
          </Col>
        </Row>
        <Row  justify="end">
        <Button key="submit" onClick={()=>{handleSubmit(data)}}  type="primary">
            Create / Update Timetable
          </Button>
        </Row>
      </Main>
    </div>
  );
};

export default Timetable;
