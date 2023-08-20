"use strict";

class userStorage {
    // private으로 바꾸기
    static #users = {
        id : ['qwer', 'asdf', 'zxcv'],
        pw : ['1234', '1234', '5678'],
        name : ['윤지상', '윤상지', '상지윤']
    }

     static getUsers(...field){
        const users = this.#users;
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
}

module.exports = userStorage;