import { Router } from 'express'
import * as recipesCtrl from '../controllers/recipes.js'
import { isLoggedIn } from '../middleware/middleware.js'

const router = Router()

router.get('/', recipesCtrl.index)

router.get('/new', isLoggedIn, recipesCtrl.new)

router.get('/:id/edit', isLoggedIn, recipesCtrl.edit)

router.get('/:id', recipesCtrl.show)

router.post('/', isLoggedIn, recipesCtrl.create)

router.put('/:id', isLoggedIn, recipesCtrl.update)

export{
  router
}