import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const classroomSettings = lazy(()=>import('../../container/settings/classroom/classroom'));
const promotion = lazy(()=>import('../../container/settings/promotion/promotion'));
const institute = lazy(()=>import('../../container/settings/Institute/institutes'));
const academic = lazy(()=>import('../../container/settings/academic year/academic'));
// const schoolinfo = lazy(()=>import('../../container/settings//myschool/myschool'));


const Settings = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/classroomsettings`} component={classroomSettings}  />
         <Route path={`${path}/promotion`} component={promotion}  />
         <Route path={`${path}/institute`} component={institute}  />
         <Route path={`${path}/academic`} component={academic}  />
        
      </Switch>
    );
  };
  
  export default Settings;