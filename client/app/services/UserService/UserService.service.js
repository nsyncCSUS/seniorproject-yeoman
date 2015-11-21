'use strict';

angular.module('seniorprojectYoApp')
    .service('UserService', function($http, $rootScope, Restangular) {
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

            events: {
                creatorOf: 'events/creatorOf',
                organizerOf: 'events/organizerOf',
                volunteeredTo: 'events/volunteeredTo'
            },

            groups: {
                creatorOf: 'groups/creatorOf',
                organizerOf: 'groups/organizerOf',
                volunteeredTo: 'groups/volunteeredTo'
            }
        });

        var Users = Restangular.service(Constants.routes.users);


        this.index = function(_params, callback, error) {
            var params = {
                page: _params.page || 1,
                offset: _params.offset || 0
            };

            Users.getList().then(callback, error);
        };


        this.show = function(id, callback, error) {
            Users.one(id).get().then(callback, error);
        };


        this.update = function(id, params, callback, error) {
            Users.one(id).patch({user: params}).then(callback, error);
        };


        this.destroy = function(id, callback, error) {
            Users.one(id).remove().then(callback, error);
        };


        /**
         * Nested data structure for handling event queries
         */
        this.events = {


            /**
             * Get creator data
             */
            creatorOf: {
                index: function(id, _params, callback, error) {
                    var params = {
                        page: _params.page || 0,
                        offset: _params.offset || 0
                    };

                    Users.one(id).one(Constants.events.creatorOf).getList().then(callback, error);
                },

                show: function(id, eventId, callback, error) {
                    Users.one(id).one(Constants.events.creatorOf, eventId).get().then(callback, error);
                }
            },



            /**
             * Get organizer data
             */
            organizerOf: {
                index: function(id, _params, callback, error) {
                    var params = {
                        page: _params.page || 0,
                        offset: _params.offset || 0
                    };

                    Users.one(id).one(Constants.events.organizerOf).getList().then(callback, error);
                },

                show: function(id, eventId, callback, error) {
                    Users.one(id).one(Constants.events.organizerOf, eventId).get().then(callback, error);
                },

                create: function(id, eventId, callback, error) {
                    Users.one(id).one(Constants.events.organizerOf, eventId).post().then(callback, error);
                },

                destroy: function(id, eventId, callback, error) {
                    Users.one(id).one(Constants.events.organizerOf, eventId).remove().then(callback, error);
                }
            },



            /**
             * Get volunteer data
             */
            volunteeredTo: {
                index: function(id, _params, callback, error) {
                    var params = {
                        page: _params.page || 0,
                        offset: _params.offset || 0
                    };

                    Users.one(id).one(Constants.events.volunteeredTo).getList().then(callback, error);
                },

                show: function(id, eventId, callback, error) {
                    Users.one(id).one(Constants.events.volunteeredTo, eventId).get().then(callback, error);
                },

                create: function(id, eventId, callback, error) {
                    Users.one(id).one(Constants.events.volunteeredTo, eventId).post().then(callback, error);
                },

                destroy: function(id, eventId, callback, error) {
                    Users.one(id).one(Constants.events.volunteeredTo, eventId).remove().then(callback, error);
                }
            }
        };



        /**
         * Nested data structure for handling group queries
         */
        this.groups = {


            /**
             * Get creator data
             */
            creatorOf: {
                index: function(id, _params, callback, error) {
                    var params = {
                        page: _params.page || 0,
                        offset: _params.offset || 0
                    };

                    Users.one(id).one(Constants.groups.creatorOf).getList().then(callback, error);
                },

                show: function(id, groupId, callback, error) {
                    Users.one(id).one(Constants.groups.creatorOf, groupId).get().then(callback, error);
                }
            },



            /**
             * Get organizer data
             */
            organizerOf: {
                index: function(id, _params, callback, error) {
                    var params = {
                        page: _params.page || 0,
                        offset: _params.offset || 0
                    };

                    Users.one(id).one(Constants.groups.organizerOf).getList().then(callback, error);
                },

                show: function(id, groupId, callback, error) {
                    Users.one(id).one(Constants.groups.organizerOf, groupId).get().then(callback, error);
                },

                create: function(id, groupId, callback, error) {
                    Users.one(id).one(Constants.groups.organizerOf, groupId).post().then(callback, error);
                },

                destroy: function(id, groupId, callback, error) {
                    Users.one(id).one(Constants.groups.organizerOf, groupId).remove().then(callback, error);
                }
            },



            /**
             * Get volunteer data
             */
            volunteeredTo: {
                index: function(id, _params, callback, error) {
                    var params = {
                        page: _params.page || 0,
                        offset: _params.offset || 0
                    };

                    Users.one(id).one(Constants.groups.volunteeredTo).getList().then(callback, error);
                },

                show: function(id, groupId, callback, error) {
                    Users.one(id).one(Constants.groups.volunteeredTo, groupId).get().then(callback, error);
                },

                create: function(id, groupId, callback, error) {
                    Users.one(id).one(Constants.groups.volunteeredTo, groupId).post().then(callback, error);
                },

                destroy: function(id, groupId, callback, error) {
                    Users.one(id).one(Constants.groups.volunteeredTo, groupId).remove().then(callback, error);
                }
            }
        };
    });
