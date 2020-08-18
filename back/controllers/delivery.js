import Delivery from '../models/delivery';
import User from '../models/user';
import mongoosePaginate from 'mongoose-paginate';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import utils from '../utils';
import sendEmail from '../sendemails';


function getDelivery(req, res, next) {
    if (req.params.id) {
        try {
            Delivery.find({
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
                .exec((err, delivery) => {

                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!delivery || delivery.length < 1)
                        return res.status(404).send({
                            message: 'El delivery no existe'
                        })
                    //if (delivery &&  delivery.length > 1)

                    return res.status(200).send({
                        delivery
                    })

                })

        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        try {
            Delivery.findOne({
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
                .exec((err, delivery) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!delivery || delivery.length < 1)
                        return res.status(404).send({
                            message: 'El delivery no existe'
                        })
                    //if (delivery &&  delivery.length > 1)

                    return res.status(200).send(
                        delivery
                    )

                })

        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

//function saveDelivery(req, res, next) {
function saveDelivery(user) {
    var deliveryOK;
    let delivery = new Delivery({
        title: utils.returnMomentFormat(),
        items: [],
        users: [],
        caller: user,
        author: 'system',
        status: 'draft',
        pubDate: moment(),
        visible: true
    });
    console.log('delivery', delivery)
    try {
        delivery.save((err, _delivery) => {
            console.log('_delivery', _delivery)
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
    return deliveryOK
}

function updateDelivery(req, res, next) {
    if (req.params.id) {
        try {
            console.log('before', typeof req.body.extras);
            req.body.extras = req.body.extras.split(', ')
            req.body.extras = req.body.extras.map((x => x.toLowerCase()))
            console.log('after', req.body.extras);
            var update = req.body;
            Delivery.findByIdAndUpdate(req.params.id,
                //update, 
                {
                    $push: {
                        users: update
                    }
                },
                (err, _delivery) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!_delivery) return res.status(404).send({
                        message: 'No hay Deliverys disponibles'
                    })
                    //if (_delivery) 
                    return res.status(200).send({
                        message: "Delivery updated"
                    })
                })

        } catch (error) {
            return res.status(500).send(error);

        }
    }
}

function updateDeliveryBocatas(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            Delivery.findByIdAndUpdate(req.params.id,
                //update, 
                {
                    $push: {
                        items: update
                    },
                    status: 'consultado'
                },
                (err, _delivery) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!_delivery) return res.status(404).send({
                        message: 'No hay Deliverys disponibles'
                    })
                    //if (_delivery) 
                    return res.status(200).send({
                        message: "Delivery updated"
                    })
                })

        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

function deleteDelivery(req, res, next) {
    try {


        Delivery.findByIdAndUpdate(req.params.id, {
            visible: false
        }, (err, _delivery) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_delivery) return res.status(404).send({
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


function updateStatusDelivery(req, res, next) {
    var key = req.params.key
    var delivery = {}
    delivery[key] = req.params.value;
    try {
        Delivery.findByIdAndUpdate(req.params.id, delivery).exec((err, _delivery) => {
            console.log(_delivery, 'updateDelivery', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_delivery) return res.status(404).send({
                message: 'No hay Deliverys disponibles'
            })
            if (_delivery) {
                sendEmail.sendStatusEmail(_delivery, utils.getUsersDelivery(_delivery.users))
                return res.status(200).send({
                    message: "Delivery updated"
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
    getDelivery,
    saveDelivery,
    deleteDelivery,
    updateDelivery,
    updateDeliveryBocatas,
    updateStatusDelivery
};