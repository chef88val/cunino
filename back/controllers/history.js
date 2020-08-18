import History from '../models/history';
import mongoosePaginate from 'mongoose-paginate';
import path from 'path';
import fs from 'fs';


function getHistory(req, res, next) {
    if (req.params.id) {
        try {
            History.findById({
                _id: req.params.id,
                visible: true
            }, (err, history) => {
                console.log(err, history)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!history || history.length < 1)
                    return res.status(404).send({
                        message: 'El history no existe'
                    })
                //if (history &&  history.length > 1)

                return res.status(200).send({
                    history
                })

            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('2')
        try {
            console.log('22')
            res.send('History');
            History.find({
                    visible: true
                },
                (err, historys, total) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!historys) return res.status(404).send({
                        message: 'No hay historys disponibles'
                    })
                    //if (historys)
                    return res.status(200).send({
                        historys
                    })

                    //return res.status(200).send(historys)

                }
            )
        } catch (error) {
            console.log('error')
            return res.status(500).send(error);
        }
    }
}

function updateHistory(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            update.visible = true;
            History.findByIdAndUpdate(req.params.id, update, {
                new: true
            }, (err, _history) => {
                console.log('updateHistory', err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_history) return res.status(404).send({
                    message: 'No hay Historys disponibles'
                })
                //if (_history) 
                return res.status(200).send({
                    message: "History updated"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('2');
        try {
            let history = new History(req.body);
            History.create(history, (err, _history) => {
                console.log(err, _history)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_history) return res.status(404).send({
                    message: 'No hay Historys disponibles'
                })
                return res.status(200).send({
                    message: "History created"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }


    }
}

function deleteHistory(req, res, next) {
    var historyId = req.params.id;
    var update = req.body;
    try {
        History.findByIdAndUpdate(historyId, {
            visible: false
        }, (err, _history) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_history) return res.status(404).send({
                message: 'No hay Historys disponible'
            })
            return res.status(200).send({
                message: "History deleted"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

function saveHistory(history) {
    var res;
    let _history = new History(history);
    try {
        History.create(_history, {
            new: true
        }, (err, __history) => {
            res = __history;
            /*  if (err) return err
              if (!_history) return null
              return _history*/

        })
    } catch (error) {
        return res.status(500).send(error);
    }
    console.log('res', res)

}
export default  {
    getHistory,
    deleteHistory,
    updateHistory,
    saveHistory
};