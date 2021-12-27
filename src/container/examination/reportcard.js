import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton, Tag } from 'antd';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import { Main } from '../styled';
import Heading from '../../components/heading/heading';
import {
  ChartjsBarChart,
  ChartjsHorizontalChart,
  ChartjsStackedChart,
  ChartjsLineChart,
  ChartjsAreaChart,
  ChartjsBarChartTransparent,
  ChartjsDonutChart,
  ChartjsPieChart,
} from '../../components/charts/chartjs';
import { useHistory } from 'react-router-dom';
import { Fragment } from 'react';
import { Input, Space, Drawer } from 'antd';
import CustomTable from '../fee/dashboard/Components/Table';
import { Tabs } from 'antd';
const { TabPane } = Tabs;
import { Form } from 'antd';
import { Select, Divider } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
const { Option } = Select;
import FeatherIcon from 'feather-icons-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
  faThumbsUp,
  faThumbsDown,
  faPaperclip,
} from '@fortawesome/pro-duotone-svg-icons';
import CreateEditExam from './createeditexam';
// import NewLesson from './newLessonModal';
// import './style.css';
import { Progress } from 'antd';
import { DatePicker, Radio } from 'antd';
// import DocumentsModal from './documentsModal';
const { RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 24, offset: 0 },
  },
};
function ReportCard() {
  const history = useHistory();
  const [isVisible, setisVisible] = useState(false);
  const [editDrawVisible, setEditDrawVisible] = useState(false);
  const [viewResultDrawVisible, setviewResultDrawVisible] = useState(false);

  const handleOk = () => {
    setisVisible(false);
  };
  const showDrawer = () => {
    setEditDrawVisible(true);
  };
  const onViewClose = () => {
    setviewResultDrawVisible(false);
  };
  const onClose = () => {
    setEditDrawVisible(false);
  };
  const handleCancel = () => {
    setisVisible(false);
  };
  const resCols = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'green ' }} />
        </Space>
      ),
    },
  ];

  const resdata = [{ name: 'ACTIVE' }, { name: 'PLEASANT' }, { name: 'BEAUTIFUL' }, { name: 'ATTRACTIVE' }];
  const columns = [
    {
      title: 'Level',
      dataIndex: 'level',
      key: 'level',
    },

    {
      title: 'Action',
      key: 'action',
      width: '20%',

      render: (text, record) => (
        <Space size="middle">
          <FontAwesomeIcon icon={faEye} style={{ fontSize: 15, color: 'Dodgerblue ' }} />
          <FontAwesomeIcon
            onClick={() => setEditDrawVisible(true)}
            icon={faPencil}
            style={{ fontSize: 15, color: 'green ' }}
          />
          <FontAwesomeIcon icon={faTrash} style={{ fontSize: 15, color: 'red ' }} />

          <FontAwesomeIcon
            onClick={() => setviewResultDrawVisible(true)}
            icon={faEye}
            style={{ fontSize: 15, color: 'green ' }}
          />
        </Space>
      ),
    },
  ];
  const data = [{ level: 'X' }, { level: 'XI' }, { level: 'XII' }, { level: 'III' }];
  return (
    <Fragment>
      <CreateEditExam isVisible={isVisible} handleOk={handleOk} handleCancel={handleCancel} />
      <PageHeader ghost title="Report Cards" />
      <Main>
        <Row gutter={25}>
          <Drawer
            title="Edit ReportCard"
            width={920}
            onClose={onClose}
            visible={editDrawVisible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={onClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={onClose} type="primary">
                  Submit
                </Button>
              </div>
            }
          >
            <Form preserve={false} layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="Title" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
                    <Input placeholder="Enter the title" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="scale"
                    label="Select Point Scale Type"
                    rules={[{ required: true, message: 'Please Select Type' }]}
                  >
                    <Select placeholder="Please Select Type">
                      <Option value="xiao">Grade + Range</Option>
                      <Option value="mao">Only Grade</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="term"
                    label="Term Type"
                    rules={[{ required: true, message: 'Please Select Tern Type' }]}
                  >
                    <Select placeholder="Please Select Term Type">
                      <Option value="xiao">HYA</Option>
                      <Option value="mao">Annual</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Divider>Test</Divider>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.List
                    name="names"
                    rules={[
                      {
                        validator: async (_, names) => {
                          if (!names || names.length < 2) {
                            return Promise.reject(new Error('At least 2 passengers'));
                          }
                        },
                      },
                    ]}
                  >
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map((field, index) => (
                          <Form.Item
                            {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                            label={index === 0 ? 'Tests' : ''}
                            required={false}
                            key={field.key}
                          >
                            <Form.Item
                              {...field}
                              validateTrigger={['onChange', 'onBlur']}
                              rules={[
                                {
                                  required: true,
                                  whitespace: true,
                                  message: 'Please input test name or delete this field.',
                                },
                              ]}
                              noStyle
                            >
                              <Input placeholder="Test name" style={{ width: '80%' }} />
                            </Form.Item>
                            {fields.length > 1 ? (
                              <MinusCircleOutlined
                                className="dynamic-delete-button"
                                onClick={() => remove(field.name)}
                              />
                            ) : null}
                          </Form.Item>
                        ))}
                        <Form.Item>
                          <Button type="dashed" onClick={() => add()} icon={<PlusOutlined />}>
                            Add New Test
                          </Button>

                          {/* <Form.ErrorList errors={errors} /> */}
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
              <Divider>Allocate Grades For Marks</Divider>
              <Row gutter={16}>
                <Col gutter={24}>
                  <Form.List name="grades">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                            <Form.Item
                              {...restField}
                              name={[name, 'grade']}
                              fieldKey={[fieldKey, 'grade']}
                              rules={[{ required: true, message: 'Missing Grade' }]}
                            >
                              <Input style={{ width: '200px' }} placeholder="Grade i.e (A)" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'explanation']}
                              fieldKey={[fieldKey, 'explanation']}
                              rules={[{ required: true, message: 'Missing explanation' }]}
                            >
                              <Input style={{ width: '200px' }} placeholder="Explanation (A = Outstanding)" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'from']}
                              fieldKey={[fieldKey, 'from']}
                              rules={[{ required: true, message: 'Missing from' }]}
                            >
                              <Input style={{ width: '200px' }} placeholder="Range From i.e (90)" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'to']}
                              fieldKey={[fieldKey, 'to']}
                              rules={[{ required: true, message: 'Missing to' }]}
                            >
                              <Input style={{ width: '200px' }} placeholder="Range To i.e (100)" />
                            </Form.Item>
                            <MinusCircleOutlined onClick={() => remove(name)} />
                          </Space>
                        ))}
                        <Form.Item>
                          <Button type="dashed" style={{ width: '100%' }} onClick={() => add()} icon={<PlusOutlined />}>
                            Add New Grade
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </Col>
              </Row>
              <Divider></Divider>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="copy"
                    label="Copy Report Card"
                    rules={[{ required: true, message: 'Please select a class' }]}
                  >
                    <Select placeholder="Please select class">
                      <Option value="xiao">1</Option>
                      <Option value="mao">2</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12} style={{ marginTop: '3%' }}>
                  <Form.Item>
                    <Button type="dashed" icon={<PlusOutlined />}>
                      Copy
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
              <Divider>Add Section </Divider>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item name="Title" label="Title" rules={[{ required: true, message: 'Please enter title' }]}>
                    <Input placeholder="Enter the title" />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="scale"
                    label="Select Point Scale Type"
                    rules={[{ required: true, message: 'Please Select Type' }]}
                  >
                    <Select placeholder="Please Select Type">
                      <Option value="xiao">Grade + Range</Option>
                      <Option value="mao">Only Grade</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="term"
                    label="Term Type"
                    rules={[{ required: true, message: 'Please Select Tern Type' }]}
                  >
                    <Select placeholder="Please Select Term Type">
                      <Option value="xiao">HYA</Option>
                      <Option value="mao">Annual</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Drawer>
          <Drawer
            title="View ReportCard"
            width={500}
            onClose={onViewClose}
            visible={viewResultDrawVisible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
              <div
                style={{
                  textAlign: 'right',
                }}
              >
                <Button onClick={onViewClose} style={{ marginRight: 8 }}>
                  Cancel
                </Button>
                <Button onClick={onViewClose} type="primary">
                  Submit
                </Button>
              </div>
            }
          >
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col span={24}>
                  <Form.Item
                    name="scale"
                    label="Select Term"
                    rules={[{ required: true, message: 'Please Select Term' }]}
                  >
                    <Select placeholder="Please Select Term">
                      <Option value="xiao">Annual</Option>
                      <Option value="mao">HYA</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Divider>Results</Divider>
              <Row gutter={16}>
                <Col span={24}>
                  <CustomTable col={resCols} data={resdata} />
                </Col>
              </Row>
            </Form>
          </Drawer>

          <Cards headless>
            <CustomTable col={columns} data={data} />
          </Cards>
        </Row>
      </Main>
    </Fragment>
  );
}

export default ReportCard;
