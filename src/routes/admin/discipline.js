import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const discipline = lazy(()=>import('../../container/discipline/disciplineIndex'));


const Discipline = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/discipline`} component={discipline}  />
        
      </Switch>
    );
  };
  
  export default Discipline;