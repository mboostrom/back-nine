const getCourseName = (id, courseArr) => {
  let course
  for(let i = 0; i < courseArr.length; i++){
    if(courseArr[i].id === id){
      course = courseArr[i]
      return
    }
  }
  return course
}

export default getCourseName