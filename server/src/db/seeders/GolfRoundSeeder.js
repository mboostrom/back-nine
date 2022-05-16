import { GolfRound } from "../../models/index.js"

class GolfRoundSeeder {
  static async seed() {
    const golfRoundsData = [
      {
        holesPlayed: 18,
        score: 82,
        coursePlayed: "Swansea Country Club",
        userId: 1,
      },
      {
        holesPlayed: 9,
        score: 39,
        coursePlayed: "Crestwood Country Club",
        userId: 1,
      },
      {
        holesPlayed: 18,
        score: 75,
        coursePlayed: "Granite Links Country Club",
        userId: 1,
      },
    ]

    for (const singleGolfRoundData of golfRoundsData) {
      const currentGolfRound = await GolfRound.query().findOne(singleGolfRoundData)
      if (!currentGolfRound) {
        await GolfRound.query().insert(singleGolfRoundData)
      }
    }
  }
}

export default GolfRoundSeeder
