'use strict';

var mongoose    = require('mongoose'),
    Route       = mongoose.model('Route'),
    _           = require('lodash');

exports.route = function(req, res, next, id) {
    Route.load(id, function(err, route) {
        if (err) return next(err);
        if (!route) return next(new Error('Failed to load route ' + id));
        
        req.route = route;
        next();
    });
};

exports.all = function(req, res) {
    Route.find().sort('-path').exec(function(err, models) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(models);
        }
    });
};

exports.create = function(req, res) {
    var model   = new Route(req.body);

    model.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                routes: model
            });
        } else {
            res.jsonp(model);
        }
    });
};

exports.destroy = function(req, res) {
    var model = req.route;

    model.remove(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                ruote: model
            });
        } else {
            res.jsonp(model);
        }
    });
};

exports.update = function(req, res) {
    var model = req.route;
    model = _.extend(model, req.body);
    console.log(model);

    model.save(function(err) {
        if (err) {
            return res.send('users/signup', {
                errors: err.errors,
                route: model
            });
        } else {
            res.jsonp(model);
        }
    });
};

exports.show = function(req, res) {
    res.jsonp(req.route);
};