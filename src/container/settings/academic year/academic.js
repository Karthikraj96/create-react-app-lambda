import React, { useState, useEffect } from 'react';
import { Row, Col ,Space} from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';
import { Fragment } from 'react';
import CustomTable from '../../fee/dashboard/Components/Table';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash ,faCheck,faTimes} from '@fortawesome/pro-duotone-svg-icons';
import { decodedata, addYear, editCurrentYear, deleteYear, getAllYear } from '../../../api/api';
import AcademicModal from './academicModal';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
const { RangePicker } = DatePicker;
const { Option } = Select;

let Academic = () => {
  // const handleOk = () => {
  //   setisVisible(false);
  // };
  // const handleCancel = () => {
  //   setisVisible(false);
  // };
  let org = useSelector(store => store.getOrgReducer);
  let [data, setData] = useState([]);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [update,setUpdate] = useState(0)
  let [record2, setRecord] = useState(null);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  useEffect(() => {
    getAllYear(selectedOrg)
      .then(res => {
        setData(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg,update]);
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const handleInsti = value => {
    setselectedOrg(value);
  };
  let handleOk = () =>{
    if(record2){
      Swal.fire({
        icon: 'info',
        title: record2.id?'It Will Update The Year Details':'It Will Create The Year Details',
        showCancelButton: true,
        confirmButtonText: 'Proceed',
        cancelButtonText: 'Cancel',
      }).then(result => {
        if (result.isConfirmed) {
          addYear(record2)
            .then(res => {
              if (res) {
                Swal.fire({
                  icon: 'success',
                  title:record2? record2.id?'Data Updated Successfully':'Data Created Successfully':'Data Created Successfully',
                });
                setRecord(null)
                setisCreateModalVisible(false)
                setUpdate(update + 1);
                setData([])
              }
            })
            .catch(e => {
              console.log(e)
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
              });
            });
        }
      });
    }
    else{
      Swal.fire({
        icon:'error',
        title:'No Data'
      })
    }
  }
  let handleClick =(data) =>{
    Swal.fire({
      icon: 'info',
      title: 'It Will Change The Current Year',
      showCancelButton: true,
      confirmButtonText: 'Proceed',
      cancelButtonText: 'Cancel',
    }).then(result => {
      if (result.isConfirmed) {
        editCurrentYear(data)
          .then(res => {
            if (res) {
              Swal.fire({
                icon: 'success',
                title:'Data Updated Successfully',
              });
              setUpdate(update + 1);
              setData([])
            }
          })
          .catch(e => {
            console.log(e)
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
            });
          });
      }
    });
  }
  const columns = [
    {
      title: 'Academic Year',
      dataIndex: 'year',
      key: 'date',
    },
    {
      title: 'Is Current Year',
    render:(text,record)=>{
      if(record.isCurrent){
        return <> True </>
      }
      else{
        return <> False </>
      }
    },
      key: 'subject',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            onClick={() => { 
              setRecord(record)
              setisCreateModalVisible(true)}}
            icon={faPencil}
            style={{ fontSize: 15, color: 'green ' }}
          />
          {
            record.isCurrent?  <></>:  <FontAwesomeIcon icon={faCheck} onClick={()=>{handleClick(record)}} style={{ fontSize: 15, color: 'red ' }} />
          }
          {/* <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} /> */}
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <AcademicModal record={record2} selectedOrg={selectedOrg} setRecord={setRecord} isVisible={isCreateModalVisible} handleOk={handleOk} handleCancel={toggleCreate} />
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCreate} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Create
          </Button>,
        ]}
        title="Academic Year"
      />
      <Main>
        <Row gutter={25} justify="end">
          <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
            {/* Class{' '} */}
            <Select
              showSearch
              style={{ width: '100%' }}
              defaultValue={selectedOrg}
              placeholder="Select Institute"
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
        </Row>
        <br />
        <Row gutter={25}>
          <Cards headless>
            <Cards headless>
              <CustomTable col={columns} data={data} />
            </Cards>
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
};

export default Academic;
