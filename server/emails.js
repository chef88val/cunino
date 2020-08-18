const list = ['adrian.corral.lubian@everis.com', 'ANA.ISABEL.RUEDA.LOPEZ@EVERIS.COM', 'beatriz.puig.lana@everis.com', 'Blanca.Palao.Juan@everis.com', 'carlos.martin.aurell.st@everis.com', 'carlos.monter.higuera@everis.com', 'constantino.velasco.fernandez@everis.com', 'david.selma.huguet@everis.com', 'fidel.ferrer.ribera@everis.com', 'guillermo.rosello.gil@everis.com', 'ignacio.testa.gonzalez@everis.com', 'ivan.garcia.medina@everis.com', 'JAVIER.HURTADO.TABASCO@EVERIS.COM', 'javier.segarra.martinez@everis.com', 'joan.rubio.ballester@everis.com', 'jonatan.rey.richart@everis.com', 'jose.gabriel.higon.galiana@everis.com', 'juan.vano.cerda@everis.com', 'laura.clara.jover.galtier@everis.com', 'LUIS.PUIG.NEBOT@EVERIS.COM', 'mercedes.medina.garcia@everis.com', 'oscar.gomez.balaguer@everis.com', 'pablo.bordas.garcia@everis.com', 'pascual.eduardo.vellibre.belenguer@everis.com', 'rafael.conejero.vila@everis.com', 'sergio.samper.marin@everis.com', 'daniel.alba.diaz@everis.com', ]
const res = [];
const dominio = '@everis.com';

function formatContacts() {
    list.forEach((element) => {
        var userController = require('./controllers/user')
        userController.saveUser({
            name: formatName(element),
            email: element,
            profile: 'SF',
            role: 'user'
        })
        /*res.push({
            name: formatName(element),
            email: element
        })*/
    });
}

function formatName(val) {
    val = String(val).replace(dominio, '').split('.');
    let el = '';
    val.forEach((element) => {
        el = el.concat(capitalizeFirstLetter(element), ' ')
    });
    console.log(val, el)
    return el;
    //val = val.toCapitalize();
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
module.exports = {
    formatContacts
}