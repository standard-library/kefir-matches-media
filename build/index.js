"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _kefir = require("kefir");

function mediaContext(viewport, query) {
  var matcher = viewport.matchMedia(query);

  return _kefir.Kefir.stream(function (emitter) {
    var emitMatches = function emitMatches(e) {
      return emitter.emit(e.matches);
    };

    matcher.addListener(emitMatches);

    return function () {
      matcher.removeListener(emitMatches);
    };
  }).toProperty(function () {
    return matcher.matches;
  });
}

exports.default = mediaContext;