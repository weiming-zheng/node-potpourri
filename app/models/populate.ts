import products from './products.json'
import Product from './product.js'
import connectDB from '../db/connet.js'

connectDB().then(() => {
    Product.insertMany(products.slice(0, -1))
             .then(res => {
            console.log(res)
           }).catch(err => {
            console.error(err)
           })
}).catch(err => {
    console.error(err)
})

