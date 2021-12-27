import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';


const announcement = lazy(()=>import('../../container/announcementFeedback/announcement'));


const AnnouncementFeedback = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
          <Route path={`${path}/announcement`} component={announcement}  />
        
      </Switch>
    );
  };
  
  export default AnnouncementFeedback;