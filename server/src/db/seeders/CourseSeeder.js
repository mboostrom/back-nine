import { Course } from "../../models/index.js"

class CourseSeeder {
  static async seed() {
    const courseData = [
      {
        name: 'Crestwood Country Club',
        location: 'Rehoboth, MA'
      },
      {
        name: 'Acushnett River Valley',
        location: 'Acushnett, MA'
      },
      {
        name: 'Granite Links',
        location: 'Rehoboth, MA'
      },
      {
        name: 'Crestwood Country Club',
        location: 'Quincy, MA'
      },
      {
        name: 'TPC Boston',
        location: 'Norton, MA'
      },
      {
        name: 'Segregansett Country Club',
        location: 'Taunton, MA'
      },
      {
        name: 'Swansea Country Club',
        location: 'Swansea, MA'
      },
      {
        name: 'Bay Hill Country Club',
        location: 'Orlando, FL'
      },
      {
        name: 'Newport National Golf Club',
        location: 'Newport, RI'
      },
      {
        name: 'The Country Club',
        location: 'Brookline, MA'
      },
      {
        name: 'Ledgemont Country Club',
        location: 'Seekonk, MA'
      },
      {
        name: 'Franklin Country Club',
        location: 'Franklin, MA'
      },
      {
        name: 'Maplegate Country Club',
        location: 'Bellingham, MA'
      },
      {
        name: 'Augusta National',
        location: 'Augusta, GA'
      },
      
    ]

    for (const singleCourseData of courseData) {
      const currentCourse = await Course.query().findOne(singleCourseData)
      if (!currentCourse) {
        await Course.query().insert(singleCourseData)
      }
    }
  }
}

export default CourseSeeder