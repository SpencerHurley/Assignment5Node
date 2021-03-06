module.exports = function (app) {
  app.get('/api/user', findAllUsers);
  app.get('/api/user/:userId', findUserById);
  app.post('/api/register', createUser);
  app.get('/api/profile', profile);
  app.post('/api/logout', logout);
  app.post('/api/login', login);
  app.put('/api/user', updateUser);
  app.delete('/api/profile', deleteUser);

  var userModel = require('../models/user/user.model.server');

  function login(req, res) {
    var credentials = req.body;
    userModel
      .findUserByCredentials(credentials)
      .then(function(user) {
        req.session['currentUser'] = user;
        res.json(user);
      })
  }

  function logout(req, res) {
    req.session.destroy();
    res.send(200);
  }

  function findUserById(req, res) {
    var id = req.params['userId'];
    userModel.findUserById(id)
      .then(function (user) {
        res.json(user);
      })
  }

  function profile(req, res) {
      var curUser = req.session.currentUser;
      userModel
          .findUserById(curUser._id)
          .then(function(user) {
              console.log("profile");
              console.log(user);
              req.session['currentUser'] = user;
              res.json(user);
          });
  }

  function createUser(req, res) {
    var user = req.body;
    userModel.createUser(user)
      .then(function (user) {
        req.session['currentUser'] = user;
        res.send(user);
      })
  }

  function updateUser(req, res) {
    var user = req.body;
    userModel.updateUser(user)
        .then(function (user) {
          res.json(user);
        })
  }

  function findAllUsers(req, res) {
    userModel.findAllUsers()
      .then(function (users) {
        res.send(users);
      })
  }

  function deleteUser(req, res) {
      var credentials = req.body;
      userModel.deleteOne({credentials})
          .then(() => res.json(user))
  }
}
