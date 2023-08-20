"use strict";

const fs = require('fs').promises;

class userStorage {
    static #getUserInfo(data, id){
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const userKey = Object.keys(users);
        const userInfo = userKey.reduce((newUser, info)=>{
            newUser[info] = users[info][idx];
            return newUser;
        }, {});
        return userInfo;
    }

    static #getUsers(data, isAll, field){
        const users = JSON.parse(data);
        if(isAll) return users;
        //newUsers에는 filed 초기값, 다음은 field에 들어감
        const newUsers = field.reduce((newUsers, field)=>{
            // hasOwnProperty는 키 값이 있는가? 나타내는 함수
            if (users.hasOwnProperty(field)) {
                newUsers[field] = users[field];
            }
            return newUsers;
            // {}은 new users임
        },{})
        return newUsers;
    }
     static getUsers(isAll ,...field){
        return fs
        .readFile('./src/databases/users.json')
        .then((data)=>{
            return this.#getUsers(data, isAll, field);
        })
        .catch((err)=>{
            console.log(`${err}`)
        });
    }
    static getUsersInfo(id) {
        return fs
        .readFile('./src/databases/users.json')
        .then((data)=>{
            return this.#getUserInfo(data, id);
        })
        .catch((err)=>{
            console.err(`${err}`)
        });
    }

    static async save(userInfo){
        // true하면 다 긁어짐
        const users = await this.getUsers(true);
        if(users.id.includes(userInfo.id)){
            throw '이미 존재하는 아이디입니다';
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.pw.push(userInfo.pw);
        fs.writeFile('./src/databases/users.json', JSON.stringify(users));
        return {success:true, msg:'회원가입 성공'}
    }
}

module.exports = userStorage;