import React ,{useState}from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space, Drawer,Checkbox,Collapse } from 'antd';
import { Cards } from '../../components/cards/frame/cards-frame';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  LinkedinOutlined,
  InstagramOutlined,
} from '@ant-design/icons';
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
  faPaperclip,
  faUniversity,
  faSearchLocation,
  faMoneyCheckAlt,
  faAddressCard,
} from '@fortawesome/pro-duotone-svg-icons';
import { Route } from 'react-router';

const { TextArea } = Input;
const { RangePicker } = DatePicker;
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

function DiscountModal({ isVisible, handleOk, handleCancel }) {
  const [totalViewMore, setTotalViewMore] = useState(false);
  const [disable, setDisable] = useState(false);
  const [payment, setPayment] = useState(false);
  const [card_details, setCard_details] = useState(false);
  return (
    //  <Select placeholder="Select Institute" style={{ width: '80%' }}>
    //         <Option value="1">1</Option>
    //         <Option value="2">2</Option>
    //       </Select>
    <Drawer
      title="Creat Discount"
      width={500}
      onClose={handleCancel}
      visible={isVisible}
      footer={
        <div
          style={{
            textAlign: 'right',
          }}
        >
          <Button style={{ marginRight: 8 }}>Cancel</Button>
          <Button type="primary">Create</Button>
        </div>
      }
    >
     <>
     {totalViewMore ? (
              <Collapse>
                <Panel header="Academic Year : &nbsp; &nbsp; 2020-21" key="2">
                  <Row style={{ margin: '2%' }}>
                    Total Amount &nbsp; &nbsp;
                    <a href="#" onClick={() => setTotalViewMore(false)}>
                      3000-View More
                    </a>
                  </Row>
                  <br />
                  {disable ? (
                    <>
                      <Row>
                        <Col xxl={12} xl={12} lg={12} xs={24} span={24}>
                          <Select
                            placeholder="select Fee type"
                            style={{ width: '200%' }}
                            // onChange={handleChange}
                            onChange={() => setDisable(false)}
                          >
                            <Option key="annual">Annual</Option>
                            <Option key="term">Term</Option>
                            <Option key="monthly">Monthly</Option>
                            <Option key="rpp">RPP</Option>
                            <Option key="noselect">no select</Option>
                          </Select>
                        </Col>
                      </Row>
                      <br />
                      <Row>
                        <Cards headless border={true}>
                          <ul>
                            <li>
                              <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp;{' '}
                              <span style={{ color: 'green' }}>Initial</span>
                            </li>
                            <li>
                              <ul>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp;{' '}
                                  <span style={{ color: 'green' }}> July - 1500 </span>
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp;{' '}
                                  <span style={{ color: 'green' }}>August - 1500 </span>
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp; September - 1500
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp; October - 1500
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp; November - 1500
                                </li>
                                <li>
                                  <Checkbox onChange={onChange}></Checkbox> &nbsp; &nbsp; December - 1500
                                </li>
                              </ul>
                            </li>
                          </ul>
                          <br />
                          {/* <Row>
                            <span style={{fontWeight:"bold"}}>Amount </span> &nbsp; &nbsp; &nbsp;<span>-Rs. 3,000/-</span>
                          </Row>
                          <br />
                          <Row>
                          <span style={{fontWeight:"bold"}}>Discount </span> &nbsp; &nbsp; &nbsp;<span>-Rs. 3,000/-</span>
                          </Row>
                          <br />
                          <Row>
                          <span style={{fontWeight:"bold"}}>Net Payable </span> &nbsp; &nbsp; &nbsp;<span>-Rs. 0/-</span>
                          </Row>
                          <br /> */}
                        </Cards>
                      </Row>

                      {/* {payment ? (
                        <>
                          <Row>
                            <Select
                              placeholder="payment Mode"
                              style={{ width: '200%' }}
                              onChange={() => setPayment(false)}
                            >
                              <Option key="cash">Cash</Option>
                              <Option key="card">Card</Option>
                              <Option key="dd">DD</Option>
                              <Option key="noselect">noselect</Option>
                            </Select>
                          </Row>
                          <br />

                          <Row>
                            <Input placeholder="Your Amount" style={{ width: '200%' }} />
                            <br />
                          </Row>
                          <br />
                          <Row>
                            <span>DD Details</span>
                          </Row>
                          <br />
                          <Row>
                            <Input placeholder="Cheque NO" style={{ width: '200%' }} />
                            <br />
                            <Input placeholder="Bank Name" style={{ width: '200%' }} />
                            <br />
                            <Input placeholder="Branch" style={{ width: '200%' }} />
                            <br />
                          </Row>
                          {card_details ? (
                            <>
                              <Row>
                                <Select
                                  placeholder="Card Type"
                                  style={{ width: '200%' }}
                                  onChange={() => setCard_details(false)}
                                >
                                  <Option key="Credit">Credit</Option>
                                  <Option key="Debit">debit</Option>
                                  <Option key="--select--">No select</Option>
                                </Select>
                              </Row>
                              <br />
                              <Row>
                                <span>Card Details</span>
                              </Row>
                              <br />
                              <Row>
                                <Input placeholder="Your card Number" style={{ width: '200%' }} />
                                <br />

                                <Input placeholder="Holder Name" style={{ width: '200%' }} />
                                <br />
                              </Row>
                            </>
                          ) : (
                            <Row>
                              <Select
                                placeholder="Card Type"
                                style={{ width: '200%' }}
                                onChange={() => setCard_details(true)}
                              >
                                <Option key="Credit">Credit</Option>
                                <Option key="Debit">debit</Option>
                              </Select>
                            </Row>
                          )}
                        </>
                      ) : 
                        // <Row>
                        //   <Select
                        //     placeholder="payment Mode"
                        //     style={{ width: '200%' }}
                        //     onChange={() => setPayment(true)}
                        //   >
                        //     <Option key="cash">Cash</Option>
                        //     <Option key="card">Card</Option>
                        //     <Option key="dd">DD</Option>
                        //   </Select>
                        // </Row>
                      
                      } */}
                    </>
                  ) : (
                    <Row>
                      <Col xxl={12} xl={12} lg={12} xs={24} span={24}>
                        <Select
                          placeholder="select Fee type"
                          style={{ width: '200%' }}
                          // onChange={handleChange}
                          onChange={() => setDisable(true)}
                        >
                          <Option key="annual">Annual</Option>
                          <Option key="term">Term</Option>
                          <Option key="monthly">Monthly</Option>
                          <Option key="rpp">RPP</Option>
                        </Select>
                      </Col>
                    </Row>
                  )}
                </Panel>
              </Collapse>
            ) : (
              <Collapse>
                <Panel header="Academic Year : &nbsp; &nbsp; 2020-21" key="2">
                  <Row style={{ margin: '2%' }}>
                    Total Amount &nbsp; &nbsp;
                    <a href="#" onClick={() => setTotalViewMore(true)}>
                      3000-View More
                    </a>
                  </Row>
                </Panel>
              </Collapse>
            )}
          </>
          <br />
   

      {/* <Row style={{margin:'2%'}}>
        
        <Col span={6}>
          <label style={{ margin: 1 }}>Fee Type:</label> 
        </Col>
        <Col span={12}>
        <span>Term</span>
        </Col>
       </Row>
        <br />
        <Row style={{margin:'2%'}}>
        <Col span={6}>
          <label style={{ margin: 1 }}>Amount</label>
        </Col>
        <Col span={12}>
        <span>10,000/-</span>
        </Col>
        </Row >
        <br /> */}
        <Row style={{margin:'2%'}}>
        <Col span={6}>
          <label style={{ margin: 1 }}>Discount</label> 
        </Col>
        <Col span={24}>
          <Select placeholder="discount type" style={{ width: '100%' }}>
            <Option key="discount">Discount</Option>
            <Option key="lumb">lumb</Option>
          </Select>
        </Col>
        </Row>
        <br />
        <Row style={{margin:'2%'}}>
        <Col span={6}>
          <label style={{ margin: 1 }}>Amount</label> 
        </Col>
        <Col span={24}>
        <Input placeholder="amount" style={{ width: '100%' }} />
        </Col>
        </Row >
        <br />
        <Row style={{margin:'2%'}}>
        <Col span={6}>
          <label style={{ margin: 1 }}><strong>Amount</strong></label> 
        </Col>
        <Col span={14}>
        <span>19,000 &nbsp; (Rupees Nineteen Thousand Only)</span>
        </Col>
        </Row>
        <br />
        <Row style={{margin:'2%'}}>
        <Col span={6}>
          <label style={{ margin: 1 }}><strong>Discount</strong></label> 
        </Col>
        <Col span={14}>
        <span>19,000 &nbsp; (Rupees Nineteen Thousand Only)</span>
        </Col>
        </Row>
        <br />
        <Row style={{margin:'2%'}}>
        <Col span={6}>
          <label style={{ margin: 1 }}> <strong>Net Payable</strong></label> 
        </Col>
        <Col span={14}>
        <span>19,000 &nbsp; (Rupees Nineteen Thousand Only)</span>
        </Col>
        </Row>
       

        {/* <Col span={24}> */}
          {/* <div>
            <label style={{ margin: 1 }}>Fee Type:</label> &nbsp; &nbsp; &nbsp; &nbsp;
            <span>Term</span>
          </div>
          <br /> */}
          {/* <div>
            <label style={{ margin: 1 }}>Amount</label> &nbsp; &nbsp; &nbsp; &nbsp;
            <span>10,000/-</span>
            <br />
          </div>{' '}
          <br /> */}
          {/* <div>
            <label style={{ margin: 1 }}>Discount</label> &nbsp; &nbsp; &nbsp; &nbsp;
          
            <Row gutter={24}>
              <Col span={24}>
                <Select placeholder="discount type" style={{ width: '100%' }}>
                  <Option key="discount">Discount</Option>
                  <Option key="lumb">lumb</Option>
                </Select>
              </Col>
            </Row>
          </div>
          <br /> */}
          {/* <div>
            <Input placeholder="amount" style={{ width: '100%' }} />
          </div>{' '}
          <br />
          <div>
            <label style={{ margin: 1 }}>Discount</label> &nbsp; &nbsp; &nbsp; &nbsp;
            <span>19,000</span> &nbsp; &nbsp; &nbsp; <span>(Rupees Nineteen Thousand Only)</span>
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}>payable</label> &nbsp; &nbsp; &nbsp; &nbsp;
            <span>19,000</span> &nbsp; &nbsp; &nbsp; <span>(Rupees Nineteen Thousand Only)</span>
          </div>
          <br />
          <div>
            <label style={{ margin: 1 }}>Validity</label> <br />
            <DatePicker style={{ width: '100%' }} />
          </div>
          <br /> */}
          {/* <div>
      <label style={{ margin:1 }}>Validity</label> &nbsp; &nbsp; &nbsp; &nbsp;
        <span>36-Months</span>
      </div><br /> */}
        {/* </Col> */}
      {/* </Row> */}
      {/* <Row gutter={24}>
      <Col  span={12} >
            
                <label style={{ margin:1 }}>Level</label> &nbsp; &nbsp;
                
              </Col>
              <Col  span={12} >
               
              
              </Col>

      </Row> */}
    </Drawer>
  );
}

export default DiscountModal;
