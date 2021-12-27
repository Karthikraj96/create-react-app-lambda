import React,{ useEffect,useState } from 'react';
import { Modal, Button, Row, Col, Select, Input, DatePicker, Space,InputNumber,Upload, message,Form  } from 'antd';
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  FacebookOutlined,
  TwitterOutlined,
  UploadOutlined ,
  PlusOutlined,
  MinusCircleOutlined,
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
  labelCol: { span: 5 },
};

function TransportModal({ isVisible, handleOk, handleCancel }) {
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
      title="Add Vehicle"
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
          <h3>Identifications</h3><hr></hr>
          <Form.Item label="Vehicle Number"  name="Vehicle Number" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="Vehicle Number" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="Vehicle Name"  name="Vehicle Name" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="Vehicle Name" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="VIN"  name="Vin" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="Vehicle Identification Number" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="Vehicle Type" name="Vehicle Type" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Vehicle Type" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Year"  name="Year" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="Year" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="Maker" name="maker" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Maker" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Model" name="model" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Model" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Fuel Type" name="Fuel Type" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Select Fuel type" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Trim"  name="Trim" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="Trim" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="Registration State"  name="Registration State" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="Registration State" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="Registration Date" name="Registration Date" rules={[{ required: true, message: 'Please input your details!' }]}>
        <DatePicker format="DD-MM-YYYY" name="Registration Date"  style={{ width: '100%',height:'40px' }} />
        </Form.Item>
        <Form.Item label="Axle" name="Axle" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Axle" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Vendor Name" name="vendor name" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="vendor name" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item  label="Photo" name="photo" rules={[{ required: true, message: 'Please select your File!' }]}>
      <Upload
      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
      listType="picture"
      name="receipt"
      onChange={(e)=>handleFile(e)}

    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
      </Form.Item>
       <h3>Classifications</h3><hr/>
       <Form.Item label="Vehicle Status" name="vehicle status" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="vehicle status" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Group" name="group" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Group" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Driver" name="driver" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Driver" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Vehicle ownership" name="vehicle ownership" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="vehicle ownership" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <h3>Additional Details</h3><hr/>
        <Form.Item label="Color"  name="color" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="Color" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.Item label="Body Type" name="Body type" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Body type" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="Body Subtype" name="Body Subtype" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Select  name="Body Subtype" onChange={(value) => handleSelect(value, "expenses_Type")} placeholder="select the BatchType" allowClear>
          {expensestype.map((e, key) => {
            return (
              <Option key={key} value={e.id}>
                {e.type}
              </Option>
            );
          })}
          </Select>
        </Form.Item>
        <Form.Item label="MSRP"  name="msrp" rules={[{ required: true, message: 'Please input your details!' }]}>
          <Input name="MSRP" onChange={(e) => handleInput(e)} />
        </Form.Item>
        <Form.List label="Custom Name"  name="custom name" rules={[{ required: true, message: 'Please input your details!' }]}>
        {(fields, { add, remove }) => {
          return (
            <div>
              {fields.map((field, index) => (
                <Row key={field.key}>
                  <Col md={22} lg={22}>
                    <Form.Item
                      label="Custom Name"
                      name={[field.name, "Custom Name"]}
                      fieldKey={[field.fieldKey, "Custom Name"]}
                      rules={[{ required: true, message: 'Please input your details!' }]}
                    >
                      <Input placeholder="Custom Name" />
                    </Form.Item>
                  </Col>
                  <Col flex="none" style={{marginLeft:'5px'}} md={1} lg={1}>
                    <MinusCircleOutlined
                      className="dynamic-delete-button"
                      onClick={() => {
                        remove(field.name);
                      }}
                    />
                  </Col>
                </Row>
              ))}
              <Form.Item  label="Custom Name">
                <Button
                  type="dashed"
                  onClick={() => {
                    add();
                  }}
                  // style={{ width: "100%" }}
                >
                  <PlusOutlined /> Add Custom Name
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
      </Form>
    </Modal>
  );
}

export default TransportModal;
