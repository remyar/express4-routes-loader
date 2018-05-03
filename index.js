
var path = require('path');

module.exports.load = (expressApp , routes ) => {

    var _path = {};
    for (var key in routes) {

        var controller = require(path.resolve(__dirname ,"../../" + routes[key].controller ));

        for (var action in controller)
        {
            var url = routes[key].url;

            var renderPage = routes[key].view;
            var actionPage = controller[action];

            if (_path[url] == undefined)
                _path[url] = Object.assign({}, _path[url], { 'render': renderPage, 'action': {} });

            _path[url].action[action.toUpperCase()] = actionPage;

            expressApp[action](url, function (req, res, next) {

                function _render(result) {

                    var sessionData = Object.assign(result, req.objRet);
                    
                    res.render(_path[req.route.path].render, sessionData);
                }

                var result = _path[req.route.path].action[req.method](req, res, next, _render);
                if (result != undefined && result != null) {
                    _render(result);
                }
            });
        }
    }
}