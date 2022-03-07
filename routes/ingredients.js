import { Router } from 'express'
import * as ingredientsCtrl from '../controllers/ingredients.js'
import { isLoggedIn } from '../middleware/middleware.js'


const router = Router()

router.get('/new', isLoggedIn, ingredientsCtrl.new)

router.post('/', isLoggedIn, ingredientsCtrl.create)

export{
  router
}