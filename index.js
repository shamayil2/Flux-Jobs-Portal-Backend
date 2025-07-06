const initializeDatabase = require("./db/db.connect.js");
const express = require("express");
const Job = require("./models/job.model.js")
    // const cors = require("cors");
initializeDatabase();

const app = express();
app.use(express.json());

app.post("/jobs", async(req, res) => {
    try {

        const data = req.body;
        const jobObj = new Job(data);
        const jobObjSaved = await jobObj.save();
        if (jobObjSaved) {
            res.status(200).json({ message: "Job Posted successfully", Job: jobObjSaved })
        }


    } catch (error) {
        res.status(500).json({ message: "Error while posting data", error })
    }
})

app.get("/jobs", async(req, res) => {
    try {

        const jobsArr = await Job.find();
        if (jobsArr.length > 0) {
            res.json(jobsArr)
        } else {
            res.status(404).json({ message: "Jobs Not found", error })
        }

    } catch (error) {
        res.status(500).json({ message: "Error occured", error })
    }
})


const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on Port", PORT)
})