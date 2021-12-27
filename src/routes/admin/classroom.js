import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


const classroom = lazy(()=>import('../../container/classroom/classroom'));
const subject=lazy(()=>import('../../container/classroom/subject'));
const subjectdata=lazy(()=>import('../../container/classroom/subjectData'));


const Classroom = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
          {/* <Route path={`${path}/classroom`} component={classroom}  />
          <Route path={`${path}/subject`} component={subject}  />
          <Route path={`${path}/subjectdata`} component={subjectdata}  /> */}
        
      </Switch>
    );
  };
  
  export default Classroom;