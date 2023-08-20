"user strict";

const userStorage = require('./userStorage')

class User {
    constructor(body){
        this.body = body;
    }
    login(){
        const client = this.body;
        const {id, pw} = userStorage.getUsersInfo(client.id);

        if(id){
            if (id === client.id && pw === client.pw){
                return{success : true};
            }
            return { success : false, msg : '비번 틀림'}
        }
        return {success: false, msg : '존재하지 않는 아이디'}
    }
    register(){
        const client = this.body;
        userStorage.save(client);
        return {success : true, msg : '회원가입 성공'}
    }
}

module.exports = User;