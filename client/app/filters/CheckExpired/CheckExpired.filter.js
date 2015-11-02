'use strict';

angular.module('seniorprojectYoApp')
    .filter('CheckExpired', function() {
        return function(events) {
            //return 'CheckExpired filter: ' + input;

            if (events == null)
                return null;
            var today = new Date().getTime();
            var out = [];
            var eventEndDate = "";
            for (var i = 0; i < events.length; i++) {
                eventEndDate = new Date(events[i].endTimeDate).getTime();
                var result = eventEndDate - today;
                var expiredFlag = result < 0;

                if ((result <= 0) && expiredFlag) {
                    out.push(events[i]);
                } else if ((result > 0) && !expiredFlag) {
                    out.push(events[i]);
                }
            }
            return out;
        };
    });
