import { Recipe } from "../models/recipe.js";

function index(req, res){
  console.log('COOKiT!')
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      recipes,
      title: "COOKiT!👨‍🍳🍳"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/recipes")
  })
}

function newRecipe(req, res){
  console.log('add new recipe')
  res.render('recipes/new', {
    title: 'ADD RECIPE'
  })
}

function create(req, res){
  console.log('create a recipe')
  for(let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  Recipe.create(req.body)
  .then(recipe => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

export{
  index,
  newRecipe as new, 
  create,
}