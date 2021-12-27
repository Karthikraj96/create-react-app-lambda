import React from 'react';
import { Menu } from 'antd';
import { NavLink, useRouteMatch } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import FeatherIcon from 'feather-icons-react';
import propTypes from 'prop-types';
import versions from '../demoData/changelog.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faAddressCard,
  faPollPeople,
  faBullhorn,
  faIdCardAlt,
  faBookAlt,
} from '@fortawesome/pro-duotone-svg-icons';
const { SubMenu } = Menu;

const MenuItems = ({ darkMode, toggleCollapsed, topMenu, events }) => {
  const { path } = useRouteMatch();

  const pathName = window.location.pathname;
  const pathArray = pathName.split(path);
  const mainPath = pathArray[1];
  const mainPathSplit = mainPath.split('/');

  const { onRtlChange, onLtrChange, modeChangeDark, modeChangeLight, modeChangeTopNav, modeChangeSideNav } = events;
  const [openKeys, setOpenKeys] = React.useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'Fee'}`] : [],
  );

  const onOpenChange = keys => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = item => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 991 ? 'inline' : 'horizontal'}
      theme={darkMode && 'dark'}
      // // eslint-disable-next-line no-nested-ternary
      defaultSelectedKeys={
        !topMenu
          ? [
              `${
                mainPathSplit.length === 1 ? 'home' : mainPathSplit.length === 2 ? mainPathSplit[1] : mainPathSplit[2]
              }`,
            ]
          : []
      }
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<FeatherIcon icon="more-vertical" />}
      openKeys={openKeys}
    >
      {/* <SubMenu
        key="Fee"
        icon={!topMenu && <FontAwesomeIcon icon={faMoneyBillWave} style={{ fontSize: 15 }} />}
        title="Fee"
      > */}
        {/* <Menu.Item key="feedashboard">
          <NavLink onClick={toggleCollapsed} to={`${path}/fee/dashboard`}>
            Fee Dashboard
          </NavLink>
        </Menu.Item>
        <Menu.Item key="coursefee">
          <NavLink onClick={toggleCollapsed} to={`${path}/fee/coursefee`}>
            Course Fee
          </NavLink>
        </Menu.Item>
        <Menu.Item key="rpp">
          <NavLink onClick={toggleCollapsed} to={`${path}/fee/rpp`}>
            RPP
          </NavLink>
        </Menu.Item>
        <Menu.Item key="twoplusone">
          <NavLink onClick={toggleCollapsed} to={`${path}/fee/twoplusone`}>
            Two Plus One
          </NavLink>
        </Menu.Item>
        <Menu.Item key="discount">
          <NavLink onClick={toggleCollapsed} to={`${path}/fee/discount`}>
            Discount
          </NavLink>
        </Menu.Item> */}
        {/* <Menu.Item key="schedule">
          <NavLink onClick={toggleCollapsed} to={`${path}/fee/schedule`}>
            Payment Schedule
          </NavLink>
        </Menu.Item> */}
        {/* <Menu.Item key="setting">
          <NavLink onClick={toggleCollapsed} to={`${path}/fee/setting`}>
            Fee Setting
          </NavLink>
        </Menu.Item> */}
      {/* </SubMenu> */}
      <SubMenu
        key="admission"
        icon={!topMenu && <FontAwesomeIcon icon={faAddressCard} style={{ fontSize: 15 }} />}
        title="Admission"
      >
        <Menu.Item key="application">
          <NavLink onClick={toggleCollapsed} to={`${path}/admission/application`}>
            Application
          </NavLink>
        </Menu.Item>

        {/* <Menu.Item key="msgrecord">
          <NavLink onClick={toggleCollapsed} to={`${path}/admission/msgrecord`}>
            Message Record
          </NavLink>
        </Menu.Item> */}
        {/* <Menu.Item key="feestatus">
          <NavLink onClick={toggleCollapsed} to={`${path}/admission/feestatus`}>
            Fee Status
          </NavLink>
        </Menu.Item>
        <Menu.Item key="docs">
          <NavLink onClick={toggleCollapsed} to={`${path}/admission/docs`}>
            Admission Docs
          </NavLink>
        </Menu.Item> */}
      </SubMenu>
      {/* <SubMenu
        key="survey"
        icon={!topMenu && <FontAwesomeIcon icon={faPollPeople} style={{ fontSize: 15 }} />}
        title="Survey"
      >
        <Menu.Item key="survey_create">
          <NavLink onClick={toggleCollapsed} to={`${path}/survey/createsurvey`}>
            Create Survey
          </NavLink>
        </Menu.Item>

        <Menu.Item key="survey_response">
          <NavLink onClick={toggleCollapsed} to={`${path}/survey/response`}>
            Responses
          </NavLink>
        </Menu.Item>
      </SubMenu> */}
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/announcements`}>
              <FontAwesomeIcon icon={faBullhorn} style={{ fontSize: 15 }} />
            </NavLink>
          )
        }
        key="announcements"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/announcements`}>
          Announcements
          {/* <span className="badge badge-primary menuItem">{versions[0].version}</span> */}
        </NavLink>
      </Menu.Item>
      <SubMenu
        key="classroom"
        icon={!topMenu && <FontAwesomeIcon icon={faIdCardAlt} style={{ fontSize: 15 }} />}
        title="Classroom"
      >
        <Menu.Item key="Student">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/student`}>
            Student
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Attendence">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/attendence`}>
            Attendence
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Lessons">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/lessons`}>
            Lessons
          </NavLink>
        </Menu.Item>
        <Menu.Item key="leaverequest">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/leaverequest`}>
            Leave Request
          </NavLink>
        </Menu.Item>
        <Menu.Item key="calender">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/calender`}>
            Calendar
          </NavLink>
        </Menu.Item>
        <Menu.Item key="docs">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/documents`}>
            Documents
          </NavLink>
        </Menu.Item>{' '}
        <Menu.Item key="tc">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/tc`}>
            TC
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="profile">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/studentprofile`}>
            Student Profile
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="language">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroom/language`}>
            Language Allocation
          </NavLink>
        </Menu.Item>
      </SubMenu>
      <SubMenu
        key="Examination"
        icon={!topMenu && <FontAwesomeIcon icon={faBookAlt} style={{ fontSize: 15 }} />}
        title="Examination"
      >
        <Menu.Item key="newschoolexam">
          <NavLink onClick={toggleCollapsed} to={`${path}/examination/newschoolexam`}>
            New School Exam
          </NavLink>
        </Menu.Item>

        <Menu.Item key="examtype">
          <NavLink onClick={toggleCollapsed} to={`${path}/examination/examtype`}>
            Exam Type
          </NavLink>
        </Menu.Item>
        <Menu.Item key="schoolresult">
          <NavLink onClick={toggleCollapsed} to={`${path}/examination/schoolresult`}>
            School Result
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="reportcard">
          <NavLink onClick={toggleCollapsed} to={`${path}/examination/reportcard`}>
            Report Card
          </NavLink>
        </Menu.Item> */}
        <Menu.Item key="onlineexam">
          <NavLink onClick={toggleCollapsed} to={`${path}/examination/onlineexam`}>
            Online Exam
          </NavLink>
        </Menu.Item>
      </SubMenu>
      {/* <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/suggestions`}>
              <FeatherIcon icon="message-square" />
            </NavLink>
          )
        }
        key="suggestions"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/suggestions`}>
          Suggestions
        </NavLink>
      </Menu.Item> */}
      {/* <SubMenu
        key="Settings"
        icon={(!topMenu && <ReactSVG className="sDash_menu-item-icon" />, (<FeatherIcon icon="video" />))}
        title={
          <>
            <span className="pl-0">Streaming</span>
          </>
        }
      >
        <Menu.Item key="stream">
          <NavLink onClick={toggleCollapsed} to={`${path}/stream`}>
            Stream
          </NavLink>
        </Menu.Item>
        <Menu.Item key="datastream">
          <NavLink onClick={toggleCollapsed} to={`${path}/datastream`}>
            Data Stream
          </NavLink>
        </Menu.Item>
      </SubMenu> */}
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/liveclass`}>
              <FeatherIcon icon="wifi" />
            </NavLink>
          )
        }
        key="liveclass"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/liveclass`}>
          Liveclass
        </NavLink>
      </Menu.Item>
      {/* <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/newsfeed`}>
              <FeatherIcon icon="rss" />
            </NavLink>
          )
        }
        key="newsfeed"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/newsfeed`}>
          News Feed
        </NavLink>
      </Menu.Item> */}
      {/* <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/announcement`}>
              <FeatherIcon icon="speaker" />
            </NavLink>
          )
        }
        key="announcement"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/announcement`}>
          AnnouncementFeedback
        </NavLink>
      </Menu.Item> */}
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/discipline`}>
              <FeatherIcon icon="alert-circle" />
            </NavLink>
          )
        }
        key="discipline"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/discipline`}>
          Discipline
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/extracurricular`}>
              <FeatherIcon icon="alert-octagon" />
            </NavLink>
          )
        }
        key="extracurricular"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/extracurricular`}>
          ExtraCurricular
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/radio`}>
              <FeatherIcon icon="radio" />
            </NavLink>
          )
        }
        key="radio"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/radio`}>
          Radio
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/speech`}>
              <FeatherIcon icon="mic" />
            </NavLink>
          )
        }
        key="speech"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/speech`}>
          principal speech
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/savingpassbook`}>
              <FeatherIcon icon="award" />
            </NavLink>
          )
        }
        key="savingpassbook"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/savingpassbook`}>
          Saving Passbook
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/suggestion`}>
              <FeatherIcon icon="repeat" />
            </NavLink>
          )
        }
        key="suggestion"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/suggestion`}>
          Suggestion
        </NavLink>
      </Menu.Item>
      <SubMenu
        key="Admin Settings"
        icon={(!topMenu && <ReactSVG className="sDash_menu-item-icon" />, (<FeatherIcon icon="edit-3" />))}
        title={
          <>
            <span className="pl-0">Admin Settings</span>
          </>
        }
      >
        <Menu.Item key="academic">
          <NavLink onClick={toggleCollapsed} to={`${path}/academic`}>
            Academic Year
          </NavLink>
        </Menu.Item>
        <Menu.Item key="institute">
          <NavLink onClick={toggleCollapsed} to={`${path}/institute`}>
            Institute
          </NavLink>
        </Menu.Item>
        <Menu.Item key="classroomsettings">
          <NavLink onClick={toggleCollapsed} to={`${path}/classroomsettings`}>
            Classroom
          </NavLink>
        </Menu.Item>
        {/* <Menu.Item key="promotion">
          <NavLink onClick={toggleCollapsed} to={`${path}/promotion`}>
            Promotion
          </NavLink>
        </Menu.Item> */}
      </SubMenu>
      {/* <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/library`}>
              <FeatherIcon icon="repeat" />
            </NavLink>
          )
        }
        key="library"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/library`}>
          Library
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/expenses`}>
              <FeatherIcon icon="repeat" />
            </NavLink>
          )
        }
        key="expenses"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/expenses`}>
          Expenses
        </NavLink>
      </Menu.Item>
      <SubMenu
        key="AssetAllocation"
        icon={(!topMenu && <ReactSVG className="sDash_menu-item-icon" />, (<FeatherIcon icon="edit-3" />))}
        title={
          <>
            <span className="pl-0">Asset Allocation</span>
          </>
        }
      >
        <Menu.Item key="stock">
          <NavLink onClick={toggleCollapsed} to={`${path}/stock`}>
            Stock
          </NavLink>
        </Menu.Item>
        <Menu.Item key="allocation">
          <NavLink onClick={toggleCollapsed} to={`${path}/allocation`}>
            Allocation
          </NavLink>
        </Menu.Item>
        <Menu.Item key="assetsettings">
          <NavLink onClick={toggleCollapsed} to={`${path}/assetsettings`}>
            Setting
          </NavLink>
        </Menu.Item>
      </SubMenu> */}
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/timetable`}>
              <FeatherIcon icon="clock" />
            </NavLink>
          )
        }
        key="timetable"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/timetable`}>
          Timetable
        </NavLink>
      </Menu.Item>
      {/* <SubMenu
        key="VendorManagement"
        icon={(!topMenu && <ReactSVG className="sDash_menu-item-icon" />, (<FeatherIcon icon="shopping-cart" />))}
        title={
          <>
            <span className="pl-0">Vendor Management</span>
          </>
        }
      >
        <Menu.Item key="vendorList">
          <NavLink onClick={toggleCollapsed} to={`${path}/vendorList`}>
            Vendor List
          </NavLink>
        </Menu.Item>

        <Menu.Item key="Bids">
          <NavLink onClick={toggleCollapsed} to={`${path}/Bids`}>
            Bids
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Jobs">
          <NavLink onClick={toggleCollapsed} to={`${path}/Jobs`}>
            Jobs
          </NavLink>
        </Menu.Item>
        <Menu.Item key="Payments">
          <NavLink onClick={toggleCollapsed} to={`${path}/Payments`}>
            Payments
          </NavLink>
        </Menu.Item>
      </SubMenu> */}
      {/* <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/awardsRecognition`}>
              <FeatherIcon icon="clock" />
            </NavLink>
          )
        }
        key="awardsRecognition"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/awardsRecognition`}>
          Awards&Recognition
        </NavLink>
      </Menu.Item> */}
      {/* <SubMenu
        key="AwardsRecognition"
        icon={(!topMenu && <ReactSVG className="sDash_menu-item-icon" />, (<FeatherIcon icon="award" />))}
        title={
          <>
            <span className="pl-0">Awards & Recognition</span>
          </>
        }
      >
        <Menu.Item key="awardsRecognition">
          <NavLink onClick={toggleCollapsed} to={`${path}/awardsRecognition`}>
          Awards Recognition
          </NavLink>
        </Menu.Item>
        <Menu.Item key="batchType">
          <NavLink onClick={toggleCollapsed} to={`${path}/batchtype`}>
          Batch Type
          </NavLink>
        </Menu.Item>
        </SubMenu>
        <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/expenses`}>
              <FeatherIcon icon="repeat" />
            </NavLink>
          )
        }
        key="expenses"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/expenses`}>
          Expenses
        </NavLink>
      </Menu.Item>
      <Menu.Item
        icon={
          !topMenu && (
            <NavLink className="menuItem-iocn" to={`${path}/transport`}>
              <FeatherIcon icon="truck" />
            </NavLink>
          )
        }
        key="transport"
      >
        <NavLink onClick={toggleCollapsed} to={`${path}/transport`}>
          Transport
        </NavLink>
      </Menu.Item> */}
    </Menu>
  );
};

MenuItems.propTypes = {
  darkMode: propTypes.bool,
  topMenu: propTypes.bool,
  toggleCollapsed: propTypes.func,
  events: propTypes.object,
};

export default MenuItems;
