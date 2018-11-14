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

exports.createProduct = async (req, res) => {
  try {
    const { name } = req.body
    const product = await db.Product.create({ name })
    res.json({ product })
  } catch (error) {
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
  // invoiceID: `##INITIAL[${productName}]##`
  try {
    let initialMutations = await db.Mutation.findAll({
      where: { type: 'Initial' }
    })
    res.json(initialMutations)
  } catch (err) {
    console.log(err)
    res.status(404).json({ error: true })
  }
}

exports.updateInitialBalance = async (req, res) => {
  const { product_id } = req.params
  try {
    let product = await db.Product.findOne({
      where: { id: product_id }
    })
    let initialMutation = await db.Mutation.findOne({
      where: {
        productID: product.id,
        type: 'Initial',
      }
    })
    if (!initialMutation) initialMutation = new db.Mutation()
    initialMutation.set('invoiceID', `INITIAL${product.id}`)
    initialMutation.set('productID', product.id)
    initialMutation.set('doneAt', '1990-01-01')
    initialMutation.set('info', 'Initial Balance')
    initialMutation.set('type', 'Initial')
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
}
