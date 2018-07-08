import { query } from "../../../config/db"

export let student_project_model = {
  get_by_id: (id) => {
    let sql = `SELECT sp.name, sp.description, sp.url,
              FROM student_project sp
              INNER
              JOIN student s
              ON sp.student_id = s.id
              WHERE s.id = ?`
    return query(sql, id)
  },

  add_new: (id, values) => {
    let sql = `INSERT INTO student_project sp SET ? WHERE sp.student_id = ?`
    return query(sql, [values, id])
  },

  // Not Deleting the data
  // del: (id) => {
  //   let sql = 'DELETE FROM `student` WHERE id="' + id + '"'
  //   console.log(sql)
  //   return query(sql)
  // },

  update: (id, values) => {
      let sql = `UPDATE student_project sp SET ? WHERE sp.student_id = ?`
      return query(sql, [values, id])
  }
}
