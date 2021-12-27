import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const timetable= lazy(()=>import('../../container/timeTable/timeTable'));


const Timetable = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/timetable`} component={timetable}  />

      </Switch>
    );
  };
  
  export default Timetable;