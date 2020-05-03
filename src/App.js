import React from 'react';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import './App.css';
import ApplicationBar from './Components/app_bar/ApplicationBar';
import { CssBaseline } from '@material-ui/core';
import { Route, BrowserRouter, Switch } from 'react-router-dom';
import AppDrawer from './Components/app_drawer/AppDrawer';
import HomeView from './Views/home_view/HomeView';
import defaultReducer from './Reducer/Reducer';
import ContestView from './Views/contest_view/ContestView';
import 'typeface-roboto';
import ContestDetails from './Views/contest_details_view/ContestDetails';
import TeamView from './Views/team_view/TeamView';

const store = createStore(defaultReducer);

function App() {
  const [state, setState] = React.useState({ open: false });

  const handleDrawerClose = () => {
    setState({ open: false });
  }

  const handleDrawerOpen = () => {
    setState({ open: true });
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <div className="App">
          <CssBaseline />
          <AppDrawer isOpen={state.open} drawerClose={handleDrawerClose} />
          <ApplicationBar open={handleDrawerOpen} />
          <Switch>
            <Route exact path="/">
              <HomeView />
            </Route>
            <Route path="/contests">
              <ContestView />
            </Route>
            <Route path="/contest_view">
              <ContestDetails />
            </Route>
            <Route path="/team">
              <TeamView />
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
