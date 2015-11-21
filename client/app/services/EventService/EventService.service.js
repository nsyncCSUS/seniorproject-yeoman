'use strict';

angular.module('seniorprojectYoApp')
    .service('EventService', function($http, Restangular) {
        Restangular.setFullResponse(true);

        /**
         * A list of relevant constants for http functions
         */
        var Constants = Object.freeze({
            routes: {
                users: 'api/users',
                groups: 'api/groups',
                events: 'api/events'
            },

            user: 'users',
            groups: 'groups',
            events: 'events',
            organizers: 'organizers',
            volunteers: 'volunteers'
        });

        var Events = Restangular.service(Constants.routes.events);


        this.index = function(_params, callback, error) {
            var params = {
                page: _params.page || 1,
                offset: _params.offset || 0
            };

            Events.getList().then(callback, error);
        };


        this.show = function(id, callback, error) {
            Events.one(id).get().then(callback, error);
        };


        this.update = function(id, params, callback, error) {
            Events.one(id).patch({event: params}).then(callback, error);
        };


//        this.create = function(params, callback, error) {
////            Restangular.one(Constants.routes.events)
////                .post({event: params})
////                .then(callback, error);
//            Events.post(params).then(callback, error);
//        };


        this.destroy = function(id, callback, error) {
            Events.one(id).remove().then(callback, error);
        };


        /**
         * Nested data structure for handling event queries
         */
        this.organizers = {

            index: function(id, _params, callback, error) {
                var params = {
                    page: _params.page,
                    offset: _params.offset
                };

                Events.one(id).one(Constants.organizers).get(params).then(callback, error);
            },

            show: function(id, organizerId, callback, error) {
                Events.one(id).one(Constants.organizers, organizerId).get().then(callback, error);
            },

            create: function(id, organizerId, callback, error) {
                Events.one(id).one(Constants.organizers, organizerId).post().then(callback, error);
            },

            destroy: function(id, organizerId, callback, error) {
                Events.one(id).one(Constants.organizers, organizerId).remove().then(callback, error);
            }
        };


        /**
         * Nested data structure for handling user queries
         */
        this.volunteers = {

            index: function(id, _params, callback, error) {
                var params = {
                    page: _params.page,
                    offset: _params.offset
                };

                Events.one(id).one(Constants.volunteers).get(params).then(callback, error);
            },

            show: function(id, volunteerId, callback, error) {
                Events.one(id).one(Constants.volunteers, volunteerId).get().then(callback, error);
            },

            create: function(id, volunteerId, callback, error) {
                Events.one(id).one(Constants.volunteers, volunteerId).post().then(callback, error);
            },

            destroy: function(id, volunteerId, callback, error) {
                Events.one(id).one(Constants.volunteers, volunteerId).remove().then(callback, error);
            }
        };
    });
