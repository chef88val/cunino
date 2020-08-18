import Cashflow from '../models/cashflow';
import User from '../models/user';
import mongoosePaginate from 'mongoose-paginate';
import path from 'path';
import fs from 'fs';
import moment from 'moment';
import utils from '../utils';
import sendEmail from '../sendemails';


function getCashflow(req, res, next) {
    if (req.params.id) {
        try {
            Cashflow.find({
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
            Cashflow.findOne({
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

//function saveCashflow(req, res, next) {
function saveCashflow(user) {
    var cashflowOK;
    let delivery = new Cashflow({
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
        delivery.save((err, _cashflow) => {
            console.log('_cashflow', _cashflow)
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
    return cashflowOK
}

function updateCashflow(req, res, next) {
    if (req.params.id) {
        try {
            console.log('before', typeof req.body.extras);
            req.body.extras = req.body.extras.split(', ')
            req.body.extras = req.body.extras.map((x => x.toLowerCase()))
            console.log('after', req.body.extras);
            var update = req.body;
            Cashflow.findByIdAndUpdate(req.params.id,
                //update, 
                {
                    $push: {
                        users: update
                    }
                },
                (err, _cashflow) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!_cashflow) return res.status(404).send({
                        message: 'No hay Cashflows disponibles'
                    })
                    //if (_cashflow) 
                    return res.status(200).send({
                        message: "Cashflow updated"
                    })
                })

        } catch (error) {
            return res.status(500).send(error);

        }
    }
}

function updateCashflowBocatas(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            Cashflow.findByIdAndUpdate(req.params.id,
                //update, 
                {
                    $push: {
                        items: update
                    },
                    status: 'consultado'
                },
                (err, _cashflow) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!_cashflow) return res.status(404).send({
                        message: 'No hay Cashflows disponibles'
                    })
                    //if (_cashflow) 
                    return res.status(200).send({
                        message: "Cashflow updated"
                    })
                })

        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

function deleteCashflow(req, res, next) {
    try {


        Cashflow.findByIdAndUpdate(req.params.id, {
            visible: false
        }, (err, _cashflow) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_cashflow) return res.status(404).send({
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


function updateStatusCashflow(req, res, next) {
    var key = req.params.key
    var delivery = {}
    delivery[key] = req.params.value;
    try {
        Cashflow.findByIdAndUpdate(req.params.id, delivery).exec((err, _cashflow) => {
            console.log(_cashflow, 'updateCashflow', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_cashflow) return res.status(404).send({
                message: 'No hay Cashflows disponibles'
            })
            if (_cashflow) {
                sendEmail.sendStatusEmail(_cashflow, utils.getUsersCashflow(_cashflow.users))
                return res.status(200).send({
                    message: "Cashflow updated"
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
    getCashflow,
    saveCashflow,
    deleteCashflow,
    updateCashflow,
    updateCashflowBocatas,
    updateStatusCashflow
};