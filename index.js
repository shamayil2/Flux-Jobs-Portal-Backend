const initializeDatabase = require("./db/db.connect.js");
const express = require("express");
const Job = require("./models/job.model.js")
const jobs = require("./jobs.json")
const cors = require("cors");
corsOption = {
    origin: "*",
    credentials: true
}


initializeDatabase();
const app = express();
app.use(express.json());
app.use(cors(corsOption))


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

app.delete("/jobs/:id", async(req, res) => {
    try {
        const jobDeleted = await Job.findByIdAndDelete(req.params.id);
        if (jobDeleted) {
            res.status(200).json({ message: "Deleted", job: jobDeleted })
        } else {
            res.status(404).json({ message: "Job Not Found" })
        }

    } catch (error) {
        console.log(error);
    }
})

const addData = async(jobs) => {

    try {

        for (const job of jobs) {

            jobObj = new Job(job);
            jobObjSaved = await jobObj.save();
            console.log("Object Saved");

        }

    } catch (error) {
        console.log("Error Occured while Adding", error)
    }

}

// addData(jobs)

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Server running on Port", PORT)
})