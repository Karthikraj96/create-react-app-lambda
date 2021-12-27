import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { Fragment } from 'react';
import { Space } from 'antd';
import CustomTable from './dashboard/Components/Table';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { decodedata, addCourseTwoPlusFee, getAllOrgTwoPlusFee, getAllYear } from '../../api/api';
import { faPencil, faEye, faRupeeSign } from '@fortawesome/pro-duotone-svg-icons';
import TwoPlusSettingsModal from './TwoPlusSettingsModal';
import TwoPlusProfileDrawer from './TwoPlusProfileDrawer';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import moment from 'moment';
const { Option } = Select;
function TwoPlusSetings() {
  let [year, setYear] = useState([]);
  let [tokendata, setTokendata] = useState(null);
  let org = useSelector(store => store.getOrgReducer);
  let grade = useSelector(store => store.getGradesReducer);
  let [selectedOrg, setSelectedOrg] = useState(decodedata.orgId);
  let [selectedGrade, setSelectedGrade] = useState(null);
  let [data, setData] = useState([]);
  let [selectedYear, setSelectedYear] = useState(null);
  let [update, setUpdate] = useState(0);
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isProfileDrawer, setisProfileDrawer] = useState(false);
  let [record2, setRecord2] = useState({});
  useEffect(() => {
    setTokendata(decodedata.role_id);
    getAllYear(selectedOrg)
      .then(res => {
        setYear(res.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg]);
  useEffect(() => {
    let dataaa = {
      orgid: selectedOrg,
      year: selectedYear,
      grade_id: selectedGrade,
    };
    getAllOrgTwoPlusFee(dataaa)
      .then(res => {
        let val = res.data;
        val.map((e, key) => {
          val[key].sino = key + 1;
        });
        setData(val);
      })
      .catch(e => {
        console.log(e);
      });
  }, [update, selectedOrg, selectedYear, selectedGrade]);
  const toggleProfile = () => {
    setisProfileDrawer(!isProfileDrawer);
    setRecord2({});
  };

  const toggleCreate = () => {
    setRecord2({});
    setisCreateModalVisible(!isCreateModalVisible);
  };
  let handleOk = data2 => {
    let v = data2;
    v.validity_start = v.valid[0];
    v.validity_end = v.valid[1];
    Swal.fire({
      icon: 'info',
      title: v.id ? 'It Will Update  Fee' : 'It Will Create  Fee',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        addCourseTwoPlusFee(v)
          .then(res => {
            Swal.fire({
              icon: 'success',
              title: v.id ? 'Data Updated SuccessFully' : 'Data Created Successfully',
            });
            setisCreateModalVisible(false);
            setUpdate(update + 1);
            setRecord2({});
          })
          .catch(e => {
            if (e.response.status === 401) {
              Swal.fire({
                icon: 'error',
                title: 'Already Created  Fee For This Grade',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Database Error Retry',
              });
            }
          });
      }
    });
  };
  const columns = [
    {
      title: 'S.no',
      dataIndex: 'sino',
      key: 'sino',
    },
    {
      title: 'Academic Year',
      dataIndex: 'year',
      key: 'key',
    },
    {
      title: 'Class',
      dataIndex: 'grade_id',
      key: 'grade_id',
    },
    {
      title: 'TwoPlusOne Fees',
      render: (text, record) => {
        return (
          <>
            <FontAwesomeIcon icon={faRupeeSign} /> {' ' + record.fees.toLocaleString('en-IN')}/-
          </>
        );
      },
      key: 'fees',
    },
    {
      title: 'Valid Till',
      render: (text, record) => {
        return <>{moment(record.validity_end).format('DD/MM/YYYY')}</>;
      },
      key: 'ValidTill',
    },
    {
      title: 'Action',
      key: 'action',
      // width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon
            icon={faEye}
            style={{ fontSize: 15, color: 'Dodgerblue ' }}
            onClick={() => {
              setRecord2(record);
              setisProfileDrawer(true);
            }}
          />
          <FontAwesomeIcon
            onClick={() => {
              let valeee = record;
              valeee.valid = [moment(record.valid[0]), moment(record.valid[1])];
              setRecord2(valeee);
              setisCreateModalVisible(true);
            }}
            icon={faPencil}
            style={{ fontSize: 15, color: 'green ' }}
          />
        </Space>
      ),
    },
  ];
  let handleyear = value => {
    setSelectedYear(value);
  };
  let handleOrg = value => {
    setSelectedOrg(value);
  };
  let handleGrade = value => {
    setSelectedGrade(value);
  };
  return (
    <Fragment>
      <TwoPlusSettingsModal
        grade={grade}
        org={org}
        year={year}
        tokendata={tokendata}
        isVisible={isCreateModalVisible}
        handleOk={handleOk}
        handleCancel={toggleCreate}
        record={record2}
        setRecord={setRecord2}
      />
      <TwoPlusProfileDrawer
        org={org}
        record={record2}
        isVisible={isProfileDrawer}
        handleOk={toggleProfile}
        handleCancel={toggleProfile}
      />
      <PageHeader ghost title="Settings" />
      <Main>
        <Row style={{ marginBottom: '20px' }} justify="end" gutter={24}>
          {tokendata == '1' ? (
            <Col span={4} xl={6} lg={6} md={6} sm={24} xs={24}>
              <Select placeholder="Select Institute" onChange={handleOrg} style={{ width: '100%' }}>
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
          <Col span={4} xl={6} lg={6} md={6} sm={24} xs={24}>
            <Select placeholder="Select Year" onChange={handleyear} style={{ width: '100%' }}>
              {year.map((e, key) => {
                return (
                  <Option key={key} value={e.year}>
                    {e.year}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={4} xl={6} lg={6} md={6} sm={24} xs={24}>
            <Select placeholder="Select Level" onChange={handleGrade} style={{ width: '100%' }}>
              {grade.map((g, i) => {
                return (
                  <Option key={12554 + i} value={g.id}>
                    {g.id}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col>
            <Button size="small" type="primary" onClick={toggleCreate}>
              <FeatherIcon icon="plus" size={15} />
              Create
            </Button>
          </Col>
        </Row>
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
}

export default TwoPlusSetings;
