"user strict";

const userStorage = require('./userStorage')

class User {
    constructor(body){
        this.body = body;
    }
    async login(){
        const client = this.body;
        const {id, pw} = await userStorage.getUsersInfo(client.id);

        if(id){
            if (id === client.id && pw === client.pw){
                return{success : true};
            }
            return { success : false, msg : '비번 틀림'}
        }
        return {success: false, msg : '존재하지 않는 아이디'}
    }
    async register(){
        const client = this.body;
        try{
            const response = await userStorage.save(client);
            return response;
        } catch(err){
            return {success : false, msg : err}
        }
    }
}

module.exports = User;