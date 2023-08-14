import { authen, crud, auth } from '/firebase.js'
import {  onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
const loggout = document.querySelectorAll("#logged-out")
const loggin = document.querySelectorAll("#logged-in")
const forme = document.getElementsByClassName('add-post')
const title = document.querySelector('title')
const setupUI = (user)=> {
  if(user){
    loggin.forEach(item =>item.style.display= 'block')
    loggout.forEach(item =>item.style.display='none')
  }else{
    loggin.forEach(item =>item.style.display='none')
    loggout.forEach(item =>item.style.display='block')
  }
}
    onAuthStateChanged(auth, (user) => {
      if (user) {
        crud.onGetTasks((querySnapshot) => {
          add.innerHTML = "";
      
          querySnapshot.forEach((doc) => {
            const card = doc.data();
            //rendu des données
            forme.classList.remove('d-none')
            title.classList.add('d-none')
            add.innerHTML += `
            <div class="card card-body mt-2 border-primary">
        <h3 class="card-title card-title">nice</h3>
          <p>${card.message}</p>
          <div>
            <button class="btn btn-primary delete" data-id="${doc.id}">
               Delete
            </button>
            <button class="btn btn-secondary edit" data-id="${doc.id}">
              Edit
            </button>
          </div>
        </div>`;
          });
        console.log('user logged in : ', user)
        setupUI(user)
        })
      } else {
        setupUI(user)
        console.log('user logged out')
        add.innerHTML=""
      }
    })
const logout = document.querySelector("#logout")

logout.addEventListener("click", (()=>{
    authen.logOut()
}))

  //Variables Global

  let message = document.getElementById('message')
  let add = document.querySelector('#card')
  let submit = document.querySelector('.arret')
  let form = document.querySelector(".add-post")

  
  
  //désactivation du status de mise a jour
  let editStatus = false;
  let id = "";
  //ecoutons l'evenement pour que tout soit chargé avant d'être afficher
  window.addEventListener("DOMContentLoaded", async (e) => {
  
    //écoutons tous les documents de la collection

      // FONCTION POUR SUPPRIMER
      //selectionnons tout les bouttons
      const btnsDelete = add.querySelectorAll(".delete");
      //pour chaque bouttons...
      btnsDelete.forEach((btn) =>
        //écoutons l'evenement
        btn.addEventListener("click", async ({ target: { dataset } }) => {
          try {
            await crud.deleteTask(dataset.id);
          } catch (error) {
            console.log(error);
          }
          
         
        })
      );
  
      // FONCTION POUR METTRE A JOUR
      //selectionnons tout les bouttons
      const btnsEdit = add.querySelectorAll(".edit");
      //pour chaque bouttons...
      btnsEdit.forEach((btn) => {
        //écoutons l'evenement
        btn.addEventListener("click", async (e) => {
          //éxécutons les intructions
          try {
            const doc = await crud.getTask(e.target.dataset.id);
            const user = doc.data();
            message.value = user.message;
  
            editStatus = true;
            id = doc.id;
            submit.innerText = "Update";
          } catch (error) {
            console.log(error);
          }
        });
      });
    });
  
  // FONCTION POUR AJOUTER
  //écoutons l'evenement...
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
  
  
    const messagel = message;
  //éxécutons les intructions
    try {
      if (!editStatus) {
   
    if( messagel.value===""){
      alert("veuillez entrer des données")
    }else{ 
        await crud.addTask( messagel.value);
    }
      } else {
        await crud.updateTask(id, {
          message: messagel.value,
        });
        editStatus = false;
        id = "";
        submit.innerText = "Save";
      }
  
      form.reset();
      message.focus();
    } catch (error) {
      console.log(error);
    }
  });
