import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', recipesCtrl.index)

router.get('/apps', recipesCtrl.apps)

router.get('/entrees', recipesCtrl.entrees)

router.get('/desserts', recipesCtrl.desserts)

router.get('/new', isLoggedIn, recipesCtrl.new)

router.get('/newcont/:id', isLoggedIn, recipesCtrl.newCont)

router.get('/:id', recipesCtrl.show)

router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)



router.post('/', isLoggedIn, recipesCtrl.create)

router.post('/newcont', isLoggedIn, recipesCtrl.createNewCont)

// router.post('/new', isLoggedIn, recipesCtrl.addIngredToNew)

router.post('/:id/ingredients', isLoggedIn, recipesCtrl.addIngredientToRecipe)

router.put('/:id', isLoggedIn, recipesCtrl.update)

router.delete('/:recipeId/ingredients/:ingredientId', isLoggedIn, recipesCtrl.deleteIngredient)

router.delete('/:id', isLoggedIn, recipesCtrl.delete)

export{
  router
}