const todoInput = document.querySelector('#todo_input');
const todoAddBtn = document.querySelector('#todo_add_btn');
const todoBox = document.querySelector('.todo_box');

let todoListArr = [];

// 투두 삭제
const deleteTodo = (event) => {
   const {target} = event;
   const parentLi = target.parentNode;
   const parentLiId = parentLi.getAttribute('data-id');
  
   parentLi.remove();

   todoListArr = todoListArr.filter((todo) => todo.id !== Number(parentLiId));
   localStorage.setItem('TODO', JSON.stringify(todoListArr));
}

const checkTodo = (event) => {
  const {target} = event;

  const parentLi = target.parentNode;
  console.log(parentLi.getAttribute('data-id'));
  todoListArr.forEach((todo) => {
    if(todo.id === Number(parentLi.getAttribute('data-id'))) {
      if(!todo.checked) {
        target.style.color = '#ccc';
        target.style.textDecoration = 'line-through';
        return todo.checked = true
      } else {
        target.style.color = '';
        target.style.textDecoration = '';
        return todo.checked = false
      }
    }
  }); 
  localStorage.setItem("TODO", JSON.stringify(todoListArr));
}

// 투두 리스트 생성
const createTodo = (event) => {
  event.preventDefault();

  if(todoInput.value === '') return alert('할 일을 입력해주세요.');

  const text = todoInput.value;
  const id =  todoListArr.length + 1;

  const li = document.createElement('li');
  li.dataset.id = id;
  const p = document.createElement('p');
  p.innerHTML = text;
  const button = document.createElement('button');
  button.className = 'sub_btn';
  button.innerHTML = '삭제';

   li.appendChild(p);
   li.appendChild(button);
   todoBox.appendChild(li);

  // db저장
  const newTodoObject = {
    text,
    id,
    checked: false
  }
  todoListArr.push(newTodoObject);
  localStorage.setItem('TODO', JSON.stringify(todoListArr));

  button.addEventListener('click', deleteTodo)
  p.addEventListener('click', checkTodo)

  todoInput.value = '';
}


// 초기 로컬스토리지 데이터 셋
const initialData = () => {
  const data = localStorage.getItem('TODO');

  if(!data) return;

  const dataParse = JSON.parse(data);

  dataParse.forEach((todo) => {
    todoListArr.push(todo);
    const {text, checked, id} = todo;

    const li = document.createElement('li');
    li.dataset.id = id;
    const p = document.createElement('p');
    p.innerHTML = text;
    const button = document.createElement('button');
    button.className = 'sub_btn';
    button.innerHTML = '삭제';

    checked ? p.style.textDecoration = 'line-through' : null
    checked ? p.style.color = '#ccc' : null

    li.appendChild(p);
    li.appendChild(button);
    todoBox.appendChild(li);

    button.addEventListener('click', deleteTodo)
    p.addEventListener('click', checkTodo)
  });
};

const setting = () => {
  initialData();
  todoAddBtn.addEventListener('click', createTodo);
};

setting();