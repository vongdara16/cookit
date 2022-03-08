import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', recipesCtrl.index)

router.get('/apps', recipesCtrl.apps)

router.get('/entrees', recipesCtrl.entrees)

router.get('/desserts', recipesCtrl.desserts)

router.get('/new', isLoggedIn, recipesCtrl.new)

router.get('/:id', recipesCtrl.show)

router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)

router.post('/', isLoggedIn, recipesCtrl.create)

router.post('/new/ingredients', isLoggedIn, recipesCtrl.addIngredientToNew)

router.put('/:id', isLoggedIn, recipesCtrl.update)

router.delete('/:id', isLoggedIn, recipesCtrl.delete)

export{
  router
}