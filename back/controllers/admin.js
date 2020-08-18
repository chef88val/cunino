import Admin from '../models/admin';
import mongoosePaginate from 'mongoose-paginate';;
import path from 'path';;
import fs from 'fs';;
import moment from 'moment';
import utils from '../utils';


function getAdmin(req, res, next) {
    console.log(req.params);
    console.log(req.params.id);
    try {
        if (req.params.id) {
            Admin.findById({
                _id: req.params.id,
                visible: true
            }, (err, admin) => {
                console.log(err, admin)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!admin || admin.length < 1)
                    return res.status(404).send({
                        message: 'El admin no existe'
                    })
                //if (admin &&  admin.length > 1)

                return res.status(200).send({
                    admin
                })

            })

        } else {
            return res.status(500).send('No admins with Id');
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

function getAdmins(profile) {

    try {
        var results = Admin.find({
            visible: true,
            notify: true,
            profile,
            role: 'admin' || 'Admin'
            /*$and:[
                {$or:[{lastCall:{ $exists: false }}]}, 
                {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
            ]*/
        });
        //console.log('-'+ admins) 
        return results;


    } catch (error) {

    }

}


function getLoginAdmin(req, res, next) {

    var admin = new Admin({
        visible: true,
        profile: req.body.profile,
        email: req.body.email,
        password: Bcrypt.compareSync(request.body.password, admin.password)
    })
    console.log('body', req.body)
    console.log('admin', admin)
    try {
        
        Admin.find({
            visible: true,
            profile: req.body.profile,
            email: req.body.email,
            password: Bcrypt.compareSync(request.body.password, admin.password)
        }
        /*$and:[
            {$or:[{lastCall:{ $exists: false }}]}, 
            {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
        ]*/
        , {}).exec((err, _admin) => {
            console.log(err,'-',_admin) 
            
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_admin) return res.status(404).send({
                message: 'No hay Admins disponibles'
            })
            //if (_admin) 
            return res.status(200).send(
                _admin[0]
            )
        })
        } catch (error) {
            return res.status(500).send(error);
        }
}


function saveAdmin(admin) {
    var res;
    let _admin = new Admin(admin);
    console.log('114'+_admin);
    try {
        Admin.create(_admin, {
            new: true
        }, (err, __admin) => {
            res = __admin;
            if (err) res.status(500).send(err)
            else res.status(200).send('Admin created')
            

        })
        return res;
    } catch (error) {
        return error;
    }

}

function updateCallerAdmin(req, res, next) {
    var admin = req.body;
    var id = req.params.id
    try {
        admin.lastCall = moment().format();
        Admin.findByIdAndUpdate(id, admin, {
            new: true
        }, (err, _admin) => {
            console.log('updateAdmin', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_admin) return res.status(404).send({
                message: 'No hay Admins disponibles'
            })
            //if (_admin) 
            return res.status(200).send({
                message: "Admin updated"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
    next();
}


function updateAdmin(req, res, next) {

    if (req.params.id) {
        try {
            var update = req.body;

            update.visible = true;
            Admin.findByIdAndUpdate(req.params.id, update, {
                new: true
            }, (err, _admin) => {
                console.log('updateAdmin', err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_admin) return res.status(404).send({
                    message: 'No hay Admins disponibles'
                })
                //if (_admin) 
                return res.status(200).send({
                    message: "Admin updated"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('0' + req.body)
        console.log('1' + Admin);
        request.body.password = Bcrypt.hashSync(request.body.password, 10);
        let admin = new Admin(req.body);
        try {
            Admin.create(admin, (err, _admin) => {
                console.log(err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_admin) return res.status(404).send({
                    message: 'No hay Admins disponibles'
                })
                return res.status(200).send({
                    message: "Admin created"
                })

            })
        } catch (error) {
            return res.status(500).send(error);
        }


    }
    //next();
}

function deleteAdmin(req, res, next) {
    try {
        
        Admin.findByIdAndUpdate(req.params.id, {
            visible: false
        }, (err, _admin) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_admin) return res.status(404).send({
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


function updateKeyAdmin(req, res, next) {
    var key = req.params.key
    var admin = {}
    admin[key] = utils.valueToBoolean(req.params.value);
    try {
        Admin.findByIdAndUpdate(req.params.id, admin, (err, _admin) => {
            console.log(_admin, 'updateAdmin', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_admin) return res.status(404).send({
                message: 'No hay Admins disponibles'
            })
            //if (_admin) 
            return res.status(200).send({
                message: "Admin updated"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
    //next();
}


module.exports = {
    getAdmin,
    getAdmins,
    saveAdmin,
    updateCallerAdmin,
    deleteAdmin,
    updateAdmin,
    getLoginAdmin,
    updateKeyAdmin
};