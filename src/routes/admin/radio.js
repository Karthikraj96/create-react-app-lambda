import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const radio = lazy(()=>import('../../container/radio/radio'));


const Radio = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/radio`} component={radio}  />
        
      </Switch>
    );
  };
  
  export default Radio;