'use strict'

export default {
    ensureAuth(req, res, next) {
 
        req.user = true;
        next();
    
    },
    ensureAuthAdmin (req, res, next) {
 
        //var auth = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
        //if(auth===req)
        req.user = true;
        next();
    }
};
//export default ensureAuthAdmin;