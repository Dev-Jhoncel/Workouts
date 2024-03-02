const { Connection } = require('../Helpers/Connection')
const { Query } = require('../Helpers/Queries')

 
// Database Connection
const db = Connection


// select single workout
const selectSingleWorkout = async (req,res) => {
    const { id } = req.params
    try
    {
        const sql = Query(3,id);
        db.query(sql, async (err,data) => {
            if(err){
                return res.status(400).json({code: 400 , message: "Error Found!", data: err});
            }
            else if(data.length === 0)
            {
                return res.status(404).json({code: 404, message: "No such data exist!"})
            }
            else
            {
                console.log(`Result Data: ${data}`);
                return res.status(200).json({code: 200 , message: "Single records!", data: data});
            }
        });
    }
    catch(err)
    {
        return res.status(500).json({code: 500 , message: "Server Error!", data: err});
    }
    finally
    {
        console.log(`Status: finally`);
    }
}

// select All workout
const selectWorkout = async (req,res) => {
    let status = Number();
    try
    {
        const sql = Query(1);
        db.query(sql, async (err,data) => {
            if(err){
                status = 400;
                return res.status(400).json({code: 400 , message: "Error Found!", data: err});
            }
                status = 200;
                console.log(`Result Data: ${JSON.stringify(data)}`);
                return res.status(200).json({code: 200 , message: "Single records!", data: data});
        });
    }
    catch(err)
    {
        status = 500;
        return res.status(500).json({code: 500 , message: "Server Error!", data: err});
    }
    finally
    {
        console.log(`Status: ${status}`);
    }
}

// create new workout
const createWorkout = async (req,res) => {
    let status = Number();
    try
    {
        const worksessions = {
            title: req.body.title,
            loads: req.body.loads,
            reps: req.body.reps,
            updatedAt: "NOW(6)",
            createdAt: "NOW(6)"
        }

        const query = Query(2,`('${worksessions.title}',${worksessions.loads},${worksessions.reps},${worksessions.updatedAt},${worksessions.createdAt})`);
        console.log(worksessions);
        db.beginTransaction();
        db.query(query,async (err,results) => {
            if(err){
                status = 400;
                console.log(`Insertion Result: ${err}`);
                db.rollback();
                return res.status(400).json({code: 400, message: "Error inserting data!", data: err});
            }
            else{
                status = 200;
                console.log(`Insertion Result:${JSON.stringify(results)}`);
                db.commit();
                return res.status(200).json({code: 200, message: `Data inserted successfully!`});
            }
        })
    }
    catch(err)
    {
        status = 500;
        db.rollback();
        return res.status(500).json({code: 500 , message: "Server Error!", data: err});
    }
    finally
    {
        console.log(`Status: ${status}`);
    }
}

// delete single workout
const deleteSingleWorkouts = (req,res) => {
    const { id } = req.params
    try
    {
        const sql = Query(4,id);
        db.beginTransaction();
        db.query(sql, async (err,data) => {
            if(err){
                db.rollback();
                return res.status(400).json({code: 400 , message: "Error Found!", data: data});
            }
                console.log(`Result Data: ${data}`);
                db.commit();
                return res.status(200).json({code: 200 , message: "Successfully deleted record!", data: error});
        });
    }
    catch(err)
    {
        db.rollback();
        return res.status(500).json({code: 500 , message: "Server Error!", data: err});
    }
    finally
    {
        console.log(`Status: Finally`);
    }
}

// update single workout
const updateSingleWorkouts = (req,res) => {
 
    const workouts  = {
        id : req.body.id,
        title : req.body.title,
        set: req.body.set
    };

    try
    {
        const query = Query(5,`id = ${workouts.id}`,`title = '${workouts.title}', ${workouts.set}, updatedDate = NOW(6)`)
        db.beginTransaction();
        db.query(query,async (err,results) => {
            if(err){
                console.log(`Update Result: ${err}`);
                db.rollback();
                return res.status(400).json({code: 400, message: "Error updating data!", data: err});
            }
            else{
                db.commit();
                return res.status(200).json({code: 200, message: `Data updated successfully!`, data : results});
            }
        })
    }
    catch(error)
    {
        console.log(error);
        db.rollback();
        return res.status(500).json({code: 500 , message: "Encounter Error!", data: error});
    }
    finally
    {
        console.log("Finally");
    }
}


module.exports = { createWorkout , selectWorkout , selectSingleWorkout , deleteSingleWorkouts , updateSingleWorkouts }