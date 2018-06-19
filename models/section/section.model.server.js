var mongoose = require('mongoose');
var sectionSchema = require('./section.schema.server');
var sectionModel = mongoose.model('SectionModel', sectionSchema);
var enrollmentModel = require('../enrollment/enrollment.model.server');

function createSection(section) {
  return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
  return sectionModel.find({courseId: courseId});
}

function decrementSectionSeats(sectionId) {
      return sectionModel.update({
            _id: sectionId
        }, {
            $inc: {availableSeats: -1}
        });
}

function incrementSectionSeats(sectionId) {
    return sectionModel.update({
        _id: sectionId
    }, {
        $inc: {availableSeats: 1}
    });
}

function findSectionById(sectionId) {
    return sectionModel.findOne({_id: sectionId});
}

function deleteSectionById(sectionId) {
    return sectionModel.deleteOne({_id: sectionId})
        .then(() => enrollmentModel.removeEnrollmentsForSection(sectionId));
}

function updateSectionById(section) {
    return sectionModel.update({_id: section._id},
        { $set : {
            name: section.name, maxSeats : section.maxSeats
        }})
}

module.exports = {
  createSection: createSection,
  findSectionsForCourse: findSectionsForCourse,
  decrementSectionSeats: decrementSectionSeats,
  incrementSectionSeats: incrementSectionSeats,
    findSectionById : findSectionById,
    deleteSectionById : deleteSectionById,
    updateSectionById : updateSectionById
};