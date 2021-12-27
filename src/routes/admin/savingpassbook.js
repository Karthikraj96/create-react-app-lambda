import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const savingpassbook = lazy(()=>import('../../container/savingpassbook/savingPassbook'));


const Savingpassbook = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/savingpassbook`} component={savingpassbook}  />
        
      </Switch>
    );
  };
  
  export default Savingpassbook;