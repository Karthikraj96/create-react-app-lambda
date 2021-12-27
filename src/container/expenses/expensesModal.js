import React,{ useEffect,useState } from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,InputNumber,Upload, message,Form  } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  UploadOutlined 
} from '@ant-design/icons';
import { useSelector } from 'react-redux';
import { getClass,getExpensesType } from '../../api/api';


const props = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

const { TextArea } = Input;
const { RangePicker } = DatePicker;

function onChange(date, dateString) {
  console.log(date, dateString);
}
function onOk(value) {
  console.log('onOk: ', value);
}

const layout = {
  labelCol: { span: 4 },
};

function ExpensesModal({ isVisible, handleOk, handleCancel,tokendata }) {
  let grade = useSelector(store => store.getGradesReducer);
  let org = useSelector(store => store.getOrgReducer);
  const [form] = Form.useForm();
  const [requiredMark, setRequiredMarkType] = useState('required');
  const [expensestype,setExpensestype]=useState([]);
  let [record, setRecord] = useState({
    organization_id: null,
    date: null,
    particulars:null,
    expenses_Type: null,
    amount: null,
  });
  let handleInput = (e) => {
    let { name, value } = e.target
    setRecord({ ...record, [name]: value })
  }
  let handleSelect = (value, e) => {
    setRecord({ ...record, [e]: value })
  }
  useEffect(() => {
      getExpensesType()
        .then(res => {
          setExpensestype(res.data);
        })
        .catch(e => {
          console.log(e);
        });
    
  }, [expensestype])
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };
  const handleFile =(value, e)=>{
    setRecord({ ...record, [e]: value })
  }
  return (
    <Modal destroyOnClose={true}
      style={{ top: 20 }}
      title="Expenses"
      visible={isVisible}
      // onOk={handleOk}
      onCancel={handleCancel}
      okText="Create"
      cancelText="Cancel"
      footer={[
        <Button  type="primary" htmlType="submit" form="expenses">
          Submit
        </Button>,
      ]}
      width={800}
    >
      <Form preserve={false} {...layout} form={form} name="nest-messages" id="expenses"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        onFinish={() => handleOk(record, setRecord)}
      >
      {tokendata == '1' ? (
        <>
         <Form.Item label="Institution" name="inst"  rules={[{ required: true, message: 'Please input your details!' }]}>
         <Select placeholder="select the School" name="organization_id" onChange={(value) => handleSelect(value, "organization_id")} allowClear>
          {org.map((e, key) => {
                return (
                  <Option key={key} value={e.organization_id}>
                    {e.instituteName}
                  </Option>
                );
              })}
          </Select>
          </Form.Item>
        </>
      ) : (
        <> </>
      )}
        <Form.Item label="Date" name="date" rules={[{ required: true, message: 'Please input your details!' }]}>
        <DatePicker format="DD-MM-YYYY" name="date"  style={{ width: '100%',height:'40px' }} />
        </Form.Item>
        <Form.Item label="Particulars"  name="particulars" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="particulars" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="Expenses Type" name="expenses_Type" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="expenses_Type" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Amount" name="amount" rules={[{ required: true, message: 'Please input your details!' }]}>
        <Input name="amount" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item  label="Receipt" name="receipt" rules={[{ required: true, message: 'Please select your File!' }]}>
      <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      name="receipt"
      onChange={(e)=>handleFile(e)}

    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
      </Form.Item>
      </Form>
      {/* <Row>
        <Col span={24}>
        <div>
            <label>Institute</label>
            <br />
            <Select placeholder="Institute" style={{ width: '100%' }} mode="multiple" >
              <Option value="1">1</Option>
              <Option value="2">2 </Option>
            </Select>
          </div>
          <br />
          <div>
            <label>Date </label>
            <br />
            <DatePicker format="DD-MM-YYYY"  style={{ width: '100%' }} />
          </div>
          <br />
          <div>
            <label>Particulars</label>
            <br />
            <Input placeholder="Particulars" style={{width:'100%'}} size="middle" />
          </div>
          <br />
          <div >
            <label>Expenses Type</label>
            <br />
            <Select placeholder="Expenses" style={{ width: '100%' }}>
              <Option value="1">Development</Option>
            </Select>
          </div>
          <br />
          <div>
            <label>Amount</label>
            <br />
            <Input placeholder="amount" style={{width:'100%'}} />
          </div>
          <br />
          <div>
            <label>Proof Of Receipt</label>
            <br />
            <Upload {...props}>
    <Button icon={<UploadOutlined />}>Click to Upload</Button>
  </Upload>
          </div>
        </Col>
      </Row> */}
    </Modal>
  );
}

export default ExpensesModal;
