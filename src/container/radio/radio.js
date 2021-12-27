import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Select, Space, Table } from 'antd';
import { getRadio, postRadio, deleteRadio, decodedata, AwsURL, addRadio, editRadio,getOrgRadio } from '../../api/api';
import { PageHeader } from '../../components/page-headers/page-headers';
import { useSelector } from 'react-redux';
import { Button } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Main } from '../styled';
import Swal from 'sweetalert2';
import { faPencil, faTrash, faDownload, faStar } from '@fortawesome/pro-duotone-svg-icons';
import moment from 'moment';
import RadioModal from './radioModal';
const Radio = () => {
  let [tokendata, setTokendata] = useState(null);
  let org = useSelector(store => store.getOrgReducer);
  let [fav,setFav] = useState(0)
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  let [date, setDate] = useState('');
  let [file, setFile] = useState(null);
  let [file2, setFile2] = useState(null);
  let [title, setTitle] = useState('');
  let [record, setRecord] = useState(null);
  let [orgid, setOrgid] = useState(decodedata.orgId);
  let [id, setId] = useState('');
  let [speechby, setSpeechby] = useState('');
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  const handleDate2 = data => {
    let date = data.date;
    let da = moment(date).format('DD/MM/YYYY');
    return da;
  };
  const columns = [
    {
      title: 'Date',
      key: 'date',
      render: (text, record) => handleDate2(record),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Audio',
      // dataIndex: 'audio',
      render: (text, record) => {
        if (record.audio) {
          let va = AwsURL + 'radio/' + record.audio;
          return (
            <audio controls src={va}>
              Your browser does not support the
              <code>audio</code> element.
            </audio>
          );
        }
      },
      width: '10%',
      key: 'audio',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',

      render: (text, record) => (
        <Space size="middle">
          {/* {record.audio ? (
            <FontAwesomeIcon
              icon={faDownload}
              onClick={() => {
                handleDownload(record);
              }}
              style={{ fontSize: 15, color: 'blue ' }}
            />
          ) : (
            ''
          )} */}
          {/* faStar */
          record.wishList ? (
            <FontAwesomeIcon
              icon={faStar}
              onClick={() => {
                let data12 = record;
                data12.wishList = false;
                editRadio(data12)
                  .then(res => {
                    setUpdate(update + 1);
                    Swal.fire({
                      icon: 'success',
                      // title: 'Data Updated Successfully',
                    });
                  })
                  .catch(e => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Database Error Retry',
                    });
                  });
              }}
              style={{ fontSize: 15, color: 'gold ' }}
            />
          ) : (
            <FontAwesomeIcon
              icon={faStar}
              onClick={() => {
                let data12 = record;
                data12.wishList = true;
                editRadio(data12)
                  .then(res => {
                    setUpdate(update + 1);
                    Swal.fire({
                      icon: 'success',
                      // title: 'Data Updated Successfully',
                    });
                  })
                  .catch(e => {
                    Swal.fire({
                      icon: 'error',
                      title: 'Database Error Retry',
                    });
                  });
              }}
              style={{ fontSize: 15, color: 'black ' }}
            />
          )}
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => {
              handleUpdate(record);
            }}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => {
              handleDelete(record);
            }}
            style={{ fontSize: 15, color: 'red ' }}
          />
        </Space>
      ),
    },
  ];
  let [data, setData] = useState([]);
  let [update, setUpdate] = useState(0);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    if(fav ==0){
      getRadio(selectedOrg).then(res => {
        setData(res.data);
      }).catch(e=>{
        console.log(e)
      })
    }
    else{
      getOrgRadio(selectedOrg).then(res => {
        setData(res.data);
      }).catch(e=>{
        console.log(e)
      })
    }
   
  }, [update,fav]);

  const handleFav = value => {
    setFav(value)
  };
  const handleinsti = value => {
    setOrgid(value);
    setFav(0)
  };
  const handleFile = data => {
    setFile(data);
  };
  const handleDelete = data => {
    let data2 = {
      audio: data.audio,
      folder: 'radio',
      id: data.id,
    };
    Swal.fire({
      icon: 'error',
      title: 'Are you sure You want to delete this',
      text: 'It will Be Permanetly Deleted!!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        deleteRadio(data2)
          .then(res => {
            setUpdate(update + 1);
            Swal.fire({
              icon: 'success',
              title: 'Successfully Deleted',
            });
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
  const handleUpdate = data => {
    setisCreateModalVisible2(!isCreateModalVisible2);
    setRecord(data);
    setId(data.id);
    setDate(data.date);
    setTitle(data.title);
    setOrgid(data.organization_id);
    setSpeechby(data.description);
  };
  const handleFileRemove = () => {
    setFile(null);
  };
  const handleFile2 = data => {
    setFile2(data);
  };
  const handleDate = (date, dateString) => {
    setDate(date);
  };
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
    setRecord(null);
  };
  const toggleCreate2 = () => {
    setisCreateModalVisible2(!isCreateModalVisible2);
    setRecord(null);
  };
  const handleSpeech = value => {
    setSpeechby(value.target.value);
  };
  const handleTitle = value => {
    setTitle(value.target.value);
  };
  const handleUpload = () => {
    if (file) {
      let bodyFormData = new FormData();
      bodyFormData.append('folder', 'radio');
      bodyFormData.append('date', date);
      bodyFormData.append('file', file);
      bodyFormData.append('description', speechby);
      bodyFormData.append('title', title);
      bodyFormData.append('orgId', orgid);
      Swal.fire({
        icon: 'info',
        title: 'It Will Create  Radio',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          postRadio(bodyFormData)
            .then(res => {
              setisCreateModalVisible(!isCreateModalVisible);
              setUpdate(update + 1);
              setFile(null);
              setFile2(null);
              Swal.fire({
                icon: 'success',
                title: 'Data Created Successfully',
              });
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
              });
            });
        }
      });
    } else {
      let data1234 = {
        date: date,
        description: speechby,
        title: title,
        orgId: orgid,
      };
      Swal.fire({
        icon: 'info',
        title: 'It Will Create  Radio',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          addRadio(data1234)
            .then(res => {
              setisCreateModalVisible(!isCreateModalVisible);
              setUpdate(update + 1);
              setFile(null);
              setFile2(null);
              Swal.fire({
                icon: 'success',
                title: 'Data Created Successfully',
              });
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
  };
  const handleUpload2 = () => {
    if (file2) {
      let bodyFormData = new FormData();
      bodyFormData.append('folder', 'radio');
      bodyFormData.append('date', date);
      bodyFormData.append('file', file2);
      bodyFormData.append('description', speechby);
      bodyFormData.append('title', title);
      bodyFormData.append('id', id);
      bodyFormData.append('orgId', orgid);
      Swal.fire({
        icon: 'info',
        title: 'It Will Update The Radio',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          postRadio(bodyFormData)
            .then(res => {
              setisCreateModalVisible2(!isCreateModalVisible2);
              setUpdate(update + 1);
              setRecord(null);
              setFile(null);
              setFile2(null);
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
            })
            .catch(e => {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
              });
            });
        }
      });
    } else {
      let data1234 = {
        date: date,
        description: speechby,
        title: title,
        id: id,
        orgId: orgid,
        audio: record.audio,
      };
      Swal.fire({
        icon: 'info',
        title: 'It Will Update The Radio',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          addRadio(data1234)
            .then(res => {
              setisCreateModalVisible2(!isCreateModalVisible2);
              setUpdate(update + 1);
              setRecord(null);
              setFile(null);
              setFile2(null);
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
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
  };
  let handleDownload = val => {
    if (val.audio) {
      let va = AwsURL + 'radio/' + val.audio;
      window.open(va, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No file Available',
      });
    }
  };
  const handleInsti = value => {
    setselectedOrg(value);
  };
  return (
    <div>
      <PageHeader
        ghost
        title="Radio"
        buttons={[
          <div key="1" className="page-header-actions">
            {/* <span style={{ fontSize: 15 }}>Admin</span> */}
            <Button size="small" type="primary" onClick={toggleCreate}>
              <FeatherIcon icon="plus" size={14} />
              Add
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row style={{ marginTop: 15 }} justify='end'>
          {tokendata == '1' ? (
            <Col>
              <Select defaultValue={selectedOrg} onChange={handleInsti} style={{ width: 280 ,marginRight:'2%'}}>
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
          {/* handleFav */}
          <Col>
            <Select defaultValue={fav} onChange={handleFav} style={{ width: 280,marginLeft:'2%'}}>
              <Option value={0}>All</Option>
              <Option value={1}>Favourite</Option>
            </Select>
          </Col>
        </Row>
        <Row style={{ marginTop: 15 }}>
          <Col span={24} style={{ marginTop: 10 }}>
            <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
              <Table scroll={{ x: true }} pagination={{ defaultPageSize: 5 }} columns={columns} dataSource={data} />
            </div>
          </Col>
        </Row>
      </Main>
      <Modal
        destroyOnClose={true}
        title="New Radio"
        visible={isCreateModalVisible}
        onCancel={toggleCreate}
        footer={[
          <Button key="submit" onClick={handleUpload} type="primary">
            create
          </Button>,
        ]}
        width={'50%'}
      >
        <RadioModal
          handleDate={handleDate}
          handleInsti={handleinsti}
          handleSpeech={handleSpeech}
          handleTitle={handleTitle}
          handleFileRemove={handleFileRemove}
          handleFile={handleFile}
          tokendata={tokendata}
          record={record}
          setRecord={setRecord}
        />
      </Modal>
      <Modal
        destroyOnClose={true}
        title="Update Radio"
        visible={isCreateModalVisible2}
        onCancel={toggleCreate2}
        footer={[
          <Button key="submit" onClick={handleUpload2} type="primary">
            Update
          </Button>,
        ]}
        width={'50%'}
      >
        <RadioModal
          handleDate={handleDate}
          handleInsti={handleinsti}
          handleSpeech={handleSpeech}
          handleTitle={handleTitle}
          handleFileRemove={handleFileRemove}
          handleFile={handleFile2}
          tokendata={tokendata}
          record={record}
          setRecord={setRecord}
        />
      </Modal>
    </div>
  );
};

export default Radio;
