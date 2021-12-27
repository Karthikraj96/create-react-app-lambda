import React, { useState, lazy, Suspense } from 'react';
import { Row, Col, Skeleton, Select } from 'antd';
import FeatherIcon from 'feather-icons-react';
import CalenDar from 'react-calendar';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Aside, CalendarWrapper } from './Style';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { Cards } from '../../components/cards/frame/cards-frame';
import { PageHeader } from '../../components/page-headers/page-headers';
import 'react-calendar/dist/Calendar.css';
import { eventVisible } from '../../redux/calendar/actionCreator';
const { Option } = Select;

const YearCalendar = lazy(() => import('./overview/Year'));
const MonthCalendar = lazy(() => import('./overview/Month'));
const WeekCalendar = lazy(() => import('./overview/Week'));
const DayCalendar = lazy(() => import('./overview/Day'));
const TodayCalendar = lazy(() => import('./overview/Today'));
const ScheduleCalendar = lazy(() => import('./overview/Schedule'));

const Calendars = props => {
  const dispatch = useDispatch();
  const { events, isVisible } = useSelector(state => {
    return {
      events: state.Calender.events,
      isVisible: state.Calender.eventVisible,
    };
  });

  const { path } = useRouteMatch();
  const [state, setState] = useState({
    date: new Date(),
    visible: false,
  });

  const onChange = date => setState({ date });

  const onHandleVisible = () => {
    dispatch(eventVisible(!isVisible));
  };
  const calledFrom = props?.calledFrom || '';
  return (
    <>
      {calledFrom !== 'dashboard' && (
        <PageHeader
          ghost
          title="Calendar"
          buttons={[
            <div key="1" className="page-header-actions">
              {/* <CalendarButtonPageHeader />
            <ExportButtonPageHeader />
            <ShareButtonPageHeader /> */}
              <Select
                showSearch
                style={{ width: 200, marginRight: '20px' }}
                placeholder="Select Instute"
                optionFilterProp="children"
                // onChange={onChange}
                // onFocus={onFocus}
                // onBlur={onBlur}
                // onSearch={onSearch}
                // filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
              >
                <Option value="1">1</Option>
                <Option value="2">2</Option>
                <Option value="3">3</Option>
              </Select>
              <Button size="small" type="primary">
                <FeatherIcon icon="plus" size={14} />
                Add New
              </Button>
            </div>,
          ]}
        />
      )}

      <Main>
        <CalendarWrapper>
          <Row gutter={25}>
            <Col xxl={24} xl={24} xs={24}>
              <Switch>
                <Suspense
                  fallback={
                    <Cards headless>
                      <Skeleton paragraph={{ rows: 15 }} active />
                    </Cards>
                  }
                >
                  <Route path={`${path}/year`} component={YearCalendar} />
                  <Route path={`${path}`} component={MonthCalendar} />
                  <Route path={`${path}/week`} component={WeekCalendar} />
                  <Route path={`${path}/day`} component={DayCalendar} />
                  <Route path={`${path}/today`} component={TodayCalendar} />
                  <Route path={`${path}/schedule`} component={ScheduleCalendar} />
                  {calledFrom !== 'dashboard' && (
                    <Cards headless>
                      <h3 className="listHeader">
                        My Calendars
                        <Link onClick={onHandleVisible} className="add-label" to="#">
                          <FeatherIcon icon="plus" size={14} />
                        </Link>
                      </h3>
                      <ul className="event-list">
                        {events.map(event => {
                          const { id, title, label } = event;
                          return (
                            <li key={id}>
                              <Link to="#">
                                <span className={`bullet ${label}`} />
                                {title}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </Cards>
                  )}
                </Suspense>
              </Switch>
            </Col>
          </Row>
        </CalendarWrapper>
      </Main>
    </>
  );
};

export default Calendars;
