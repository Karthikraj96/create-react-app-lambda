import React, { useState, useEffect } from 'react';
import { Row, Col, Select, Space, Drawer } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Main } from '../styled';
import CustomTable from '../fee/dashboard/Components/Table';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
import { decodedata, getAllContests, getWinners, deleteContest, createContest, getClass } from '../../api/api';
import { faPencil, faTrash, faTrophyAlt } from '@fortawesome/pro-duotone-svg-icons';
import SavingPassbookModal from './savingPassbookModal';
import Update from './update';
const { Option } = Select;

const SavingPassbook = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleCreate2 = () => {
    setisCreateModalVisible2(!isCreateModalVisible2);
  };
  let [clas, setClas] = useState([]);
  let [id, setId] = useState(null);
  let [id2, setId2] = useState(null);
  let grade = useSelector(store => store.getGradesReducer);
  let [tokendata, setTokendata] = useState(null);
  let org = useSelector(store => store.getOrgReducer);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedLevel, setselectedLevel] = useState('LKG');
  let [selectedOrg2, setselectedOrg2] = useState(null);
  let [selectedDate, setselectedDate] = useState(null);
  let [selectedLevel2, setselectedLevel2] = useState(null);
  let [selectedLevel4, setselectedLevel4] = useState(null);
  let [type, setType] = useState(null);
  let [name, setName] = useState(null);
  let [amount, setAmount] = useState(0);
  let [mark, setMark] = useState(0);
  let [selectedOrg3, setselectedOrg3] = useState(null);
  let [selectedDate2, setselectedDate2] = useState(null);
  let [selectedLevel3, setselectedLevel3] = useState(null);
  let [type2, setType2] = useState(null);
  let [name2, setName2] = useState(null);
  let [amount2, setAmount2] = useState(0);
  let [newGRade,setNewGrade] = useState([])
  let [mark2, setMark2] = useState(0);
  let [update, setUpdate] = useState(0);
  let [data, setData] = useState([]);
  let [data5, setData5] = useState([]);
  let [record, setRecord] = useState(null);
  const [showSideDraw, setshowSideDraw] = useState(false);
  const handleDate = data => {
    let date = data.entry_date;
    let da = moment(date).format('DD/MM/YYYY');
    return da;
  };
  const attcolumns = [
    {
      title: 'Roll No',
      dataIndex: 'studentRoolNo',
      key: 'studentRoolNo',
    },
    {
      title: 'Student Name',
      dataIndex: 'studentName',
      key: 'studentname',
    },
    {
      title: 'Level ',
      dataIndex: 'grade_id',
      key: 'grade_id',
    },
    {
      title: 'Savings',
      dataIndex: 'saving',
      key: 'saving',
    },
  ];
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let data2 = {
      orgId: selectedOrg,
      grade_id: selectedLevel,
    };
    getAllContests(data2)
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg, selectedLevel, update]);
  useEffect(() => {
    let data4 = {
      id: selectedOrg,
      level: selectedLevel4 ? selectedLevel4 : selectedLevel,
    };
    getClass(data4)
      .then(response => {
        setClas(response.data);
      })
      .catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Database Error Retry',
        });
      });
  }, [selectedLevel4]);
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleLevel = value => {
    setselectedLevel(value);
  };
  const handleLevel2 = value => {
    setselectedLevel2(value);
  };
  const handleLevel3 = value => {
    setselectedLevel3(value);
  };
  const handleInsti2 = value => {
    setselectedOrg2(value);
  };
  const handleInsti3 = value => {
    setselectedOrg3(value);
  };
  const handleDate2 = (date, dateString) => {
    setselectedDate(date);
  };
  const handleDate3 = (date, dateString) => {
    setselectedDate2(date);
  };
  const handletype = value => {
    setType(value);
  };
  const handleName = e => {
    setName(e.target.value);
  };
  const onClose = () => {
    setshowSideDraw(!showSideDraw);
  };
  const handleAmount = e => {
    setAmount(e.target.value);
  };
  const handleMark = e => {
    setMark(e.target.value);
  };
  const handletype2 = value => {
    setType2(value);
  };
  const handleName2 = e => {
    setName2(e.target.value);
  };
  const handleAmount2 = e => {
    setAmount2(e.target.value);
  };
  const handleMark2 = e => {
    setMark2(e.target.value);
  };
  const handleClass2 = value2 => {
    setselectedLevel4(value2);
  };
  const handleClass = value2 => {
    let value = {
      id: id2,
      section: value2,
    };
    getWinners(value)
      .then(res => {
        setData5(res.data);
      })
      .catch(e => {
        Swal.fire({
          icon: 'error',
          title: 'Database Error Retry',
        });
      });
  };
  const handleShow = value => {
    setId2(value);
    setshowSideDraw(!showSideDraw);
  };
  let handleUpdate = data3 => {
    Swal.fire({
      icon: 'info',
      title: 'Do You Want to update ',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        setId(data3.id);
        setRecord(data3);
        setisCreateModalVisible2(!isCreateModalVisible2);
      }
    });
  };
  const handleOk = () => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Create the Contest',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        let da = {
          entry_date: selectedDate,
          grades_id: selectedLevel2,
          organization_id: selectedOrg2,
          amount: amount,
          max_mark: mark,
          contest_type: type,
          contest_name: name,
        };
        createContest(da)
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
  const handleOk2 = (data14,setrec) => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Update the Contest',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        createContest(data14)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title: 'Data Updated Successfully',
              });
              setisCreateModalVisible2(!isCreateModalVisible2);
              setUpdate(update + 1);
              setrec(null)
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
  let handleDelete = data2 => {
    Swal.fire({
      icon: 'info',
      title: 'Are you sure You want to delete this',
      text: 'It will Be Permanetly Deleted!!',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        deleteContest(data2)
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
  const columns = [
    {
      title: 'Date',
      key: 'date',
      render: (text, record) => handleDate(record),
    },
    {
      title: 'Contest Type',
      dataIndex: 'contest_type',
      key: 'contesttype',
    },
    {
      title:'Grades',
      render: (text, record) => {
        if(record.grades_id){
         return record.grades_id.toString()
        }
      },
      // dataIndex:"grades_id",
      key:'Grades'
    },
    {
      title: 'Contest',
      dataIndex: 'contest_name',
      key: 'contest',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faTrophyAlt}
            onClick={() => {
              handleShow(record._id);
              setNewGrade(record.grades_id)
            }}
            style={{ fontSize: 15, color: 'gold ' }}
          />
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
              handleDelete(record._id);
            }}
            style={{ fontSize: 15, color: 'red ' }}
          />
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Drawer
        title="Students Contest Winner"
        width={640}
        placement="right"
        closable={true}
        destroyOnClose={true}
        onClose={onClose}
        visible={showSideDraw}
        footer={
          <div
            style={{
              textAlign: 'right',
            }}
          >
            <Button onClick={onClose} type="primary">
              OK
            </Button>
          </div>
        }
      >
        <Row justify="end">
          <Col span={8} style={{ margin: '1%' }}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Section"
              optionFilterProp="children"
              onChange={handleClass2}
            >
              {newGRade.map((e, key) => {
                return (
                  <Option key={key} value={e}>
                    {e}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={8} style={{ margin: '1%' }}>
            <Select
              showSearch
              style={{ width: '100%' }}
              placeholder="Section"
              optionFilterProp="children"
              onChange={handleClass}
            >
              {clas.map((e, key) => {
                return (
                  <Option key={key} value={e._id}>
                    {e.name}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <CustomTable col={attcolumns} pagination={false} data={data5} />
      </Drawer>
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCreate} type="primary">
            <FeatherIcon icon="plus" size={15} />
            CREATE
          </Button>,
        ]}
        title="Saving Passbook"
      />
      <Main>
        <SavingPassbookModal
          handleLevel={handleLevel2}
          handleInsti={handleInsti2}
          tokendata={tokendata}
          grade={grade}
          org={org}
          isVisible={isCreateModalVisible}
          handleOk={handleOk}
          handleType={handletype}
          handleMark={handleMark}
          handleAmount={handleAmount}
          handleCancel={toggleCreate}
          handleName={handleName}
          handleDate={handleDate2}
        />
        <Update
          handleLevel={handleLevel3}
          handleInsti={handleInsti3}
          tokendata={tokendata}
          grade={grade}
          org={org}
          isVisible={isCreateModalVisible2}
          handleOk={handleOk2}
          handleType={handletype2}
          handleMark={handleMark2}
          handleAmount={handleAmount2}
          handleCancel={toggleCreate2}
          handleName={handleName2}
          handleDate={handleDate3}
          record2={record}
        />
        <Row justify="end">
          {tokendata == '1' ? (
            <Col span={6} style={{ margin: '1%' }}>
              <Select
                showSearch
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
            ''
          )}
          <Col span={6} style={{ margin: '1%' }}>
            <Select placeholder="Class" onChange={handleLevel} style={{ width: '100%' }}>
              {grade.map((e, key) => {
                return (
                  <Option key={key} value={e.id}>
                    {e.id}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Cards headless>
              <CustomTable col={columns} data={data} />
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default SavingPassbook;
