import { Recipe } from '../models/recipe.js';
import { Ingredient } from '../models/ingredient.js'

function index(req, res){
  console.log('COOKiT!')
  Recipe.find({})
  .populate('author')
  .then(recipes => {
    res.render('recipes/index', {
      recipes,
      title: "ALL RECIPES"
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
    res.render('recipes/new',{
      title: 'ADD RECIPE',
      ingredients,
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function create(req, res){
  console.log('create a recipe')
  req.body.author = req.user.profile._id
  Recipe.create(req.body)
  .then(() => {
    res.redirect('/recipes')
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes/new')
  })
}

function createNewCont(req, res){
  console.log('testing new cont button')
  req.body.author = req.user.profile._id
  Recipe.create(req.body)
  .then(recipe => {
    console.log(recipe)
    res.redirect(`/recipes/newcont/${recipe._id}`)
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes/new')
  })
}

function newCont(req, res){
  console.log('this is the new cont function')
  Recipe.find({})
  .populate('ingredients')
  .then(recipes => {
    console.log(recipes)
    const recentRecipe = recipes[recipes.length-1]
    Ingredient.find({_id: {$nin: recentRecipe.ingredients}})
    .then(ingredients => {
      res.render('recipes/newcont', {
        ingredients,
        title: `Add Ingredients / Instructions to ${recentRecipe.name}`,
        recipes,
      })
    })
    .catch(err =>{
      console.log(err)
      res.redirect('/recipes/newcont')
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/recipes')
  })
}

function addIngredientToRecipe(req, res){
  console.log('test add ingred to recipe function')
  Recipe.findById(req.params.id)
  .populate('ingredients')
  .then(recipe => {
    console.log(req.body, 'req body')
    console.log(req.body.ingredientsId)
    Ingredient.findOne({name: req.body.ingredientsId})
    .then(ingredient => {
      console.log(ingredient)
      recipe.ingredients.push(ingredient._id)
      recipe.save()
      .then(() =>{
        res.redirect(`/recipes/newcont/${recipe._id}`)
      })
    })
  })
  .catch(err =>{
    console.log(err)
    res.redirect('/recipes')
  })
}

function show(req, res){
  console.log('show a recipe')
  Recipe.findById(req.params.id)
  .populate('author ingredients')
  .then(recipe =>{
    res.render('recipes/show', {
      recipe,
      title: `${recipe.name}`
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
  .populate('ingredients author')
  .then(recipe => {
    Ingredient.find({_id: {$nin: recipe.ingredients}})
    .then(ingredients => {
      res.render('recipes/edit', {
        recipe,
        title: `Edit ${recipe.name}` ,
        ingredients,
      })
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function deleteIngredient(req, res){
  console.log('this will delete ingredient')
  console.log(req.params.recipeId, 'req param id')
  Recipe.findById(req.params.recipeId)
  .populate('ingredients')
  .then(recipe => {
    console.log(recipe, 'recipe')
    console.log(req.body, 'req body')
    recipe.ingredients.remove({_id: req.params.ingredientId})
    recipe.save()
    .then(() =>{
      res.redirect(`/recipes/${recipe._id}/edit`)
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function addIngredientToRecipeEdit(req, res){
  console.log('test add ingred to recipe function')
  Recipe.findById(req.params.id)
  .populate('ingredients')
  .then(recipe => {
    console.log(req.body, 'req body')
    console.log(req.body.ingredientsId)
    Ingredient.findOne({name: req.body.ingredientsId})
    .then(ingredient => {
      console.log(ingredient)
      recipe.ingredients.push(ingredient._id)
      recipe.save()
      .then(() =>{
        res.redirect(`/recipes/${recipe._id}/edit`)
      })
    })
    .catch(err =>{
      console.log(err)
      res.redirect(`/recipes/${recipe._id}/edit`)
    })
  })
  .catch(err =>{
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

function apps(req, res){
  console.log('show all apps')
  Recipe.find({})
  .populate('author')
  .then(recipes => {
    res.render('recipes/apps', {
      title: 'APPETIZERS',
      recipes
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}
function entrees(req, res){
  console.log('show all entrees')
  Recipe.find({})
  .populate('author')
  .then(recipes => {
    res.render('recipes/entrees', {
      title: 'ENTREES',
      recipes
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}
function desserts(req, res){
  console.log('show all desserts')
  Recipe.find({})
  .populate('author')
  .then(recipes => {
    res.render('recipes/desserts', {
      title: 'DESSERTS',
      recipes
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function yourRecipes(req, res){
  console.log('show your recipes')
  Recipe.find({})
  .populate('author')
  .then(recipes => {
    res.render('recipes/yours', {
      title: 'MY RECIPES',
      recipes
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect('/recipes')
  })
}

function updateInstruct(req, res){
  console.log('update instructions specifically')
  console.log(req.body, 'req body')
  console.log(req.params.id, 'req param id')
  Recipe.findById(req.params.id)
  .then(recipe => {
    if (recipe.author.equals(req.user.profile._id)){
      recipe.updateOne(req.body, {new: true})
      .then(() =>{
        res.redirect(`/recipes/${recipe._id}/edit`)
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
  apps,
  entrees,
  desserts,
  createNewCont,
  newCont,
  addIngredientToRecipe,
  deleteIngredient,
  addIngredientToRecipeEdit,
  yourRecipes,
  updateInstruct,
}