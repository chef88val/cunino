var CronJob = require('cron').CronJob;
// Patrón de cron
// Corre todos los lunes a la 1:00 PM
new CronJob('00 10 * * 0-5', function () {
    // Código a ejecutar

    initPedidoDay()
    //let idPedido = controllerPedido.savePedido();
}, function () {

    //let listUsers = controllerUser.getUsers();
    //let numberRandom = Math.random(1 + listUsers.length)
    // Código a ejecutar cuando la tarea termina. 
    // Puedes pasar null para que no haga nada
    if (utils.stringToBoolean(process.env.SEND_EMAIL)) {
        var authEmail = JSON.parse(fs.readFileSync('./config.json', 'utf-8'))
        console.log('111' + process.env.NODE_ENV, typeof process.env.SEND_EMAIL)
        sendEmail()

    }
}, true);