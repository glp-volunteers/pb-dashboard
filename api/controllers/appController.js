import Shooting from "../model/appModelShootings.js";
import Count from "../model/appModelCount.js";
import Brutality from "../model/appModelBrutality.js";

// COUNT APIs
export const count_all_records = function (req, res) {
  Count.countAllRecords(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_shootings = function (req, res) {
  Count.countAllShootings(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
    res.end();
  });
};

export const count_all_brutality = function (req, res) {
  Count.countAllBrutality(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_records_by_state = function (req, res) {
  Count.countAllRecordsByState(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_shootings_by_state = function (req, res) {
  Count.countAllShootingsByState(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_brutality_by_state = function (req, res) {
  Count.countAllBrutalityByState(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_records_by_state_county = function (req, res) {
  Count.countAllRecordsByStateCounty(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_shootings_by_state_county = function (req, res) {
  Count.countAllShootingsByStateCounty(req.params.state, function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_brutality_by_state_county = function (req, res) {
  Count.countAllBrutalityByStateCounty(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_records_by_stateabbv = function (req, res) {
  Count.countAllRecordsByStateAbbv(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_shootings_by_stateabbv = function (req, res) {
  Count.countAllShootingsByStateAbbv(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_brutality_by_stateabbv = function (req, res) {
  Count.countAllBrutalityByStateAbbv(function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_all_shootings_over_time = function (req, res) {
  Count.countAllShootingsOverTime(req.params.state, function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

export const count_top_police_departments = function (req, res) {
  Count.countTopPoliceDepartments(req.params.state, function (err, count) {
    if (err) return res.send(err);
    res.send(count);
  });
};

// SHOOTINGS API
export const list_all_shootings = function (req, res) {
  Shooting.getAllShootings(function (err, shooting) {
    if (err) return res.send(err);
    res.send(shooting);
  });
};

export const list_all_shootings_by_state = function (req, res) {
  Shooting.getAllShootingsByState(function (err, shooting) {
    if (err) return res.send(err);
    res.send(shooting);
  });
};

export const list_last_shootings = function (req, res) {
  Shooting.getLast20Shootings(req.params.state, function (err, shooting) {
    if (err) return res.send(err);
    res.send(shooting);
  });
};

export const read_a_shooting = function (req, res) {
  Shooting.getShootingById(req.params.shootingId, function (err, shooting) {
    if (err) return res.send(err);
    res.json(shooting);
  });
};

export const read_span_shootings = function (req, res) {
  Shooting.getShootingByIds(
    req.params.shootingId1,
    req.params.shootingId2,
    function (err, shooting) {
      if (err) return res.send(err);
      res.json(shooting);
    }
  );
};

// BRUTALITY APIs
export const list_all_brutality = function (req, res) {
  Brutality.getAllBrutality(function (err, brutality) {
    if (err) return res.send(err);
    res.send(brutality);
  });
};

export const list_all_brutality_by_state = function (req, res) {
  Brutality.getAllBrutalityByState(function (err, brutality) {
    if (err) return res.send(err);
    res.send(brutality);
  });
};

export const list_all_brutality_for_state = function (req, res) {
  Brutality.getAllBrutalityForState(req.params.stateCode, function (
    err,
    brutality
  ) {
    if (err) return res.send(err);
    res.send(brutality);
  });
};

export const list_all_shootings_for_state = function (req, res) {
  Shooting.getAllShootingsForState(req.params.stateCode, function (
    err,
    shooting
  ) {
    if (err) return res.send(err);
    res.send(shooting);
  });
};

export const list_last_brutality = function (req, res) {
  Brutality.getLast20Brutality(function (err, brutality) {
    if (err) return res.send(err);
    res.send(brutality);
  });
};

export const read_a_brutality = function (req, res) {
  Brutality.getBrutalityById(req.params.brutalityId, function (err, brutality) {
    if (err) return res.send(err);
    res.json(brutality);
  });
};

export const read_span_brutality = function (req, res) {
  Brutality.getBrutalityByIds(
    req.params.brutalityId1,
    req.params.brutalityId2,
    function (err, brutality) {
      if (err) return res.send(err);
      res.json(brutality);
    }
  );
};
