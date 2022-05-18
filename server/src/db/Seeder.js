/* eslint-disable no-console */
import { connection } from "../boot.js"
import CourseSeeder from "./seeders/CourseSeeder.js"
import GolfRoundSeeder from "./seeders/GolfRoundSeeder.js"

class Seeder {
  static async seed() {
    console.log('seeding courses')
    await CourseSeeder.seed()

    console.log("seeding golf Rounds")
    await GolfRoundSeeder.seed()

    console.log("Done!")
    await connection.destroy()
  }
}

export default Seeder