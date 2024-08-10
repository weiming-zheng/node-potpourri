import { query } from 'express'
import Product from '../models/product.js'

const getAllProductsStatic = async (req, res, next) => {
    const queryObject = {}
    const { numericFilters } : Record<string, string> = req.query
    const operatorMap = {
        "<": "$lt",
        ">": "$gt",
        "<=": "$lte",
        ">=": "$gte",
        "=": "$eq"
    }
    numericFilters.split(',')
    .forEach(filter => {
        const regEx = /\b(<|>|=|<=|>=)\b/g
        const fieldOptions = ['rating', 'price']
        const [field, operator, value] = filter.replace(
            regEx,
            (match) => `,${operatorMap[match]},`
        ).split(',')
        
        if (fieldOptions.includes(field)) {
            // queryObject["price"] = { $gt : 20, $lt : 40 }
            if (field in queryObject) queryObject[field][operator] = Number(value)
            else queryObject[field] = { [operator]: Number(value) }
        }
    })
    const products = await Product.find(queryObject)
    return res.status(200).json({ products, nbHits: products.length })
}

const getAllProducts = async (req, res, next) => {
    const { name, featured, company, sort, fields, numericFilters }: Record<string, string> = req.query
    const queryObject = {}
    // name 
    if (name) {
        queryObject["name"] = { $regex: name, $options: 'i' }
    }
    // featured
    if (featured) {
        queryObject["featured"] = featured === 'true' ? true : false
    }
    // company
    if (company) {
        queryObject["company"] = { $eq: company }
    }
    // numericFilters: rating, price
    if (numericFilters) {
        const operatorMap = {
            "<": "$lt",
            ">": "$gt",
            "<=": "$lte",
            ">=": "$gte",
            "=": "$eq"
        }
        // numbericfilters=rating>10,rating<20,price>=42,price<84
        numericFilters.split(',')
        .forEach(filter => {
            const regEx = /\b(<|>|=|<=|>=)\b/g
            const fieldOptions = ['rating', 'price']
            const [field, operator, value] = filter.replace(
                regEx,
                (match) => `,${operatorMap[match]},`
            ).split(',')
            
            if (fieldOptions.includes(field)) {
                // queryObject["price"] = { $gt : 20, $lt : 40 }
                if (field in queryObject) queryObject[field][operator] = Number(value)
                else queryObject[field] = { [operator]: Number(value) }
            }
        })
    }
    let result = Product.find(queryObject)
    // sort 
    if (sort) {
        const sortList = sort.split(',').join(' ')
        result.sort(sortList)
    } else {
        result.sort('createdAt')
    }
    // fieds
    if (fields) {
        let fieldsList = fields.split(',').join(' ')
        result.select(fieldsList)
    }
    // if not specified, sort by createdAt

    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || 10
    const skip = (page - 1) * limit

    const products = await result.skip(skip).limit(limit)
    return res.status(200).json({ products, nbHits : products.length })
}

export { getAllProducts, getAllProductsStatic }