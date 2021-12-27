import React, { lazy, Suspense, useState } from 'react';
import { Row, Col, Skeleton, Collapse } from 'antd';
import { PageHeader } from '../../../components/page-headers/page-headers';
import { Cards } from '../../../components/cards/frame/cards-frame';
import { Button } from '../../../components/buttons/buttons';
import { Main } from '../../styled';
import Heading from '../../../components/heading/heading';
import { Fragment } from 'react';
import { Input, Space, Drawer } from 'antd';
import CustomTable from '../../fee/dashboard/Components/Table';
import Filters from '../../fee/dashboard/Components/Filters';
import { Tabs } from 'antd';
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
} from '@fortawesome/pro-duotone-svg-icons';
import { Select } from 'antd';
import { DatePicker, Radio } from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
const { TabPane } = Tabs;
const { Panel } = Collapse;

function callback(key) {
  console.log(key);
}

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const Settings = () => {
  return (
    <Main>
      <PageHeader
        ghost
        buttons={
          [
            //   <Button
            //     size="small"
            //     //  onClick={toggleSettings}
            //     type="primary"
            //   >
            //     <FeatherIcon icon="plus" size={15} />
            //     Settings
            //   </Button>,
          ]
        }
        title="Settings"
      />

      <Collapse onChange={callback}>
        <Panel header="Category" key="1">
          <Collapse defaultActiveKey="1" bordered={false}>
            <Panel header="Electronics" key="1">
              <p>Mobile</p>
              <p>Laptop</p>
            </Panel>
          </Collapse>
        </Panel>
        <Panel header="Category 2" key="2">
          <p>{text}</p>
        </Panel>
        <Panel header="Category 3" key="3">
          <p>{text}</p>
        </Panel>
      </Collapse>
    </Main>
  );
};

export default Settings;
