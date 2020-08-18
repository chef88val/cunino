var Item = require('../models/item')
var mongoosePaginate = require('mongoose-paginate');
var path = require('path');
var fs = require('fs');


function getBocata(req, res, next) {
    if (req.params.id) {
        try {
            Item.findById({
                _id: req.params.id,
                visible: true
            }, (err, item) => {
                console.log(err, item)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!item || item.length < 1)
                    return res.status(404).send({
                        message: 'El item no existe'
                    })
                //if (item &&  item.length > 1)

                return res.status(200).send({
                    item
                })

            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('2')
        try {
            Item.find({
                    visible: true
                },
                (err, items, total) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!items) return res.status(404).send({
                        message: 'No hay items disponibles'
                    })
                    //if (items)
                    return res.status(200).send({
                        items
                    })

                    //return res.status(200).send(items)

                }
            )
        } catch (error) {
            return res.status(500).send(error);
        }
    }
}

function updateBocata(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            update.visible = true;
            Item.findByIdAndUpdate(req.params.id, update, {
                new: true
            }, (err, _bocata) => {
                console.log('updateBocata', err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_bocata) return res.status(404).send({
                    message: 'No hay Items disponibles'
                })
                //if (_bocata) 
                return res.status(200).send({
                    message: "Item updated"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('2');
        try {
            let item = new Item(req.body);
            Item.create(item, (err, _bocata) => {
                console.log(err, _bocata)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_bocata) return res.status(404).send({
                    message: 'No hay Items disponibles'
                })
                return res.status(200).send({
                    message: "Item created"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }


    }
}

function deleteBocata(req, res, next) {
    var bocataId = req.params.id;
    var update = req.body;
    try {
        Item.findByIdAndUpdate(bocataId, {
            visible: false
        }, (err, _bocata) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_bocata) return res.status(404).send({
                message: 'No hay Items disponible'
            })
            return res.status(200).send({
                message: "Item deleted"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

function saveBocata(item) {
    var res;
    let _bocata = new Item(item);
    try {
        Item.create(_bocata, {
            new: true
        }, (err, __bocata) => {
            res = __bocata;
            /*  if (err) return err
              if (!_bocata) return null
              return _bocata*/

        })
    } catch (error) {
        return res.status(500).send(error);
    }
    console.log('res', res)

}
module.exports = {
    getBocata,
    deleteBocata,
    updateBocata,
    saveBocata
};