
import mongoose from 'mongoose'

const Schema = mongoose.Schema

const recipeSchema = new Schema({
  name: {type: String, required: true},
  type: String,
  link: String,
  instructions: {
    type: String,
    default: ''
  },
  quantity: [{
    type: Number,
    default: null
  }],
  ingredients: [{type: Schema.Types.ObjectId, ref: 'Ingredient'}],
  // ingredients: [ingredientSchema],
  author: {type: Schema.Types.ObjectId, ref: "Profile"}
}, {
  timestamps: true
})

const Recipe = mongoose.model('Recipe', recipeSchema)

export {
  Recipe
}