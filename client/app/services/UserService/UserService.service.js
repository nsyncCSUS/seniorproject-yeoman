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



        this.index = function(_params, callback, error) {
            var params = {
                page: _params.page || 1,
                offset: _params.offset || 0
            };

            Restangular.one(Constants.routes.users)
                .get(params)
                .then(callback, error);
        };


        this.show = function(id, callback, error) {
            Restangular.one(Constants.routes.users, id)
                .get()
                .then(callback, error);
        };


        this.update = function(id, params, callback, error) {
            Restangular.one(Constants.routes.users, id)
                .customPUT({user: params})
                .then(callback, error);
        };


        this.destroy = function(id, callback, error) {
            Restangular.one(Constants.routes.users, id)
                .remove()
                .then(callback, error);
        };


        /**
         * Nested data structure for handling event queries
         */
        this.events = {


            /**
             * Create an event
             */
            create: function(id, eventId, callback, error) {
//                var url = constructUrl(
//                    this.Constants.routes.users,
//                    id,
//                    this.Constants.events,
//                    eventId
//                );

//                Restangular.one('api/users', id)
//                    .one('events', eventId)
//                    .post()
//                    .then(callback, error);

//                $http.post(url).then(function(response) {
//                    console.log(response);
//                    if (callback) callback(response);
//                }, function(response) {
//                    console.log(response);
//                    if (error) error(response);
//                });
            },



            /**
             * Get creator data
             */
            creatorOf: {
                index: function(id, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.creatorOf)
                        .getList()
                        .then(callback, error);
                },


                show: function(id, eventId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.creatorOf, eventId)
                        .get()
                        .then(callback, error);
                }
            },



            /**
             * Get organizer data
             */
            organizerOf: {
                index: function(id, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.organizerOf)
                        .getList()
                        .then(callback, error);
                },


                show: function(id, eventId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.organizerOf, eventId)
                        .get()
                        .then(callback, error);
                },


                create: function(id, eventId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.organizerOf, eventId)
                        .post()
                        .then(callback, error);
                },


                destroy: function(id, eventId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.organizerOf, eventId)
                        .remove()
                        .then(callback, error);
                }
            },



            /**
             * Get volunteer data
             */
            volunteeredTo: {
                index: function(id, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.volunteeredTo)
                        .getList()
                        .then(callback, error);
                },


                show: function(id, eventId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.volunteeredTo, eventId)
                        .get()
                        .then(callback, error);
                },


                create: function(id, eventId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.volunteeredTo, eventId)
                        .post()
                        .then(callback, error);
                },


                destroy: function(id, eventId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.events.volunteeredTo, eventId)
                        .remove()
                        .then(callback, error);
                }
            }
        };



        /**
         * Nested data structure for handling group queries
         */
        this.groups = {

            /**
             * Create a group
             */
            create: function(id, params, callback, error) {
//                var url = constructUrl(
//                    this.Constants.routes.users,
//                    id,
//                    this.Constants.groups
//                );
//
//                $http.post(url, params).then(function(response) {
//                    console.log(response);
//                    if (callback) callback(response);
//                }, function(response) {
//                    console.log(response);
//                    if (error) error(response);
//                });
            },



            /**
             * Get creator data
             */
            creatorOf: {
                index: function(id, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.creatorOf)
                        .getList()
                        .then(callback, error);
                },


                show: function(id, groupId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.creatorOf, groupId)
                        .get()
                        .then(callback, error);
                }
            },



            /**
             * Get organizer data
             */
            organizerOf: {
                index: function(id, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.organizerOf)
                        .getList()
                        .then(callback, error);
                },


                show: function(id, groupId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.organizerOf, groupId)
                        .get()
                        .then(callback, error);
                },


                create: function(id, groupId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.organizerOf, groupId)
                        .post()
                        .then(callback, error);
                },


                destroy: function(id, groupId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.organizerOf, groupId)
                        .remove()
                        .then(callback, error);
                }
            },



            /**
             * Get volunteer data
             */
            volunteeredTo: {
                index: function(id, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.volunteeredTo)
                        .getList()
                        .then(callback, error);
                },


                show: function(id, groupId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.volunteeredTo, groupId)
                        .get()
                        .then(callback, error);
                },


                create: function(id, groupId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.volunteeredTo, groupId)
                        .post()
                        .then(callback, error);
                },


                destroy: function(id, groupId, callback, error) {
                    Restangular.one(Constants.routes.users, id)
                        .one(Constants.groups.volunteeredTo, groupId)
                        .remove()
                        .then(callback, error);
                }
            }
        };
    });
