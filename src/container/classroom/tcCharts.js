import React, { lazy, Suspense } from 'react';
import { Row, Col, Skeleton } from 'antd';
import FeatherIcon from 'feather-icons-react';
import { PageHeader } from '../../components/page-headers/page-headers';
import { Cards } from '../../components/cards/frame/cards-frame';
import { Main } from '../styled';
import { Button } from '../../components/buttons/buttons';
import { ShareButtonPageHeader } from '../../components/buttons/share-button/share-button';
import { ExportButtonPageHeader } from '../../components/buttons/export-button/export-button';
import { CalendarButtonPageHeader } from '../../components/buttons/calendar-button/calendar-button';

const DailyOverview = lazy(() => import('./overview/performance/DailyOverview'));
const WebsitePerformance = lazy(() => import('./overview/performance/WebsitePerformance'));
const TrafficChannel = lazy(() => import('./overview/performance/TrafficChannel'));
const SessionsByDevice = lazy(() => import('./overview/performance/SessionsByDevice'));
const TopLandingPages = lazy(() => import('./overview/performance/TopLandingPages'));
const SessionsbyRegion = lazy(() => import('./overview/performance/SessionsbyRegion'));

const TCHeader = () => {
  return (
    <Row justify="center" gutter={25}>
      <Col xxl={8} xl={10} lg={12} xs={24}>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <DailyOverview />
        </Suspense>
      </Col>
      <Col xxl={16} xl={14} lg={12} xs={24}>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <WebsitePerformance />
        </Suspense>
      </Col>
    </Row>
  );
};

export default TCHeader;
