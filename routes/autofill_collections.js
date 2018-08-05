export const autofill_collections = require("express").Router()
import { autofill_collections_controller } from "../modules/common";

export default () => {
  autofill_collections.route('/education')
    .get(autofill_collections_controller.get_education)

  autofill_collections.route('/experience')
    .get(autofill_collections_controller.get_experience)
}
