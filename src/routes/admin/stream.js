import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const stream = lazy(() => import('../../container/stream/streamIndex'));

const datastream = lazy(() => import('../../container/stream/streamData'));

const createcurriculum = lazy(() => import('../../container/stream/createCurriculum'));

const lessoncontent = lazy(() => import('../../container/stream/lessonContent'));

const volumesContent = lazy(() => import('../../container/stream/courseinfo'));
const lessons = lazy(() => import('../../container/stream/lessons'));

const StreamRoute = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/stream`} component={stream} />
      <Route path={`${path}/datastream`} component={datastream} />
      <Route path={`${path}/curriculum`} component={createcurriculum} />
      <Route path={`${path}/content`} component={lessoncontent} />
      <Route path={`${path}/subjectInfo`} component={volumesContent} />
      <Route path={`${path}/lessons`} component={lessons} />

      {/* <Route path='/content'  component={lessoncontent}  /> */}
    </Switch>
  );
};

export default StreamRoute;
