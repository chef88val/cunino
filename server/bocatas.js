const list = ['Anchoas con queso','Anchoas y queso','Atún olivas','Bacon queso','Bacon y queso','Blanco y negro','Huevos rotos con jamon','Huevos rotos con jamón','Jamón','Jamón con tomate','Jamón con queso','Lomo queso','Pavo queso','Rev. lomo queso','Rev. lomo y habitas','Rev. Pechuga con pimiento verde','Rev. pechuga con queso','Revuelto Chistorra','Revuelto de embutido','Revuelto de habitas con longanizas','Revuelto de pechuga con pimiento verde','Revuelto de pechuga y setas','Revuelto embutido','Revuelto habas con longanizas','Revuelto lomo con champiñones','Revuelto lomo con trigueros','Revuelto pechuga','Sobrada queso','Sobrasada queso','Tortilla de patata','Tortilla de patata con cebolla','Vegetal','Vegetal con atun','Vegetal con atún'
]
const res = [];
const dominio = '@everis.com';

function formatBocatas() {
    list.forEach((element) => {
        var bocataController = require('./controllers/item')
        bocataController.saveBocata({
            name: capitalizeFirstLetter(element)
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
    formatBocatas
}