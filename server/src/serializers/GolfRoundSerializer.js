class ReviewsSerializer {
  static async getSummary(round) {
    try {
      const allowedAttributes = ["id", "holesPlayed", "score"]

      let serializedGolfRound = {}
      for (const attribute of allowedAttributes) {
        serializedGolfRound[attribute] = round[attribute]
      }

      return serializedGolfRound
    } catch (error) {
      throw error
    }
  }
}

export default ReviewsSerializer
