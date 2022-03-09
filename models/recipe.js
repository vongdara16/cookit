
import mongoose from 'mongoose'

const Schema = mongoose.Schema

// const ingredientSchema = new Schema({
//   name: {
//     type: String,
//     required: true,
//     unique: true,
//   },
//   quantity: {
//     type: Number, 
//     default: 0,
//   }
// }, {
//   timestamps: true
// })

const recipeSchema = new Schema({
  name: {type: String, required: true},
  type: String,
  link: String,
  instructions: {
    type: String,
    default: ''
  },
  // quantity: Number,
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