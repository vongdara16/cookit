
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: {type: String, required: true},
  link: String,
  instructions: String,
  quantity: Number,
  author: {type: Schema.Types.ObjectId, ref: "Profile"}
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}