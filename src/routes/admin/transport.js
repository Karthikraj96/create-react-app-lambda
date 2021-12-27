import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const transport= lazy(()=>import('../../container/transport/index'));


const Transport = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/transport`} component={transport}  />

      </Switch>
    );
  };
  
  export default Transport;