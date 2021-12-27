import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const vendorList = lazy(()=>import('../../container/vendorManagement/vendorList'));
const Bids = lazy(()=>import('../../container/vendorManagement/workFlow/Bids'));
const Jobs = lazy(()=>import('../../container/vendorManagement/workFlow/Jobs'));
const Payments = lazy(()=>import('../../container/vendorManagement/workFlow/Payments'));


const Vendormanagement = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/vendorList`} component={vendorList}  />
         <Route path={`${path}/Bids`} component={Bids}  />
         <Route path={`${path}/Jobs`} component={Jobs}  />
         <Route path={`${path}/Payments`} component={Payments}  />
        
      </Switch>
    );
  };
  
  export default Vendormanagement;