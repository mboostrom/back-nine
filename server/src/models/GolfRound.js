const Model = require("./Model.js");

class GolfRound extends Model {
  static get tableName() {
    return "golfRounds";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["holesPlayed", "score"],

      properties: {
        holesPlayed: { type: ["integer", "string"] },
        score: { type: ["integer", "string"] },
      },
    };
  }

  static get relationMappings() {
    const User = require("./User.js");
    const Course = require('./Course.js')

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "golfRounds.userId",
          to: "users.id",
        },
      },
      course: {
        realtion: Model.BelongsToOneRelation,
        modelClass: Course,
        join: {
          from: "golfRound.courseId",
          to: "courses.id"
        }
      }
    };
  }
}

module.exports = GolfRound;
