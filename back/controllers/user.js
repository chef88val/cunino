import User from '../models/user';
import mongoosePaginate from 'mongoose-paginate';;
import path from 'path';;
import fs from 'fs';;
import moment from 'moment';
import utils from '../utils';


function getUser(req, res, next) {
    console.log(req.params);
    console.log(req.params.id);
    try {
        if (req.params.id) {
            User.findById({
                _id: req.params.id,
                visible: true
            }, (err, user) => {
                console.log(err, user)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!user || user.length < 1)
                    return res.status(404).send({
                        message: 'El user no existe'
                    })
                //if (user &&  user.length > 1)

                return res.status(200).send({
                    user
                })

            })

        } else {
            return res.status(500).send('No users with Id');
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send(error);
    }
}

function getUsers(profile) {

    try {
        var results = User.find({
            visible: true,
            notify: true,
            profile,
            role: 'user' || 'User'
            /*$and:[
                {$or:[{lastCall:{ $exists: false }}]}, 
                {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
            ]*/
        });
        //console.log('-'+ users) 
        return results;


    } catch (error) {

    }

}


function getLoginUser(req, res, next) {

    var user = new User({
        visible: true,
        profile: req.body.profile,
        email: req.body.email,
        password: Bcrypt.compareSync(request.body.password, user.password)
    })
    console.log('body', req.body)
    console.log('user', user)
    try {
        
        User.find({
            visible: true,
            profile: req.body.profile,
            email: req.body.email,
            password: Bcrypt.compareSync(request.body.password, user.password)
        }
        /*$and:[
            {$or:[{lastCall:{ $exists: false }}]}, 
            {$or:[{lastCall: {"$gte": moment().format(),"$lt":moment().subtract(7, 'days')}}]}
        ]*/
        , {}).exec((err, _user) => {
            console.log(err,'-',_user) 
            
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_user) return res.status(404).send({
                message: 'No hay Users disponibles'
            })
            //if (_user) 
            return res.status(200).send(
                _user[0]
            )
        })
        } catch (error) {
            return res.status(500).send(error);
        }
}


function saveUser(user) {
    var res;
    let _user = new User(user);
    console.log('114'+_user);
    try {
        User.create(_user, {
            new: true
        }, (err, __user) => {
            res = __user;
            if (err) res.status(500).send(err)
            else res.status(200).send('User created')
            

        })
        return res;
    } catch (error) {
        return error;
    }

}

function updateCallerUser(req, res, next) {
    var user = req.body;
    var id = req.params.id
    try {
        user.lastCall = moment().format();
        User.findByIdAndUpdate(id, user, {
            new: true
        }, (err, _user) => {
            console.log('updateUser', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_user) return res.status(404).send({
                message: 'No hay Users disponibles'
            })
            //if (_user) 
            return res.status(200).send({
                message: "User updated"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
    next();
}


function updateUser(req, res, next) {

    if (req.params.id) {
        try {
            var update = req.body;

            update.visible = true;
            User.findByIdAndUpdate(req.params.id, update, {
                new: true
            }, (err, _user) => {
                console.log('updateUser', err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_user) return res.status(404).send({
                    message: 'No hay Users disponibles'
                })
                //if (_user) 
                return res.status(200).send({
                    message: "User updated"
                })
            })
        } catch (error) {
            return res.status(500).send(error);
        }
    } else {
        console.log('0' + req.body)
        console.log('1' + User);
        request.body.password = Bcrypt.hashSync(request.body.password, 10);
        let user = new User(req.body);
        try {
            User.create(user, (err, _user) => {
                console.log(err)
                if (err) return res.status(500).send({
                    message: 'Error en la peticion'
                })
                if (!_user) return res.status(404).send({
                    message: 'No hay Users disponibles'
                })
                return res.status(200).send({
                    message: "User created"
                })

            })
        } catch (error) {
            return res.status(500).send(error);
        }


    }
    //next();
}

function deleteUser(req, res, next) {
    try {
        
        User.findByIdAndUpdate(req.params.id, {
            visible: false
        }, (err, _user) => {
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_user) return res.status(404).send({
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


function updateKeyUser(req, res, next) {
    var key = req.params.key
    var user = {}
    user[key] = utils.valueToBoolean(req.params.value);
    try {
        User.findByIdAndUpdate(req.params.id, user, (err, _user) => {
            console.log(_user, 'updateUser', err)
            if (err) return res.status(500).send({
                message: 'Error en la peticion'
            })
            if (!_user) return res.status(404).send({
                message: 'No hay Users disponibles'
            })
            //if (_user) 
            return res.status(200).send({
                message: "User updated"
            })
        })
    } catch (error) {
        return res.status(500).send(error);
    }
    //next();
}


module.exports = {
    getUser,
    getUsers,
    saveUser,
    updateCallerUser,
    deleteUser,
    updateUser,
    getLoginUser,
    updateKeyUser
};