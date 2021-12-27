import React, {useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { getLeave, getClass, setleave, decodedata } from '../../api/api';
import Swal from 'sweetalert2';
import { Fragment } from 'react';
import {  Space } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faThumbsUp,
  faThumbsDown,
} from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
import './style.css';
import { useSelector } from 'react-redux';
const { Option } = Select;
import moment from 'moment';
function LeaveRequest() {
  let grade = useSelector(store => store.getGradesReducer);
  let [tokendata, setTokendata] = useState(null);
  let org = useSelector(store => store.getOrgReducer);
  let [clas, setClas] = useState([]);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedLevel, setselectedLevel] = useState('LKG');
  let [update, setUpdate] = useState(0);
  let [section, setSection] = useState('');
  let [data2, setData2] = useState(null);
  useEffect(() => {
    let decodedata2 = decodedata;
    setTokendata(decodedata2.role_id);
    let data = {
      section_id: section,
    };
    let data2 = {
      id: selectedOrg,
      level: selectedLevel,
    };
    getClass(data2)
      .then(res => {
        setClas(res.data);
      })
      .catch(e => {
        console.log(e);
      });
    getLeave(data)
      .then(res => {
        setData2(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [section, selectedOrg, selectedLevel, update]);
  const handleDate = date => {
    let da = moment(date).format('DD/MM/YYYY');
    return da;
  };
  const handleOk = data => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Approve the Leave',
      showCancelButton: true,
      input: 'textarea',
      inputPlaceholder: 'Comment for Approve ',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: value => {
        let dataa = {
          id: data,
          comments: value,
          is_leave: 1,
        };
        return setleave(dataa)
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
          title: 'Leave Approved',
        });
      }
    });
  };
  const handleCancel = data => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Decline the Leave',
      showCancelButton: true,
      input: 'textarea',
      inputPlaceholder: 'Comment for decline ',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: value => {
        let dataa = {
          id: data,
          comments: value,
        };
        return setleave(dataa)
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
          title: 'Leave Declined',
        });
      }
    });
  };
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handleGrade = value => {
    setselectedLevel(value);
  };
  const handleClas = value => {
    setSection(value);
  };
  const columns = [
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'section_name',
      key: 'class',
    },

    {
      title: 'From',
      key: 'from',
      render: (text, record) => handleDate(record.from_date),
    },
    {
      title: 'To',
      key: 'to',
      render: (text, record) => handleDate(record.to_date),
    },
    {
      title: 'Subject',
      // dataIndex: 'subject',
      render: (text, record) => <span><strong>{record.subject}</strong></span>,
      key: 'subject',
    },
    {
      title: 'Status',
      // dataIndex: 'status',
      render: (text, record) => <span><strong>{record.status==="Approved" ?<span style={{color:'green'}}>{record.status}</span>:record.status==="Pending"?<span style={{color:"lightblue"}}>{record.status}</span>:<span style={{color:'red'}}>{record.status}</span>}</strong></span>,
      key: 'status',
    },
    {
      title: 'Comment',
      dataIndex: 'comments',
      // render: (text, record) => <span><strong>{record.comments==="Approved" ?<span style={{color:'green'}}>{record.comments}</span>:<span style={{color:'red'}}>{record.comments}</span>}</strong></span>,
      key: 'comment',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faThumbsUp}
            onClick={() => {
              handleOk(record._id);
            }}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon
            onClick={() => {
              handleCancel(record._id);
            }}
            icon={faThumbsDown}
            style={{ fontSize: 15, color: 'red ' }}
          />
        </Space>
      ),
    },
  ];
  return (
    <Fragment>
      <PageHeader ghost title="Leave Request" />
      <Main>
        <Row gutter={25}>
          <Col xxl={24} md={24} sm={24} xs={24}>
            <Row gutter={25} style={{ justifyContent: 'flex-end', marginBottom: '20px' }}>
              {tokendata == '1' ? (
                <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                  {/* Section{' '} */}
                  <Select
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select Institute"
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
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Class{' '} */}
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Class"
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
              <Col xxl={6} lg={6} md={6} sm={24} xs={24}>
                {/* Section{' '} */}
                <Select
                  showSearch
                  style={{ width: '100%' }}
                  placeholder="Select Section"
                  optionFilterProp="children"
                  onChange={handleClas}
                  // onFocus={onFocus}
                  // onBlur={onBlur}
                  // onSearch={onSearch}
                  // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                >
                  {clas.map((e, key) => {
                    return (
                      <Option key={key} value={e.id}>
                        {e.name}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row gutter={25}>
          <Cards headless>
            <CustomTable col={columns} data={data2} />
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
}

export default LeaveRequest;
