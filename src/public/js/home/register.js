"use strict"

const id = document.getElementById('id'),
    name = document.getElementById('pw'),
    pw = document.getElementById('pw'),
    confirmPw = document.getElementById('confirm-pw'),
    registerBtn = document.querySelector('button');

registerBtn.addEventListener('click', register);

function register(){
    if (!id.value) return alert('아이디를 입력해주세요');
    if (pw.value !== confirmPw.value) return alert('비밀번호가 일치하지 않습니다');
    const req = {
        id: id.value,
        name: name.value,
        pw: pw.value,
        confirmPw: confirmPw.value,
    };
    fetch('/register', {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify(req)
    }).then((res)=>res.json()).then((res)=>{
        if(res.success){
            alert(res.msg);
            location.href = '/login';
        } else{
            alert(res.msg);
        }
    })
    .catch((err)=>{
        console.error(new Error(`회원가입중 ${err} 발생`));
    })
}
