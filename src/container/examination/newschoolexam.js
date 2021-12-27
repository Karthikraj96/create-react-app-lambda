import React, { useState, useEffect } from 'react';
import { Row, Col } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import { createExam, deleteExam, decodedata } from '../../api/api';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { delExam, listExams, saveExam } from '../../redux/exam/actionCreator';
import { useHistory } from 'react-router-dom';
import { Fragment } from 'react';
import { Input, Space, Drawer } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faEye } from '@fortawesome/pro-duotone-svg-icons';
import CreateEditExam from './createeditexam';
// import NewLesson from './newLessonModal';
import { Select } from 'antd';
// import './style.css';
// import { Progress } from 'antd';
import { DatePicker, Radio } from 'antd';
// import DocumentsModal from './documentsModal';
const { RangePicker } = DatePicker;
const { Option } = Select;

function NewSchoolExam() {
  const history = useHistory();

  let [update, setUpdate] = useState(0);
  const [isVisible, setisVisible] = useState(false);
  let [tokendata, setTokendata] = useState(null);
  const columns = [
    {
      title: 'Class',
      dataIndex: 'grade_id',
      key: 'class',
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
    },

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },

    {
      title: 'Action',
      key: 'Action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          {/* <FontAwesomeIcon icon={faThumbsUp} style={{ fontSize: 15, color: 'green ' }} />
          <FontAwesomeIcon
            onClick={() => setisVisible(true)}
            icon={faThumbsDown}
            style={{ fontSize: 15, color: 'red ' }}
          /> */}
          <FontAwesomeIcon
            icon={faPencil}
            onClick={() => {
              openModel(record);
            }}
            style={{ fontSize: 15, color: 'blue ' }}
          />
          <FontAwesomeIcon
            onClick={() => deleteexam(record.id, record.title)}
            icon={faTrash}
            style={{ fontSize: 15, color: 'red ' }}
          />
          <FontAwesomeIcon
            icon={faEye}
            onClick={() => history.push({ pathname: '/admin/examination/viewexam', state: record })}
            style={{ fontSize: 15, color: 'gray ' }}
          />
        </Space>
      ),
    },
  ];

  const [exmAllDetails, setExmAllDetails] = useState({
    id: '',

    noofInternalExam: 0,

    internalExam: [],
    internalMarkField: [],
    internalTest: [],

    title: '',
    type: '',

    grade_id: '',

    organization_id: [],
  });

  const [isEdit, setIsEditActive] = useState(false);

  // Save Event handlers
  const handleSave = () => {
    let title = isEdit ? 'Are You Sure You want to Update this' : 'Are You Sure You want to Save this';
    let title2 = isEdit ? 'Data Updated Succesfully' : 'Data Saved Succesfully';
    Swal.fire({
      icon: 'info',
      title: title,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed) {
        createExam(exmAllDetails)
          .then(response => {
            setisVisible(false);
            Swal.fire({
              icon: 'success',
              title: title2,
            });
            resetStates();
            setIsEditActive(false);
          })
          .catch(error => {
            console.log(error);
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      }
    });
  };

  // Reset states
  const resetStates = () => {
    setExmAllDetails({
      id: '',

      noofInternalExam: 0,

      internalExam: [{ Etype: '', id: '' }],
      internalMarkField: [{ itype: '' }],
      internalTest: [
        {
          Ttype: '',
          mark: 0,
        },
      ],

      title: '',
      type: '',

      grade_id: '',

      organization_id: [],
    });
  };

  const openModel = examDetails => {
    setExmAllDetails(examDetails);
    setisVisible(true);
    setIsEditActive(true);
  };

  const handleCancel = e => {
    resetStates();
    setIsEditActive(false);
    setisVisible(false);
  };

  const deleteexam = (id, title) => {
    Swal.fire({
      icon: 'info',
      title: 'Are You Sure You want to Delete this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    }).then(result => {
      if (result.isConfirmed === true) {
        deleteExam(id)
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
  // console.log("decode",decodedata)
  // Redux store access
  const exmList = useSelector(state => state.examLists);
  let { examLists, loading, error } = exmList;
  const dispatch = useDispatch();
  const [grades, setGrade] = useState('');
  const [orgs, setOrg] = useState(1);
  const exm = useSelector(state => state.exam);
  let { exam, loading: saveLoading, error: saveError } = exm;

  const exmDelete = useSelector(state => state.examDelete);
  let { examDelete, loading: deleteLoading, error: deleteError } = exmDelete;

  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);

  //  setGradeList(grade);
  //  setOrgList(org);

  //Organziation onChange

  const onOrgChange = e => {
    setOrg(e);
  };
  //Grade onChange

  const onGradeChange = e => {
    setGrade(e);
  };

  //Life cycle methods
  useEffect(() => {
    dispatch(listExams(orgs));
    setTokendata(decodedata.role_id);
  }, [saveLoading, deleteLoading, orgs, update,grades,]);

  //Life cycle methods
  const FindGrade = examList => {
    if (!grades) {
      return examList;
    }

    if (!examList) {
      return [];
    }

    const exam = examList.filter(e => {
      return e.grade_id.toLowerCase().includes(grades.toLowerCase());
    });
    return exam;
  };

  return (
    <Fragment>
      <CreateEditExam
        {...{
          grade,
          org,
          isVisible,
          handleSave,
          handleCancel,
          setExmAllDetails,
          isEdit,
          exmAllDetails,
        }}
        //   isVisible={isVisible} handleOk={handleOk} handleCancel={handleCancel}
      />
      <PageHeader
        ghost
        title="School Exam"
        buttons={[
          <Row gutter={25}>
            <Col>
              <Select
                showSearch
                style={{ width: '200px' }}
                placeholder="Select Class"
                onChange={onGradeChange}
                value={grades}
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="">---select Level---</Option>
                {grade.map((g, i) => {
                  return (
                    <Option key={i} value={g.id}>
                      {g.id}
                    </Option>
                  );
                })}
              </Select>
            </Col>
            {tokendata == '1' ? (
              <Col>
                <Select
                  showSearch
                  style={{ width: '200px' }}
                  placeholder="Select Institute"
                  value={orgs}
                  onChange={onOrgChange}
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
            <CustomTable col={columns} data={FindGrade(examLists)} />
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
}

export default NewSchoolExam;
