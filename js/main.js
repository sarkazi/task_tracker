


const formTask = document.querySelector('.form-control');
const btnPushTask = document.querySelector('.btn');
const tasksSet = document.querySelector('#tasksList');
const task = document.querySelector('.task-item');
let tasks = [];

if (localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'));
   tasks.forEach((task) => renderTask(task));
}

checkEmptyList();

btnPushTask.addEventListener('click', addTask);

tasksSet.addEventListener('click', deleteDoneTask);

function addTask(event) {
   event.preventDefault();
   let formValue = formTask.value;

   const newTask = {
      id: Date.now(),
      name: formValue,
      done: false
   };







   if (formValue === '') {

   } else {
      renderNewTask(newTask);
   }



   formTask.value = '';

   checkEmptyList();
   saveToLS();

}

function deleteDoneTask(event) {
   event.preventDefault();
   if (event.target.dataset.action === 'delete') {
      let deleteTask = event.target.offsetParent;



      let id = Number(deleteTask.id);



      tasks = tasks.filter((task) => task.id !== id);

      deleteTask.parentNode.removeChild(deleteTask);




   }
   else if (event.target.dataset.action === 'done') {

      let doneElement = event.target.offsetParent.querySelector('span');

      let parentElement = event.target.offsetParent;
      let id = Number(parentElement.id);


      const task = tasks.find(function (task) {
         if (task.id === id) {
            return true;
         }
      })

      task.done = !task.done;







      doneElement.classList.toggle('task-title--done');
   }



   checkEmptyList();
   saveToLS();

}

function checkEmptyList() {

   if (tasks.length === 0) {
      const emptyListElement = `   
      <li id="emptyList" class="list-group-item empty-list">
      <img src="./img/leaf.svg" alt="Empty" width="48" class="mt-3">
      <div class="empty-list__title">Список дел пуст</div>
   </li>
`
      tasksSet.insertAdjacentHTML('afterbegin', emptyListElement);

   }

   if (tasks.length > 0) {

      const emptyListEl = document.querySelector('#emptyList');

      if (emptyListEl) {
         emptyListEl.remove();
      } else {

      }

   }















}

function saveToLS() {
   localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTask(task) {
   const cssClass = task.done === true ? 'task-title task-title--done' : 'task-title';

   tasksSet.insertAdjacentHTML('beforeend', `
   
      <li id ="${task.id}" class="list-group-item d-flex justify-content-between task-item">
                  <span class="${cssClass}">${task.name}</span>
                  <div class="task-item__buttons">
                     <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                     </button>
                     <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                     </button>
                  </div>
               </li>
      
      


               
      
      `)
}

function renderNewTask(newTask) {

   const cssClass = newTask.done === true ? 'task-title task-title--done' : 'task-title';

   tasksSet.insertAdjacentHTML('beforeend', `
   
      <li id ="${newTask.id}" class="list-group-item d-flex justify-content-between task-item">
                  <span class="${cssClass}">${newTask.name}</span>
                  <div class="task-item__buttons">
                     <button type="button" data-action="done" class="btn-action">
                        <img src="./img/tick.svg" alt="Done" width="18" height="18">
                     </button>
                     <button type="button" data-action="delete" class="btn-action">
                        <img src="./img/cross.svg" alt="Done" width="18" height="18">
                     </button>
                  </div>
               </li>
      
      


               
      
      `)

   tasks.push(newTask);
}








