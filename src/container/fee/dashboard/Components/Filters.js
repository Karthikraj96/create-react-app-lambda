import React, { Fragment, useState } from 'react';
import { Table, Tag, Input, Space, Button, Tooltip } from 'antd';
import { Row, Col, Skeleton } from 'antd';
import { Select } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/pro-duotone-svg-icons';
const { Search } = Input;
const { Option } = Select;

const Filters = () => {
  const [showFilter, setShowFilter] = useState(true);
  const toggleFilter = () => {
    setShowFilter(!showFilter);
  };
  return (
    <Fragment>
      {/* <Tooltip title="Apply Filters">
        <Button
          type="secondary"
          shape="circle"
          onClick={() => {
            toggleFilter();
          }}
          icon={<FontAwesomeIcon icon={faFilter} style={{ fontSize: 15 }} />}
        />
      </Tooltip> */}
      {showFilter == true ? (
        <Row style={{ marginTop: '10px', marginBottom: '20px', justifyContent: 'space-evenly' }}>
          <Col style={{ marginRight: '5px' }}>
            <label>Branch</label> &nbsp;
            <Select placeholder="Select Institute" style={{ width: '150px' }}>
              <Option value="1">1</Option>
              <Option value="2">2</Option>
            </Select>
          </Col>
          <Col style={{ marginRight: '5px' }}>
            <label>Batch</label> &nbsp;
            <Select placeholder="Select Batch" style={{ width: '150px' }}>
              <Option value="2020-2021">2020-2021</Option>
              <Option value="2021-2022">2021-2022</Option>
            </Select>
          </Col>
          <Col style={{ marginRight: '5px' }}>
            <label>Level</label> &nbsp;
            <Select placeholder="Select Level" style={{ width: '150px' }}>
              <Option value="I">I</Option>
              <Option value="II">II</Option>
            </Select>
          </Col>
          <Col style={{ marginRight: '5px' }}>
            <label>Class</label>&nbsp;
            {''}
            <Select placeholder="Select Classroom" style={{ width: '150px' }}>
              <Option value="LKG">LKG</Option>
              <Option value="UKG">UKG</Option>
            </Select>
          </Col>
          <Col style={{ marginRight: '5px' }}>
            {''}
            <Search placeholder="Search" style={{ width: '180px', height: '38px' }} />
          </Col>
        </Row>
      ) : null}
    </Fragment>
  );
};

export default Filters;
