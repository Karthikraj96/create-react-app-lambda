import React, { useEffect, useState } from 'react';
import { Row, Spin, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import CreateAnnouncement from './createAnnouncementModal';
import UpdateAnnouncement from './Update';
import {
  decodedata,
  getAnnoucement,
  deleteAnnoucement,
  createAnnoucement,
  deleteDocument2,
  AwsURL,
} from '../../api/api';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Select } from 'antd';
import { Card, Space } from 'antd';
import moment from 'moment';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { faPencil, faTrash, faDownload,faClock } from '@fortawesome/pro-duotone-svg-icons';
import './index.css';
import { useSelector } from 'react-redux';
const { Option } = Select;
function Announcements() {
  let [data, setData] = useState([]);
  let [tokendata, setTokendata] = useState(null);
  let [secinsti, setSecinsti] = useState([]);
  let [seclevel, setSeclevel] = useState([]);
  let [secdate, setSecdate] = useState('');
  let [sectitle, setSectitle] = useState('');
  let [announce, setAnnounce] = useState('');
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [file, setFile] = useState(null);
  let [file2, setFile2] = useState(null);
  let [update, setUpdate] = useState(0);
  let [load, setLoad] = useState(true);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [record2, setRecord] = useState(null);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let data = {
      orgId: selectedOrg,
      grade_id: selectedLevel,
    };
    getAnnoucement(data)
      .then(res => {
        setData(res.data);
        setLoad(false);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg, selectedLevel, update]);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleCreate3 = (setrec, sta) => {
    setisCreateModalVisible2(!isCreateModalVisible2);
    setrec(null);
    sta({ FileList: [] });
  };
  const toggleCreate2 = data => {
    setRecord(data);
    setisCreateModalVisible2(!isCreateModalVisible2);
  };
  const handleFile = data => {
    setFile(data);
  };
  const handleDownload = value => {
    if (value.filename) {
      let va = AwsURL + 'announcement/' + value.filename;
      window.open(va, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No file Available',
      });
    }
  };
  const handleDate = (date, dateString) => {
    setSecdate(date);
  };
  const handleFile2 = data => {
    setFile2(data);
  };
  const handleInsti2 = value => {
    setSecinsti(value);
  };
  const handleannounce = e => {
    setAnnounce(e.target.value);
  };
  const handleTitle = e => {
    setSectitle(e.target.value);
  };
  const handleLevel = value => {
    setSeclevel(value);
    console.log(value);
  };
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleGrade = value => {
    setselectedLevel(value);
  };
  const handleFileRemove = () => {
    setFile(null);
  };
  const handleFileRemove2 = () => {
    setFile2(null);
  };
  const handleDelete = data2 => {
    let dataa = {
      folder: 'announce',
      audio: data2.filename,
      id: data2.id,
    };
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Delete this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed === true) {
        deleteAnnoucement(dataa)
          .then(response => {
            setUpdate(update + 1);
            console.log('gjdsnjbn', response);
            Swal.fire({
              icon: 'success',
              title: 'Data Deleted Succesfully',
            });
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      }
    });
  };
  const handleOk = () => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to save this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        let bodyFormData = new FormData();
        bodyFormData.append('folder', 'announce');
        bodyFormData.append('date', secdate);
        bodyFormData.append('file', file);
        bodyFormData.append('announce', announce);
        bodyFormData.append('title', sectitle);
        bodyFormData.append('grade_id', seclevel);
        bodyFormData.append('organization_id', secinsti);
        createAnnoucement(bodyFormData)
          .then(response => {
            setisCreateModalVisible(!isCreateModalVisible);
            setUpdate(update + 1);
            Swal.fire({
              icon: 'success',
              title: 'Data Created Succefully',
            });
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      }
    });
  };
  const handleOk2 = (data14, rec, sta) => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Update this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        let bodyFormData = new FormData();
        bodyFormData.append('folder', 'announce');
        bodyFormData.append('id', data14.id);
        bodyFormData.append('date', data14.date);
        bodyFormData.append('file', file2);
        bodyFormData.append('announce', data14.announce);
        bodyFormData.append('title', data14.title);
        bodyFormData.append('grade_id', data14.grade_id);
        bodyFormData.append('organization_id', data14.organization_id);
        createAnnoucement(bodyFormData)
          .then(response => {
            setisCreateModalVisible2(!isCreateModalVisible2);
            setUpdate(update + 1);
            rec(null);
            sta({ FileList: [] });
            Swal.fire({
              icon: 'success',
              title: 'Data Updated Succefully',
            });
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      }
    });
  };
  return (
    <div>
      <PageHeader
        ghost
        title="Announcements"
        buttons={[
          <div key="1" className="page-header-actions">
            <Row>
              {tokendata == '1' ? (
                <Col>
                  <Select
                    showSearch
                    style={{ width: '200px', marginRight: '15px', marginTop: '5px' }}
                    placeholder="Everwin Vidhyashram"
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
                  style={{ width: '200px', marginRight: '15px', marginTop: '5px' }}
                  placeholder="LKG"
                  optionFilterProp="children"
                  onChange={handleGrade}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
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

              <Col style={{ width: '100px', marginRight: '15px' }}>
                <Button size="large" onClick={toggleCreate} type="primary">
                  <FeatherIcon icon="plus" size={15} />
                  Create
                </Button>
              </Col>
            </Row>
          </div>,
        ]}
      />
      <CreateAnnouncement
        isVisible={isCreateModalVisible}
        handleCancel={toggleCreate}
        handleOk={handleOk}
        tokendata={tokendata}
        handleLevel={handleLevel}
        handleFile={handleFile}
        handleFileRemove={handleFileRemove}
        handleInsti2={handleInsti2}
        handleTitle={handleTitle}
        handleDate={handleDate}
        handleannounce={handleannounce}
      />
      <UpdateAnnouncement
        setRecord2={setRecord}
        isVisible={isCreateModalVisible2}
        handleCancel={() => setisCreateModalVisible2(!isCreateModalVisible2)}
        handleOk={handleOk2}
        tokendata={tokendata}
        handleLevel={handleLevel}
        handleFile={handleFile2}
        handleFileRemove={handleFileRemove2}
        handleInsti2={handleInsti2}
        handleTitle={handleTitle}
        handleDate={handleDate}
        handleannounce={handleannounce}
        record2={record2}
      />
      <Main>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Card title="Latest Announcements">
              {load ? (
                <>
                  <Spin></Spin>
                </>
              ) : data.length > 0 ? (
                data.map(data => {
                  return (
                    <>
                      <Card
                        type="inner"
                        title={data.title}
                        extra={
                          <Space size="middle">
                            {data.filename?data.filename.length>0 ? (
                              <FontAwesomeIcon
                                icon={faDownload}
                                onClick={() => handleDownload(data)}
                                style={{ fontSize: 15, color: 'Dodgerblue ' }}
                              />
                            ) : (
                              ''
                            ):('')}

                            <FontAwesomeIcon
                              icon={faPencil}
                              onClick={() => toggleCreate2(data)}
                              style={{ fontSize: 15, color: 'green ' }}
                            />
                            <FontAwesomeIcon
                              icon={faTrash}
                              onClick={() => handleDelete(data)}
                              style={{ fontSize: 15, color: 'red ' }}
                            />
                          </Space>
                        }
                      >
                        <>
                          {data.announce}
                          <br />
                        </>
                       <strong>Created By {data.teacher.length > 0 ? <>{data.teacher[0].first_name}</> : <>{'Admin'}</>}</strong>  |{' '}
                        <span style={{color:'#C3272B'}}>   <FontAwesomeIcon
                              icon={faClock}
                              style={{ fontSize: 15, color: '#C3272B ' }}
                            />&nbsp;{moment(data.date).format('DD/MM/YYYY')}</span>
                      </Card>
                      <br />
                    </>
                  );
                })
              ) : (
                <h3> No Announcement Found</h3>
              )}
            </Card>
          </Col>
        </Row>
      </Main>
    </div>
  );
}

export default Announcements;
