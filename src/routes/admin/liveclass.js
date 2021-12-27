import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const liveclass = lazy(()=>import('../../container/liveclass/classShedule'));
const newsfeed = lazy(()=>import('../../container/liveclass/newsFeed'));
// const announcement = lazy(()=>import('../../container/liveclass/announcement'));
// const discipline = lazy(()=>import('../../container/liveclass/discipline'));
// const extracurricular = lazy(()=>import('../../container/liveclass/extraCurricular'));
// const radio = lazy(()=>import('../../container/liveclass/radio'));
// const savingpassbook = lazy(()=>import('../../container/liveclass/savingPassbook'));
// const suggestion= lazy(()=>import('../../container/liveclass/suggestion'));
// const classroom=lazy(()=>import('../../container/liveclass/classroom'));
// const subject=lazy(()=>import('../../container/liveclass/subject'));
// const subjectdata=lazy(()=>import('../../container/liveclass/subjectData'));


const LiveclassRoute = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
          <Route path={`${path}/liveclass`} component={liveclass}  />
          <Route path={`${path}/newsfeed`} component={newsfeed}  />
          {/* <Route path={`${path}/announcement`} component={announcement}  />
          <Route path={`${path}/discipline`} component={discipline}  />
          <Route path={`${path}/extracurricular`} component={extracurricular}  />
          <Route path={`${path}/radio`} component={radio}  />
          <Route path={`${path}/savingpassbook`} component={savingpassbook}  />
          <Route path={`${path}/suggestion`} component={suggestion}  />
          <Route path={`${path}/classroom`} component={classroom}  />
          <Route path={`${path}/subject`} component={subject}  />
          <Route path={`${path}/subjectdata`} component={subjectdata}  /> */}
      </Switch>
    );
  };
  
  export default LiveclassRoute;