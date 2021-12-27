import React, { useState, useEffect } from 'react';
import { Row, Col, Avatar, Space, Select } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Tabs } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Main } from '../styled';
import CustomTable from '../fee/dashboard/Components/Table';
import {
  faCog,
  faDownload,
  faEnvelope,
  faPencil,
  faSave,
  faTrash,
  faUpload,
  faEye,
  faPencilAlt,
  faTrashAlt,
  faCoins,
  faUsers,
  faFileExcel,
  faFilePdf,
  faFileCsv,
  faRupeeSign,
  faBell,
  faPaperclip,
  faTrophyAlt,
} from '@fortawesome/pro-duotone-svg-icons';
import BatchTypeModal from './batchTypeModal';
import BatchTypeUpdateModal from './batchTypeUpdateModal';
import { postBadge, getBadge, decodedata, deleteBadge } from '../../api/api';
import Swal from 'sweetalert2';
const { Option } = Select;

// const data = [
//   {

//   image:<Avatar size={64} icon={<UserOutlined />} />,
//   type:'Type-1'

//   },

// ];
// for (let i = 0; i < 2; i++) {
//     data.push({
//       key: i,
//       image:<Avatar size={64} icon={<UserOutlined />} />,
//   type:'Type-1'
//     });
//   }

const Batch = () => {
  const [isCreateModalVisible, setisCreateModalVisible] = useState(false);
  const [isCreateModalVisible2, setisCreateModalVisible2] = useState(false);
  const [isVisible2, setisVisible2] = useState(false);
  let [badge, setBadge] = useState([]);
  let [tokendata, setTokendata] = useState(null);
  let [file, setFile] = useState(null);
  let [sectitle, setSectitle] = useState('');
  let [update, setUpdate] = useState(0);
  let [record, setRecord] = useState(null);
  let [id, setId] = useState(null);
  let [file2, setFile2] = useState(null);
  const handleClickEdit = data => {
    setisVisible2(true);
    setId(data);
  };
  const toggleCreate = () => {
    setisCreateModalVisible(!isCreateModalVisible);
  };
  const toggleCreate2 = () => {
    setisCreateModalVisible2(!isCreateModalVisible2);
  };
  const handleFile = data => {
    setFile(data);
  };
  const handleTitle = e => {
    setSectitle(e.target.value);
  };
  const handleFile2 = data => {
    setFile2(data);
  };
  const handleFileRemove = () => {
    setFile(null);
  };
  // const handleTitle = data => {
  //   setTitle(data);
  // };
  useEffect(() => {
    setTokendata(decodedata.role_id);
    getBadge()
      .then(res => {
        setBadge(res.data.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [update]);
  const handleOk = (record, setRecord) => {
    Swal.fire({
      icon: 'info',
      title: 'It Will Save The Batch',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        // let bodyFormData = new FormData();
        // bodyFormData.append('badgePic', file);
        // bodyFormData.append('badgeTitle', title);
        postBadge(record)
          .then(res => {
            if (res) {
              setisCreateModalVisible(false);
              setRecord({
                badgeTitle: null,
                badgePic: null,
              });
              setUpdate(update + 1);
              Swal.fire({
                icon: 'success',
                title: 'Data Created Successfully',
              });
            }
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error Retry',
              text: { e },
            });
          });
      }
    });
  };
  const handleDelete = data3 => {
    let delete_data = {
      id: data3,
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
        console.log('delete data', delete_data);
        deleteBadge(delete_data)
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
  // let handleUpdate = data3 => {
  //   Swal.fire({
  //     icon: 'info',
  //     title: 'Do You Want to update ',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       setId(data3.id);
  //       setRecord(data3);
  //       setisCreateModalVisible2(!isCreateModalVisible2);
  //     }
  //   });
  // };
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
          bodyFormData.append('badgeTitle', val.badgeTitle);
          bodyFormData.append('badgePic', file2);
          return postBadge(bodyFormData)
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
          return postBadge(val)
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
  // const handleOk2 = (data14,setrec) => {
  //   Swal.fire({
  //     icon: 'info',
  //     title: 'It Will Update the Contest',
  //     showCancelButton: true,
  //     confirmButtonText: 'Yes',
  //     cancelButtonText: 'No',
  //   }).then(result => {
  //     if (result.isConfirmed) {
  //       postBadge(data14)
  //         .then(res => {
  //           if (res) {
  //             Swal.fire({
  //               icon: 'success',
  //               title: 'Data Updated Successfully',
  //             });
  //             setisCreateModalVisible2(!isCreateModalVisible2);
  //             setUpdate(update + 1);
  //             setrec(null)
  //           }
  //         })
  //         .catch(e => {
  //           Swal.fire({
  //             icon: 'error',
  //             title: 'Database Error Retry',
  //           });
  //         });
  //     }
  //   });
  // };
  const handleCancel = () => {
    setisCreateModalVisible(false);
  };
  const columns = [
    {
      title: 'Student',
      dataIndex: 'badgePic',
      key: 'badgePic',
    },
    {
      title: 'Type',
      dataIndex: 'badgeTitle',
      key: 'badgeTitle',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          {/* <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} /> */}
          <FontAwesomeIcon
            icon={faPencil}
            style={{ fontSize: 15, color: 'green ' }}
            onClick={() => handleClickEdit(record)}
          />
          <FontAwesomeIcon
            icon={faTrash}
            style={{ fontSize: 15, color: 'red ' }}
            onClick={() => {
              handleDelete(record.id);
            }}
          />
        </Space>
      ),
    },
  ];
  return (
    <div>
      <PageHeader
        ghost
        buttons={[
          <Button size="small" onClick={toggleCreate} type="primary">
            <FeatherIcon icon="plus" size={15} />
            Add
          </Button>,
        ]}
        title="Batch Type"
      />
      <Main>
        <BatchTypeModal
          isVisible={isCreateModalVisible}
          handleOk={handleOk}
          handleCancel={handleCancel}
          // handleFile={handleFile} handleTitle={handleTitle}
        />
        <BatchTypeUpdateModal 
        isVisible={isVisible2}
        handleOk={handleOk2}
        handleCancel={handleCancel}
        handleFileRemove={handleFileRemove}
        handleTitle={handleTitle}
        handleFile={handleFile2}
        record={id}
        setisVisible={setisVisible2}
        />
        {/* <Row justify="end">
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6} style={{ margin: '1%' }}>
            <Select placeholder="Institute" style={{ width: '100%' }}>
              <Option>1</Option>
              <Option>2</Option>
            </Select>
          </Col>
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6} style={{ margin: '1%' }}>
            <Select placeholder="Level" style={{ width: '100%' }}>
              <Option>UKG</Option>
              <Option>LKG</Option>
            </Select>
          </Col>
          <Col xxl={6} lg={6} md={6} sm={24} xs={24} span={6} style={{ margin: '1%' }}>
            <Select placeholder="Class" style={{ width: '100%' }}>
              <Option>Class-2</Option>
            </Select>
          </Col>
        </Row> */}

        <Row gutter={24}>
          <Col span={24}>
            <Cards headless>
              <CustomTable col={columns} data={badge} />
            </Cards>
          </Col>
        </Row>
      </Main>
    </div>
  );
};

export default Batch;
