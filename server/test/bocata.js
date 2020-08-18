//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let Item = require('../models/item');
var request = require('supertest')
//Require the dev-dependencies
let chai = require('chai');
let expect = require('chai').expect;
let chaiHttp = require('chai-http');
//let server = require('../index');
let app = require('../app');
let should = chai.should();
const el = new Item({
    name: 'name',
    visible: true,
    size: 'p'
});
chai.use(chaiHttp);
const url = 'http://localhost:3800/api/';
const reqq = request('http://localhost:3800/api/');
let idMongo;
let idMongoReal = '5b3f93135dd0ba50f255fee5';
describe('Model.BOCATA', () => {
    it('Exist', (done) => {
        
        console.log(el);
        idMongo = el._id;
        el.validate(((err, item) => {
            //expect(err.errors.title).to.exist;
            done();
        }));
    })

    it('ExistFalse', (done) => {
        el.visible =false;
        console.log(el);
        el.validate(((err, item) => {
            //expect(err.errors.title).to.exist;
            done();
        }));
    })

    it('SizeNotExist', (done) => {
        el.size = 'z';
        console.log(el);
        el.validate(((err, item) => {
            //expect(err.errors.title).to.exist;
            done();
        }));
    })
});
describe('Item', () => {
    it('Exist', (done) => {
        done();
    })
    it('List', (done) => {
        chai.request(url).get('item')
            .end(((err, res) => {
                expect(res.body).to.have.property('items').to.be.an('array');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })

    it('one', (done) => {
        chai.request(url).get(`item/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('NOone', (done) => {
        chai.request(url).get('item/' + idMongo)
            .end(((err, res) => {
                expect(res.body).to.be.an('object');
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                done();
            }));
    })

    it('Put', (done) => {
        chai.request(url).put(`item/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Item updated');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })

    it('Delete', (done) => {
        chai.request(url).del(`item/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Item deleted');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('afterDelete', (done) => {
        chai.request(url).get(`item/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('El item no existe');
                expect(res).to.have.status(404);
                expect(res).to.be.json;
                done();
            }));
    })
   /* it('Bocata_undo_delete', (done) => {
        chai.request(url).put(`bocata_undo_delete/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('message').to.be.equals('Item updated');
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })
    it('afterUndoDelete', (done) => {
        chai.request(url).get(`item/${idMongoReal}`)
            .end(((err, res) => {
                expect(res.body).to.be.an('object').to.have.property('visible').to.be.true;
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                done();
            }));
    })*/
});