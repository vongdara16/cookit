
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: {type: String, required: true},
  type: String,
  link: String,
  instructions: String,
  // quantity: Number,
  ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
  author: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}