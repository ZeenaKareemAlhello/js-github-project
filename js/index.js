const form = document.getElementById ('github-form');
const input = document.getElementById ('search');
const submit = document.getElementsByTagName('input')[1];
const ul = document.getElementById('user-list');
const ul_repos = document.getElementById('repos-list');

submit.addEventListener('click',function(e){
    e.preventDefault();
    ul.innerHTML='';
    ul_repos.innerHTML=''
    fetch(`https://api.github.com/search/users?q=${input.value}`)
    .then(response => {
        return response.json()
    })
    .then(data => addUserNames(data))
    
    .catch(error =>console.log('error'))
})


function addUserNames(usersObj){

let length = usersObj.items.length;
//console.log('first user',usersObj.items[0].login);
    //console.log(usersObj)
    for(let i=0;i<length;i++){
        let repos = usersObj.items[i].repos_url;
        

        let login = usersObj.items[i].login;
        let avatarURL = usersObj.items[i].avatar_url;
        let account = usersObj.items[i].html_url 
        displayUser(login,avatarURL,repos, account,i);
      //  console.log(usersObj.items[i].login)
      
     }
}

function displayUser(userName,imageProfile,repos, account,i){

    const li = document.createElement('li');
    li.innerHTML = `<h3>${userName}</h3>
                   <img src=${imageProfile}>
                   <a href=${account}>${userName}</a>
                   <input type="button" class="buttons" value="show repos " onclick="fetch_repos">
                   `
    ul.appendChild(li);
console.log(repos)
     button_listener=li.children[3];
     button_listener.addEventListener("click",function(){
        
           fetch_repos(li.firstChild,i)
     })
    }
    let url;
function fetch_repos(i){
  //console.log(i.parentElement.firstChild.textContent)
  
 let user_name=`${i.parentElement.firstChild.textContent}`
  url=`https://api.github.com/users/${user_name}/repos`
//console.log(url)

  fetch(url)
     .then(response => {
          return response.json()
    })
    .then(data => {
        show_repos(data)
    })
     .catch(error=> console.log(error))   

}


function show_repos(data){
  ul_repos.innerHTML=''
    for(let i=0;i<data.length;i++){
    const li = document.createElement('li');
    li.innerHTML = `<h3>${data[i].name}</h3>`
    ul_repos.appendChild(li);
    } 
      
}