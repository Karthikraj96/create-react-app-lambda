import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const library=lazy(()=>import('../../container/library/library'));
// const schoolinfo = lazy(()=>import('../../container/settings//myschool/myschool'));


const Library = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/library`} component={library}  />
        
      </Switch>
    );
  };
  
  export default Library;