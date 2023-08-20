"use strict";

const userStorage = require('../../models/userStorage')
const User = require('../../models/user')

const output = {
    home : (req, res) => {
        res.render('home/index')
    },
    login : (req, res) => {
        res.render('home/login')
    },
    register: (req, res) => {
        res.render('home/register')
    }
}


//post방식으로 보낼 코드
const process = {
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        console.log(response)
        return res.json(response);
    },
    register: (req, res) => {
        const user = new User(req.body);
        const response = user.register();
        console.log(response)
        return res.json(response);
    }
}

module.exports = {
    output,
    process
}