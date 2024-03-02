const Query = (numQuery,values,setters) => {
 console.log(`Query Result: ${numQuery} - ${values} - ${setters}`)
    switch(numQuery)
    {
      case 1 :
        // select all workouts
        return "SELECT * FROM workouts.gym_workouts";
      case 2 :
        // insert new workouts
        return `INSERT INTO workouts.gym_workouts (title,loads,reps,updatedAt,createdAt) VALUES ${values};`;
      case 3 : 
        // select single workouts
        return `SELECT * FROM workouts.gym_workouts WHERE id = ${values};`;  
      case 4 :
        // delete single workouts
        return `DELETE FROM workouts.gym_workouts WHERE id = ${values};`;
      case 5 :
        // update single workouts
        return `UPDATE workouts.gym_workouts SET ${setters} WHERE ${values};`;  
    }
}

module.exports = { Query }
 