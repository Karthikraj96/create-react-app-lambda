import React, { useState, useEffect } from 'react';
import { Comment, Avatar } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { Row, Col, Pagination } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Fragment } from 'react';
import { Tag } from 'antd';
import { Tabs } from 'antd';
import { Select } from 'antd';
import {
  decodedata,
  getTeacherDiscipline,
  getTeacherDisciplineTotal,
  teacherDisciplineClose,
  PostTeacherDiscipline,
} from '../../api/api';
const { TabPane } = Tabs;
import Swal from 'sweetalert2';
import './index.css';
import { CheckCircleOutlined } from '@ant-design/icons';
import { ChartjsDonutChart } from './Charts/donut';
import { Rate } from 'antd';
import StatusChart from './Charts/statuschart';
import { useSelector } from 'react-redux';
import moment from 'moment';
const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

function Discipline() {
  let [tokendata, setTokendata] = useState(null);
  let org = useSelector(store => store.getOrgReducer);
  let [selectedOrg2, setselectedOrg2] = useState(decodedata.orgId);
  let [update, setUpdate] = useState(0);
  let [data, setData] = useState(null);
  let [data2, setData2] = useState([]);
  let [limit, setLimit] = useState(5);
  let [skip, setSkip] = useState(0);
  let [total, setTotal] = useState(null);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let data3 = {
      orgId: selectedOrg2,
      resolve: data,
      skip: skip,
      limit: limit,
    };
    let data2 = {
      orgId: selectedOrg2,
    };
    getTeacherDisciplineTotal(data2)
      .then(res => {
        setTotal(res.data.Total);
      })
      .catch(e => {
        console.log(e);
      });
    getTeacherDiscipline(data3)
      .then(response => {
        setData2(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg2, update]);
  const handlePage = (page, pageSize) => {
    let sk = page == 1 ? 0 : (page - 1) * 5;
    let lm = sk + 5;
    setLimit(lm);
    setSkip(sk);
    setUpdate(update + 1);
  };
  const handleComment = value2 => {
    Swal.fire({
      icon: 'info',
      title: 'Please Enter the Details to Proceed ',
      showCancelButton: true,
      input: 'textarea',
      inputPlaceholder: 'Reply For The Issue ',
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: value => {
        let dataa = {
          comment_id: value2._id,
          name: 'Admin',
          message: value,
        };
        return PostTeacherDiscipline(dataa)
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
          title: 'Comment Posted',
        });
      }
    });
  };
  const handleClose = value => {
    Swal.fire({
      icon: 'error',
      title: 'Are You Sure You want to Close this',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        let dataa = {
          comment_id: value._id,
        };
        return teacherDisciplineClose(dataa)
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
          title: 'Closed Succesfully',
        });
      }
    });
  };
  const handleInsti2 = value => {
    setselectedOrg2(value);
  };
  const handleInput = value => {
    setData(value);
    setUpdate(update + 1);
  };
  let orgname = value => {
    let orgi2 = org;
    let type;
    orgi2.filter(item => {
      if (item.organization_id == value) {
        type = item.instituteName;
      }
    });
    return type;
  };
  return (
    <Fragment>
      {/* <NewLesson isVisible={isVisible} handleOk={handleOk} handleCancel={handleCancel} /> */}
      <PageHeader ghost title="Discipline" />
      <Main>
        <Row gutter={25}>
          <Col xxl={12} md={12} sm={24} xs={24}>
            <StatusChart />
          </Col>
          <Col xxl={12} md={12} sm={24} xs={24}>
            <ChartjsDonutChart />
            {/* <Cards title="Categories">
              <ChartjsPieChartSuggestions />
            </Cards> */}
            {/* <QueryOverview /> */}
          </Col>
        </Row>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Teacher" key="2">
            <Row gutter={25}>
              <Cards
                isbutton={
                  <div className="card-nav">
                    <ul>
                      {tokendata == '1' ? (
                        <li className="active">
                          <Select
                            showSearch
                            style={{ width: '200px' }}
                            placeholder="Everwin Vidhyashram"
                            optionFilterProp="children"
                            onChange={handleInsti2}
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
                        </li>
                      ) : (
                        ''
                      )}
                      <li className="active">
                        <Select placeholder="Select Query Status" onChange={handleInput} style={{ width: '200px' }}>
                          <Option value="1">RESPONDED</Option>
                          <Option value="0">PENDING</Option>
                        </Select>
                      </li>
                    </ul>
                  </div>
                }
                // more={moreContent}
                title=""
                size="large"
              >
                {' '}
                {data2.length > 0 ? (
                  data2.map((e, key) => {
                    return (
                      <Comment
                        actions={[
                          <>
                            {e.closed ? (
                              <> </>
                            ) : (
                              <>
                                {' '}
                                <span onClick={() => handleComment(e)} key={'comment-nested-reply-to' + key}>
                                  Reply to
                                </span>{' '}
                                &nbsp;{' '}
                                <span
                                  key={'comment-nested-reply-to' + key}
                                  onClick={() => handleClose(e)}
                                  style={{ color: 'red' }}
                                >
                                  Close Ticket
                                </span>
                              </>
                            )}
                          </>,
                        ]}
                        author={
                          <span>
                            <span className="authorname">
                              {e.student_name} Created By {e.teacher_name}
                            </span>
                            <span className="cmnt_date">{moment(e.date).fromNow()}</span>
                          </span>
                        }
                        avatar={
                          <Avatar
                            src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                            alt="Han Solo"
                          />
                        }
                        content={
                          <Fragment>
                            <Row style={{ marginBottom: '15px' }} gutter={20}>
                              <Col>
                                {e.response ? (
                                  <Tag icon={<CheckCircleOutlined />} color="success">
                                    RESPONDED
                                  </Tag>
                                ) : (
                                  <Tag icon={<CheckCircleOutlined />} color="warning">
                                    PENDING
                                  </Tag>
                                )}
                              </Col>
                              <Col>
                                <Tag color="cyan">{orgname(e.organization_id)}</Tag>
                              </Col>
                              <Col>
                                <Tag color="default">
                                  {e.grade_id} - {e.section_id}
                                </Tag>
                              </Col>
                              <Col>
                                <Tag color="purple">Ticket #{e.ticket}</Tag>
                              </Col>
                              <Col>
                                <Rate tooltips={desc} value={e.rating ? e.rating : 0} />
                              </Col>
                            </Row>
                            <Row gutter={20}>
                              <span style={{ marginLeft: '15px' }}>{e.message}</span>
                            </Row>
                          </Fragment>
                        }
                      >
                        {e.reply ? (
                          <>
                            <h3>({e.reply.length}) Replies</h3>
                            <br />
                          </>
                        ) : (
                          <>
                            <h3>(0)Replies</h3>
                            <br />
                          </>
                        )}

                        {e.reply ? (
                          <>
                            {e.reply.length > 0
                              ? e.reply.map((e1, key) => {
                                  return (
                                    <Comment
                                      actions={[
                                        <>
                                          {e.closed ? (
                                            <> </>
                                          ) : (
                                            <>
                                              {' '}
                                              <span
                                                onClick={() => handleComment(e)}
                                                key={'comment-nested-reply-to' + key}
                                              >
                                                Reply to
                                              </span>
                                            </>
                                          )}
                                        </>,
                                      ]}
                                      author={
                                        <span>
                                          <span className="authorname">{e1.name}</span>
                                          <span className="cmnt_date">{moment(e1.date).fromNow()}</span>
                                        </span>
                                      }
                                      avatar={
                                        <Avatar
                                          src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                                          alt="Han Solo"
                                        />
                                      }
                                      content={
                                        <Fragment>
                                          <Row gutter={20}>
                                            <span style={{ marginLeft: '15px' }}>{e1.message}</span>
                                          </Row>
                                        </Fragment>
                                      }
                                    ></Comment>
                                  );
                                })
                              : ' '}
                          </>
                        ) : (
                          <> </>
                        )}
                      </Comment>
                    );
                  })
                ) : (
                  <h3>No Replies Available</h3>
                )}
              </Cards>
            </Row>
            <Pagination
              defaultCurrent={1}
              defaultPageSize={5}
              onChange={handlePage}
              pageSize={5}
              pageSizeOptions={null}
              total={total}
            />
          </TabPane>
        </Tabs>
      </Main>
    </Fragment>
  );
}

export default Discipline;
