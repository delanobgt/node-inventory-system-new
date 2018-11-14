const router = require('express').Router()
const ProductController = require('../controllers/products')
const { requireAuth } = require('../middlewares/auth')

// products
router.get('/', requireAuth, ProductController.getProducts)
router.post('/', requireAuth, ProductController.createProduct)
router.put('/:product_id', requireAuth, ProductController.updateProduct)
router.delete('/:product_id', requireAuth, ProductController.deleteProduct)

// initial balances
router.get('/initial-balances', requireAuth, ProductController.getInitialBalances)
router.put('/:product_id/initial-balance', requireAuth, ProductController.updateInitialBalance)

module.exports = router
