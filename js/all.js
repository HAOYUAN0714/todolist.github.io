const btn = document.querySelector('.btn');
const newJob = document.querySelector('.content-input');
let allJob = JSON.parse(localStorage.getItem('Jobs')) || [];
let List = document.querySelector('.list');
updateList();
btn.addEventListener('click',addJob);
newJob.addEventListener('submit',addJob);
List.addEventListener('click',removeJob);
let checkBox ;


function updateList(){ //更新DOM元素
  let allDOM = '';
  allJob.forEach( (item) => {
    let jobDOM = `<li ><div class="check-space" data-id=${item.id}><i class="fas fa-check checkIcon"></i></div><p>${item.conent}</p></li>`;
    allDOM+=jobDOM;
  });
  List.innerHTML = allDOM ;
}

function addJob(e){
  e.preventDefault();
  let jobConent = newJob.value;
  let timeStamp = Math.floor(Date.now());
  if(newJob.value.trim() === ''){
    alert('輸入框不能留空')
    return
  }
  jobObj = {conent:jobConent,id:timeStamp};
  allJob.push(jobObj);
  localStorage.setItem('Jobs',JSON.stringify(allJob));
  newJob.value = '';
  updateList();

}

function removeJob(e){
  e.preventDefault();
  if(e.target.nodeName != 'DIV'){  // 點擊目標確立在checkbox 上
    return
  }
  e.target.querySelector('.checkIcon').classList.add('showIcon'); // 把原本隱藏的勾勾顯示出來
  let removeIndex = '';
  allJob.forEach((item,key)=>{
    if(e.target.dataset.id == item.id){
      console.log(key);
      removeIndex = key
    }
  })
  allJob.splice(removeIndex,1);
  localStorage.setItem('Jobs',JSON.stringify(allJob));
  setTimeout(()=>{ // 因要顯示勾勾設定延遲後才更新DOM
    updateList();
  },300);
}






