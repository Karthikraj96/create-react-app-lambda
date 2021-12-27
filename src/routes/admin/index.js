import React, { lazy, Suspense, useEffect } from 'react';
import { Spin } from 'antd';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import Dashboard from './dashboard';
import Pages from './pages';
import Users from './users';
import Widgets from './widgets';
import Ecommerce from './ecommerce';
import Features from './features';
import Gallery from './gallery';
import withAdminLayout from '../../layout/withAdminLayout';
import Stream from './stream';
import Liveclass from './liveclass';
import AnnouncementFeedback from './announcement';
import Classroom from './classroom';
import Curricular from './curricular';
import Discipline from './discipline';
import Radio from './radio';
import Speech from './speech';
import Savingpassbook from './savingpassbook';
import Suggestion from './suggestion';
import Settings from './settings';
import Library from './library';
import Expenses from './expenses';
import Asset from './assetAllocation';
import Timetable from './timetable';
import Vendormanagement from './vendorManagement';
import AwardsRecognition from './awardsRecognition';
import QueueManagement from './queueMangement';
import Transport from './transport';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';
import { useDispatch, useSelector } from 'react-redux';
import jwt_decode from 'jwt-decode';
import { logOut } from '../../redux/authentication/actionCreator';
import { getGrade } from '../../redux//grade/actionCreator';
import { getOrg } from '../../redux/OrgId/actionCreator';
import Swal from 'sweetalert2';
const Projects = lazy(() => import('./projects'));
const Calendars = lazy(() => import('../../container/Calendar'));
const Inbox = lazy(() => import('../../container/email/Email'));
const Chat = lazy(() => import('../../container/chat/ChatApp'));
const Myprofile = lazy(() => import('../../container/profile/myProfile/Index'));
const ToDo = lazy(() => import('../../container/toDo/ToDo'));
const Note = lazy(() => import('../../container/note/Note'));
const Contact = lazy(() => import('../../container/contact/Contact'));
const ContactGrid = lazy(() => import('../../container/contact/ContactGrid'));
const ContactAddNew = lazy(() => import('../../container/contact/AddNew'));
const Calendar = lazy(() => import('../../container/calendar/Calendar'));
const FileManager = lazy(() => import('../../container/fileManager/FileManager'));
const Kanban = lazy(() => import('../../container/kanban/Index'));
const Task = lazy(() => import('../../container/task/Index'));
//fee routes
const feedashboard = lazy(() => import('../../container/fee/dashboard/index'));
const feeRPP = lazy(() => import('../../container/fee/RPP'));
const feeRPP_Settings = lazy(() => import('../../container/fee/RPPSettings'));
const feeCourseFee = lazy(() => import('../../container/fee/CourseFee'));
const feeTwoPlusOne = lazy(() => import('../../container/fee/TwoPlusOne'));
const feeSetting = lazy(() => import('../../container/fee/FeeSetting'));
const feeDiscount = lazy(() => import('../../container/fee/Discount'));
const feeNewFee = lazy(() => import('../../container/fee/NewFee'));
const two_Plus_Settings = lazy(() => import('../../container/fee/TwoplusoneSettings'));
//addmission routes
const addmissionApplication = lazy(() => import('../../container/admission/application'));
const addmissionFeeStatus = lazy(() => import('../../container/admission/feestatus'));
const addmissionDocs = lazy(() => import('../../container/admission/admissiondoc'));
//survey routes
const createSurvey = lazy(() => import('../../container/survey/newsurvey'));
const surveyResponse = lazy(() => import('../../container/survey/response'));
//announcement routes
const announcements = lazy(() => import('../../container/announcement/index'));
// classroom routes
const student = lazy(() => import('../../container/classroom/student'));
const attendence = lazy(() => import('../../container/classroom/attendence'));
const lessons = lazy(() => import('../../container/classroom/lessons'));
const leaverequest = lazy(() => import('../../container/classroom/leavereq'));
const documents = lazy(() => import('../../container/classroom/documents'));
const tc = lazy(() => import('../../container/classroom/tc'));
const studentProfile = lazy(() => import('../../container/classroom/studentProfile'));
const language = lazy(() => import('../../container/classroom/language'));
// const calendar = lazy(() => import('../../container/calendar/Calendar'));
//exam routes
const newschoolexam = lazy(() => import('../../container/examination/newschoolexam'));
const examtype = lazy(() => import('../../container/examination/examtype'));
const schoolresult = lazy(() => import('../../container/examination/schoolresult'));
// const reportcard = lazy(() => import('../../container/examination/reportcard'));
const onlineexam = lazy(() => import('../../container/examination/onlineexam'));
const viewexam = lazy(() => import('../../container/examination/viewexam'));
const markentery = lazy(() => import('../../container/examination/markentry'));
//suggestions routes
const suggestions = lazy(() => import('../../container/suggestions/suggestions'));

const calendar = lazy(() => import('../../container/classroom/calender'));
const Feeds = lazy(() => import('../../container/feed/index'))

const Admin = () => {
  let dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    let da = Cookies.get('auth_token');
    if (da) {
      let { exp } = jwt_decode(Cookies.get('auth_token'));
      if (Date.now() >= exp * 1000) {
        Swal.fire({
          icon: 'warning',
          title: 'Session TimeOut',
        }).then(result => {
          dispatch(logOut());
          history.push('/')
        });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Session TimeOut',
      }).then(result => {
        dispatch(logOut());
        history.push('/')
      });
    }
  });
  useEffect(() => {
    let da = Cookies.get('firstLoad');
    if (da) {
      Cookies.remove('firstLoad');
      dispatch(getGrade());
      dispatch(getOrg());
    } else {
      Cookies.set('firstLoad', true);
      history.go(0);
    }
  }, []);
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Suspense
        fallback={
          <div className="spin">
            <Spin />
          </div>
        }
      >
        <Route path={path} component={Dashboard} />
        <Route path={`${path}/ecommerce`} component={Ecommerce} />
        <Route path={`${path}`} component={Pages} />
        <Route path={`${path}`} component={Features} />
        <Route path={`${path}/users`} component={Users} />
        <Route path={`${path}/gallery`} component={Gallery} />
        <Route path={`${path}/project`} component={Projects} />
        <Route path={`${path}/calendar`} component={Calendars} />
        <Route path={`${path}/app/fileManager`} component={FileManager} />
        <Route path={`${path}/app/kanban`} component={Kanban} />
        <Route path={`${path}/email/:page`} component={Inbox} />
        <Route path={`${path}/main/chat`} component={Chat} />
        <Route path={`${path}/profile/myProfile`} component={Myprofile} />
        <Route path={`${path}/app/to-do`} component={ToDo} />
        <Route path={`${path}/app/note`} component={Note} />
        <Route path={`${path}/app/task`} component={Task} />
        <Route path={`${path}/contact/list`} component={Contact} />
        <Route path={`${path}/contact/grid`} component={ContactGrid} />
        <Route path={`${path}/contact/addNew`} component={ContactAddNew} />
        <Route path={`${path}/app/calendar`} component={Calendar} />
        <Route path={`${path}/widgets`} component={Widgets} />
        {/* //fee routes */}
        <Route path={`${path}/fee/dashboard`} component={feedashboard} />
        <Route path={`${path}/fee/rpp`} component={feeRPP} />
        <Route path={`${path}/fee/rppsettings`} component={feeRPP_Settings} />
        <Route path={`${path}/fee/two_Plus_Settings`} component={two_Plus_Settings} />
        <Route path={`${path}/fee/coursefee`} component={feeCourseFee} />
        <Route path={`${path}/fee/twoplusone`} component={feeTwoPlusOne} />
        <Route path={`${path}/fee/setting`} component={feeSetting} />
        <Route path={`${path}/fee/discount`} component={feeDiscount} />
        <Route path={`${path}/fee/create`} component={feeNewFee} />
        {/* addmission routes */}
        <Route path={`${path}/admission/application`} component={addmissionApplication} />
        <Route path={`${path}/admission/feestatus`} component={addmissionFeeStatus} />
        <Route path={`${path}/admission/docs`} component={addmissionDocs} />
        {/* survey routes */}
        <Route path={`${path}/survey/createsurvey`} component={createSurvey} />
        <Route path={`${path}/survey/response`} component={surveyResponse} />
        {/* announcements routes */}
        <Route path={`${path}/announcements`} component={announcements} />
        {/* classroom routes */}
        <Route path={`${path}/classroom/student`} component={student} />
        <Route path={`${path}/classroom/attendence`} component={attendence} />
        <Route path={`${path}/classroom/lessons`} component={lessons} />
        <Route path={`${path}/classroom/leaverequest`} component={leaverequest} />
        <Route path={`${path}/classroom/documents`} component={documents} />
        <Route path={`${path}/classroom/tc`} component={tc} />
        <Route path={`${path}/classroom/calender`} component={calendar} />
        <Route path={`${path}/classroom/studentprofile`} component={studentProfile} />
        <Route path={`${path}/classroom/language`} component={language} />
        {/* examination routes */}
        <Route path={`${path}/examination/newschoolexam`} component={newschoolexam} />
        <Route path={`${path}/examination/viewexam`} component={viewexam} />
        <Route path={`${path}/examination/examtype`} component={examtype} />
        <Route path={`${path}/examination/schoolresult`} component={schoolresult} />
        {/* <Route path={`${path}/examination/reportcard`} component={reportcard} /> */}
        <Route path={`${path}/examination/onlineexam`} component={onlineexam} />
        <Route path={`${path}/examination/markentry`} component={markentery} />
        {/* suggestions routes */}
        <Route path={`${path}/suggestions`} component={suggestions} />
        {/* stream routes */}
        <Route path={`${path}`} component={Stream} />
        {/* liveclass routes */}
        <Route path={`${path}`} component={Liveclass} />
        {/* AnnouncemntFeed routes */}
        <Route path={`${path}`} component={AnnouncementFeedback} />
        {/* Classroom routes */}
        <Route path={`${path}`} component={Classroom} />
        {/* curricular routes */}
        <Route path={`${path}`} component={Curricular} />
        {/* discipline routes */}
        <Route path={`${path}`} component={Discipline} />
        {/* radio routes */}
        <Route path={`${path}`} component={Radio} />
        <Route path={`${path}`} component={Speech} />
        {/* Savingpassbook routes */}
        <Route path={`${path}`} component={Savingpassbook} />
        {/* suggestion routes */}
        <Route path={`${path}`} component={Suggestion} />
        {/* suggestion routes */}
        {/* <Route path={`${path}`} component={Suggestion} /> */}
        {/* settings routes */}
        <Route path={`${path}`} component={Settings} />
        {/* Library routes */}
        <Route path={`${path}`} component={Library} />
        {/* Expenses routes */}
        <Route path={`${path}`} component={Expenses} />
        {/* Assetsallocation routes */}
        <Route path={`${path}`} component={Asset} />
        {/* Timetable routes */}
        <Route path={`${path}`} component={Timetable} />
        {/* Vendor management routes */}
        <Route path={`${path}`} component={Vendormanagement} />
        {/* AwardsRecognition routes */}
        <Route path={`${path}`} component={AwardsRecognition} />
        {/* Queuemanagement routes */}
        <Route path={`${path}`} component={QueueManagement} />
        {/* Transport  routes */}
        <Route path={`${path}`} component={Transport} />
        <Route path={`${path}/feed`} component={Feeds} />
      </Suspense>
    </Switch>
  );
};

export default withAdminLayout(Admin);
