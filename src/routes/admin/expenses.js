import React, { lazy } from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';

const expenses=lazy(()=>import('../../container/expenses/expenses'));


const Expenses = () => {
    const { path } = useRouteMatch();
    return (
      <Switch>
         
         <Route path={`${path}/expenses`} component={expenses}  />
        
      </Switch>
    );
  };
  
  export default Expenses;