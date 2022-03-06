import { Recipe } from "../models/recipe.js";

function index(req, res){
  console.log('COOKiT!')
  Recipe.find({})
  .populate('author')
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
  console.log(req.body, ' body')
  // console.log(req, ' req')
  console.log(req.user, ' user')
  req.body.author = req.user.profile._id
  // req.body.author.name = req.user.profile.name
  for(let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  Recipe.create(req.body)
  .then(recipe => {
    console.log(Date(recipe.createdAt).toLocaleString())
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes/new')
  })
}

export{
  index,
  newRecipe as new, 
  create,
}