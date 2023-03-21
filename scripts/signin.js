let url="https://lemon-florentine-partner.glitch.me/users";
let user_data=[]
function getVal(id){
let value=document.getElementById(id).value;
return value;
}
fetch(url)
.then((res)=>{
    return res.json();
})
.then((data)=>{
    user_data=data;
})
.catch(()=>{
    alert("signin failed")
})

function signin(){
    let payload={
        email:getVal("email"),
        password:getVal("password")
    }
    let check=user_data.filter((el)=>el.password==payload.password && el.email==payload.email)
    if(check.length>0){
        alert("login successful");
        localStorage.setItem("user",JSON.stringify({username:check[0].username}))
        setTimeout(()=>{
            window.location.href="home.html";
        },2000)
    }
    else{
        alert("login failed");
    }
}