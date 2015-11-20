'use strict';

angular.module('seniorprojectYoApp')
    .service('GroupService', function($http, Restangular) {


        /**
         * A list of relevant constants for http functions
         */
        var Constants = Object.freeze({
            routes: {
                users: 'api/users',
                groups: 'api/groups',
                events: 'api/events'
            },

            users: 'users',
            groups: 'groups',
            events: 'events',
            organizers: 'organizers',
            volunteers: 'volunteers'
        });


        /**
         * Construct a url from different url components
         */
//        function constructUrl(item1, item2, item3, item4) {
//            var url = '';
//            if (item1 != null && item1 != undefined) url += '/' + item1;
//            if (item2 != null && item2 != undefined) url += '/' + item2;
//            if (item3 != null && item3 != undefined) url += '/' + item3;
//            if (item4 != null && item4 != undefined) url += '/' + item4;
//            return url;
//        };


        this.index = function(_params, callback, error) {
            var params = {
                page: _params.page || 1,
                offset: _params.offset || 0
            };

            Restangular.one(Constants.routes.groups)
                .get(params)
                .then(callback, error);
        };



        this.show = function(id, callback, error) {
            Restangular.one(Constants.routes.groups, id)
                .get()
                .then(callback, error);
        };


        this.update = function(id, params, callback, error) {
            Restangular.one(Constants.routes.groups, id)
                .put({group: params})
                .then(callback, error);
        };


        this.create = function(params, callback, error) {
            Restangular.one(Constants.routes.groups, id)
                .post(params)
                .then(callback, error);
        };


        this.destroy = function(id, callback, error) {
            Restangular.one(Constants.routes.groups, id)
                .remove()
                .then(callback, error);
        };


        /**
         * Nested data structure for handling event queries
         */
        this.events = {

            index: function(id, _params, callback, error) {
                var params = {
                    page: _params.page || 1,
                    offset: _params.offset || 0
                };

                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.events)
                    .getList(params)
                    .then(callback, error);
            },


            show: function(id, eventId, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.events, eventId)
                    .get()
                    .then(callback, error);
            },


            create: function(id, params, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.events)
                    .post(params)
                    .then(callback, error);
            },


            destroy: function(id, eventId, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.events, eventId)
                    .remove()
                    .then(callback, error);
            }
        };


        /**
         * Nested data structure for handling volunteer queries
         */
        this.volunteers = {

            index: function(id, _params, callback, error) {
                var params = {
                    page: _params.page,
                    offset: _params.offset,
                    volunteer: _params.volunteer
                };

                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.volunteers)
                    .getList(params)
                    .then(callback, error);
            },


            show: function(id, volunteerId, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.volunteers, volunteerId)
                    .get()
                    .then(callback, error);
            },


            create: function(id, volunteerId, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.volunteers, volunteerId)
                    .post()
                    .then(callback, error);
            },


            destroy: function(id, volunteerId, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.volunteers, volunteerId)
                    .remove()
                    .then(callback, error);
            }
        };



        /**
         * Nested data structure for handling organizer queries
         */
        this.organizers = {

            index: function(id, _params, callback, error) {
                var params = {
                    page: _params.page,
                    offset: _params.offset,
                    organizer: _params.organizer
                };

                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.organizers)
                    .getList(params)
                    .then(callback, error);
            },


            show: function(id, organizerId, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.organizers, organizerId)
                    .get()
                    .then(callback, error);
            },


            create: function(id, organizerId, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.organizers, organizerId)
                    .post()
                    .then(callback, error);
            },


            destroy: function(id, organizerId, callback, error) {
                Restangular.one(Constants.routes.groups, id)
                    .one(Constants.organizers, organizerId)
                    .remove()
                    .then(callback, error);
            }
        };
    });
