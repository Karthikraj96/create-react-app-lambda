import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const suggestion= lazy(()=>import('../../container/suggestions/suggestions'));


const Suggestion = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/suggestion`} component={suggestion}  />

      </Switch>
    );
  };
  
  export default Suggestion;