System.register("../src/config", [], function() {
  "use strict";
  var __moduleName = "../src/config";
  var _DEBUG_MODE_ = true;
  return {get _DEBUG_MODE_() {
      return _DEBUG_MODE_;
    }};
});
System.register("../src/util", [], function() {
  "use strict";
  var __moduleName = "../src/util";
  var PXConfig = System.get("../src/config");
  function trace_func(str) {
    if (PXConfig._DEBUG_MODE_) {
      var d = new Date();
      var hh = d.getHours();
      var mm = d.getMinutes();
      var ss = d.getSeconds();
      var dd = d.getMilliseconds();
      var log_time = hh + ":" + mm + ":" + ss + ":" + dd;
      console.log(log_time + " " + str);
    }
  }
  return {get trace_func() {
      return trace_func;
    }};
});
System.register("../src/app", [], function() {
  "use strict";
  var __moduleName = "../src/app";
  var PXUtil = System.get("../src/util");
  var Application = function Application() {
    PXUtil.trace_func('App::constructor');
    this.http_ = require('http');
    this.connect_ = require('connect');
    this.serveStatic = require('serve-static');
  };
  ($traceurRuntime.createClass)(Application, {run: function() {
      PXUtil.trace_func('App::run');
      var con = this.connect_().use(this.serveStatic('./webroot'));
      ;
      var server = this.http_.createServer(con);
      server.listen(80);
    }}, {});
  var app = new Application();
  app.run();
  return {};
});
System.get("../src/app" + '');
