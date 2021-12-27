import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const awardsRecognition= lazy(()=>import('../../container/awards & Recognition/awards'));
const batchType= lazy(()=>import('../../container/awards & Recognition/batchType'));


const AwardsRecognition = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/awardsRecognition`} component={awardsRecognition}  />
         <Route path={`${path}/batchtype`} component={batchType}  />
      </Switch>
    );
  };
  
  export default AwardsRecognition;