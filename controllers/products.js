const _  = require('lodash')
const db = require('../models')

exports.getProducts = async (req, res) => {
  try {
    const products = await db.Product.findAll()
    res.json(products)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}

exports.updateProduct = async (req, res) => {
  try {
    const { product_id } = req.params
    const { name } = req.body
    const product = await db.Product.findOne({
      where: { id: product_id }
    })
    product.set('name', name)
    await product.save()
    res.json({ product })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    const { product_id } = req.params
    await db.Product.destroy({
      where: { id: product_id }
    })
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error })
  }
}

exports.getInitialBalances = async (req, res) => {
  const { productName } = req.query
  try {
    let initialMutation = await db.Mutation.findAll({
      where: {
        invoiceID: `##INITIAL[${productName}]##`
      }
    })
    initialMutation = initialMutation || {
      invoiceID: `##INITIAL[${productName}]##`,
      price: 0,
      quantity: 0
    }
    res.json(initialMutations)
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: true })
  }
})

router.post('/api/initial-balance', async (req, res) => {
  const { productName } = req.body
  try {
    let product = await db.Product.findOne({
      where: {
        name: productName
      }
    })
    let initialMutation = await db.Mutation.findOne({
      where: {
        invoiceID: `##INITIAL[${productName}]##`
      }
    })
    if (!initialMutation) initialMutation = new db.Mutation()
    initialMutation.set('invoiceID', `##INITIAL[${productName}]##`)
    initialMutation.set('productID', product.id)
    initialMutation.set('doneAt', '1990-01-01')
    initialMutation.set('info', '##INITIAL##')
    initialMutation.set('type', 'Buy')
    initialMutation.set('quantity', req.body.quantity)
    initialMutation.set('price', req.body.price)
    await initialMutation.save()
    res.json(initialMutation)
  } catch (err) {
    console.log(err)
    res.status(404).json({
      msg: 'Error Initial Balance'
    })
  }
})
