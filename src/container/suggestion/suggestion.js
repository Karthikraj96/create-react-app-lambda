import React, { useState, useEffect } from 'react';
import { Comment, Avatar } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { Row, Col, Skeleton, Pagination, Input } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Fragment } from 'react';
import { Tag, Divider } from 'antd';
import { Tabs } from 'antd';
import { Select } from 'antd';
import {
  decodedata,
  SuggestionClosed,
  PostTeacherSuggestion,
  GetSuggestionTotal,
  PostParentSuggestion,
  getParentSuggestion,
  getTeacherSuggestion,
} from '../../api/api';
const { TabPane } = Tabs;
import Swal from 'sweetalert2';
import {
  CheckCircleOutlined,
  SyncOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  ClockCircleOutlined,
  MinusCircleOutlined,
} from '@ant-design/icons';

import { Rate } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment';
const desc = ['Terrible', 'Bad', 'Normal', 'Good', 'Wonderful'];

function Discipline() {
  let [tokendata, setTokendata] = useState(null);
  let org = useSelector(store => store.getOrgReducer);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedOrg2, setselectedOrg2] = useState(decodedata.orgId);
  let [update, setUpdate] = useState(0);
  let [update2, setUpdate2] = useState(0);
  let [data, setData] = useState(null);
  let [data4, setData4] = useState(null);
  let [data1, setData1] = useState([]);
  let [data2, setData2] = useState([]);
  let [limit, setLimit] = useState(5);
  let [skip, setSkip] = useState(0);
  let [limit2, setLimit2] = useState(5);
  let [skip2, setSkip2] = useState(0);
  let [total, setTotal] = useState(null);
  let [totalp, setTotalp] = useState(null);

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
    GetSuggestionTotal(data2)
      .then(res => {
        setTotalp(res.data.TotalParent);
        setTotal(res.data.TotalTeacher);
      })
      .catch(e => {
        console.log(e);
      });
    getTeacherSuggestion(data3)
      .then(response => {
        setData2(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg2, update]);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let data3 = {
      orgId: selectedOrg,
      resolve: data4,
      skip: skip2,
      limit: limit2,
    };
    let data2 = {
      orgId: selectedOrg,
    };
    GetSuggestionTotal(data2)
      .then(res => {
        setTotalp(res.data.TotalParent);
        setTotal(res.data.TotalTeacher);
      })
      .catch(e => {
        console.log(e);
      });
    getParentSuggestion(data3)
      .then(response => {
        setData1(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }, [selectedOrg, update2]);
  const handleInsti = value => {
    setselectedOrg(value);
  };
  const handlePage = (page, pageSize) => {
    let sk = page == 1 ? 0 : (page - 1) * 5;
    let lm = sk + 5;
    setLimit(lm);
    setSkip(sk);
    setUpdate(update + 1);
  };
  const handlePage2 = (page, pageSize) => {
    let sk = page == 1 ? 0 : (page - 1) * 5;
    let lm = sk + 5;
    setLimit2(lm);
    setSkip2(sk);
    setUpdate2(update2 + 1);
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
          suggestion_id: value2._id,
          name: 'Admin',
          message: value,
        };
        return PostTeacherSuggestion(dataa)
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
  const handleCommentParent = value2 => {
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
          suggestion_id: value2._id,
          name: 'Admin',
          message: value,
        };
        return PostParentSuggestion(dataa)
          .then(response => {
            setUpdate2(update2 + 1);
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
          suggestion_id: value._id,
        };
        return SuggestionClosed(dataa)
          .then(response => {
            setUpdate(update + 1);
            setUpdate2(update2 + 1);
          })
          .catch(error => {
            Swal.showValidationMessage(`Request failed: ${error}`);
          });
      },
    }).then(result => {
      if (result.isConfirmed === true) {
        Swal.fire({
          icon: 'success',
          title: 'Closed Deleted Succesfully',
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
  const handleInput2 = value => {
    setData4(value);
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
        <Tabs defaultActiveKey="1">
          <TabPane tab="Parents" key="1">
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
                        </li>
                      ) : (
                        ''
                      )}
                      <li className="active">
                        <Select placeholder="Select Query Status" onChange={handleInput2} style={{ width: '200px' }}>
                          <Option value="1">Resolved</Option>
                          <Option value="2">Pending</Option>
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
                {data1.length > 0 ? (
                  data1.map((e, key) => {
                    return (
                      <Comment
                        actions={[
                          <>
                            {e.closed ? (
                              <> </>
                            ) : (
                              <>
                                {' '}
                                <span onClick={() => handleCommentParent(e)} key={'comment-nested-reply-to' + key}>
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
                              {e.creator_name} Guardian Of {e.student_name}
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
                                <Tag color="geekblue">{e.type}</Tag>
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
                                                onClick={() => handleCommentParent(e)}
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
              onChange={handlePage2}
              pageSize={5}
              pageSizeOptions={null}
              total={totalp}
            />
          </TabPane>
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
                              {e.student_name} Created by {e.creator_name}
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
                                <Tag color="geekblue">{e.type}</Tag>
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
