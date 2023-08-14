import { authen } from '/firebase.js'
let signIn = document.querySelector('#signin-form');
//sign in
signIn.addEventListener("submit", () => {
    event.preventDefault()
    const email = document.getElementById('email2')
    const password = document.getElementById('password2')
    authen.signUp(email.value, password.value);
});
