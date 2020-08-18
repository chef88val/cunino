let chai = require('chai');
let expect = require('chai').expect;
let utils = require('../utils')

describe('stringToBoolean', () => {
    it('ok', () => {
        expect(utils.stringToBoolean('true')).to.be.true;
        expect(utils.stringToBoolean('false')).to.be.false;
        expect(utils.stringToBoolean('1')).to.be.undefined;
    })
})

describe('numberToBoolean', () => {
    it('ok', () => {
        expect(utils.numberToBoolean('true')).to.be.false;
        expect(utils.numberToBoolean('0')).to.be.false;
        expect(utils.numberToBoolean('1')).to.be.true;
    })
})

describe('returnMomentFormat', () => {
    it('ok', () => {
        expect(utils.returnMomentFormat()).to.equal('01/08/2018');
        expect(utils.returnMomentFormat()).to.not.equal('02/08/2018');
    })
})

describe('getIPAddress', () => {
    it('ok', () => {
        expect(utils.getIPAddress()).to.equal('192.168.1.37');
        expect(utils.getIPAddress()).to.not.equal('192.168.1.30');
    })
})
