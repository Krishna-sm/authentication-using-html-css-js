const active_user  = localStorage.getItem("active_user");
const all_users =JSON.parse( localStorage.getItem("users") ||"[]")
if(!active_user){
    location.href ="/login.html";
}

const name = document.querySelector("#dashboard-data #name")
const email = document.querySelector("#dashboard-data #email")

const user = all_users.find(function(cur){
    return cur.pk == active_user
})

name.textContent= user.name
email.textContent= user.email

console.log(user);
