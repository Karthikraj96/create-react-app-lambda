import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const queue = lazy(()=>import('../../container/queueMangement/queue'));
const queuestatus = lazy(()=>import('../../container/queueMangement/status'));

const QueueManagement = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/queue`} component={queue}/>
         <Route path={`${path}/queuestatus`} component={queuestatus} />
      </Switch>
    );
  };
  
  export default QueueManagement;