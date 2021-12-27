import React from 'react';
import { Table } from 'antd';
const CustomTable = ({ col, data,pagination}) => {
  return <Table scroll={{ x: true }} pagination ={pagination} columns={col} dataSource={data} />;
};

export default CustomTable;
