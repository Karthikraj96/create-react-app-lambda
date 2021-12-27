import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, Input, Select, Radio, Card, InputNumber } from 'antd';
const { Option } = Select;
import { faPlus, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
import moment from 'moment';
import ReactQuill from 'react-quill';
import { Form } from 'antd';
import 'react-quill/dist/quill.snow.css';
import _ from 'lodash';
import ReactHtmlParser from 'react-html-parser';
import { deleteQues } from '../../api/api';
function onlinequestion({
  isVisible,
  handleOk,
  handleOk2,
  isedit,
  handleCancel,
  questions,
  id,
  maxmark,
  date,
  testtitle,
  subject,
  record,
}) {
  let maxmark2 = maxmark ? maxmark : record ? record.maxMark : null;
  maxmark = maxmark2;
  let [type, setType] = useState(null);
  let [no, setNo] = useState(null);
  let [title, setTitle] = useState(null);
  let [option3, setOption3] = useState(null);
  let [option2, setOption2] = useState(null);
  let [correct, setCorrect] = useState(null);
  let [correct2, setCorrect2] = useState(null);
  let [data, setData] = useState([]);
  let [option1, setOption1] = useState([]);
  let [mark, setmark] = useState(null);
  let [no2, setno2] = useState(null);
  let [option4, setOption4] = useState(null);
  let [remMark, setRemMark] = useState(maxmark2);
  let [finalData, setFinalData] = useState([]);
  let [finalData2, setFinalData2] = useState([]);
  let [value, setValue] = useState('');
  useEffect(() => {
    if (finalData.length > 0) {
      setFinalData2(finalData2 => [...finalData2, finalData]);
    }
    if (finalData.length > 0) {
      if (finalData2.length > 0) {
        let m = maxmark;
        let remaing;
        finalData2.map((e, key) => {
          e.map((e1, key1) => {
            remaing = m - e1.quesMark;
          });
        });
        setRemMark(remaing);
      } else {
        let m = maxmark;
        let remaing;
        finalData.map((e, key) => {
          e.map((e1, key1) => {
            remaing = m - e1.quesMark;
          });
        });
        setRemMark(remaing);
      }
    } else if (finalData2.length > 0) {
      let m = maxmark;
      let remaing;
      finalData2.map((e, key) => {
        e.map((e1, key1) => {
          remaing = m - e1.quesMark;
        });
      });
      setRemMark(remaing);
    }
  }, [finalData]);
  useEffect(() => {
    if (questions) {
      if (questions.length > 0) {
        let dat = [];
        questions.map(e => {
          dat.push([e]);
        });
        setFinalData2(dat);
      }
    }
  }, [questions]);

  let handleCancel2 = () => {
    setFinalData2([]);
    handleCancel();
  };
  const handleType = value => {
    if (finalData.length > 0) {
      if (finalData.length <= no2 - 1) {
        Swal.fire({
          icon: 'error',
          title: 'Please Enter All The Question Details Of The Current Section',
        });
      } else if (data.length > 0) {
        setData([]);
        setType(value);
      } else {
        setFinalData([]);
        setType(value);
      }
    } else if (data.length > 0) {
      setData([]);
      setType(value);
    } else {
      setType(value);
    }
  };
  const handleNo = e => {
    setNo(e.target.value);
  };
  const handleTitle = e => {
    setTitle(e.target.value);
  };
  const handleoption3 = e => {
    setOption3(e.target.value);
  };
  const handleoption1 = e => {
    setOption1(e.target.value);
  };
  const handleoption2 = e => {
    setOption2(e.target.value);
  };
  const handleCorrect = e => {
    setCorrect(e.target.value);
  };
  const handleCorrect2 = e => {
    setCorrect2(e);
  };
  const handleoption4 = e => {
    setOption4(e.target.value);
  };
  const handleMark = e => {
    setmark(e);
  };
  const handleNoQueston = e => {
    let rem =remMark
    if (finalData.length > 0) {
      if (finalData2.length > 0) {
        let m = maxmark;
        let remaing;
        finalData2.map((e, key) => {
          e.map((e1, key1) => {
            remaing = m - e1.quesMark;
          });
        });
        rem = remaing
        setRemMark(remaing);
      } else {
        let m = maxmark;
        let remaing;
        finalData.map((e, key) => {
          e.map((e1, key1) => {
            remaing = m - e1.quesMark;
          });
        });
        rem = remaing
        setRemMark(remaing);
      }
    } else if (finalData2.length > 0) {
      let m = maxmark;
      let remaing;
      finalData2.map((e, key) => {
        e.map((e1, key1) => {
          remaing = m - e1.quesMark;
        });
      });
      rem = remaing
      setRemMark(remaing);
    }
    if (!rem) {
      let m = maxmark - mark * e;
      if (m < 0) {
        Swal.fire({
          icon: 'error',
          title: 'Created Marks Exceeds Maximum Mark ',
        });
      } else {
        setno2(e);
        setRemMark(m);
      }
    } else if (rem != 0) {
      let m = rem - mark * e;
      if (m < 0) {
        Swal.fire({
          icon: 'error',
          title: ' Created Marks Exceeds Maximum Mark ',
        });
      } else {
        setno2(e);
        setRemMark(m);
      }
    } else if (rem === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Created Marks Exceeds Maximum Mark ',
      });
    }
  };
  const handlesub2 = data => {
    setValue(data);
  };
  const handleDelete = (val2, key1) => {
    if (isedit) {
      if (finalData.length > 0) {
        let h = val2[0]._id;
        deleteQues(h)
          .then(res => {
            let dat3 = finalData2;
            let mark3 = val2.quesMark + (remMark ? remMark : 0);
            if (mark3 >= maxmark) {
              setRemMark(maxmark);
            } else {
              setRemMark(mark3);
            }
            dat3.splice(key1, 1);
            setFinalData2(finalData2 => [...finalData2, dat3]);
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error',
              text: e,
            });
          });
        let val = finalData;
        val.map((e, key) => {
          if (e) {
            if (_.isEqual(e, val2[0])) {
              val.splice(key, 1);
              setFinalData(val);
            }
          }
        });
      } else {
        let h = val2[0]._id;
        deleteQues(h)
          .then(res => {
            let dat3 = finalData2;
            let mark3 = val2.quesMark + (remMark ? remMark : 0);
            if (mark3 >= maxmark) {
              setRemMark(maxmark);
            } else {
              setRemMark(mark3);
            }
            dat3.splice(key1, 1);
            setFinalData2(finalData2 => [...finalData2, dat3]);
          })
          .catch(e => {
            Swal.fire({
              icon: 'error',
              title: 'Database Error',
              text: e,
            });
          });
      }
    } else {
      let dat = finalData2;
      let mark3 = val2.quesMark + (remMark ? remMark : 0);
      setRemMark(mark3);
      dat.splice(val2, 1);
      setFinalData2(finalData2 => [...finalData2, dat]);
      let val = finalData;
      val.map((e, key) => {
        if (e) {
          if (_.isEqual(e, val2[0])) {
            val.splice(e, 1);
            setFinalData(val);
          }
        }
      });
    }
  };
  const handleClick = () => {
    if (type === 'Trueorfalse') {
      if (finalData.length > 0) {
        if (data.length > 0) {
          if (title && no && value && correct2 && mark) {
            let da = {
              testID: record ? record._id : id,
              quesTitle: title,
              question_no: no,
              quesType: 'Trueorfalse',
              question: value,
              answer1: 'True',
              answer2: 'False',
              correctanswer: correct2,
              quesMark: mark,
            };
            setFinalData(finalData => [...finalData, da]);
            setData([]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Fill All the Details',
            });
          }
        } else if (finalData.length <= no2 - 1) {
          setNo(null);
          setValue(null);
          setCorrect(null);
          setOption1(null);
          setOption2(null);
          setOption3(null);
          setOption4(null);
          let da = (
            <>
              <Row>
                <Col>
                  <Form.Item label="Question No">
                    <Input
                      onChange={handleNo}
                      style={{ width: '150px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                      placeholder="No"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Question">
                    <ReactQuill theme="snow" value={value} onChange={handlesub2} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item label="Option 1">
                    <Input
                      defaultValue="True"
                      disabled
                      style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Option 2">
                    <Input
                      defaultValue="False"
                      disabled
                      style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Correct Answer">
                    <Select
                      onChange={handleCorrect2}
                      style={{ width: '200px', marginRight: '15px', marginTop: '5px', height: '30px' }}
                      placeholder="Select Answer"
                    >
                      <Option value="True">True </Option>
                      <Option value="False">False</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </>
          );
          let da3 = data;
          da3.push(da);
          setData([da3]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Maximum Allotment for Section Reached',
          });
        }
      } else if (data.length > 0) {
        if (title && no && value && correct2 && mark) {
          let da = {
            testID: record ? record._id : id,
            quesTitle: title,
            question_no: no,
            quesType: 'Trueorfalse',
            question: value,
            answer1: 'True',
            answer2: 'False',
            correctanswer: correct2,
            quesMark: mark,
          };
          setFinalData(finalData => [...finalData, da]);
          setData([]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Fill All the Details',
          });
        }
      } else if (data.length <= 0) {
        let da = (
          <>
            <Row>
              <Col>
                <Form.Item label="Question No">
                  <Input
                    onChange={handleNo}
                    style={{ width: '150px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    placeholder="No"
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Question">
                  <ReactQuill theme="snow" value={value} onChange={handlesub2} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item label="Option 1">
                  <Input
                    defaultValue="True"
                    disabled
                    style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Option 2">
                  <Input
                    defaultValue="False"
                    disabled
                    style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Correct Answer">
                  <Select
                    onChange={handleCorrect2}
                    style={{ width: '200px', marginRight: '15px', marginTop: '5px', height: '30px' }}
                    placeholder="Select Answer"
                  >
                    <Option value="True">True </Option>
                    <Option value="False">False</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </>
        );
        let da3 = data;
        da3.push(da);
        setData([da3]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Maximum Allotment for Section Reached',
        });
      }
    } else if (type === 'MultipleChoice') {
      if (finalData.length > 0) {
        if (data.length > 0) {
          if (title && no && value && option1 && option2 && option3 && option4 && correct && mark) {
            let da = {
              testID: record ? record._id : id,
              quesTitle: title,
              question_no: no,
              quesType: 'MultipleChoice',
              question: value,
              answer1: option1,
              answer2: option2,
              answer3: option3,
              answer4: option4,
              correctanswer: correct,
              quesMark: mark,
            };
            setFinalData(finalData => [...finalData, da]);
            setData([]);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Fill All the Details',
            });
          }
        } else if (finalData.length <= no2 - 1) {
          setNo(null);
          setValue(null);
          setCorrect(null);
          setOption1(null);
          setOption2(null);
          setOption3(null);
          setOption4(null);
          let da = (
            <>
              <Row>
                <Col>
                  <Form.Item label="Question No">
                    <Input
                      onChange={handleNo}
                      style={{ width: '150px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                      placeholder="No"
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Question">
                    <ReactQuill theme="snow" value={value} onChange={handlesub2} />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Item label="Option 1">
                    <Input
                      onChange={handleoption1}
                      style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Option 2">
                    <Input
                      onChange={handleoption2}
                      style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Option 3">
                    <Input
                      onChange={handleoption3}
                      style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Option 4">
                    <Input
                      onChange={handleoption4}
                      style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    />
                  </Form.Item>
                </Col>
                <Col>
                  <Form.Item label="Correct Answer">
                    <Input
                      onChange={handleCorrect}
                      style={{ width: '150px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </>
          );
          let da3 = data;
          da3.push(da);
          setData([da3]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Maximum Allotment for Section Reached',
          });
        }
      } else if (data.length > 0) {
        if (title && no && value && option1 && option2 && option3 && option4 && correct && mark) {
          let da = {
            testID: record ? record._id : id,
            quesTitle: title,
            question_no: no,
            quesType: 'MultipleChoice',
            question: value,
            answer1: option1,
            answer2: option2,
            answer3: option3,
            answer4: option4,
            correctanswer: correct,
            quesMark: mark,
          };
          setFinalData(finalData => [...finalData, da]);
          setData([]);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Fill All the Details',
          });
        }
      } else if (data.length <= 0) {
        let da = (
          <>
            <Row>
              <Col>
                <Form.Item label="Question No">
                  <Input
                    onChange={handleNo}
                    style={{ width: '150px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                    placeholder="No"
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Question">
                  <ReactQuill theme="snow" value={value} onChange={handlesub2} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Item label="Option 1">
                  <Input
                    onChange={handleoption1}
                    style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Option 2">
                  <Input
                    onChange={handleoption2}
                    style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Option 3">
                  <Input
                    onChange={handleoption3}
                    style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Option 4">
                  <Input
                    onChange={handleoption4}
                    style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                  />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item label="Correct Answer">
                  <Input
                    onChange={handleCorrect}
                    style={{ width: '150px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </>
        );
        let da3 = data;
        da3.push(da);
        setData([da3]);
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Maximum Allotment for Section Reached',
        });
      }
    }
  };
  return (
    <Modal
      destroyOnClose={true}
      title={isedit ? 'Update Exam Questions' : 'Create Exam Questions'}
      visible={isVisible}
      onOk={() => {
        if (isedit) {
          handleOk2(finalData2);
        } else {
          handleOk(finalData2);
        }
      }}
      onCancel={handleCancel2}
      okText={isedit ? 'Update' : 'Create'}
      cancelText="Cancel"
      width="90%"
    >
      <Card
        title={testtitle ? testtitle : record ? record.title : 'title'}
        style={{ width: '100%', 'text-align': 'center' }}
      >
        <p style={{ width: '100%', 'text-align': 'center' }}>
          Date :{' '}
          {date ? moment(date).format('DD-MM-YYYY') : record ? moment(record.schedule).format('DD-MM-YYYY') : 'date'} |
          Subject : {subject ? subject : record ? <> {record.subject} </> : 'subject'} | Max-Mark :
          {maxmark ? maxmark : record ? <> {record.maxMark} </> : 'mark'}
        </p>
      </Card>
      <br></br>
      <br></br>
      {finalData2
        ? finalData2.length > 0
          ? finalData2.map((e, key) => {
              if (e != null) {
                if (e[0]) {
                  if (Array.isArray(e[0])) {
                  } else if (e[0].quesType === 'Trueorfalse') {
                    return (
                      <>
                        <Row>
                          <Col key={e[0].question_no}>
                            <h3
                              style={{
                                fontSize: '20px',
                                lineHeight: '32px',
                                marginRight: '15px',
                                marginTop: '5px',
                                height: '40px',
                              }}
                            >
                              {e[0].question_no}
                            </h3>
                          </Col>
                          <Col key={e[0].question}>
                            <h3
                              style={{
                                fontSize: '20px',
                                lineHeight: '32px',
                                marginRight: '15px',
                                marginTop: '5px',
                                height: '40px',
                              }}
                            >
                              {ReactHtmlParser(e[0].question)}
                            </h3>
                          </Col>
                          <Radio.Group>
                            {e[0].answer1 ? (
                              <Radio
                                key={e[0].answer1}
                                style={{
                                  fontSize: '20px',
                                  lineHeight: '32px',
                                  marginRight: '15px',
                                  marginTop: '5px',
                                  height: '40px',
                                }}
                                value={e[0].answer1}
                              >
                                {e[0].answer1}
                              </Radio>
                            ) : null}
                            {e[0].answer2 ? (
                              <Radio
                                key={e[0].answer2}
                                style={{
                                  fontSize: '20px',
                                  lineHeight: '32px',
                                  marginRight: '15px',
                                  marginTop: '5px',
                                  height: '40px',
                                }}
                                value={e[0].answer2}
                              >
                                {e[0].answer2}
                              </Radio>
                            ) : null}
                          </Radio.Group>
                          <Col>
                            <FontAwesomeIcon
                              icon={faTrash}
                              key={key + 1}
                              onClick={event => {
                                handleDelete(e, key);
                              }}
                              style={{
                                fontSize: '20px',
                                lineHeight: '32px',
                                marginRight: '15px',
                                marginTop: '5px',
                                height: '40px',
                                color: 'red ',
                              }}
                            ></FontAwesomeIcon>
                          </Col>
                        </Row>
                      </>
                    );
                  } else if (e[0].quesType === 'MultipleChoice') {
                    return (
                      <>
                        <Row>
                          <Col key={e[0].question_no}>
                            <h3
                              style={{
                                fontSize: '20px',
                                lineHeight: '32px',
                                marginRight: '15px',
                                marginTop: '5px',
                                height: '40px',
                              }}
                            >
                              {e[0].question_no}
                            </h3>
                          </Col>
                          <Col key={e[0].question}>
                            <h3
                              style={{
                                fontSize: '20px',
                                lineHeight: '32px',
                                marginRight: '15px',
                                marginTop: '5px',
                                height: '40px',
                              }}
                            >
                              {ReactHtmlParser(e[0].question)}
                            </h3>
                          </Col>
                          <Radio.Group>
                            {e[0].answer1 ? (
                              <Radio
                                key={e[0].answer1}
                                style={{
                                  fontSize: '20px',
                                  lineHeight: '32px',
                                  marginRight: '15px',
                                  marginTop: '5px',
                                  height: '40px',
                                }}
                                value={e[0].answer1}
                              >
                                {e[0].answer1}
                              </Radio>
                            ) : null}
                            {e[0].answer2 ? (
                              <Radio
                                key={e[0].answer2}
                                style={{
                                  fontSize: '20px',
                                  lineHeight: '32px',
                                  marginRight: '15px',
                                  marginTop: '5px',
                                  height: '40px',
                                }}
                                value={e[0].answer2}
                              >
                                {e[0].answer2}
                              </Radio>
                            ) : null}
                            {e[0].answer3 ? (
                              <Radio
                                key={e[0].answer3}
                                style={{
                                  fontSize: '20px',
                                  lineHeight: '32px',
                                  marginRight: '15px',
                                  marginTop: '5px',
                                  height: '40px',
                                }}
                                value={e[0].answer3}
                              >
                                {e[0].answer3}
                              </Radio>
                            ) : null}
                            {e[0].answer4 ? (
                              <Radio
                                key={e[0].answer4}
                                style={{
                                  fontSize: '20px',
                                  lineHeight: '32px',
                                  marginRight: '15px',
                                  marginTop: '5px',
                                  height: '40px',
                                }}
                                value={e[0].answer4}
                              >
                                {e[0].answer4}
                              </Radio>
                            ) : null}
                          </Radio.Group>
                          <Col>
                            <FontAwesomeIcon
                              key={key + 2}
                              icon={faTrash}
                              onClick={event => {
                                handleDelete(e, key);
                              }}
                              style={{
                                fontSize: '20px',
                                lineHeight: '32px',
                                marginRight: '15px',
                                marginTop: '5px',
                                height: '40px',
                                color: 'red ',
                              }}
                            ></FontAwesomeIcon>
                          </Col>
                        </Row>
                      </>
                    );
                  }
                }
              }
            })
          : ''
        : ''}
      <Row>
        <Col>
          <Input
            onChange={handleTitle}
            // value={title ? title : ''}
            style={{ width: '200px', marginRight: '15px', marginTop: '5px', height: '40px' }}
            placeholder=" Question Title"
          />
        </Col>
        <Col>
          <Select
            onChange={handleType}
            style={{ width: '200px', marginRight: '15px', marginTop: '5px', height: '30px' }}
            placeholder="Question Type"
          >
            <Option value="Trueorfalse">True or False</Option>
            <Option value="MultipleChoice">Multiple Choice</Option>
          </Select>
        </Col>
        <Col>
          <InputNumber
            onChange={handleMark}
            type="number"
            style={{ width: '200px', marginRight: '15px', marginTop: '5px', height: '40px' }}
            placeholder=" Marks For Question"
          />
        </Col>
        <Col>
          <InputNumber
            type="number"
            onChange={handleNoQueston}
            style={{ width: '200px', marginRight: '15px', marginTop: '5px', height: '40px' }}
            placeholder=" No Of Question"
          />
        </Col>
        <Col>
          <FontAwesomeIcon
            icon={faPlus}
            onClick={handleClick}
            style={{ marginRight: '15px', marginTop: '5px', height: '35px', fontSize: 20, color: 'grey' }}
          />
        </Col>
      </Row>

      <br />
      {data.length > 0
        ? data.map((e, key) => {
            return e;
          })
        : null}
    </Modal>
  );
}

export default onlinequestion;

{
  /* <Form.Item label="Question" required tooltip="This is a required field">
<ReactQuill theme="snow" value={value} onChange={handlesub2}/>
</Form.Item> */
}
