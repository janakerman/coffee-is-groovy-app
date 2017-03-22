import $ from 'jquery';
import Router from './Router';
import Dashboard from './Dashboard';

const router = new Router($('#router'), {
  dashboard: {
    vmClass: Dashboard,
    templateUrl: './src/dashboard.html'
  }
});
