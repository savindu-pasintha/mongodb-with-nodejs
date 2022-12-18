
//onst fetch = require('node-fetch');

function say() { return "hai"; }
function add(a, b) { return a + b; }
function min(a, b) { return a - b; }
async function ft(a, b) {
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };
    var x = [];
    await fetch("https://random-data-api.com/api/omniauth/google_get", requestOptions)
        .then(response => response.text())
        .then(result => { x = result; })
        .catch(error => console.log('error', error));
    return x;
}

function abc_promise() {
    return new Promise((resolve, reject) => {
        //code
        if (true) {
            resolve({ message: "Promise Data is here" });
        } else {
            reject({ message: "promise This is a error" });
        }
    });
}
function call_back(after_call_this_fun) {
    console.log("Before call");
    after_call_this_fun();
}

module.exports = {
    say,
    add,
    min,
    stu: async (para, b) => {
        return await min(para, b);
    },
    do: async (para, b) => {
        return await ft(para, b);
    },
    promise_abc: async () => {
        return await abc_promise();
    },
    back_call: async (function_as_parammeter) => {
        return call_back(function_as_parammeter);
    }
}

/** var ab = require("./ab.js");
    console.log(ab.say());
    console.log(ab.add(85, 9));
    console.log(ab.min(85, 9));
    ab.stu(100, 8).then((res) => { console.log(res); });
    ab.do(100, 8).then((res) => { console.log(res); });
    ab.promise_abc().then((res) => console.log(res)).catch((err) => console.log(err));
    ab.back_call(() => { console.log("I am call after function"); });
 
 */