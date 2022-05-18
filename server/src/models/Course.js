const Model = require('./Model.js')

class Course extends Model {
  static get tableName(){
    return 'courses'
  }

  static get jsonSchema(){
    return {
      type: 'object',
      required: ['name', 'location'],

      properties: {
        name: {type: 'string'},
        location: {type: 'string'}
      }
    }
  }

  static get relationMappings(){
    const GolfRound = require('./GolfRound.js')
    return{
      golfRounds: {
        relation: Model.HasManyRelation,
        modelClass: GolfRound,
        join:{
          from: 'course.id',
          to: 'golfRounds.courseId'
        }
      }
    }
  }
}

module.exports = Course