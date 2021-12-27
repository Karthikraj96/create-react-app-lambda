import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Avatar, Space } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { UserOutlined } from '@ant-design/icons';
import { Main } from '../styled';
import CustomTable from '../fee/dashboard/Components/Table';
import { decodedata, getClass, getStudentsLanguage, AwsURL, getGradeSubjects,editStudentDetail} from '../../api/api';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const { Option } = Select;
const LanguageAllocation = () => {
  let [tokendata, setTokendata] = useState(null);
  let [subject, setSubject] = useState([]);
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [selectedOrg, setselectedOrg] = useState(null);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [section, setSection] = useState([]);
  let [selectedSection, setSelectedSection] = useState(null);
  let [update, setUpdate] = useState(0);
  let [data, setData] = useState([]);
  useEffect(() => {
    setselectedOrg(decodedata.orgId);
    setTokendata(decodedata.role_id);
    if (selectedLevel) {
      let dat = { level: selectedLevel, id: selectedOrg };
      getClass(dat)
        .then(res => {
          setSection(res.data);
        })
        .catch(e => {
          console.log(e);
        });
      getGradeSubjects(selectedLevel)
        .then(res => {
          setSubject(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
    if (selectedSection) {
      getStudentsLanguage(selectedSection)
        .then(res => {
          setData(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    }
  }, [selectedLevel, selectedOrg, update, selectedSection]);
  let handleSection = val => {
    setSelectedSection(val);
  };
  let handleUpdate = (value,string,record)=>{
    record.language =  record.language? record.language:[]
    if(string === '0'){
      record.language[0] = value
    }
    else{
      record.language[0] = (record.language[0]?record.language[0]:null),
      record.language[1] = value
    }
    editStudentDetail(record).then(res=>{
      Swal.fire({
        icon:'success',
        title:'Request Success'
      })
      setUpdate(update+1)
    }).catch(e=>{
      Swal.fire({
        icon:'error',
        title:'Databse Error'
      })
    })
  }
  const onOrgChange = value => {
    setselectedOrg(value);
    setselectedLevel(null);
    setSelectedSection(null);
    setData([]);
  };
  const onGradeChange = value => {
    setselectedLevel(value);
    setSelectedSection(null);
    setData([]);
  };
  const columns = [
    {
      title: 'Student',
      // dataIndex: 'image',
      render: (text, record) => {
        if (record.image) {
          let url = AwsURL + 'profile/' + record.image;
          // return <Avatar size="default" src={url} />
          return <Avatar size="default" icon={<UserOutlined />} />;
        } else {
          return <Avatar size="default" icon={<UserOutlined />} />;
        }
      },
      key: 'date',
      // width:'15%'
    },
    {
      title: 'Roll No',
      dataIndex: 'roll_number',
      key: 'rollno',
    },
    // admission_number
    {
      title: 'Student Name',
      render: (text, record) => record.first_name + ' ' + record.last_name,
      key: 'contest',
    },
    {
      title: 'L2',
      render: (text, record) => {
        if (record.language) {
          if (record.language.length > 0) {
            return (
              <Select
                value={record.language[0]}
                onChange={value => {
                  handleUpdate(value, '0', record);
                }}
                allowClear
                placeholder="Select Subject"
                style={{ width: '100%' }}
              >
                {subject.map((e, key) => {
                  return (
                    <Option key={key} value={e.name}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            );
          }
          else {
            return (
              <Select
                onChange={value => {
                  handleUpdate(value, '0', record);
                }}
                allowClear
                placeholder="Select Subject"
                style={{ width: '100%' }}
              >
                {subject.map((e, key) => {
                  return (
                    <Option key={key} value={e.name}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            );
          }
        } else {
          return (
            <Select
              allowClear
              onChange={value => {
                handleUpdate(value, '0', record);
              }}
              placeholder="Select Subject"
              style={{ width: '100%' }}
            >
              {subject.map((e, key) => {
                return (
                  <Option key={key} value={e.name}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
          );
        }
      },
      key: 'grade',
    },
    {
      title: 'L3',
      render: (text, record) => {
        if (record.language) {
          if (record.language.length > 1) {
            return (
              <Select
                value={record.language[1]}
                onChange={value => {
                  handleUpdate(value, '1', record);
                }}
                allowClear
                placeholder="Select Subject"
                style={{ width: '100%' }}
              >
                {subject.map((e, key) => {
                  return (
                    <Option key={key} value={e.name}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            );
          }else {
            return (
              <Select
                onChange={value => {
                  handleUpdate(value, '1', record);
                }}
                allowClear
                placeholder="Select Subject"
                style={{ width: '100%' }}
              >
                {subject.map((e, key) => {
                  return (
                    <Option key={key} value={e.name}>
                      {e.name}
                    </Option>
                  );
                })}
              </Select>
            );
          }
        } else {
          return (
            <Select
            onChange={value => {
              handleUpdate(value, '1', record);
            }}
              allowClear
              placeholder="Select Subject"
              style={{ width: '100%' }}
            >
              {subject.map((e, key) => {
                return (
                  <Option key={key} value={e.name}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
          );
        }
      },
      key: 'amount',
    },
  ];
  return (
    <div>
      <PageHeader
        ghost
        buttons={
          [
            //   <Button size="small" onClick={toggleCreate} type="primary">
            //     <FeatherIcon icon="plus" size={15} />
            //     Allocate
            //   </Button>,
          ]
        }
        title="Language Allocation"
      />
      <Main>
        {/* <TimetableModal isVisible={isCreateModalVisible} handleOk={toggleCreate} handleCancel={toggleCreate} /> */}
        <Row gutter={20} style={{ marginBottom: '2%' }} justify="end">
          {tokendata == '1' ? (
            <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
              <Select
                showSearch
                size={'middle'}
                style={{ width: '100%', marginRight: '20px' }}
                placeholder="Select Institute"
                defaultValue={selectedOrg}
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
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
            <Select
              size={'middle'}
              showSearch
              style={{ width: '100%' }}
              placeholder="Select Class"
              value={selectedLevel}
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
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6}>
            <Select
              placeholder="Select Section"
              value={selectedSection}
              onChange={handleSection}
              style={{ width: '100%' }}
            >
              {section.map((g, i) => {
                return (
                  <Option key={i} value={g._id}>
                    {g.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
          {/* <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6} >
          <Search placeholder="Enter the subject" style={{ width: '100%' }} size="small" />
          </Col> */}
        </Row>

        <Row gutter={24}>
          <Col span={24}>
            <Cards headless>
              <CustomTable col={columns} data={data} pagination={false} />
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default LanguageAllocation;
