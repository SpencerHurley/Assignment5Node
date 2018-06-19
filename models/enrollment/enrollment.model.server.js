var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  enrollmentModel.create(enrollment);
}

function unenrollStudentInSection(sectionId, studentId) {
  enrollmentModel.deleteOne(
      {
          student: studentId,
          section: sectionId
  })
      .then((enrollment) => {});
}

function findSectionsForStudent(studentId) {
  return enrollmentModel
    .find({student: studentId})
    .populate('section')
    .exec();
}

module.exports = {
  enrollStudentInSection: enrollStudentInSection,
  findSectionsForStudent: findSectionsForStudent,
    unenrollStudentInSection: unenrollStudentInSection
};