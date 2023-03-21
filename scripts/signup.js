let url="https://lemon-florentine-partner.glitch.me/users";
function getVal(id){
let value=document.getElementById(id).value;
return value;
}
function signup(){
    let payload={
        username:getVal("username"),
        email:getVal("email"),
        password:getVal("password")
    }
    fetch(url,{
        method:"POST",
        headers: {
            "Content-Type": "application/json",
          },
        body:JSON.stringify(payload)
    })
    .then(()=>{
        alert("Signup success")
        setTimeout(()=>{
            window.location.href="signin.html";
        },2000)
    })
    .catch(()=>{
        alert("Signup failed")
    })
}