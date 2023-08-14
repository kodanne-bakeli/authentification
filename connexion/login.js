import { authen } from '../firebase.js'
const logIn = document.querySelector('#login-form')
const btnLogin = document.querySelector('#login')
const forget = document.querySelector('#forget-form')
const btnForget = document.querySelector('#mdp')
//log in 
logIn.addEventListener("submit", () => {
    event.preventDefault()
    const email = document.getElementById('email1')
    const password = document.getElementById('password1')
    authen.login(email.value,password.value)
    logIn.reset()
    btnLogin.setAttribute("href","./index.html")
})
btnForget.addEventListener("click", (()=>{
    event.preventDefault()
    logIn.classList.add('d-none')
    forget.classList.remove('d-none')
}))
forget.addEventListener("submit", (()=>{
    event.preventDefault()
    const email = document.getElementById('email3').value
    authen.resetpassword(email)
}))
forget