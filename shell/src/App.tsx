import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import NotFound from './pages/NotFound';
import { importRemote } from '@module-federation/utilities';

const DashboardRemote = React.lazy(() =>
  importRemote({
    url: 'http://localhost:3001',
    scope: 'app1',
    module: 'Dashboard',
  }),
);
const Dashboard = () => (
  <React.Suspense fallback="Loading Dashboard">
    <DashboardRemote />
  </React.Suspense>
);

const PhotoListRemote = React.lazy(() =>
  importRemote({
    url: 'http://localhost:3001',
    scope: 'app1',
    module: 'PhotoList',
  }),
);
const PhotoList = () => (
  <React.Suspense fallback="Loading PhotoList">
    <PhotoListRemote />
  </React.Suspense>
);

const App2Remote = React.lazy(() =>
  importRemote({
    url: 'http://localhost:3002',
    scope: 'app2',
    module: 'App2',
  }),
);

const App2 = () => (
  <React.Suspense fallback="Loading App2">
    <App2Remote />
  </React.Suspense>
);


const App = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="list" element={<PhotoList />} />
        <Route path="app2" element={<App2 />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </React.Suspense>
);

export default App;
