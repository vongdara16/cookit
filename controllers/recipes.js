import { Recipe } from "../models/recipe.js";

function index(req, res){
  console.log('COOKiT!')
  Recipe.find({})
  .then(recipes => {
    res.render('recipes/index', {
      recipes,
      title: "COOKiT"
    })
  })
  .catch(err => {
    console.log(err)
    res.redirect("/recipes")
  })
}

export{
  index,
}