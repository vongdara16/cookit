import { Recipe } from '../models/recipe.js';
import { Ingredient } from '../models/ingredient.js'

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
  Ingredient.find({})
  .then(ingredients => {
    res.render('recipes/new', {
      title: 'ADD RECIPE',
      ingredients,
    })
    // console.log(ingredients)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function create(req, res){
  console.log('create a recipe')
  console.log(req.body, ' body')
  // console.log(req, ' req')
  // console.log(req.user, ' user')
  req.body.author = req.user.profile._id
  // req.body.author.name = req.user.profile.name
  for(let key in req.body){
    if(req.body[key] === '') delete req.body[key]
  }
  Recipe.create(req.body)
  .then(recipe => {
    // console.log(Date(recipe.createdAt).toLocaleString())
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes/new')
  })
}

function show(req, res){
  console.log('show a recipe')
  Recipe.findById(req.params.id)
  .populate('author')
  .then(recipe =>{
    res.render('recipes/show', {
      recipe,
      title: 'Show recipe'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function edit(req, res){
  console.log('edit this recipe')
  Recipe.findById(req.params.id)
  .then(recipe => {
    res.render('recipes/edit', {
      recipe,
      title: 'Edit recipe'
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function update(req, res){
  console.log('update new recipe')
  Recipe.findById(req.params.id)
  .then(recipe => {
    if (recipe.author.equals(req.user.profile._id)){
      recipe.updateOne(req.body, {new: true})
      .then(() =>{
        res.redirect(`/recipes/${recipe._id}`)
      })
    } else {
      throw new Error ('Not Authorized')
    }
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function deleteRecipe(req, res){
  console.log('delete recipe')
  Recipe.findById(req.params.id)
  .then(recipe => {
    if (recipe.author.equals(req.user.profile._id)){
      recipe.delete()
      .then(() =>{
        res.redirect('/recipes')
      })
    } else {
      throw new Error ('Not Authorized')
    }
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
  show,
  edit,
  update,
  deleteRecipe as delete,
}