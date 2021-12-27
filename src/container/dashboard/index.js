import React, { lazy, Suspense, useState, useEffect } from 'react';
import { Row, Col, Skeleton, Select, Card, BackTop } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Button } from '../../components/buttons/buttons';
import Heading from '../../components/heading/heading';
import { Main } from '../styled';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';
import { Focard, RatioCard } from './style';
import { ChartjsAreaChart } from '../../components/charts/chartjs';
import { chartLinearGradient } from '../../components/utilities/utilities';
import { decodedata, getAnnoucement, getRadio, getSpeech, getAllDiscipline, getAllSuggestion } from '../../api/api';

const Testimonials = lazy(() => import('../pages/Testimonials'));
const SocialMediaOverview = lazy(() => import('./overview/index/SocialMediaOverview'));
const FacebookOverview = lazy(() => import('./overview/index/FacebookOverview'));
const YoutubeSubscribers = lazy(() => import('./overview/index/YoutubeSubscribers'));
const TwitterOverview = lazy(() => import('./overview/index/TwitterOverview'));
const InstagramOverview = lazy(() => import('./overview/index/InstagramOverview'));
const LinkedinKeyMetrics = lazy(() => import('./overview/index/LinkedinKeyMetrics'));
const SocialTrafficMetrics = lazy(() => import('./overview/index/SocialTrafficMetrics'));
const { Option } = Select;

const Dashboard = () => {
  let [data, setData] = useState([]);
  let [radio_data, setRadio_data] = useState([]);
  let [update, setUpdate] = useState(0);
  let [tokendata, setTokendata] = useState(null);
  let [selectedOrg, setselectedOrg] = useState(decodedata.orgId);
  let [selectedOrg2, setselectedOrg2] = useState(decodedata.orgId);
  let [selectedLevel, setselectedLevel] = useState(null);
  let [total, setTotal] = useState();
  let [speechData, setSpeechData] = useState([]);
  let [DisciplineData, setDisplineData] = useState([]);
  let [SuggestionsData, setSuggestionsData] = useState([]);
  useEffect(() => {
    setTokendata(decodedata.role_id);
    let data = {
      orgId: selectedOrg,
      grade_id: selectedLevel,
    };
    let data2 = {
      orgId: selectedOrg2,
    };
    getAnnoucement(data)
      .then(res => {
        setData(res.data);
        setLoad(false);
      })
      .catch(e => {
        console.log(e);
      });
    getRadio().then(res => {
      setRadio_data(res.data);
    });
    getSpeech().then(res => {
      setSpeechData(res.data);
    });
    getAllDiscipline().then(res => {
      setDisplineData(res.data);
    });
    getAllSuggestion().then(res => {
      setSuggestionsData(res.data);
    });
  }, [selectedOrg, selectedLevel, update]);
  const attendenceChartoption = {
    cutoutPercentage: 70,
    maintainAspectRatio: true,
    responsive: true,
    legend: {
      display: true,
      position: 'bottom',
    },
    animation: {
      animateScale: true,
      animateRotate: true,
    },
  };
  const announcements = [
    'PTA for perambur branch on 27 Aug 2021',
    'School Reopens for class 11,12',
    'Principal will be having a session with students',
    'Independence day celebration at 9.00AM',
    'Price distribution for state rankers on 27 Dec 2021',
    'School Reopens for class 9th,10th',
    'Principal will be having a session with students',
  ];
  const principalSpeech = [
    {
      title: 'Prayer',
    },
    {
      title: 'Session with students',
    },
    {
      title: 'IIT JEE Resonance Partnership',
    },
    {
      title: 'Prayer',
    },
    {
      title: 'Prayer',
    },
  ];
  const radio = [
    {
      title: 'Prayer',
    },
    {
      title: 'Session with students',
    },
    {
      title: 'IIT JEE Resonance Partnership',
    },
    {
      title: 'Prayer',
    },
    {
      title: 'Prayer',
    },
  ];
  return (
    <>
      <PageHeader
        ghost
        title="Admin Dashboard"
        buttons={[
          <div key="6" className="page-header-actions">
            <Select placeholder="Select School Branch" style={{ width: 500, marginTop: 8, paddingLeft: 5 }}>
              <Option>All Branches</Option>

              <Option>Perambur</Option>
              <Option>Kolatur</Option>
              <Option>Anna Nagar</Option>
            </Select>
          </div>,
        ]}
      />
      <Main>
        <Row justify="center" gutter={25}>
          <Col sm={24} xs={24} md={6} lg={6} xxl={6}>
            <Focard>
              <div className="forcast-card-box">
                <Cards headless title="Classrooms">
                  <div className="focard-details growth-upward">
                    <Heading as="h1"> 101</Heading>
                    <p className="focard-status">
                      <span className="focard-status__percentage">
                        <FeatherIcon icon="arrow-up" /> 2%
                      </span>
                      <span>Since last year</span>
                    </p>
                  </div>
                  <ChartjsAreaChart
                    id="grossProfit"
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'july', 'Aug', 'Sep', 'Oct']}
                    datasets={[
                      {
                        data: [130, 10, 4, 5, 20, 30, 15, 25, 15, 10],
                        borderColor: '#20C997',
                        borderWidth: 3,
                        fill: true,
                        pointHoverBackgroundColor: '#20c997',
                        pointHoverBorderWidth: 0,
                        pointHoverBorderColor: 'transparent',
                        backgroundColor: () =>
                          chartLinearGradient(document.getElementById('grossProfit'), 80, {
                            start: '#20C99712',
                            end: '#20C99702',
                          }),
                      },
                    ]}
                    height={50}
                  />
                </Cards>
              </div>
            </Focard>
          </Col>
          <Col sm={24} xs={24} md={6} lg={6} xxl={6}>
            <Focard>
              <div className="forcast-card-box">
                <Cards headless title="Students">
                  <div className="focard-details growth-upward">
                    <Heading as="h1"> 82.24k</Heading>
                    <p className="focard-status">
                      <span className="focard-status__percentage">
                        <FeatherIcon icon="arrow-up" /> 45%
                      </span>
                      <span>Since last year</span>
                    </p>
                  </div>
                  <ChartjsAreaChart
                    id="grossProfit"
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'july', 'Aug', 'Sep', 'Oct']}
                    datasets={[
                      {
                        data: [30, 10, 50, 25, 20, 30, 15, 25, 15, 10],
                        borderColor: '#20C997',
                        borderWidth: 3,
                        fill: true,
                        pointHoverBackgroundColor: '#20c997',
                        pointHoverBorderWidth: 0,
                        pointHoverBorderColor: 'transparent',
                        backgroundColor: () =>
                          chartLinearGradient(document.getElementById('grossProfit'), 80, {
                            start: '#20C99712',
                            end: '#20C99702',
                          }),
                      },
                    ]}
                    height={50}
                  />
                </Cards>
              </div>
            </Focard>
          </Col>
          <Col sm={24} xs={24} md={6} lg={6} xxl={6}>
            <Focard>
              <div className="forcast-card-box">
                <Cards headless title="Staff">
                  <div className="focard-details growth-downward">
                    <Heading as="h1">1030</Heading>
                    <p className="focard-status">
                      <span className="focard-status__percentage">
                        <FeatherIcon icon="arrow-down" /> 5%
                      </span>
                      <span>Since last month</span>
                    </p>
                  </div>
                  <ChartjsAreaChart
                    id="grossProfit"
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'july', 'Aug', 'Sep', 'Oct']}
                    datasets={[
                      {
                        data: [30, 10, 50, 25, 20, 30, 15, 25, 15, 10],
                        borderColor: 'red',
                        borderWidth: 3,
                        fill: true,
                        pointHoverBackgroundColor: 'red',
                        pointHoverBorderWidth: 0,
                        pointHoverBorderColor: 'transparent',
                        backgroundColor: () =>
                          chartLinearGradient(document.getElementById('grossProfit'), 80, {
                            start: '#5F63F212',
                            end: '#5F63F202',
                          }),
                      },
                    ]}
                    height={50}
                  />
                </Cards>
              </div>
            </Focard>
          </Col>
          <Col sm={24} xs={24} md={6} lg={6} xxl={6}>
            <Focard>
              <div className="forcast-card-box">
                <Cards headless title="Vacancy">
                  <div className="focard-details growth-upward">
                    <Heading as="h1">200</Heading>
                    <p className="focard-status">
                      <span className="focard-status__percentage">
                        <FeatherIcon icon="arrow-up" /> 25%
                      </span>
                      <span>Since last year</span>
                    </p>
                  </div>
                  <ChartjsAreaChart
                    id="grossProfit"
                    labels={['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'july', 'Aug', 'Sep', 'Oct']}
                    datasets={[
                      {
                        data: [30, 10, 50, 25, 20, 30, 15, 25, 15, 10],
                        borderColor: '#20C997',
                        borderWidth: 3,
                        fill: true,
                        pointHoverBackgroundColor: '#20c997',
                        pointHoverBorderWidth: 0,
                        pointHoverBorderColor: 'transparent',
                        backgroundColor: () =>
                          chartLinearGradient(document.getElementById('grossProfit'), 80, {
                            start: '#20C99712',
                            end: '#20C99702',
                          }),
                      },
                    ]}
                    height={50}
                  />
                </Cards>
              </div>
            </Focard>
          </Col>
        </Row>
        <Row justify="center" gutter={25}>
          <Col sm={24} xs={24} md={24} lg={24} xxl={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Cards title={'Leadership Team'} size="large">
                <Testimonials calledFrom="dashboard" requestedType="1" />
              </Cards>
            </Suspense>
          </Col>
        </Row>
        <Row justify="center" gutter={25}>
          <Col sm={24} xs={24} md={24} lg={12} xxl={12}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Cards title={'Students Birthday'} size="large">
                <Testimonials calledFrom="dashboard" requestedType="3" />
              </Cards>
            </Suspense>
          </Col>
          <Col sm={24} xs={24} md={24} lg={12} xxl={12}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Cards title={'Teachers Birthday'} size="large">
                <Testimonials calledFrom="dashboard" requestedType="3" />
              </Cards>
            </Suspense>
          </Col>
        </Row>
        <Row gutter={25}>
          <Col xxl={12} lg={12} xs={24} md={12}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SocialMediaOverview
                height={200}
                labels={['Present', 'Late', 'Absent', 'OD']}
                datasets={[
                  {
                    data: [50, 20, 13, 9],
                    backgroundColor: ['green', 'yellow', 'red', '#cbe0e3', '#74de00'],
                  },
                ]}
                options={attendenceChartoption}
              />
            </Suspense>
          </Col>
          <Col xxl={12} lg={12} xs={24} md={12}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Card title="announcemnet">
                <div style={{ overflow: 'auto', height: 330 }}>
                  {data.map(data => {
                    return (
                      <div>
                        <h2>{data.title}</h2>
                        <p>{data.announce}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
              {/* <FacebookOverview title={'Announcements'} announcements={announcements} /> */}
            </Suspense>
          </Col>

          <Row gutter={20} style={{marginBottom:'10px',padding:'10px'}}>
            <Col sm={24} xs={24} md={6} lg={6} xxl={6}>
              <Card title="No.of classes scheduled" style={{ width: 285 }}>
              <p>10</p>
              </Card>
            </Col>
            <Col sm={24} xs={24} md={6} lg={6} xxl={6}>
              <Card title="No.of Students Attended" style={{ width: 285 }}>
              <p>10</p>
              </Card>
            </Col>
            <Col sm={24} xs={24} md={6} lg={6} xxl={6}>
              <Card title="No.of Parents Installed" style={{ width: 285 }}>
              <p>10</p>
              </Card>
            </Col>
            <Col sm={24} xs={24} md={6} lg={6} xxl={6}>
              <Card title="No.of Live Classes Conducted" style={{ width: 285 }}>
                <p>10</p>
              </Card>
            </Col>
          </Row>

          <Col xxl={12} lg={12} xs={24} md={12}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Card title="Pricipal Speech" style={{ marginBottom: '10px' }}>
                <div style={{ overflow: 'auto', height: 330 }}>
                  {speechData.map(data => {
                    return (
                      <div>
                        <h2>{data.title}</h2>
                        <h4>{data.date}</h4>
                        <p>{data.speechby}</p>
                        <p>{data.audio}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
              {/* <YoutubeSubscribers title={'Principal Speech'} principalSpeech={principalSpeech} /> */}
            </Suspense>
          </Col>
          <Col xxl={12} lg={12} xs={24} md={12}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Card title="Radio">
                <div style={{ overflow: 'auto', height: 330 }}>
                  {radio_data.map(data => {
                    return (
                      <div>
                        <h2>{data.title}</h2>
                        <p>{data.description}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
              {/* <YoutubeSubscribers title={'Radio'} principalSpeech={radio} /> */}
            </Suspense>
          </Col>
          <Col xxl={12} lg={12} xs={24} md={12}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Card title="Discipline">
                <div style={{ overflow: 'auto', height: 330 }}>
                  {DisciplineData.map(data => {
                    return (
                      <div>
                        <h2>{data.name}</h2>
                        <p>{data.generalissue}</p>
                        <p>{data.comments}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
              {/* <FacebookOverview title={'Discipline'} announcements={announcements} /> */}
            </Suspense>
          </Col>
          <Col xxl={12} lg={12} xs={24} md={12}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <Card title="Suggestions" style={{ marginBottom: '10px' }}>
                <div style={{ overflow: 'auto', height: 330 }}>
                  {SuggestionsData.map(data => {
                    return (
                      <div>
                        <h2>{data.studentName}</h2>
                        <p>{data.type}</p>
                        <p>{data.subject}</p>
                        <p>{data.message}</p>
                        <p>{data.response}</p>
                      </div>
                    );
                  })}
                </div>
              </Card>
              {/* <FacebookOverview title={'Suggestions'} announcements={announcements} /> */}
            </Suspense>
          </Col>
          <Col xxl={24} xs={24}>
            <Suspense
              fallback={
                <Cards headless>
                  <Skeleton active />
                </Cards>
              }
            >
              <SocialTrafficMetrics />
            </Suspense>
          </Col>
        </Row>
      </Main>
    </>
  );
};

export default Dashboard;
