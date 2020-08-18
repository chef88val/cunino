import Family from '../models/family';
import mongoosePaginate from 'mongoose-paginate';
import path from 'path';
import fs from 'fs';


function getFamily(req, res, next) {
    if (req.params.id) {
        try {
            Family.findById({
                _id: req.params.id,
                visible: true
            }, (err, family) => {
                console.log(err, family)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!family || family.length < 1)
                    return res.status(404).send({
                        message: 'El family no existe'
                    })
                //if (family &&  family.length > 1)

                return res.status(200).send({
                    family
                })

            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('2')
        try {
            console.log('22')
            res.send('Family');
            Family.find({
                    visible: true
                },
                (err, familys, total) => {
                    if (err) return res.status(500).send({
                        message: 'Error en la peticion'
                    })
                    if (!familys) return res.status(404).send({
                        message: 'No hay familys disponibles'
                    })
                    //if (familys)
                    return res.status(200).send({
                        familys
                    })

                    //return res.status(200).send(familys)

                }
            )
        } catch (error) {
            console.log('error')
            return res.status(500).send(error);
        }
    }
}

function updateFamily(req, res, next) {
    if (req.params.id) {
        try {
            var update = req.body;
            update.visible = true;
            Family.findByIdAndUpdate(req.params.id, update, {
                new: true
            }, (err, _family) => {
                console.log('updateFamily', err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_family) return res.status(404).send({
                    message: 'No hay Familys disponibles'
                })
                //if (_family) 
                return res.status(200).send({
                    message: "Family updated"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('2');
        try {
            let family = new Family(req.body);
            Family.create(family, (err, _family) => {
                console.log(err, _family)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_family) return res.status(404).send({
                    message: 'No hay Familys disponibles'
                })
                return res.status(200).send({
                    message: "Family created"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }


    }
}

function deleteFamily(req, res, next) {
    var familyId = req.params.id;
    var update = req.body;
    try {
        Family.findByIdAndUpdate(familyId, {
            visible: false
        }, (err, _family) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_family) return res.status(404).send({
                message: 'No hay Familys disponible'
            })
            return res.status(200).send({
                message: "Family deleted"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
}

function saveFamily(family) {
    var res;
    let _family = new Family(family);
    try {
        Family.create(_family, {
            new: true
        }, (err, __family) => {
            res = __family;
            /*  if (err) return err
              if (!_family) return null
              return _family*/

        })
    } catch (error) {
        return res.status(500).send(error);
    }
    console.log('res', res)

}
export default  {
    getFamily,
    deleteFamily,
    updateFamily,
    saveFamily
};