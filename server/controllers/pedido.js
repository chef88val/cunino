var Pedido = require('../models/pedido')
var User = require('../models/user')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');
var moment = require('moment')
var utils = require('../utils')
var sendEmail = require('../sendemails')


function getPedido(req, res, next) {
    if (req.params.id) {
        try {
            Pedido.find({
                    _id: req.params.id,
                    visible: true,
                    title: utils.returnMomentFormat()

                })
                .populate('users.user')
                .populate('users.item')
                .populate('items.user')
                .populate('items.items')
                .populate('items.item')
                .populate('items')
                .populate('caller')
                .exec((err, pedido) => {

                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!pedido || pedido.length < 1)
                        return res.status(404).send({
                            message: 'El pedido no existe'
                        })
                    //if (pedido &&  pedido.length > 1)

                    return res.status(200).send({
                        pedido
                    })

                })

        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        try {
            Pedido.findOne({
                    visible: true,
                    title: utils.returnMomentFormat()

                })
                .populate('users.user')
                .populate('users.item')
                .populate('items.user')
                .populate('items.items')
                .populate('items.item')
                .populate('items')
                .populate('caller')
                .exec((err, pedido) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!pedido || pedido.length < 1)
                        return res.status(404).send({
                            message: 'El pedido no existe'
                        })
                    //if (pedido &&  pedido.length > 1)

                    return res.status(200).send(
                        pedido
                    )

                })

        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

//function savePedido(req, res, next) {
function savePedido(user) {
    var pedidoOK;
    let pedido = new Pedido({
        title: utils.returnMomentFormat(),
        items: [],
        users: [],
        caller: user,
        author: 'system',
        status: 'draft',
        pubDate: moment(),
        visible: true
    });
    console.log('pedido', pedido)
    try {
        pedido.save((err, _pedido) => {
            console.log('_pedido', _pedido)
            console.log('err', err)

        })
        user.lastCall = moment().format()
        var update = user.lastCall
        //user = new User(user);
        User.findByIdAndUpdate(user._id, {
            $set: {
                lastCall: update
            }
        }, (err, _user) => {});


    } catch (error) {
        return error
        /*res.status(200).send({
                    message: error.errors.size.ValidatorError
                })*/
    }
    return pedidoOK
}

function updatePedido(req, res, next) {
    if (req.params.id) {
        try {
            console.log('before', typeof req.body.extras);
            req.body.extras = req.body.extras.split(', ')
            req.body.extras = req.body.extras.map((x => x.toLowerCase()))
            console.log('after', req.body.extras);
            var update = req.body;
            Pedido.findByIdAndUpdate(req.params.id,
                //update, 
                {
                    $push: {
                        users: update
                    }
                },
                (err, _pedido) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!_pedido) return res.status(404).send({
                        message: 'No hay Pedidos disponibles'
                    })
                    //if (_pedido) 
                    return res.status(200).send({
                        message: "Pedido updated"
                    })
                })

        } catch (error) {
            return res.status(500).send(error);

        }
    }
}

function updatePedidoBocatas(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            Pedido.findByIdAndUpdate(req.params.id,
                //update, 
                {
                    $push: {
                        items: update
                    },
                    status: 'consultado'
                },
                (err, _pedido) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!_pedido) return res.status(404).send({
                        message: 'No hay Pedidos disponibles'
                    })
                    //if (_pedido) 
                    return res.status(200).send({
                        message: "Pedido updated"
                    })
                })

        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

function deletePedido(req, res, next) {
    try {


        Pedido.findByIdAndUpdate(req.params.id, {
            visible: false
        }, (err, _pedido) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_pedido) return res.status(404).send({
                message: 'No hay Feeds disponible'
            })
            return res.status(200).send({
                message: "Feed deleted"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}


function updateStatusPedido(req, res, next) {
    var key = req.params.key
    var pedido = {}
    pedido[key] = req.params.value;
    try {
        Pedido.findByIdAndUpdate(req.params.id, pedido).exec((err, _pedido) => {
            console.log(_pedido, 'updatePedido', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_pedido) return res.status(404).send({
                message: 'No hay Pedidos disponibles'
            })
            if (_pedido) {
                sendEmail.sendStatusEmail(_pedido, utils.getUsersPedido(_pedido.users))
                return res.status(200).send({
                    message: "Pedido updated"
                })
            }
        })
    } catch (error) {

        console.log('asdasd');
        return res.status(500).send(error);
    }
    //next();
}


module.exports = {
    getPedido,
    savePedido,
    deletePedido,
    updatePedido,
    updatePedidoBocatas,
    updateStatusPedido
};