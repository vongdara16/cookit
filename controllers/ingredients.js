import { Ingredient } from "../models/ingredient.js";

function newIngredient(req, res){
  console.log('add new ingredient')
  Ingredient.find({})
  .then(ingredients => {
    res.render('ingredients/new', {
      title: 'Add Ingredients',
      ingredients,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function create(req, res){
  console.log('create a new ingredient')
  Ingredient.create(req.body)
  .then(ingredient => {
    res.redirect('/ingredients/new')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/ingredients/new')
  })
}

export {
  newIngredient as new,
  create,
}