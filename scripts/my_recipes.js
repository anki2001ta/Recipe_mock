const url="https://lemon-florentine-partner.glitch.me/recipes";
let user=JSON.parse(localStorage.getItem("user"));
if(user.username==""){
    window.location.href="signin.html"
}
function postdata(){
    fetch(url)
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let userpost=data.filter((el)=>el.username==user.username)
    let postData=document.getElementById("post");
    postData.innerHTML=null
    userpost.forEach((el) => {
        let div=document.createElement("div");
        let div1=document.createElement("div");
        div.setAttribute("id","spost")
        let image=document.createElement("img");
        let title=document.createElement("p");
        let shortD=document.createElement("p");
        let category=document.createElement("p");
        let edit=document.createElement("button");
        let del=document.createElement("button");
        edit.innerHTML="Edit";
        del.innerHTML="Delete";
        div1.append(edit,del)
        del.addEventListener("click",()=>{
            fetch(`${url}/${el.id}`,{
                method:"DELETE"
            })
            .then(()=>{
                alert("delete success")
                postData()
            })
        })
        image.setAttribute("id","imgg")
        image.src=el.image;
        shortD.innerHTML=el.description;
        title.innerHTML=el.title;
        category.innerHTML=el.category
        div.append(image,title,category,shortD,div1);
        postData.append(div)
    });
    
  })
  .catch(() => {

  });
}
postdata();
function recipe() {
  window.location.href = "my_recipes.html";
}
function home() {
  window.location.href = "home.html";
}
function getVal(id) {
  let value = document.getElementById(id).value;
  return value;
}
document.getElementById("add_recipe").addEventListener("click", () => {
  let container = document.getElementById("container");
  if (container.innerHTML !== "") {
    container.innerHTML = null;
  } else {
    let div = document.createElement("div");
    div.setAttribute("id", "addForm");
    let title = document.createElement("input");
    let image = document.createElement("input");
    let shortDesc = document.createElement("input");
    let category = document.createElement("input");
    let ingredients = document.createElement("input");
    let instructions = document.createElement("textarea");
    let add = document.createElement("button");
    add.innerHTML = "Add";
    add.addEventListener("click", () => {
        let payload={
            username:user.username,
            title:getVal("title"),
            image:getVal("image"),
            description:getVal("short"),
            category:getVal("category"),
            ingredients:getVal("ingredients").split(","),
            instructions:getVal("instructions")
        }
        fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          })
            .then(() => {
              alert("Recipe Added Successful");
              postdata();
              container.innerHTML = null;
            })
            .catch(() => {
              alert("Recipe Added failed");
            });
    });
    title.placeholder = "Enter Title";
    title.setAttribute("id", "title");
    image.placeholder = "Enter Image";
    image.setAttribute("id", "image");
    shortDesc.placeholder = "Enter Short Description";
    shortDesc.setAttribute("id", "short");
    category.placeholder = "Enter Category";
    category.setAttribute("id", "category");
    ingredients.placeholder = "Enter Ingredients (separate by comma(,))";
    ingredients.setAttribute("id", "ingredients");
    instructions.placeholder = "Enter Instructions";
    instructions.setAttribute("id", "instructions");
    div.append(
      title,
      image,
      shortDesc,
      category,
      ingredients,
      instructions,
      add
    );
    container.append(div);
  }
});
