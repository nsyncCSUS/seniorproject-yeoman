'use strict';

angular.module('seniorprojectYoApp')
    .service('GroupService', function($http, Restangular) {
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

            users: 'users',
            groups: 'groups',
            events: 'events',
            organizers: 'organizers',
            volunteers: 'volunteers'
        });

        var Groups = Restangular.service(Constants.routes.groups);


        this.index = function(_params, callback, error) {
            var params = {
                page: _params.page || 1,
                offset: _params.offset || 0
            };

            Groups.getList().then(callback, error);
        };



        this.show = function(id, callback, error) {
            Groups.one(id).get().then(callback, error);
        };


        this.update = function(id, params, callback, error) {
            Groups.one(id).patch({group: params.group}).then(callback, error);
        };


        this.create = function(params, callback, error) {
            Groups.post(params).then(callback, error);
        };


        this.destroy = function(id, callback, error) {
            Groups.one(id).remove().then(callback, error);
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

                Groups.one(id).one(Constants.events).getList().then(callback, error);
            },

            show: function(id, eventId, callback, error) {
                Groups.one(id).one(Constants.events, eventId).get().then(callback, error);
            },

            create: function(id, params, callback, error) {
                Groups.one(id).one(Constants.events).post(params).then(callback, error);
            },

            destroy: function(id, eventId, callback, error) {
                Groups.one(id).one(Constants.events, eventId).remove().then(callback, error);
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

                Groups.one(id).one(Constants.volunteers).getList().then(callback, error);
            },

            show: function(id, volunteerId, callback, error) {
                Groups.one(id).one(Constants.volunteers, volunteerId).get().then(callback, error);
            },

            create: function(id, volunteerId, callback, error) {
                Groups.one(id).one(Constants.volunteers, volunteerId).post().then(callback, error);
            },

            destroy: function(id, volunteerId, callback, error) {
                Groups.one(id).one(Constants.volunteers, volunteerId).remove().then(callback, error);
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

                Groups.one(id).one(Constants.organizers).getList().then(callback, error);
            },

            show: function(id, organizerId, callback, error) {
                Groups.one(id).one(Constants.organizers, organizerId).get().then(callback, error);
            },

            create: function(id, organizerId, callback, error) {
                Groups.one(id).one(Constants.organizers, organizerId).post().then(callback, error);
            },

            destroy: function(id, organizerId, callback, error) {
                Groups.one(id).one(Constants.organizers, organizerId).remove().then(callback, error);
            }
        };
    });
