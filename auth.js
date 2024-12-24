const registerForm = document.getElementById("registerForm");
const notify_container = document.getElementById("notify_container")
let localStorage_users = JSON.parse(localStorage.getItem("users") || "[]")
const loginForm = document.getElementById("loginForm")
const updateForm = document.getElementById("updateForm");

const str_template =(type,msg)=> `
<div class="alert alert-${type} text-center">
 ${msg}
</div>

`

registerForm?.addEventListener("submit",function(e){
    e.preventDefault();

    try {
            const data = new FormData(e.target);
            const name = data.get("name");
            const email = data.get("email");
            const password = data.get("password");

            // check user already exist
            const check_exist = localStorage_users.find(function(cur){
                return cur.email === email
            })
            if(check_exist){
                notify_container.innerHTML=  str_template("danger","User Already Exist with this email.")
                return
            }

            // console.log();
            const pk = new Date().getTime();
         const user =   {
                    name,email,password,pk
                }


                localStorage_users.push(user)
                localStorage.setItem("users",JSON.stringify([...localStorage_users]))

                notify_container.innerHTML=   str_template("success","User Register Successfully.")
                

            registerForm.reset()

    } catch (error) {
            console.log(error.message);
            
    }

})


loginForm?.addEventListener("submit",function(e){
    e.preventDefault();

    try {
            const data = new FormData(e.target);
            const email = data.get("email");
            const password = data.get("password");

            // check user already exist
            const check_exist = localStorage_users.find(function(cur){
                return cur.email === email
            })
            if(!check_exist){
                notify_container.innerHTML=  str_template("danger","User Not Found")
                return
            }

            const isMatch = check_exist.password === password
            if(!isMatch){
                notify_container.innerHTML=  str_template("danger","Invalid Crendentials")
                return
            }
            
            notify_container.innerHTML=  str_template("success","Login Successfully")

            localStorage.setItem("active_user",check_exist.pk);

            location.href="/"

            registerForm.reset()

    } catch (error) {
            console.log(error.message);
            
    }

})


updateForm?.addEventListener("submit",function(e){
    e.preventDefault();

    try {
const active_user  = localStorage.getItem("active_user");

        const update_obj = {
            
        }
            const data = new FormData(e.target);
    
                if( data.get("email")){
                    // TODO: check user if exist...
                    update_obj['email'] = data.get("email") ;
                }
                if(data.get("name") ){
                    update_obj['name'] = data.get("name") ;

                }
                console.log(update_obj);
                

            // check user already exist
            const new_users = localStorage_users.map(function(cur){
               if(cur.pk== active_user){
                    return {
                        ...cur,
                        ...update_obj
                    }
               }
               return cur
            })
         
            notify_container.innerHTML=  str_template("success","Profile updated")

            localStorage_users =new_users
            localStorage.setItem("users",JSON.stringify([...new_users]))


            location.href="/"

            registerForm.reset()

    } catch (error) {
            console.log(error.message);
            
    }

})

window.addEventListener("load",function(){
const active_user  = localStorage.getItem("active_user");
    if(!active_user){
        document.getElementById("logoutBtn").style.display="none";
    }else{
        // TODO: login register hide
    }
})

function logoutBtn(){
    localStorage.removeItem("active_user");
    location.href="/login.html"
    alert("logout success")

}