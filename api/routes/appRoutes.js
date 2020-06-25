import * as controller from "api/controllers/appController";
import { match } from "path-to-regexp";

const routes = {
  "/count": {
    GET: controller.count_all_records,
  },
  "/count/shootings": {
    GET: controller.count_all_shootings,
  },
  "/count/brutality": {
    GET: controller.count_all_brutality,
  },
  "/count/state/name": {
    GET: controller.count_all_records_by_state,
  },
  "/count/shootings/state/name": {
    GET: controller.count_all_shootings_by_state,
  },
  "/count/brutality/state/name": {
    GET: controller.count_all_brutality_by_state,
  },
  "/count/state/abbv": {
    GET: controller.count_all_records_by_stateabbv,
  },
  "/count/shootings/state/abbv": {
    GET: controller.count_all_shootings_by_stateabbv,
  },
  "/count/brutality/state/abbv": {
    GET: controller.count_all_brutality_by_stateabbv,
  },
  "/count/statecounty": {
    GET: controller.count_all_records_by_state_county,
  },
  "/count/shootings/statecounty": {
    GET: controller.count_all_shootings_by_state_county,
  },
  "/count/brutality/statecounty": {
    GET: controller.count_all_brutality_by_state_county,
  },
  "/count/shootings/overtime": {
    GET: controller.count_all_shootings_over_time,
  },
  "/shootings": {
    GET: controller.list_all_shootings,
  },
  "/shootings/state": {
    GET: controller.list_all_shootings_by_state,
  },
  "/shootings/state/:stateCode": {
    GET: controller.list_all_shootings_for_state,
  },
  "/shootings/last20": {
    GET: controller.list_last_shootings,
  },
  "/shootings/:shootingId1-:shootingId2": {
    GET: controller.read_span_shootings,
  },
  "/shootings/:shootingId": {
    GET: controller.read_a_shooting,
  },
  "/brutality": {
    GET: controller.list_all_brutality,
  },
  "/brutality/state": {
    GET: controller.list_all_brutality_by_state,
  },
  "/brutality/state/:stateCode": {
    GET: controller.list_all_brutality_for_state,
  },
  "/brutality/last20": {
    GET: controller.list_last_brutality,
  },
  "/brutality/:brutalityId1-:brutalityId2": {
    GET: controller.read_span_brutality,
  },
  "/brutality/:brutalityId": {
    GET: controller.read_a_brutality,
  },
};

const compiledRoutes = {};
Object.keys(routes).forEach((route) => {
  compiledRoutes[route] = { ...routes[route], match: match(route) };
});

export default function handle(req, res) {
  // Routes
  const {
    query: { route },
    method,
  } = req;
  const routeJoined = `/${route.join("/")}`;
  const matchingRoute = Object.values(compiledRoutes).find((r) =>
    r.match(routeJoined)
  );
  if (matchingRoute && matchingRoute[method]) {
    const handler = matchingRoute[method];
    const { params } = matchingRoute.match(routeJoined);
    handler({ ...req, params }, res);
    return;
  }
  res.statusCode = 404;
  res.end();
}

export async function getApiData(route) {
  return new Promise(function (res, rej) {
    const request = { query: { route: route.split("/") }, method: "GET" };
    const response = {
      send: function (data) {
        res(JSON.parse(JSON.stringify(data)));
      },
      end: res,
    };
    handle(request, response);
  });
}
