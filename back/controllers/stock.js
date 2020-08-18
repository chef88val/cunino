import Stock from '../models/stock';
import mongoosePaginate from 'mongoose-paginate';
import path from 'path';
import fs from 'fs';


function getStock(req, res, next) {
    if (req.params.id) {
        try {
            Stock.findById({
                _id: req.params.id,
                visible: true
            }, (err, stock) => {
                console.log(err, stock)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!stock || stock.length < 1)
                    return res.status(404).send({
                        message: 'El stock no existe'
                    })
                //if (stock &&  stock.length > 1)

                return res.status(200).send({
                    stock
                })

            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('2')
        try {
            console.log('22')
            res.send('Stock');
            Stock.find({
                    visible: true
                },
                (err, stocks, total) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!stocks) return res.status(404).send({
                        message: 'No hay stocks disponibles'
                    })
                    //if (stocks)
                    return res.status(200).send({
                        stocks
                    })

                    //return res.status(200).send(stocks)

                }
            )
        } catch (error) {
            console.log('error')
            return res.status(500).send(error);
        }
    }
}

function updateStock(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            update.visible = true;
            Stock.findByIdAndUpdate(req.params.id, update, {
                new: true
            }, (err, _stock) => {
                console.log('updateStock', err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_stock) return res.status(404).send({
                    message: 'No hay Stocks disponibles'
                })
                //if (_stock) 
                return res.status(200).send({
                    message: "Stock updated"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('2');
        try {
            let stock = new Stock(req.body);
            Stock.create(stock, (err, _stock) => {
                console.log(err, _stock)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_stock) return res.status(404).send({
                    message: 'No hay Stocks disponibles'
                })
                return res.status(200).send({
                    message: "Stock created"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }


    }
}

function deleteStock(req, res, next) {
    var stockId = req.params.id;
    var update = req.body;
    try {
        Stock.findByIdAndUpdate(stockId, {
            visible: false
        }, (err, _stock) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_stock) return res.status(404).send({
                message: 'No hay Stocks disponible'
            })
            return res.status(200).send({
                message: "Stock deleted"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

function saveStock(stock) {
    var res;
    let _stock = new Stock(stock);
    try {
        Stock.create(_stock, {
            new: true
        }, (err, __stock) => {
            res = __stock;
            /*  if (err) return err
              if (!_stock) return null
              return _stock*/

        })
    } catch (error) {
        return res.status(500).send(error);
    }
    console.log('res', res)

}
export default  {
    getStock,
    deleteStock,
    updateStock,
    saveStock
};