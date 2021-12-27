import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Row, Col} from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Select } from 'antd';
import {  Space } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPencil,
  faTrash,
  faEye,
  faPaperclip,
} from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import CreateSurveyModal from './createSurveyModal';
import CreateSurveyModal2 from './surveyCreate';
import CreateSurveyModal3 from './updateSurvey';
import { decodedata,createSurvey,getSurvey,PostSurveyQuestions,deleteSurvey} from '../../api/api';
import Swal from 'sweetalert2';
import moment from 'moment';
const { Option } = Select;
function NewSurvey() {
  let [id, setId] = useState(null);
  let [id2, setId2] = useState(null);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  const [isCreateModalVisible3, setisCreateModalVisible3] = useState(false);
  let [tokendata, setTokendata] = useState(null);
  let org = useSelector(store => store.getOrgReducer);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedType, setselectedType] = useState(null);
  let [selectedOrg2, setselectedOrg2] = useState(decodedata.orgId);
  let [selectedType2, setselectedType2] = useState(null);
  let [title, setTitle] = useState(null);
  let [update, setUpdate] = useState(0);
  let [selectedDate, setselectedDate] = useState(null);
  let [data, setData] = useState([]);
  let [record2,setRecord] = useState(null)
  useEffect(() => { 
    setTokendata(decodedata.role_id);
    let dat = {
      type:selectedType,
      orgId:selectedOrg
    }
    getSurvey(dat).then(res=>{
      setData(res.data)
    }).catch(e=>{
     console.log(e)
    })
  }, [selectedOrg, selectedType, update]);
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleType = value => {
    setselectedType(value);
  };
  const handleInsti2 = value => {
    setselectedOrg2(value);
  };
  const handleType2 = value => {
    setselectedType2(value);
  };
  const handleTitle = e => {
    setTitle(e.target.value);
  };
  const handleDate = data => {
    let date = data.entry_date;
    let da = moment(date).format('DD/MM/YYYY');
    return da;
  };
  const handleDate2 = (date, dateString) => {
    setselectedDate(date);
  };
  let handleDelete = data5 => {
      Swal.fire({
        icon: 'info',
        title: 'Are you sure You want to delete this',
        text: 'It will Be Permanetly Deleted!!',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result.isConfirmed) {
          deleteSurvey(data5.id)
            .then(res => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  title: 'Successfully Deleted',
                });
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
  const columns = [
    {
      title: 'Date',
      key: 'date',
      render: (text, record) => handleDate(record),
    },
    {
      title: 'Survey Name',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon onClick={()=>toggleCreateSurvey2(record)}icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
          <FontAwesomeIcon icon={faPencil} onClick={()=>handleUpdate(record)}style={{ fontSize: 15, color: 'green ' }} />
          <FontAwesomeIcon icon={faTrash}   onClick={() => handleDelete(record)} style={{ fontSize: 15, color: 'red ' }} />
          <FontAwesomeIcon icon={faPaperclip} style={{ fontSize: 15, color: 'gray ' }} />
        </Space>
      ),
    },
  ];
  const handleUpdate = (dat) =>{
    console.log("record",dat)
    setRecord(dat)
    setId2(dat._id)
    setisCreateModalVisible3(!isCreateModalVisible3)
  }
  const handleOk3 = (data13) => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update the Survey',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        createSurvey(data13)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
              setisCreateModalVisible3(!isCreateModalVisible3);
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
  const handleOk = () => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Create the Survey',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        let da = {
          title: title,
          orgId: selectedOrg2,
          type: selectedType2,
          entry_date:selectedDate
        };
        createSurvey(da)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Data Created Successfully',
              });
              setisCreateModalVisible(!isCreateModalVisible);
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
  const handleOk2 = (da) => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Post the Survey Questions',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        PostSurveyQuestions(da)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Survey Created Successfully',
              });
              setisCreateModalVisible2(!isCreateModalVisible2);
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
  const toggleCreateSurvey = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleCreateSurvey3 = () => {
    setisCreateModalVisible3(!isCreateModalVisible3);
  };
  const toggleCreateSurvey2 = (dat) => {
    if(dat.question_is){
      Swal.fire({
        icon:'error',
        title:'Already Questions Created'
      })
    }
    else{
      setId(dat._id)
      setisCreateModalVisible2(!isCreateModalVisible2);
    }
  };
  return (
    <div>
      <PageHeader
        ghost
        title="Create Survey"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small"style={{marginRight: '15px' }} onClick={toggleCreateSurvey} type="primary">
              <FeatherIcon icon="plus" size={14} />
              Create
            </Button>
          </div>,
        ]}
      />
      <Main>
        <CreateSurveyModal
          isVisible={isCreateModalVisible}
          handleOk={handleOk}
          handleCancel={toggleCreateSurvey}
          tokendata={tokendata}
          handleType2={handleType2}
          handleInsti2={handleInsti2}
          handleTitle={handleTitle}
          org={org}
          handleDate={handleDate2}
            record2={record2}
        />
         <CreateSurveyModal3
          isVisible={isCreateModalVisible3}
          handleOk={handleOk3}
          handleCancel={toggleCreateSurvey3}
          tokendata={tokendata}
          handleType2={handleType2}
          handleInsti2={handleInsti2}
          handleTitle={handleTitle}
          org={org}
          handleDate={handleDate2}
          record2={record2}
        />
        <CreateSurveyModal2
          isVisible={isCreateModalVisible2}
          handleOk={handleOk2}
          handleCancel={toggleCreateSurvey2}
          id={id}
        />
        <Row justify="end">
        {tokendata == '1' ? (
            <Col span={6} style={{ marginBottom: '15px',marginRight: '15px' }}>
              <Select
                style={{ width: '100%' }}
                placeholder="Institute"
                optionFilterProp="children"
                onChange={handleInsti}
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
            '  '
          )}
           <Col span={6} style={{ marginBottom: '15px',marginRight: '15px' }}>
            <Select placeholder="Type" onChange={handleType}  style={{ width: '100%' }}>
                  <Option key='0' value='Parent' > Parent  </Option>
                  <Option key='1'  value='Teacher' >  Teacher </Option>
            </Select>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Cards headless>
              <CustomTable col={columns} data={data} />
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
}

export default NewSurvey;
