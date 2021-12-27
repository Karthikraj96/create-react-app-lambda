import React from "react";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Divider, Button, Select, Input } from "antd";

function DynamicField(props) {
  return (
    <Form.List preserve={false} name="fields">
      {(fields, { add, remove }) => {
        return (
          <div>
            {fields.map((field, index) => (
              <div key={field.key}>
                <Form.Item
                  name={[index, "name"]}
                  label="Genre Name"
                  rules={[{ required: true, message: 'Please Enter your Genre!' }]}
                >
                  <Input placeholder="Enter the Genre" />
                </Form.Item>
                {fields.length > 0 ? (
                  <Button
                    type="danger"
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    icon={<MinusCircleOutlined />}
                    style={{margin:'2px'}}
                  >
                    Remove
                  </Button>
                ) : null}
              </div>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{ width: "100%" }}
              >
                <PlusOutlined /> Add Genre
              </Button>
            </Form.Item>
          </div>
        );
      }}
    </Form.List>
  );
}

export default DynamicField;
