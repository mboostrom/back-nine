import { GolfRound } from "../../models/index.js"

class GolfRoundSeeder {
  static async seed() {
    const golfRoundsData = [
      {
        holesPlayed: 18,
        score: 82,
        userId: 1,
        courseId: 3,
      },
      {
        holesPlayed: 9,
        score: 39,
        userId: 1,
        courseId: 1,
      },
      {
        holesPlayed: 18,
        score: 75,
        userId: 1,
        courseId: 12,
      },
      {
        holesPlayed: 18,
        score: 80,
        userId: 1,
        courseId: 9,
      },
      {
        holesPlayed: 18,
        score: 78,
        userId: 1,
        courseId: 11,
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
