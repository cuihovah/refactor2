const plays = require('./plays.json');
const invoices = require('./invoices.json');
const statement1_1 = require('../../ch1/1.1/statement.js');
const statement1_4 = require('../../ch1/1.4/statement.js');
const statement1_6_plainText = require('../../ch1/1.6/statement.js').statement;
const statement1_6_html = require('../../ch1/1.6/statement.js').htmlStatement;
const statement1_7 = require('../../ch1/1.7/statement.js').statement;
const statement1_8 = require('../../ch1/1.8/statement.js').statement;
const statement1_9 = require('../../ch1/1.9/statement.js').statement;
const expect = require('chai').expect;

describe('test chapter 1', () => {
    it('test chapter 1.1', () => {
        let result1_1 = statement1_1(invoices[0], plays);
        console.log(result1_1);
    });
    it('test chapter 1.4', () => {
        let result1_1 = statement1_1(invoices[0], plays);
        let result1_4 = statement1_4(invoices[0], plays);
        expect(result1_1 === result1_4).to.be.equal(true);
    });
    it('test chapter 1.6', () => {
        let result1_1 = statement1_1(invoices[0], plays);
        let result1_6 = statement1_6_plainText(invoices[0], plays);
        expect(result1_1 === result1_6).to.be.equal(true);
        // let result1_6_html = statement1_6_html(invoices[0], plays);
        // console.log(result1_6_html);
    });
    it('test chapter 1.7', () => {
        let result1_1 = statement1_1(invoices[0], plays);
        let result1_7 = statement1_7(invoices[0], plays);
        expect(result1_1 === result1_7).to.be.equal(true);
    });
    it('test chapter 1.8', () => {
        let result1_1 = statement1_1(invoices[0], plays);
        let result1_8 = statement1_8(invoices[0], plays);
        expect(result1_1 === result1_8).to.be.equal(true);
    });
    it('test chapter 1.9', () => {
        let result1_1 = statement1_1(invoices[0], plays);
        let result1_9 = statement1_9(invoices[0], plays);
        expect(result1_1 === result1_9).to.be.equal(true);
    });
});