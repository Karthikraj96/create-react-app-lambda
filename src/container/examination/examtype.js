import React, { useState, useEffect } from 'react';
import { Row, Table, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Fragment } from 'react';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import CreateEditExam from './createeditexamtype';
import { getAllType, decodedata, deleteSchoolexamtype } from '../../api/api';
import { Select } from 'antd';
const { Option } = Select;
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import './index.css';
function Examtype() {
  let [data, setData] = useState([]);
  let [record, setRecord] = useState(null);
  let [tokendata, setTokendata] = useState(null);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [isedit, setisedit] = useState(false);
  let [update, setUpdate] = useState(0);
  let org = useSelector(store => store.getOrgReducer);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    getAllType(selectedOrg)
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg, update]);
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleYes = data2 => {
    let da;
    if (data2 === 1) {
      da = 'Yes';
    } else {
      da = 'No';
    }
    return da;
  };
  const handleCancel = () => {
    setisVisible(false);
    setisedit(false);
    setUpdate(update + 1);
  };
  const [isVisible, setisVisible] = useState(false);
  const columns = [
    {
      title: 'Exam Type',
      dataIndex: 'title',
      key: 'examtype',
    },
    {
      title: 'Main',
      key: 'main',
      render: (text, record) => handleYes(record.isMain),
    },

    {
      title: 'Internal',
      key: 'internal',
      render: (text, record) => handleYes(record.isInternalExam),
    },
    {
      title: 'Average Mark',
      dataIndex: 'avgMark',
      key: 'avgmark',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => (
        <>
            <FontAwesomeIcon
            onClick={() => {
              setisVisible(true);
              setisedit(true);
              setRecord(record);
            }}
            icon={faPencil}
            style={{ fontSize: 15, color: 'green ' }}
          />
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <FontAwesomeIcon
            icon={faTrash}
            onClick={() => handleDelete(record)}
            style={{ fontSize: 15, color: 'red ' }}
          />
        </>
      ),
    },
  ];
  const handleDelete = key => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Delete this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed === true) {
        deleteSchoolexamtype(key._id)
          .then(response => {
            setUpdate(update + 1);
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
  return (
    <Fragment>
      <CreateEditExam
        isVisible={isVisible}
        isEdit={isedit}
        setRecord2={setRecord}
        handleCancel={handleCancel}
        record2={record}
        org={org}
        tokendata={tokendata}
      />
      <PageHeader
        ghost
        title="Exam Type"
        buttons={[
          <Button key={1} size="small" onClick={() => setisVisible(true)} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Create
          </Button>,
        ]}
      />
      <Main>
        <Row key={2} gutter={25} justify="end">
          {tokendata == '1' ? (
            <Col>
              <Select
                style={{ width: '300px', marginRight: '15px', marginTop: '5px', marginBottom: '5px' }}
                defaultValue={decodedata.orgId}
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
              <br />
            </Col>
          ) : (
            ''
          )}

          <Cards key={3} headless>
            <div>
              <Table dataSource={data} columns={columns} />
            </div>
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
}

export default Examtype;
