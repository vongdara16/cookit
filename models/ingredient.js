import mongoose from "mongoose";

const Schema = mongoose.Schema

const ingredientSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  // quantity: {
  //   type: Number, 
  //   default: null,
  // }
}, {
  timestamps: true
})

const Ingredient = mongoose.model('Ingredient', ingredientSchema)

export{
  Ingredient
}
