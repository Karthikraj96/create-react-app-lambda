import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Space } from 'antd';
import { getSpeech, postSpeech, deleteSpeech, decodedata, AwsURL, addSpeech2 } from '../../api/api';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Main } from '../styled';
import CustomTable from '../fee/dashboard/Components/Table';
import Swal from 'sweetalert2';
import { faPencil, faDownload, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import SpeechModal from './speechModal';
import moment from 'moment';
const Speech = () => {
  let [record, setRecord] = useState(null);
  const handleDate2 = data => {
    let date = data.date;
    let da = moment(date).format('DD/MM/YYYY');
    return da;
  };
  let handleDownload = val => {
    if (val.audio) {
      let va = AwsURL + 'Speech/' + val.audio;
      window.open(va, '_blank');
    } else {
      Swal.fire({
        icon: 'error',
        title: 'No file Available',
      });
    }
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
      render: (text, record) => {
        if (record.audio) {
          let va = AwsURL + 'Speech/' + record.audio;
          return (<audio
            controls
            src={va}>
            Your browser does not support the
            <code>audio</code> element.
          </audio>)
        }
      },
      width: '10%',
      key: 'audio',
    },
    {
      title: 'Speech By',
      dataIndex: 'speechby',
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
  let [tokendata, setTokendata] = useState(null);
  let [data, setData] = useState([]);
  let [update, setUpdate] = useState(0);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    getSpeech().then(res => {
      setData(res.data);
    });
  }, [update]);

  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  let [date, setDate] = useState('');
  let [file, setFile] = useState(null);
  let [file2, setFile2] = useState(null);
  let [title, setTitle] = useState('');
  let [orgid, setOrgid] = useState('');
  let [id, setId] = useState('');
  let [speechby, setSpeechby] = useState('');
  const handleinsti = value => {
    setOrgid(value);
  };
  const handleFile = data => {
    setFile(data);
  };
  const handleDelete = data => {
    let data2 = {
      audio: data.audio,
      folder: 'Speech',
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
        deleteSpeech(data2)
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
    setId(data.id);
    setisCreateModalVisible2(!isCreateModalVisible2);
    setRecord(data);
    setDate(data.date);
    setTitle(data.title);
    setOrgid(data.organization_id);
    setSpeechby(data.speechby);
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
    setRecord(null)
  };
  const toggleCreate2 = () => {
    setisCreateModalVisible2(!isCreateModalVisible2);
    setRecord(null)
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
      bodyFormData.append('folder', 'Speech');
      bodyFormData.append('date', date);
      bodyFormData.append('file', file);
      bodyFormData.append('speechby', speechby);
      bodyFormData.append('title', title);
      bodyFormData.append('orgId', orgid);
      Swal.fire({
        icon: 'info',
        title: 'It Will Create  Speech',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          postSpeech(bodyFormData)
            .then(res => {
              setisCreateModalVisible(!isCreateModalVisible);
              setUpdate(update + 1);
              setRecord(null);
              setFile(null)
              setFile2(null)
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
    else {
      let data1234 = {
        'date': date,
        'speechby': speechby,
        'title': title,
        'orgId': orgid
      }
      Swal.fire({
        icon: 'info',
        title: 'It Will Create  Speech',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          addSpeech2(data1234)
            .then(res => {
              setisCreateModalVisible(!isCreateModalVisible);
              setUpdate(update + 1);
              setRecord(null);
              setFile(null)
              setFile2(null)
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
      bodyFormData.append('folder', 'Speech');
      bodyFormData.append('date', date);
      bodyFormData.append('file', file2);
      bodyFormData.append('speechby', speechby);
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
          postSpeech(bodyFormData)
            .then(res => {
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
              setisCreateModalVisible2(!isCreateModalVisible2);
              setUpdate(update + 1);
              setRecord(null);
              setFile(null)
              setFile2(null)
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
    else {
      let data1234 = {
        'date': date,
        'speechby': speechby,
        'title': title,
        'id': id,
        'orgId': orgid,
        'audio': record.audio,
      }
      Swal.fire({
        icon: 'info',
        title: 'It Will Update The Radio',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
      }).then(result => {
        if (result.isConfirmed) {
          addSpeech2(data1234)
            .then(res => {
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
              setisCreateModalVisible2(!isCreateModalVisible2);
              setUpdate(update + 1);
              setRecord(null);
              setFile(null)
              setFile2(null)
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
  return (
    <div>
      <PageHeader
        ghost
        title="Speech"
        buttons={[
          <div key="1" className="page-header-actions">
            <Button size="small" type="primary" onClick={toggleCreate}>
              <FeatherIcon icon="plus" size={14} />
              Add Speech
            </Button>
          </div>,
        ]}
      />
      <Main>
        <Row style={{ marginTop: 15 }}>
          <Col span={24} style={{ marginTop: 10 }}>
            <div className="site-card-border-less-wrapper" style={{ backgroundColor: 'white' }}>
              <CustomTable col={columns} data={data} />
            </div>
          </Col>
        </Row>
        {/* </div> */}
      </Main>
      <Modal
        destroyOnClose={true}
        title="New Speech"
        visible={isCreateModalVisible}
        onCancel={toggleCreate}
        footer={[
          <Button key="submit" onClick={handleUpload} type="primary">
            create
          </Button>,
        ]}
        width={'50%'}
      >
        <SpeechModal
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
        title="Update Speech"
        visible={isCreateModalVisible2}
        onCancel={toggleCreate2}
        footer={[
          <Button key="submit" onClick={handleUpload2} type="primary">
            Update
          </Button>,
        ]}
        width={'50%'}
      >
        <SpeechModal
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

export default Speech;
