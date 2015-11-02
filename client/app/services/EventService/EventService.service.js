'use strict';

angular.module('seniorprojectYoApp')
    .service('EventService', function() {


        /**
         * A list of relevant constants for http functions
         */
        this.Constants = Object.freeze({
            users: '/api/users',
            groups: '/api/groups',
            events: '/api/events'
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


        /**
         * Get users
         */
        this.get = function(params, callback, error) {
            var url = constructUrl(this.Constants.events, params.id);
            $http.get(url, params).then(function(response) {
                console.log(response);
                callback(response);
            }, function(response) {
                error(response);
            });
        };


        this.put = function(params, callback, error) {
            var url = constructUrl(this.Constants.events, params.id);
            $http.put(url, params).then(function(response) {
                console.log(response);
                callback(response);
            }, function(response) {
                error(response);
            });
        };


        this.post = function(params, callback, error) {
            var url = constructUrl(this.Constants.events);
            $http.post(url, params).then(function(response) {
                console.log(response);
                callback(response);
            }, function(response) {
                error(response);
            });
        };


        this.delete = function(params, callback, error) {
            var url = constructUrl(this.Constants.events, params.id);
            $http.delete(url, params).then(function(response) {
                console.log(response);
                callback(response);
            }, function(response) {
                error(response);
            });
        };


        /**
         * Nested data structure for handling event queries
         */
        this.groups = {
            get: function(params, callback, error) {
                var url = constructUrl(this.Constants.events,
                    params.event.id,
                    this.Constants.events,
                    params.group.id);
                $http.get(url, params).then(function(response) {
                    console.log(response);
                    callback(response);
                }, function(response) {
                    error(response);
                });
            },


            put: function(params, callback, error) {
                var url = constructUrl(this.Constants.events,
                    params.event.id,
                    this.Constants.events,
                    params.group.id);
                $http.put(url, params).then(function(response) {
                    console.log(response);
                    callback(response);
                }, function(response) {
                    error(response);
                });
            },


            post: function(params, callback, error) {
                var url = constructUrl(this.Constants.events,
                    params.event.id,
                    this.Constants.events);
                $http.post(url, params).then(function(response) {
                    console.log(response);
                    callback(response);
                }, function(response) {
                    error(response);
                });
            },


            delete: function(params, callback, error) {
                var url = constructUrl(this.Constants.events,
                    params.event.id,
                    this.Constants.events,
                    params.group.id);
                $http.delete(url, params).then(function(response) {
                    console.log(response);
                    callback(response);
                }, function(response) {
                    error(response);
                });
            }
        };


        /**
         * Nested data structure for handling user queries
         */
        this.users = {
            get: function(params, callback, error) {
                var url = constructUrl(this.Constants.events,
                    params.event.id,
                    this.Constants.users,
                    params.user.id);
                $http.get(url, params).then(function(response) {
                    console.log(response);
                    callback(response);
                }, function(response) {
                    error(response);
                });
            },


            put: function(params, callback, error) {
                var url = constructUrl(this.Constants.events,
                    params.event.id,
                    this.Constants.users,
                    params.user.id);
                $http.put(url, params).then(function(response) {
                    console.log(response);
                    callback(response);
                }, function(response) {
                    error(response);
                });
            },


            post: function(params, callback, error) {
                var url = constructUrl(this.Constants.events,
                    params.event.id,
                    this.Constants.users);
                $http.post(url, params).then(function(response) {
                    console.log(response);
                    callback(response);
                }, function(response) {
                    error(response);
                });
            },


            delete: function(params, callback, error) {
                var url = constructUrl(this.Constants.events,
                    params.event.id,
                    this.Constants.users,
                    params.user.id);
                $http.delete(url, params).then(function(response) {
                    console.log(response);
                    callback(response);
                }, function(response) {
                    error(response);
                });
            }
        };
    });