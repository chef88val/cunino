import Item from '../models/item';
import mongoosePaginate from 'mongoose-paginate';
import path from 'path';
import fs from 'fs';


function getItem(req, res, next) {
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
            console.log('22')
            res.send('Item');
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
            console.log('error')
            return res.status(500).send(error);
        }
    }
}

function updateItem(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            update.visible = true;
            Item.findByIdAndUpdate(req.params.id, update, {
                new: true
            }, (err, _item) => {
                console.log('updateItem', err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_item) return res.status(404).send({
                    message: 'No hay Items disponibles'
                })
                //if (_item) 
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
            Item.create(item, (err, _item) => {
                console.log(err, _item)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_item) return res.status(404).send({
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

function deleteItem(req, res, next) {
    var itemId = req.params.id;
    var update = req.body;
    try {
        Item.findByIdAndUpdate(itemId, {
            visible: false
        }, (err, _item) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_item) return res.status(404).send({
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

function saveItem(item) {
    var res;
    let _item = new Item(item);
    try {
        Item.create(_item, {
            new: true
        }, (err, __item) => {
            res = __item;
            /*  if (err) return err
              if (!_item) return null
              return _item*/

        })
    } catch (error) {
        return res.status(500).send(error);
    }
    console.log('res', res)

}
export default  {
    getItem,
    deleteItem,
    updateItem,
    saveItem
};