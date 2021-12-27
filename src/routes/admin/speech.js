import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const speech = lazy(()=>import('../../container/speech/speech'));


const Speech = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/speech`} component={speech}  />
        
      </Switch>
    );
  };
  
  export default Speech;