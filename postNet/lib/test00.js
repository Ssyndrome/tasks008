'use strict';
var loadAllItems = require('./loadAllItems.js');

function posNet(input){
    let array = getArray(input);
    let res = getRes(array);
    return res;
}

function getArray(input){
    if(isNaN(parseInt(input))){
        let res_arr = {type:"barToPos"};
        let bar_arr = input.split(' ');
        res_arr.arr = bar_arr.slice(1,bar_arr.length-1);
        return res_arr;
    }else{
        if(input.indexOf('-') !== -1){
            var input_str = (input.split('-'))[0].concat((input.split('-'))[1]);
        }else{
            var input_str = input;
        }
        let res_arr = {type:"posToBar"};
        let pos_arr = input_str.split('');
        res_arr.arr = pos_arr.map((i) => {return Number(i);});
        return res_arr;
    }
}

function postToBar(pos_arr){
    let items = loadAllItems();
    let newPos = pos_arr;
    let sum = 0;
    for(let i = 0;i <pos_arr.length;i++){sum += pos_arr[i];}
    let correct = (parseInt(sum/10)+1)*10-sum;newPos.push(correct);

    let res_bar = [];
    newPos.forEach((arr) => {
        res_bar.push(items.filter((item) => {
            return item.num === arr;
        })[0].value);
    });
    return res_bar;
}

function barToPos(bar_arr){
    let items = loadAllItems();
    bar_arr.pop();

    let res_pos = [];
    bar_arr.forEach((arr) => {
        res_pos.push(items.filter((item) => {
            return item.value === arr;
        })[0].num);
    });
    return res_pos;
}

function getRes(res_arr){
    if(res_arr.type === "posToBar"){
        let pos_arr = res_arr.arr;
        let res = postToBar(pos_arr);
        res.push('|');res.unshift('|');
        return res.join(' ');
    }else{
        let bar_arr = res_arr.arr;
        let res = barToPos(bar_arr);
        if(res.length === 9){
            return `${res.join('').slice(0,5)}-${res.join('').slice(5,9)}`;
        }
    }
}
console.log(posNet("95713"));
module.exports = postToBar;