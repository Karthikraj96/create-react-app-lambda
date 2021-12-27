import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const Feed=lazy(()=>import('../../container/feed'));


const FeedComp = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/feed`} component={Feed}  />
        
      </Switch>
    );
  };
  
  export default FeedComp;