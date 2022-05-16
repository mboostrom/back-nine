import GolfRoundSerializer from "./GolfRoundSerializer.js"

class UserSerializer {
  static async getSummary(user) {
    try {
      const allowedAttribute = ["id", "email", "firstName", "lastName", "userName"]

      let serializedUser = {}
      for (const attribute of allowedAttribute) {
        serializedUser[attribute] = user[attribute]
      }

      const relatedGolfRounds = await user.$relatedQuery("golfRounds")
      const serializedGolfRounds = await Promise.all(
        relatedGolfRounds.map(async (round) => await GolfRoundSerializer.getSummary(round))
      )

      serializedUser.golfRounds = serializedGolfRounds
      return serializedUser
    } catch (error) {
      throw error
    }
  }
}

export default UserSerializer
