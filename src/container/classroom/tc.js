import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { getTc, getClass, setTc, decodedata } from '../../api/api';
import Swal from 'sweetalert2';
import { Fragment } from 'react';
import { Space } from 'antd';
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
function TC() {
  let grade = useSelector(store => store.getGradesReducer);
  let [tokendata, setTokendata] = useState(null);
  let org = useSelector(store => store.getOrgReducer);
  let [clas, setClas] = useState([]);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [update, setUpdate] = useState(0);
  let [section, setSection] = useState(null);
  let [data2, setData2] = useState(null);
  useEffect(() => {
    let decodedata2 = decodedata;
    setTokendata(decodedata2.role_id);
    let data = {
      section_id: section,
      class_id: selectedLevel,
      organization_id:selectedOrg
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
    getTc(data)
      .then(res => {
        setData2(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [section, selectedOrg, selectedLevel, update]);
  const handleOk = data => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Approve the Tc',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let dataa = {
          id: data,
          is_tc: 1,
        };
        return setTc(dataa)
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
          title: 'TC Approved',
        });
      }
    });
  };
  const handleCancel = data => {
    Swal.fire({
      icon: 'info',

      title: 'Are You Sure You want to Reject the Tc',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let dataa = {
          id: data,
        };
        return setTc(dataa)
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
          title: 'TC Rejected',
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
      title: 'Roll Number',
      dataIndex: 'rollnumber',
      key: 'rollnumber',
    },
    {
      title: 'Student Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Class',
      dataIndex: 'class',
      key: 'class',
    },
    {
      title: 'Section',
      dataIndex: 'section',
      key: 'section',
    },
    {
      title: 'Parent Name',
      dataIndex: 'parent_name',
      key: 'parent_name',
    },
    {
      title: 'Contact Number',
      dataIndex: 'contactnumber',
      key: 'contactnumber',
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'tc_status',
      key: 'status',
    },
    {
      title: 'Action',
      key: 'action',
      width: '10%',

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
      <PageHeader ghost title="Transfer Certificate" />
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

export default TC;
