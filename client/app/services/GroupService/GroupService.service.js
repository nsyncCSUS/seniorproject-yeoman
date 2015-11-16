'use strict';

angular.module('seniorprojectYoApp')
    .service('GroupService', function($http) {


        /**
         * A list of relevant constants for http functions
         */
        this.Constants = Object.freeze({
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
        function constructUrl(item1, item2, item3, item4) {
            var url = '/';
            if (item1 != null && item1 != undefined) url += item1 + '/';
            if (item2 != null && item2 != undefined) url += item2 + '/';
            if (item3 != null && item3 != undefined) url += item3 + '/';
            if (item4 != null && item4 != undefined) url += item4 + '/';
            return url;
        };


        this.index = function(params, callback, error) {
            var url = constructUrl(this.Constants.routes.groups);

            $http.get(url).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };



        this.show = function(id, callback, error) {
            var url = constructUrl(this.Constants.routes.groups, id);

            $http.get(url).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };


        this.update = function(id, _params, callback, error) {
            var url = constructUrl(this.Constants.routes.groups, id);
            var params = {
                group: _params
            };

            $http.put(url, params).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };


        this.create = function(_params, callback, error) {
            var url = constructUrl(this.Constants.groups);
            var params = {
                group: _params.group
            };

            $http.post(url, params).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };


        this.destroy = function(id, callback, error) {
            var url = constructUrl(this.Constants.groups, id);

            $http.delete(url).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };


        /**
         * Nested data structure for handling event queries
         */
        this.events = {

            index: function(id, _params, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.events);
                var params = {
                    page: _params.page,
                    offset: _params.offset,
                    event: _params.event
                };

                $http.get(url, params).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(repsonse);
                });
            },


            show: function(id, eventId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.events, eventId);

                $http.get(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },


            create: function(id, eventId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.events, eventId);

                $http.post(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },


            destroy: function(id, eventId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.events, eventId);

                $http.delete(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            }
        };


        /**
         * Nested data structure for handling volunteer queries
         */
        this.volunteers = {

            index: function(id, _params, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.volunteers);
                var params = {
                    page: _params.page,
                    offset: _params.offset,
                    volunteer: _params.volunteer
                };

                $http.get(url, params).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },


            show: function(id, volunteerId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.volunteers, volunteerId);

                $http.get(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },


            create: function(id, volunteerId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.volunteers, volunteerId);

                $http.post(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },


            destroy: function(id, volunteerId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.volunteers, volunteerId);

                $http.delete(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            }
        };



        /**
         * Nested data structure for handling organizer queries
         */
        this.organizers = {

            index: function(id, _params, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.organizers);
                var params = {
                    page: _params.page,
                    offset: _params.offset,
                    organizer: _params.organizer
                };

                $http.get(url, params).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },


            show: function(id, organizerId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.organziers, organizerId);

                $http.get(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },


            create: function(id, organizerId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.organizers, organizerId);

                $http.post(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },


            destroy: function(id, organizerId, callback, error) {
                var url = constructUrl(this.Constants.routes.groups, id, this.Constants.organizers, organizerId);

                $http.delete(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            }
        };
    });