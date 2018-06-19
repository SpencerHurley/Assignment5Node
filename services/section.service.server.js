var mongoose = require('mongoose');
module.exports = function (app) {


  app.post('/api/course/:courseId/section', createSection);
  app.get('/api/course/:courseId/section', findSectionsForCourse);
  app.post('/api/student/:sectionId/enrollment', enrollStudentInSection);
  app.get('/api/student/section', findSectionsForStudent);
  app.delete('/api/section/:sectionId/enrollment', unenrollStudentInSection);
  app.get('/api/section/:sectionId', findSectionById);
  app.delete('/api/section/:sectionId', deleteSectionById);
  app.put('/api/section/:sectionId', updateSectionById);

  var sectionModel = require('../models/section/section.model.server');
  var enrollmentModel = require('../models/enrollment/enrollment.model.server');

  function findSectionsForStudent(req, res) {
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    enrollmentModel
      .findSectionsForStudent(studentId)
      .then(function(enrollments) {
        res.json(enrollments);
      });
  }

  function enrollStudentInSection(req, res) {
    var sectionId = req.params.sectionId;
    var currentUser = req.session.currentUser;
    var studentId = currentUser._id;
    var enrollment = {
      student: studentId,
      section: sectionId
    };


    sectionModel
      .decrementSectionSeats(sectionId)
      .then(function () {
        return enrollmentModel
          .enrollStudentInSection(enrollment)
      })
      .then(function (enrollment) {
        res.json(enrollment);
      })
  }

    function unenrollStudentInSection(req, res) {
        var sectionId = req.params.sectionId;
        var currentUser = req.session.currentUser;
        var studentId = currentUser._id;

        sectionModel
            .incrementSectionSeats(sectionId)
            .then(function () {
                return enrollmentModel
                    .unenrollStudentInSection(sectionId, studentId);
            })
            .then((response) => res.json(response));
    }

  function findSectionsForCourse(req, res) {
    var courseId = req.params['courseId'];
    sectionModel
      .findSectionsForCourse(courseId)
      .then(function (sections) {
        res.json(sections);
      })
  }

  function createSection(req, res) {
    var section = req.body;
    sectionModel
      .createSection(section)
      .then(function (section) {
        res.json(section);
      })
  }

  function findSectionById(req, res) {
      var sectionId = req.params.sectionId;
      sectionModel.findSectionById(sectionId)
          .then((section) => res.json(section));
  }

  function deleteSectionById(req, res) {
      var sectionId = req.params.sectionId;
      sectionModel.deleteSectionById(sectionId)
          .then((response) => res.json(response));
  }

  function updateSectionById(req, res) {
      var section = req.body;
      console.log("New Section");
      console.log(section);
      sectionModel.updateSectionById(section)
          .then((response) => res.json(response));
  }
};