import React, { useState, useEffect } from 'react';
import { Modal, Button, Input, Form, Select, Row, Col, Card, Tooltip, InputNumber } from 'antd';
import { faPlus, faTrash, faRupeeSign } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const layout = {
  labelCol: { span: 6 },
};
const { Option } = Select;
let FeeTypeModal = ({ visible, handleOk, record, setRecord, handleCancel, grade, year, org, tokendata, partData }) => {
  let [termName, setTermName] = useState(null);
  useEffect(() => {}, [record]);

  let onChange = (value, name) => {
    setRecord({ ...record, [name]: value });
  };
  let handleAdd = () => {
    let val = {
      t_name: termName,
      particulars: [
        {
          p_name: null,
          p_fees: null,
        },
      ],
    };
    let n = record.term ? (record.term.length ? record.term.length : 0) : 0;
    if (record.term) {
      setRecord({ ...record, ['term']: [...record.term.slice(0, n), val, ...record.term.slice(n + 1)] });
      setTermName(null);
    } else {
      setRecord({ ...record, ['term']: [val] });
    }
  };
  let handleTname = (value, key) => {
    let va = record.term[key];
    va.t_name = value;
    setRecord({ ...record, ['term']: [...record.term.slice(0, key), va, ...record.term.slice(key + 1)] });
  };
  let handleParti = (value, key1, key2) => {
    let va = record.term[key1];
    va.particulars[key2].p_name = value;
    setRecord({ ...record, ['term']: [...record.term.slice(0, key1), va, ...record.term.slice(key1 + 1)] });
  };
  let handleFees = (value, key1, key2) => {
    if (!Number(value)) {
      return;
    } else {
      let min = record.term[key1].particulars[key2].p_fees ? record.term[key1].particulars[key2].p_fees : 0;
      let add = (record.term[key1].t_total ? record.term[key1].t_total : 0) - min;
      let va = record.term[key1];
      va.t_total = (add ? add : 0) + value;
      va.particulars[key2].p_fees = value;
      let add2 = (record.fees_total ? record.fees_total : 0) - min + value;
      setRecord({
        ...record,
        ['term']: [...record.term.slice(0, key1), va, ...record.term.slice(key1 + 1)],
        ['fees_total']: add2,
      });
    }
  };
  let handleAddParticular = (key1, key2) => {
    let val = record.term[key1];
    let partDatatoAdd = {
      p_name: null,
      p_fees: null,
    };
    val.particulars.push(partDatatoAdd);
    setRecord({ ...record, ['term']: [...record.term.slice(0, key1), val, ...record.term.slice(key1 + 1)] });
  };
  let handleDeleteParticular = (key1, key2) => {
    let val = record.term;
    let part = val[key1].particulars;
    let min = part[key2].p_fees ? part[key2].p_fees : 0;
    let t_total = val[key1].t_total ? val[key1].t_total : null;
    let fees_total = record.fees_total ? record.fees_total : null;
    let feeval = fees_total - min;
    if (part.length <= 1) {
      val.splice(key1, 1);
      setRecord({ ...record, ['term']: val, ['fees_total']: feeval });
    } else {
      part.splice(key2, 1);
      let val2 = val[key1];
      val2.particulars = part;
      val2.t_total = t_total ? t_total - min : 0;
      setRecord({
        ...record,
        ['term']: [...record.term.slice(0, key1), val2, ...record.term.slice(key1 + 1)],
        ['fees_total']: feeval,
      });
    }
  };
  let handleDeleteTerm = key => {
    let val = record.term;
    let t_total = val[key].t_total;
    let fees_total = record.fees_total;
    let feeval = fees_total - t_total;
    val.splice(key, 1);
    setRecord({ ...record, ['term']: val, ['fees_total']: feeval });
  };
  return (
    <Modal
      destroyOnClose={true}
      style={{ top: 20 }}
      title={record.id ? 'Update Fee ' : 'Create Fee '}
      visible={visible}
      onCancel={() => {
        setRecord({});
        handleCancel();
      }}
      okText={record.id ? 'Update' : 'Create'}
      cancelText="Cancel"
      footer={[
        <Button key="back" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button type="primary" htmlType="submit" form="Myform">
          {record.id ? 'Update' : 'Create'}
        </Button>,
      ]}
      width={'80%'}
    >
      <Form
        preserve={false}
        {...layout}
        initialValues={record}
        id="Myform"
        onFinish={() => handleOk(record)}
        autoComplete="off"
      >
        {tokendata == '1' ? (
          <Form.Item
            label=" Select Organization"
            name="organization_id"
            rules={[{ required: true, message: 'Please enter the type!' }]}
          >
            <Select
              mode="multiple"
              onChange={value => {
                onChange(value, 'organization_id');
              }}
            >
              {org.map((e, key) => {
                return (
                  <Option key={key} value={e.organization_id}>
                    {e.instituteName}
                  </Option>
                );
              })}
            </Select>
          </Form.Item>
        ) : (
          ''
        )}
        <Form.Item label="Select Grade" name="grade_id" rules={[{ required: true, message: 'Please enter the type!' }]}>
          <Select
            onChange={value => {
              onChange(value, 'grade_id');
            }}
          >
            {grade.map((g, i) => {
              return (
                <Option key={12554 + i} value={g.id}>
                  {g.id}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="Select Year" name="year" rules={[{ required: true, message: 'Please enter the type!' }]}>
          <Select
            onChange={value => {
              onChange(value, 'year');
            }}
          >
            {year.map((e, key) => {
              return (
                <Option key={key} value={e.year}>
                  {e.year}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label=" Add Section"
          name="Term"
          rules={[{ required: false, message: 'Please enter the term details!' }]}
        >
          {' '}
          <Row>
            <Col span={20}>
              <Input
                value={termName}
                onChange={e => {
                  setTermName(e.target.value);
                }}
              />
            </Col>
            <Col span={2} style={{ margin: '10px' }}>
              <FontAwesomeIcon icon={faPlus} onClick={() => handleAdd()} style={{ fontSize: 25, color: 'blue ' }} />
            </Col>
          </Row>
        </Form.Item>
      </Form>
      {record.term
        ? record.term.map((e1, key1) => {
            return (
              <Row style={{ marginTop: '10px' }} justify="center" gutter={25}>
                <Card style={{ width: '80%' }} title={'Fee Breakup For' + ' ' + e1.t_name}>
                  <Row justify="center">
                    <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                      <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Particulars &nbsp; &nbsp; </p>
                      <p style={{ color: 'black', fontSize: '14px' }}></p>
                    </Col>
                    <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                      <p style={{ fontSize: '14px', fontWeight: 'bold' }}>Fees &nbsp; &nbsp; </p>
                      <p style={{ color: 'black', fontSize: '14px' }}></p>
                    </Col>
                    <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                      <p style={{ fontSize: '14px', fontWeight: 'bold' }}>
                        {' '}
                        Total Amount {'='} {e1.t_total} &nbsp; &nbsp;{' '}
                      </p>
                      <p style={{ color: 'black', fontSize: '14px' }}></p>
                    </Col>
                  </Row>
                  <Row></Row>
                  <br />
                  {e1.particulars
                    ? e1.particulars.map((e2, key2) => {
                        return (
                          <>
                            <Row>
                              <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                                <Select
                                  style={{ width: '70%', height: '40px', padding: '2px' }}
                                  value={e2.p_name}
                                  size="middle"
                                  onChange={value => {
                                    handleParti(value, key1, key2);
                                  }}
                                >
                                  {partData.map(e3 => {
                                    return <Option value={e3.particulars}>{e3.particulars}</Option>;
                                  })}
                                </Select>
                              </Col>
                              <Col sm={24} xs={24} lg={10} xl={10} xxl={8}>
                                <InputNumber
                                  min={0}
                                  max={1000000}
                                  type="number"
                                  onChange={value => {
                                    handleFees(value, key1, key2);
                                  }}
                                  value={e2.p_fees}
                                  style={{ width: '70%', height: '40px', padding: '2px' }}
                                  placeholder=" Fees"
                                />
                              </Col>
                              <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                                <Tooltip title="Add Particular">
                                  <FontAwesomeIcon
                                    icon={faPlus}
                                    onClick={() => {
                                      handleAddParticular(key1, key2);
                                    }}
                                    style={{ fontSize: 25, color: 'blue ', marginTop: '2px', marginRight: '15' }}
                                  />
                                </Tooltip>
                                <Tooltip title="Delete Particular">
                                  <FontAwesomeIcon
                                    icon={faTrash}
                                    onClick={() => {
                                      handleDeleteParticular(key1, key2);
                                    }}
                                    style={{ fontSize: 25, color: 'red ', marginTop: '2px' }}
                                  />
                                </Tooltip>
                              </Col>
                            </Row>
                            <br />
                          </>
                        );
                      })
                    : ''}
                  <br />
                </Card>
              </Row>
            );
          })
        : ' '}
      {record.term ? (
        record.term.length > 0 ? (
          <Row style={{ padding: '20px', marginTop: '10px' }} justify="center" gutter={25}>
            <Card style={{ width: '80%' }} title="Fee Total Breakup">
              {record.term.map((e, key) => {
                return (
                  <Row style={{ padding: '20px' }}>
                    <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                      {e.t_name} Total
                    </Col>
                    <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                      <FontAwesomeIcon icon={faRupeeSign} />
                      {' ' + e.t_total.toLocaleString('en-IN')}/-
                    </Col>
                    <Col sm={24} xs={24} lg={6} xl={6} xxl={6}>
                      <Tooltip title="Delete Term">
                        <FontAwesomeIcon
                          icon={faTrash}
                          onClick={() => {
                            handleDeleteTerm(key);
                          }}
                          style={{ fontSize: 25, color: 'red ' }}
                        />
                      </Tooltip>
                    </Col>
                  </Row>
                );
              })}
              <br />
              <Row style={{ padding: '20px', background: '#f4f5f7', borderRadius: '10px' }}>
                <Col sm={24} xs={24} lg={8} xl={8} xxl={8}>
                  Total Amount
                </Col>
                <Col sm={24} xs={24} lg={10} xl={10} xxl={10}>
                  <FontAwesomeIcon icon={faRupeeSign} /> {' ' + record.fees_total.toLocaleString('en-IN')}/-
                </Col>
              </Row>
              <br />
            </Card>
          </Row>
        ) : (
          <></>
        )
      ) : (
        ''
      )}
    </Modal>
  );
};

export default FeeTypeModal;
