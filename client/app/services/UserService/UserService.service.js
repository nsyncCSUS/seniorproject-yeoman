'use strict';

angular.module('seniorprojectYoApp')
    .service('UserService', function($http, $rootScope) {

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
            volunteers: 'volunteers',
            organizers: 'organizers',

            creatorOf: 'creatorOf',
            organizerOf: 'organizerOf',
            volunteeredTo: 'volunteeredTo'
        });


        /**
         * Construct a url from different url components
         */
        function constructUrl(item1, item2, item3, item4, item5) {
            var url = '';
            if (item1 != null && item1 != undefined) url += '/' + item1;
            if (item2 != null && item2 != undefined) url += '/' + item2;
            if (item3 != null && item3 != undefined) url += '/' + item3;
            if (item4 != null && item4 != undefined) url += '/' + item4;
            if (item5 != null && item5 != undefined) url += '/' + item5;
            return url;
        };



        this.index = function(_params, callback, error) {
            var url = constructUrl(this.Constants.routes.users);
            var params = {
                page: params.page,
                offset: params.offset,
                user: params.user
            };

            $http.get(url, params).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };


        this.show = function(id, callback, error) {
            var url = constructUrl(this.Constants.routes.users, id);

            $http.get(url).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };


        this.update = function(id, params, callback, error) {
            var url = constructUrl(this.Constants.routes.users, id);

            $http.put(url, params).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };


        this.create = function(params, callback, error) {
            var url = constructUrl(this.Constants.routes.users);

            $http.post(url, params).then(function(response) {
                console.log(response);
                if (callback) callback(response);
            }, function(response) {
                console.log(response);
                if (error) error(response);
            });
        };


        this.destroy = function(id, callback, error) {
            var url = constructUrl(this.Constants.routes.users, id);

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


            /**
             * Create an event
             */
            create: function(id, eventId, callback, error) {
                var url = constructUrl(
                    this.Constants.routes.users,
                    id,
                    this.Constants.events,
                    eventId
                );

                $http.post(url).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },



            /**
             * Get creator data
             */
            creatorOf: {
                index: function(id, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.events,
                        id,
                        this.Constants.events,
                        this.Constants.creatorOf
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(reponse);
                        if (error) error(response);
                    });
                },


                show: function(id, eventId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.events,
                        this.Constants.creatorOf,
                        eventId
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                }
            },



            /**
             * Get organizer data
             */
            organizerOf: {
                index: function(id, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.events,
                        this.Constants.organizerOf
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                show: function(id, eventId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.events,
                        this.Constants.organizerOf,
                        eventId
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                create: function(id, eventId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.events,
                        this.Constants.organizerOf,
                        eventId
                    );

                    $http.post(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                destroy: function(id, eventId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.events,
                        this.Constants.organizerOf,
                        eventId
                    );

                    $http.delete(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                }
            },



            /**
             * Get volunteer data
             */
            volunteeredTo: {
                index: function(id, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.user,
                        id,
                        this.Constants.events,
                        this.Constants.volunteeredTo
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                show: function(id, eventId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.events,
                        this.Constants.volunteeredTo,
                        eventId
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                create: function(id, eventId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.events,
                        this.Constants.volunteeredTo,
                        eventId
                    );

                    $http.post(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                destroy: function(id, eventId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.events,
                        this.Constants.volunteeredTo,
                        eventId
                    );

                    $http.delete(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
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
                var url = constructUrl(
                    this.Constants.routes.users,
                    id,
                    this.Constants.groups
                );

                $http.post(url, params).then(function(response) {
                    console.log(response);
                    if (callback) callback(response);
                }, function(response) {
                    console.log(response);
                    if (error) error(response);
                });
            },



            /**
             * Get creator data
             */
            creatorOf: {
                index: function(id, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.creatorOf
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                show: function(id, groupId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.creatorOf,
                        groupId
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                }
            },



            /**
             * Get organizer data
             */
            organizerOf: {
                index: function(id, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.organizerOf
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                show: function(id, groupId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.organizerOf,
                        groupId
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                create: function(id, groupId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.organizerOf,
                        groupId
                    );

                    $http.post(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                destroy: function(id, groupId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.organizerOf,
                        groupId
                    );

                    $http.post(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                }
            },



            /**
             * Get volunteer data
             */
            volunteeredTo: {
                index: function(id, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.volunteeredTo
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                show: function(id, groupId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.volunteeredTo,
                        groupId
                    );

                    $http.get(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                create: function(id, groupId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.volunteeredTo,
                        groupId
                    );

                    $http.post(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                },


                destroy: function(id, groupId, callback, error) {
                    var url = constructUrl(
                        this.Constants.routes.users,
                        id,
                        this.Constants.groups,
                        this.Constants.volunteeredTo,
                        groupId
                    );

                    $http.delete(url).then(function(response) {
                        console.log(response);
                        if (callback) callback(response);
                    }, function(response) {
                        console.log(response);
                        if (error) error(response);
                    });
                }
            }
        };
    });
