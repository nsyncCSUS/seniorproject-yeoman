'use strict';

angular.module('seniorprojectYoApp')
    .service('PicUploadService', function(Upload) {

      this.picUpload = function(file,width,height){
        var promise =
        Upload.upload({
          url: '/api/users/upload', // which route to post
          fields: {
            'width': width,
            'height': height, // any fields you would like specified
            'crop': 'fill'
          },
          file: file // the actual image file being passed
        }).progress(function(evt) { // Useful debugging lines
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function(data, status, headers, config) {
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          return data;
        }).error(function(data, status, headers, config) {
          console.log('Http status: ' + status);
        });
        //once the upload has completed these 3 lines clear the form fields

        return promise;
      };





});
