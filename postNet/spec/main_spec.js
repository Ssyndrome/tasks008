"use strict";
var _ = require("lodash");
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var postNet = require("../lib/posNet.js");


describe("邮编数字与条形码互相转换", function(){
    sinon.spy(console, 'log');



    it("1.输入邮编95713(25)时，输出条形码| |:|:: :|:|: |:::| :::|| ::||: :|:|: |", () => {

        let result = postNet("95713");
        let expect_string = `| |:|:: :|:|: |:::| :::|| ::||: :|:|: |`;

        expect(expect_string).to.equal(result);
    });

    it("2.输入邮编957139571(47)时，输出条形码| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |", () => {

        let result = postNet("957139571");
        let expect_string = `| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |`;

        expect(expect_string).to.equal(result);
    });

    it("3.输入邮编95713-9571(47)时，输出条形码| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |",() => {

        let result = postNet("95713-9571");
        let expect_string = `| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |`;

        expect(expect_string).to.equal(result);
    });

    it("4.输入条形码| |:|:: :|:|: |:::| :::|| ::||: :|:|: |时，输出邮编95713(25)", () => {

        let result = postNet("| |:|:: :|:|: |:::| :::|| ::||: :|:|: |");
        let expect_number = `95713`;

        expect(expect_number).to.equal(result);
    });

    it("5.输入条形码| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |时，输出邮编95713-9571(47)", () => {

        let result = postNet("| |:|:: :|:|: |:::| :::|| ::||: |:|:: :|:|: |:::| :::|| ::||: |");
        let expect_string = `95713-9571`;

        expect(expect_string).to.equal(result);
    });


});