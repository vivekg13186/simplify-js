var msg = "Say hello ${msg} from ${name}";
var code = `Say hello "vivek" from "vivek"`;
var reg_param = /\$\{.*?\}/gm;
var reg_code = /\".*?\"/gm;
console.log(msg.match(reg_param))

function get_params(rule) {
    var p = rule.match(reg_param) || [];
    p = p.map(s => s.substring(2, s.length - 1));
    return p;
}
function get_code_value(rule) {
    var p = rule.match(reg_code) || [];
    p = p.map(s => s.substring(1, s.length - 1));
    return p;
}

function get_hash_rule(rule) {
    return rule.replaceAll(reg_param, "*");
}

function get_hash_code(rule) {
    return rule.replaceAll(reg_code, "*");
}
console.log(get_params(msg))
console.log(get_hash_rule(msg))
console.log(get_hash_code(code))
console.log(get_code_value(code))


const CODE_REGEXP = /\".*?\"/gm;
const RULE_REGEXP = /\$\{.*?\}/gm;

class Simplify {

    constructor() {
        this.rules = {};
    }
    addRule(string_pattern,callback){
        var hash = this._get_hash_rule(string_pattern);
        if(!this.rules[hash]){
            this.rules[hash] = {string_pattern:string_pattern,args : this._get_rule_params(string_pattern),callback :callback };
        }else{
            console.warn(string_pattern," similar pattern is aleady registered");
        }   
    }
    _get_rule_params(rule) {
        var p = rule.match(reg_param) || [];
        p = p.map(s => s.substring(2, s.length - 1));
        return p;
    }
    _get_code_value(rule) {
        var p = rule.match(reg_code) || [];
        p = p.map(s => s.substring(1, s.length - 1));
        return p;
    }
    _get_hash_rule(rule) {
        return rule.replaceAll(reg_param, "*");
    }
    _get_hash_code(rule) {
        return rule.replaceAll(reg_code, "*");
    }
}