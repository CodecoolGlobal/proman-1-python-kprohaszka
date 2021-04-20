// const loginSubmitButton = document.getElementById("loginSubmitButton").addEventListener('click')
const registerSubmitButton = document.getElementById("registerSubmitButton").addEventListener('click', fillOutError)
// const loginButton = document.getElementById("loginButton").addEventListener('click')
const registrationFromUsr = document.querySelector('#registrationForm #usr_name')
const registrationFromPass = document.querySelector('#registrationForm #password')

window.onload = function () {
    console.log(registrationFromUsr.placeholder)
}
function fillOutError() {
    alert(registrationFrom.children)
}
