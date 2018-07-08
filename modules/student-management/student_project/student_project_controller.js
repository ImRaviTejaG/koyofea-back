import { student_project_model } from "./student_project_model";
import { query } from "../../../config/db";
import { auto_fill, fun } from "../../common";


export let student_project_controller = {
  get_by_id: (req, res) => {
    student_project_model.get_by_id(req.params.studentid).then(users => {
        res.status(200).json(users)
      }).catch(err => {
        res.status(400).json({message: "Bad Request", error: err})
      })
  },

  add_new: (req, res) => {
    student_project_model.add_new(req.params.studentid, req.body).then(data => {
      res.status(200).json(data)
    }).catch(err => {
      res.status(400).json({message: "Bad Request", error: err})
    })
  },

  update: (req, res) => {
    student_project_model.update(req.params.studentid, req.body).then((data) => {
      res.status(200).json(req.body)
    }).catch((err) => {
      res.status(400).json({ message: "Bad Request", error: err })
    })
  }
}
