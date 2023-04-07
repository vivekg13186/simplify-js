var Simplify= require("./simplify").Simplify;

var s = new Simplify();
s.addRule("say hello {name}",function(arg){
    console.log("Hello " ,arg[0]);
});

s.eval('say hello "vivek"');