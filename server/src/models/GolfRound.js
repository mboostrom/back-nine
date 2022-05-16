const Model = require("./Model.js");

class GolfRound extends Model {
  static get tableName() {
    return "golfRounds";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["holesPlayed", "score", "coursePlayed"],

      properties: {
        holesPlayed: { type: ["integer", "string"] },
        score: { type: ["integer", "string"] },
        coursePlayed: { type: ["integer", "string"] },
      },
    };
  }

  static get relationMappings() {
    const User = require("./User.js");

    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "golfRounds.userId",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = GolfRound;
