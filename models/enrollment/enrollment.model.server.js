var mongoose = require('mongoose');
var enrollmentSchema = require('./enrollment.schema.server');
var enrollmentModel = mongoose.model(
  'EnrollmentModel',
  enrollmentSchema
);

function enrollStudentInSection(enrollment) {
  return enrollmentModel.create(enrollment);
}

function unenrollStudentInSection(sectionId, studentId) {
  console.log("Unenrolling");
  console.log(sectionId);
  console.log(studentId);
  return enrollmentModel.deleteOne({ section: sectionId, student: studentId });
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