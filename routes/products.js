const router = require('express').Router()
const ProductController = require('../controllers/products')
const { requireAuth } = require('../middlewares/auth')

router.get('/', requireAuth, ProductController.getProducts)
router.put('/:product_id', requireAuth, ProductController.updateProduct)
router.delete('/:product_id', requireAuth, ProductController.deleteProduct)

module.exports = router
