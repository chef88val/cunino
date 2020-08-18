//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Pedido = require('../models/pedido');
var request = require('supertest')
//Require the dev-dependencies
let chai = require('chai');
let expect = require('chai').expect;
let chaiHttp = require('chai-http');
//let server = require('../index');
let app = require('../app');
let should = chai.should();
const el = new Pedido({
    items: [],
    users: [],
    author: 'author',
    status: 'cocina',
    pubDate: new Date(),
    visible: true
});
chai.use(chaiHttp);
const url = 'http://localhost:3800/api/';
const reqq = request('http://localhost:3800/api/');
let idMongo;
let idMongoReal = '5b3f93135dd0ba50f255fee5';
describe('Model.PEDIDO', () => {
    it('Exist', (done) => {        
        console.log(el);
        idMongo = el._id;
        el.validate(((err, pedido) => {
            //expect(err.errors.title).to.exist;
            done();
        }));
    })

    it('ExistFalse', (done) => {
        el.visible = false;
        console.log(el);
        el.validate(((err, pedido) => {
            //expect(err.errors.title).to.exist;
            done();
        }));
    })
});
describe('Pedido', () => {
    it('Exist', (done) => {
        done();
    })
    it('List', (done) => {
        chai.request(url).get('pedidos')
            .end(((err, res) => {
                expect(res.body).to.have.property('pedidos').to.be.an('array')
                expect(res.body).to.have.property('itemspage');
                expect(res.body).to.have.property('pages');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })

    it('one', (done) => {
        chai.request(url).get(`pedido/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('NOone', (done) => {
        chai.request(url).get('pedido/' + idMongo)
            .end(((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                done();
            }));
    })

    it('Put', (done) => {
        chai.request(url).put(`pedido/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Pedido updated');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })

    it('Delete', (done) => {
        chai.request(url).del(`pedido/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Pedido deleted');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('afterDelete', (done) => {
        chai.request(url).get(`pedido/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('El pedido no existe');
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                done();
            }));
    })
    it('Pedido_undo_delete', (done) => {
        chai.request(url).put(`pedido_undo_delete/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Pedido updated');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('afterUndoDelete', (done) => {
        chai.request(url).get(`pedido/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('visible').to.be.true;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
});