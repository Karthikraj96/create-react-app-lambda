import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Fragment } from 'react';
import { Space } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import { decodedata, createDocument, getDocument, deleteDocument, AwsURL, createDocument1, editDocument } from '../../api/api';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import { faDownload, faPencil, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
import './style.css';
import moment from 'moment';
import DocumentsModal from './documentsModal';
import DocumentsModal2 from './documentsModalUpdate';
import { useSelector } from 'react-redux';
const { Option } = Select;

function Documents() {
  let [id, setId] = useState(null);
  let [tokendata, setTokendata] = useState(null);
  let [secinsti, setSecinsti] = useState([]);
  let [seclevel, setSeclevel] = useState('');
  let [secdate, setSecdate] = useState('');
  let [sectitle, setSectitle] = useState('');
  let [secnote, setSecnote] = useState('');
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  let [file, setFile] = useState(null);
  let [file2, setFile2] = useState(null);
  let [update, setUpdate] = useState(0);
  let [selectedOrg, setselectedOrg] = useState(null);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [data, setData] = useState([]);
  const handleFile = data => {
    setFile(data);
  };
  const handleDate2 = data => {
    let date = data.entry_date;
    let da = moment(date).format('DD/MM/YYYY');
    return (
      <span>{da}</span>
    );
  };
  const handleDownload = value => {
    if (value) {
      let va = AwsURL + 'doc/' + value;
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
  const handlenote = e => {
    setSecnote(e.target.value);
  };
  const handleTitle = e => {
    setSectitle(e.target.value);
  };
  const handleLevel = value => {
    setSeclevel(value);
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
  const handleOk = () => {
    if (file) {
      Swal.fire({
        icon: 'info',
        title: 'Are You Sure You want to save this',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          let bodyFormData = new FormData();
          bodyFormData.append('folder', 'doc');
          bodyFormData.append('entry_date', secdate);
          bodyFormData.append('file', file);
          bodyFormData.append('note', secnote);
          bodyFormData.append('title', sectitle);
          bodyFormData.append('grade_id', seclevel);
          bodyFormData.append('organization_id', secinsti);
          return createDocument(bodyFormData)
            .then(response => {
              setisVisible(false);
              setUpdate(update + 1);
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
      }).then(result => {
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Data Saved Succesfully',
          });
        }
      });
    }
    else {
      Swal.fire({
        icon: 'info',
        title: 'Are You Sure You want to save this',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          let data1234 = {
            entry_date: secdate,
            note: secnote,
            title: sectitle,
            grade_id: seclevel,
            organization_id: secinsti,
          }
          return createDocument1(data1234)
            .then(response => {
              setisVisible(false);
              setUpdate(update + 1);
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
      }).then(result => {
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Data Saved Succesfully',
          });
        }
      });
    }
  };
  const handleOk2 = val => {
    if (file2) {
      Swal.fire({
        icon: 'info',
        title: 'Are You Sure ',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          let bodyFormData = new FormData();
          bodyFormData.append('id', val._id);
          bodyFormData.append('folder', 'doc');
          bodyFormData.append('entry_date', val.entry_date);
          bodyFormData.append('file', file2);
          bodyFormData.append('note', val.note);
          bodyFormData.append('title', val.title);
          bodyFormData.append('grade_id', val.grade_id);
          bodyFormData.append('organization_id', val.organization_id);
          return createDocument(bodyFormData)
            .then(response => {
              setisVisible2(false);
              setUpdate(update + 1);
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
      }).then(result => {
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Data Updated Succesfully',
          });
        }
      });
    }
    else {
      Swal.fire({
        icon: 'info',
        title: 'Are You Sure ',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'No',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          return editDocument(val)
            .then(response => {
              setisVisible2(false);
              setUpdate(update + 1);
            })
            .catch(error => {
              Swal.showValidationMessage(`Request failed: ${error}`);
            });
        },
      }).then(result => {
        if (result) {
          Swal.fire({
            icon: 'success',
            title: 'Data Updated Succesfully',
          });
        }
      });
    }
  };
  const handleCancel = () => {
    setisVisible(false);
  };
  const handleDelete = data => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Delete this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let dataa = {
          folder: 'document',
          audio: data.filename,
          id: data.id,
        };
        return deleteDocument(dataa)
          .then(response => {
            setUpdate(update + 1);
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
    }).then(result => {
      if (result.isConfirmed === true) {
        Swal.fire({
          icon: 'success',
          title: 'Data Deleted Succesfully',
        });
      }
    });
  };
  const handleClickEdit = data => {
    setisVisible2(true);
    setId(data);
  };
  useEffect(() => {
    setselectedOrg(decodedata.orgId);
    setTokendata(decodedata.role_id);
    let data = {
      organization_id: selectedOrg,
      grade_id: selectedLevel,
    };
    getDocument(data)
      .then(response => {
        setData(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedLevel, selectedOrg, update]);
  const [isVisible, setisVisible] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
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
      title: 'Level',
      dataIndex: 'grade_id',
      key: 'level',
    },
    {
      title: 'Note',
      // dataIndex: 'note',
      render:(text,record)=> <strong>{record.note}</strong>,
      key: 'note',
    },

    {
      title: 'Files',
      key: 'filename',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          {record.filename ? record.filename.length > 0 ? (
            <FontAwesomeIcon
              icon={faDownload}
              onClick={() => handleDownload(record.filename)}
              style={{ fontSize: 15, color: 'green' }}
            />
          ) : null : null}

          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => handleClickEdit(record)}
            style={{ fontSize: 15, color: 'blue ' }}
          />
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(record)}
            style={{ fontSize: 15, color: 'red ' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <Fragment>
      <DocumentsModal
        isVisible={isVisible}
        handleOk={handleOk}
        handleCancel={handleCancel}
        handleFileRemove={handleFileRemove}
        handleInsti2={handleInsti2}
        handleDate={handleDate}
        handleTitle={handleTitle}
        handlenote={handlenote}
        handleLevel={handleLevel}
        handleFile={handleFile}
        tokendata={tokendata}
      />
      <DocumentsModal2
        isVisible={isVisible2}
        handleOk={handleOk2}
        handleCancel={handleCancel}
        handleFileRemove={handleFileRemove}
        handleInsti2={handleInsti2}
        handleDate={handleDate}
        handleTitle={handleTitle}
        handlenote={handlenote}
        handleLevel={handleLevel}
        handleFile={handleFile2}
        record={id}
        setisVisible={setisVisible2}
        tokendata={tokendata}
      />
      <PageHeader
        ghost
        title="Documents"
        buttons={[
          <Row gutter={25}>
            {tokendata == '1' ? (
              <Col>
                <Select
                  showSearch
                  style={{ width: '200px' }}
                  placeholder="Everwin Vidhyashram"
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
              ''
            )}
            <Col>
              <Select
                showSearch
                style={{ width: '200px' }}
                placeholder="LKG"
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
              <Button size="small" onClick={() => setisVisible(true)} type="primary">
                <FeatherIcon icon="plus" size={15} />
                Create
              </Button>
            </Col>
          </Row>,
        ]}
      />
      <Main>
        <Row gutter={25}>
          <Cards headless>
            <CustomTable col={columns} data={data} />
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
}

export default Documents;
