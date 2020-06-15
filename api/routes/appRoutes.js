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
  "/shootings": {
    GET: controller.list_all_shootings,
    // POST: controller.create_a_shooting
  },
  "/shootings/last20": {
    GET: controller.list_last_shootings,
  },
  "/shootings/:shootingId1-:shootingId2": {
    GET: controller.read_span_shootings,
  },
  "/shootings/:shootingId": {
    GET: controller.read_a_shooting,
    // PUT: controller.update_a_shooting,
    // DELETE: controller.delete_a_shooting,
  },
  "/brutality": {
    GET: controller.list_all_brutality,
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

export default function (req, res) {
  // Routes
  const {
    query: { route },
  } = req;
  const routeJoined = `/${route.join("/")}`;
  const matchingRoute = Object.values(compiledRoutes).find((r) =>
    r.match(routeJoined)
  );
  if (matchingRoute && matchingRoute[req.method]) {
    const handler = matchingRoute[req.method];
    const { params } = matchingRoute.match(routeJoined);
    handler({ ...req, params }, res);
    return;
  }
  res.statusCode = 404;
  res.end();
}
