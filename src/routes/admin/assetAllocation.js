import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const stock = lazy(()=>import('../../container/assetAllocation/stock/stock'));
const allocation = lazy(()=>import('../../container/assetAllocation/allocation/allocation'));
const settings = lazy(()=>import('../../container/assetAllocation/settings/settings'));


const Asset = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/stock`} component={stock}  />
         <Route path={`${path}/allocation`} component={allocation}  />
         <Route path={`${path}/assetsettings`} component={settings}  />
        
      </Switch>
    );
  };
  
  export default Asset;