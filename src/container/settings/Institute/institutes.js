import React, { useEffect, useState } from 'react';
import { Row, Col, Table } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Main } from '../../styled';
import { Space } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import Institute_details from './createInstituteDrawer';
import { getOrgId, decodedata } from '../../../api/api';
const Institutes = () => {
  let [org, setOrg] = useState([]);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  let [record, setRecord] = useState(null);
  let [update,setUpdate] = useState(0)
  useEffect(()=>{
    getOrgId().then(res =>{
      let dat = res.data
      if(decodedata.role_id === "1"){
        setOrg(dat)
      }
      else{
        dat.map(e =>{
          if(e.organization_id === decodedata.orgId){
           setOrg([e])
          }
        })
      }
    }).catch(e =>{
      console.log(e)
    })
  },[update])
  const columns = [
    {
      title: 'Organization ID',
      dataIndex: 'organization_id',
      key: 'organization_id',
    },
    {
      title: 'Institute Name',
      dataIndex: 'instituteName',
      key: 'name',
    },
    {
      title: 'Institute Type',
      dataIndex: 'instituteType',
      key: 'instituteType',
    },
    {
      title: 'Branch',
      dataIndex: 'branch',
      key: 'branch',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Contact',
      dataIndex: 'mobile',
      key: 'contact',
    },
    {
      title: 'Action',
      key: 'action',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => toggleCreateSurvey2(record)}
            style={{ fontSize: 15, color: 'green ' }}
          />
        </Space>
      ),
    },
  ];
  const toggleCreateSurvey2 = value => {
    setRecord(value);
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const handleOk = () => {
    setisCreateModalVisible(!isCreateModalVisible);
    setUpdate(update + 1);
  };
  const toggleCreateSurvey = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  return (
    <div>
      <PageHeader
        ghost
        title="Institute"
      />
      <Main>
        <Institute_details
          isVisible={isCreateModalVisible}
          record2={record}
          handleCancel={toggleCreateSurvey}
          handleOk={handleOk}
        />
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards headless>
              <Table columns={columns} dataSource={org} />
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Institutes;
