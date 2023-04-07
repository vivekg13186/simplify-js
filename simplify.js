const CODE_REGEXP = /\".*?\"/gm;
const RULE_REGEXP = /\{.*?\}/gm;

class Simplify {

    constructor() {
        this.rules = {};
    }
    addRule(string_pattern,callback){
        var hash = this._get_hash_rule(string_pattern);
        if(!this.rules[hash]){
            this.rules[hash] = {string_pattern:string_pattern,args : this._get_rule_params(string_pattern),callback :callback };
        }else{
            console.warn(string_pattern," similar pattern is already registered");
        }   
    }

    eval(code){
        code  = code.split("\n")||[];
        for(var i=0;i<code.length;i++){
            var lno=i+1;
            var l = code[i];
            try{
               var args = this._get_code_value(l);
               var hash  = this._get_hash_code(l);
               if(this.rules[hash]){
                this.rules[hash].callback(args);
               }else{
                throw "No rule found for : "+l;
               }
            }catch(e){
                console.error("Error at line ",lno," : ",l,"\nError message : ",e);
            }

        }
        
        
    }
    _get_rule_params(rule) {
        var p = rule.match(RULE_REGEXP) || [];
        p = p.map(s => s.substring(2, s.length - 1));
        return p;
    }
    _get_code_value(rule) {
        var p = rule.match(CODE_REGEXP) || [];
        p = p.map(s => s.substring(1, s.length - 1));
        return p;
    }
    _get_hash_rule(rule) {
        return rule.replaceAll(RULE_REGEXP, "*");
    }
    _get_hash_code(rule) {
        return rule.replaceAll(CODE_REGEXP, "*");
    }
}

exports.Simplify =Simplify;