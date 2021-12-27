import React, { useState } from 'react';
import { Modal, Row, Col, Input, Select, Rate, Radio } from 'antd';
const { Option } = Select;
import { faPlus, faTrash } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Swal from 'sweetalert2';
function CreateSurveyModal({ isVisible, handleOk, handleCancel, id }) {
  let [type, setType] = useState(null);
  let [ques, setques] = useState(null);
  let [no, setNo] = useState(null);
  let [start, setstart] = useState(null);
  let [end, setend] = useState(null);
  let [label1, setlabel1] = useState(null);
  let [label2, setlabel2] = useState(null);
  let [data, setData] = useState([]);
  let [finalData, setFinalData] = useState([]);
  const handleType = value => {
    setType(value);
  };
  const handleques = e => {
    setques(e.target.value);
  };
  const handleNo = e => {
    setNo(e.target.value);
  };
  const handleStart = e => {
    setstart(e.target.value);
  };
  const handleLable = e => {
    setlabel1(e.target.value);
  };
  const handleLabel2 = e => {
    setlabel2(e.target.value);
  };
  const handleEnd = e => {
    setend(e.target.value);
  };
  const handleDelete = val2 => {
    let dat = finalData;
    dat.splice(val2, 1);
    setFinalData(finalData => [...finalData, dat]);
  };
  const handleClick = () => {
    if (type === 'Fill') {
      if (ques === null) {
        Swal.fire({
          icon: 'error',
          title: 'Enter the Question to Continue',
        });
      } else if (no === null) {
        Swal.fire({
          icon: 'error',
          title: 'Enter the Serial No to Continue',
        });
      } else {
        let da = {
          quesType: type,
          question: ques,
          quesNo: no,
          survey_id: id,
        };
        setFinalData(finalData => [...finalData, da]);
      }
    } else if (type === 'Option') {
      if (data.length > 0) {
        if (ques === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the Question to Continue',
          });
        } else if (start === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the Option 1  to Continue',
          });
        } else if (label1 === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the Option2 Value to Continue',
          });
        } else if (no === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the Serial No to Continue',
          });
        } else {
          let da = {
            quesNo: no,
            quesType: type,
            option: {
              option1: start,
              option2: label1,
              option3: end,
              option4: label2,
            },
            question: ques,
            survey_id: id,
          };
          setFinalData(finalData => [...finalData, da]);
          setData([]);
        }
      } else {
        let da = (
          <Row>
            <Col>
              <Input
                onChange={handleStart}
                style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                placeholder="Option1"
              />
            </Col>
            <Col>
              <Input
                onChange={handleLable}
                style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                placeholder="Option2"
              />
            </Col>{' '}
            <Col>
              <Input
                onChange={handleEnd}
                style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                placeholder="Option3"
              />
            </Col>{' '}
            <Col>
              <Input
                onChange={handleLabel2}
                style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                placeholder="Option4"
              />
            </Col>{' '}
          </Row>
        );
        let da3 = data;
        da3.push(da);
        setData([da3]);
      }
    } else if (type === 'Linear') {
      if (data.length > 0) {
        if (ques === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the Question to Continue',
          });
        } else if (end === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the Ending No to Continue',
          });
        } else if (start === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the Starting No to Continue',
          });
        } else if (label2 === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the label2 Value to Continue',
          });
        } else if (label1 === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the label Value to Continue',
          });
        } else if (no === null) {
          Swal.fire({
            icon: 'error',
            title: 'Enter the Serial No to Continue',
          });
        } else {
          let n = end-start
          let da = {
            quesNo: no,
            quesType: type,
            rating:n,
            start: start,
            end: end,
            question: ques,
            label1: label1,
            label2: label2,
            survey_id: id,
          };
          console.log("da",da)
          setFinalData(finalData => [...finalData, da]);
          setData([]);
        }
      } else {
        let da = (
          <Row>
            <Col>
              <Input
                onChange={handleStart}
                style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                placeholder="Starting"
              />
            </Col>
            <Col>
              <Input
                onChange={handleLable}
                style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                placeholder="Label1"
              />
            </Col>{' '}
            <Col>
              <Input
                onChange={handleEnd}
                style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                placeholder="Ending"
              />
            </Col>{' '}
            <Col>
              <Input
                onChange={handleLabel2}
                style={{ width: '100px', marginRight: '15px', marginTop: '5px', height: '40px' }}
                placeholder="Label2"
              />
            </Col>{' '}
          </Row>
        );
        let da3 = data;
        da3.push(da);
        setData([da3]);
      }
    }
  };
  return (
    <Modal destroyOnClose={true}
      title="Create Survey Questions"
      visible={isVisible}
      onOk={() => handleOk(finalData)}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      width="50%"
    >
      {finalData
        ? finalData.length > 0
          ? finalData.map((e, key) => {
              if (e.quesType === 'Fill') {
                return (
                  <>
                    <Row>
                      <Col>
                        <h3
                          style={{
                            fontSize: '20px',
                            lineHeight: '32px',
                            marginRight: '15px',
                            marginTop: '5px',
                            height: '40px',
                          }}
                        >
                          {e.quesNo}
                        </h3>
                      </Col>
                      <Col>
                        <h3
                          style={{
                            fontSize: '20px',
                            lineHeight: '32px',
                            marginRight: '15px',
                            marginTop: '5px',
                            height: '40px',
                          }}
                        >
                          {e.question}
                        </h3>
                      </Col>
                      <Col>
                        <Input
                          placeholder={e.question}
                          style={{
                            fontSize: '20px',
                            lineHeight: '32px',
                            width: '200px',
                            marginRight: '15px',
                            marginTop: '5px',
                            height: '40px',
                          }}
                        ></Input>
                      </Col>
                      <Col>
                        <FontAwesomeIcon
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
              } else if (e.quesType === 'Linear') {
                return (
                  <>
                    <Row>
                      <Col>
                        <h3
                          style={{
                            fontSize: '20px',
                            lineHeight: '32px',
                            marginRight: '15px',
                            marginTop: '5px',
                            height: '40px',
                          }}
                        >
                          {e.quesNo}
                        </h3>
                      </Col>
                      <Col>
                        <h3
                          style={{
                            fontSize: '20px',
                            lineHeight: '32px',
                            marginRight: '15px',
                            marginTop: '5px',
                            height: '40px',
                          }}
                        >
                          {e.question}
                        </h3>
                      </Col>
                      <Col>
                        <Rate
                          count={e.rating}
                          style={{
                            fontSize: '20px',
                            lineHeight: '32px',
                            marginRight: '15px',
                            marginTop: '5px',
                            height: '40px',
                          }}
                        />
                      </Col>
                      <Col>
                        <FontAwesomeIcon
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
              } else if (e.quesType === 'Option') {
                return (
                  <>
                    <Row>
                      <Col>
                        <h3
                          style={{
                            fontSize: '20px',
                            lineHeight: '32px',
                            marginRight: '15px',
                            marginTop: '5px',
                            height: '40px',
                          }}
                        >
                          {e.quesNo}
                        </h3>
                      </Col>
                      <Col>
                        <h3
                          style={{
                            fontSize: '20px',
                            lineHeight: '32px',
                            marginRight: '15px',
                            marginTop: '5px',
                            height: '40px',
                          }}
                        >
                          {e.question}
                        </h3>
                      </Col>
                      <Radio.Group >
                        {e.option.option1 ? (
                          <Radio
                            style={{
                              fontSize: '20px',
                              lineHeight: '32px',
                              marginRight: '15px',
                              marginTop: '5px',
                              height: '40px',
                            }}
                            value={e.option.option1}
                          >
                            {e.option.option1}
                          </Radio>
                        ) : null}
                        {e.option.option2 ? (
                          <Radio
                            style={{
                              fontSize: '20px',
                              lineHeight: '32px',
                              marginRight: '15px',
                              marginTop: '5px',
                              height: '40px',
                            }}
                            value={e.option.option2}
                          >
                            {e.option.option2}
                          </Radio>
                        ) : null}
                        {e.option.option3 ? (
                          <Radio
                            style={{
                              fontSize: '20px',
                              lineHeight: '32px',
                              marginRight: '15px',
                              marginTop: '5px',
                              height: '40px',
                            }}
                            value={e.option.option3}
                          >
                            {e.option.option3}
                          </Radio>
                        ) : null}
                        {e.option.option4 ? (
                          <Radio
                            style={{
                              fontSize: '20px',
                              lineHeight: '32px',
                              marginRight: '15px',
                              marginTop: '5px',
                              height: '40px',
                            }}
                            value={e.option.option4}
                          >
                            {e.option.option4}
                          </Radio>
                        ) : null}
                      </Radio.Group>
                      <Col>
                        <FontAwesomeIcon
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
            })
          : null
        : null}
      <Row>
        <Col>
          <Input
            onChange={handleNo}
            style={{ width: '50px', marginRight: '15px', marginTop: '5px', height: '40px' }}
            placeholder="No"
          />
        </Col>{' '}
        <Col>
          <Input
            onChange={handleques}
            style={{ width: '200px', marginRight: '15px', marginTop: '5px', height: '40px' }}
            placeholder="Survey Question"
          />
        </Col>
        <Col>
          <Select
            onChange={handleType}
            style={{ width: '200px', marginRight: '15px', marginTop: '5px', height: '30px' }}
            placeholder="Question Type"
          >
            <Option value="Fill">Fill</Option>
            <Option value="Option">Option</Option>
            <Option value="Linear">Linear</Option>
          </Select>
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
            return <Row>{e} </Row>;
          })
        : null}
    </Modal>
  );
}

export default CreateSurveyModal;
