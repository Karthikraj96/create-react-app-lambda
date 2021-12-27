import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const extracurricular = lazy(()=>import('../../container/curricular/extraCurricular'));


const Curricular = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/extracurricular`} component={extracurricular}  />
        
      </Switch>
    );
  };
  
  export default Curricular;