var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')
var Goods = require('../model/goods')
var User = require('../model/users')

mongoose.connect('mongodb://root:root@127.0.0.1:27017/dumall?authSource=admin', { useNewUrlParser: true })

mongoose.connection.on('connected', () => {
    console.log('MongoDB connection success.')
})

mongoose.connection.on('error', () => {
    console.log('MongoDB connection error.')
})

router.get('/list', (req, res, next) => {
    
	let page = parseInt(req.param("page"))
	let pageSize = parseInt(req.param("pageSize"))
	let priceLevel = req.param("priceLevel")
	let sort = req.param("sort")
    let skip = (page - 1) * pageSize
    var priceGt = '', priceLte = ''
    let params = {}
    if (priceLevel != 'all') {
        switch (priceLevel) {
            case '0': priceGt = 0; priceLte = 100; break;
            case '1': priceGt = 100; priceLte = 500; break;
            case '2': priceGt = 500; priceLte = 1000; break;
            case '3': priceGt = 1000; priceLte = 5000; break;
        }
        params = {
            salePrice: {
                $gt: priceGt,
                $lte: priceLte
            }
        }
    }
	let goodsModel = Goods.find(params).skip(skip).limit(pageSize)
	
    goodsModel.sort({ 'salePrice': sort })

    goodsModel.exec(function (err, doc) {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            })
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            })
        }
    })
})

router.post('/addCart', function(req, res, next) {
	var userId = '100000077',
		productId = req.body.productId
	
	User.findOne({
		userId: userId
	}, (err,userDoc) => {
		if(err) {
			res.json({
				status: "1",
				msg: err.message
			})
		} else {
			if(userDoc) {
				let goodsItem = ''
				userDoc.cartList.forEach((item) => {
					if(item.productId == productId) {
						goodsItem = item
						item.productNum ++
					}
				})
				if(goodsItem) {
					userDoc.save((err2,doc2) => {
						if(err2) {
							res.json({
								status: "1",
								msg: err2.message
							})
						} else {
							res.json({
								status: '0',
								msg: '',
								result: 'suc'
							})
						}
		            })
				} else {
					Goods.findOne({productId:productId}, (err1,doc) => {
						if(err1) {
							res.json({
								status: "1",
								msg: err1.message
							})
						} else {
							if(doc) {
								console.log(doc)
								doc.productNum = 1
								doc.checked = 1
								userDoc.cartList.push(doc)
								userDoc.save((err2,doc2) => {
									if(err2){
										res.json({
											status: "1",
											msg: err2.message
										})
									} else {
										res.json({
											status: "0",
											msg: '',
											result: 'suc'
										})
									}
								})
							}
						}
					})
				}
			}
		}
	})
})

module.exports = router
