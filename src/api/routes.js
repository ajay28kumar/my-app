import GraffitiChartController from './controllers/GraffitiChartController';

const routes = {
  get: {},
  post: {},
  put: {},
  patch: {},
  delete: {},
};

// GET
routes.post['/get-graffiti-charts'] = GraffitiChartController.getCharts;

export default routes;
