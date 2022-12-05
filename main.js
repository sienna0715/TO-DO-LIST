// 현재 날짜가 적용되게 만들기
// 날짜가 바뀌면 내용이 초기화 되기

const today = document.querySelector('.today')
const date = document.querySelector('.date');
const month = document.querySelector('.month');
const year = document.querySelector('.year');
const day = document.querySelector('.day');

// 일
const thisDate = new Date().getDate();
// console.log(date)
date.append(thisDate);

// 월
const monthName = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']
const thisMonth = monthName[new Date().getMonth()];
// console.log(thisMonth)
month.append(thisMonth)

// 년
const thisYear = new Date().getFullYear();
// console.log(thisYear)
year.append(thisYear)

// 요일
const weekName = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const week = weekName[new Date().getDay()];
// console.log(week)
day.append(week)

// input에 적은 내용이 +(.add)버튼을 누르면 추가되게 만들기
// 리스트에 내용이 저장되기
// 체크 박스를 누르면 글씨에 선이 그어지게 만들기
// 삭제기능 구현

const inputBox = document.querySelector('#todo_input');  // input 입력창
// console.log(inputBox); -> null
const addBtn = document.querySelector('.todo_add') // 버튼
const todoList = document.querySelector('.list_box') // 텍스트 박스 영역
const checkList = document.querySelector('.check_box') // 체크 박스 영역
const allTodo = document.querySelector('.todo_list') // 전체 리스트 박스

// 새로고침해도 리스트 마음 속에 저! 장! 찡긋
let todoArr = [];

const storageItems = JSON.parse(localStorage.getItem("todoItems"));
console.log(storageItems)

if (storageItems) {
  storageItems.forEach((e) => {
    console.log(e);
    todoArr.push(e); // 새로운 요소 계속 넣어줘서 새로고침을 계속해도 유지
    const newList = document.createElement('li');
    newList.textContent = e;
    todoList.append(newList);

    const newCheck = document.createElement('input');
    newCheck.type = "checkbox";
    checkList.append(newCheck);
  });
}

// 날짜가 바뀌면 로컬스토리지 내용까지 모두 클리어
date.addEventListener('change', (event) => {
  localStorage.clear(todoArr)
})

// 버튼을 클릭하는 이벤트가 발생이 되면 input의 내용이 list에 저장
addBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const check = document.createElement('input');
  check.type = "checkbox";
  const list = document.createElement('li'); // li태그 만들기

  if (!inputBox.value) {
    alert('내용을 입력해 주세요.')
  }
  else {
    list.textContent = inputBox.value;
    todoList.append(list);
    checkList.append(check);
    inputBox.value = '';
  }
  
  todoArr.push(list.textContent);
  localStorage.setItem("todoItems", JSON.stringify(todoArr))
  
  
  check.addEventListener('click', (event) => {
    list.style.textDecoration = 'line-through';
  })
  list.addEventListener('dblclick', () => {
    todoList.removeChild(list);
    checkList.removeChild(check);
  })
})

