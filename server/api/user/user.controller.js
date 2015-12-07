'use strict';

var User = require('./user.model');
var passport = require('passport');
var config = require('../../config/environment');
var jwt = require('jsonwebtoken');
var cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');
var fs = require('fs-extra');


var validationError = function(res, err) {
  return res.status(422).json(err);
};


// Image upload
exports.upload = function(req, res) {
  console.log(req);

  cloudinary.uploader.upload(req.files.file.path, function(result) {
      console.log(result);
      var filename = req.files.file.path;
      filename = filename.split("\\").pop();
      console.log(filename);
      fs.remove('./server/temppic/' + filename, function(err) {
        if (!err) console.log('success!');
      });
      res.status(200).json(result.url);

    }, {
      width: req.body.width,
      height: req.body.height
    }
    // deltes the temp file that is created in temppic


  );

};


/**
 * Get list of users
 * restriction: 'admin'
 */
exports.index = function(req, res) {
  var params = req.query || {};
  User.find({}, '-salt -hashedPassword', function(err, users) {
    if (err) return res.status(500).send(err);

    // return user profile
    var _users = users.map(function(user) {
      return user.profile;
    });

    res.status(200).json(_users);
  });
};

/**
 * Creates a new user
 */
exports.create = function(req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';
  newUser.role = 'user';
  newUser.save(function(err, user) {
    if (err) return validationError(res, err);
    var token = jwt.sign({
      _id: user._id
    }, config.secrets.session, {
      expiresInMinutes: 60 * 5
    });
    res.json({
      token: token
    });
  });
};

/**
 * Get a single user
 */
exports.show = function(req, res, next) {
  var userId = req.params.id;
  if (!validId(userId)) {
    return notFound(res);
  }

  User.findById(userId, function(err, user) {
    if (err) return next(err);
    if (!user) return notFound(res);
    res.json({
      user: user.profile
    });
  });
};


exports.update = function(req, res) {
  if (!req.body.user || !validId(req.params.id)) {
    return notFound(res);
  }

  if (req.body.user.id) delete req.body.user.id;
  //if(req.body.user.events) delete req.body.user.events;
  //if(req.body.user.groups) delete req.body.user.groups;
  if (req.body.user.hashedPassword) delete req.body.user.hashedPassword;
  if (req.body.user.creationDate) delete req.body.user.creationDate;

  User.findByIdAndUpdate(req.params.id, req.body.user, {
    new: true
  }, function(err, user) {
    if (err) {
      console.log(err);
      return handleError(res, err);
    } else if (!user) {
      return notFound(res);
    }
    return res.status(200).send({
      user: user.profile
    });
  });
};


/**
 * Deletes a user
 * restriction: 'admin'
 */
exports.destroy = function(req, res) {
  if (!validId(req.params.id)) {
    return notFound(res);
  }

  User.findByIdAndRemove(req.params.id, function(err, user) {
    if (err) return res.status(500).send(err);
    return res.status(204).send('No Content');
  });
};

/**
 * Change a users password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);
  if (!validId(userId)) {
    return notFound(res);
  }

  User.findById(userId, function(err, user) {
    if (user.authenticate(oldPass)) {
      user.password = newPass;
      user.save(function(err) {
        if (err) return validationError(res, err);
        res.status(200).send('OK');
      });
    } else {
      res.status(403).send('Forbidden');
    }
  });
};

/**
 * Get my info
 */
exports.me = function(req, res, next) {
  console.log(req.user);
  var userId = req.user._id || '';
  if (!req.user || !validId(userId.toString())) {
    return notFound(res);
  }

  User.findOne({
    _id: userId
  }, '-salt -hashedPassword', function(err, user) { // don't ever give out the password or salt
    if (err) return next(err);
    if (!user) return res.status(401).send('Unauthorized');
    res.json(user);
  });
};

/**
 * Authentication callback
 */
exports.authCallback = function(req, res, next) {
  res.redirect('/');
};

function handleError(res, err) {
  return res.status(500).send(err);
}

function validId(id) {
  return id.match(/^[0-9a-fA-F]{24}$/);
}

function notFound(res) {
  return res.status(404).send('Not Found');
}
