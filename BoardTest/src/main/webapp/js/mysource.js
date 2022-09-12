// mysource.js

document.addEventListener('DOMContentLoaded', function(){
	//dom 요소에 이벤트 등록하는 메서드 : DOM컨텐츠가 다 다운받아진 후에 함수 실행


let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', insertBoard);

 let allbox = document.getElementById('allchecked')
    allbox.addEventListener('click',()=>{
      console.log(allbox)
            
       
   
});



 //서버상에 있는 html, jsp, 서블릿.
 let xhtp = new XMLHttpRequest();
 xhtp.open('get','./board')
 xhtp.send(); // 서버요청.

 xhtp.onload = function(){
	 let data = JSON.parse(xhtp.response); // 객체로 변경
	 console.log(data);

	 let list = document.getElementById('list');
	 // 서버의 json 파일 -> JSON.parse() -> 페이지 출력
	 data.forEach(data =>{   		
		 let tr = makeTr(data);
	 list.append(tr); // tbody에 자식요소로 tr 붙이라는 뜻
	 })
 }

// 1. 리스트 그려주기 (makeTr)
// 2. 체크버튼 allcheck


let list = document.getElementById("list");// list = tbdoy

function allchecked(){
    // true/ false 값은 this의 checked 값을 할당
    let chks = document.querySelectorAll('tbody input[type="checkbox"]');
    chks.forEach(check => {
      check.checked = this.checked; //prop, this = allcheck
    })
}


function makeTr(data){
	let tr = document.createElement("tr");

// td 총 7개 (checkBox, bno, title, cotent, writer, creationDate, delBtn)

	// checkBox
	let td1 = document.createElement("td"); 
	let checkbox = document.createElement("input");
	checkbox.setAttribute('type','checkbox')
	checkbox.setAttribute('id','allchecked')
	checkbox.checked = true // default = checked 상태
    
    td1.append(checkbox);

	checkbox.addEventListener('change',()=>{
		let checkboxs= document.getElementsByIdName('allchecked')
		console.log(document.getElementById('allchecked').checked)

	   document.getElementById('allchecked').checked
			   = [...checkboxs].every(value=>value.checked)
	});



	//bno
	let td2 = document.createElement("td"); 
	let text2 = document.createTextNode(data.bno);
	td2.append(text2);

	//title
	let td3 = document.createElement("td"); 
	let text3 = document.createTextNode(data.title);
	td3.append(text3);

	//cotent
	let td4 = document.createElement("td"); 
	let text4 = document.createTextNode(data.content);
	td4.append(text4);

	//writer
	let td5 = document.createElement("td"); 
	let text5 = document.createTextNode(data.writer);
	td5.append(text5);

	//creationDate
	let td6 = document.createElement("td"); 
	let text6 = document.createTextNode(data.creationDate);
	td6.append(text6);

	//delBtn
	let td7 = document.createElement("td"); 
	let btn2 = document.createElement("delBtn");
	
	btn2.addEventListener('click', deleteBoard);

	let text7 = document.createTextNode('삭제');
	btn2.append(text7);
	td7.append(btn2);

	
	tr.append(td1, td2, td3, td4, td5, td6, td7);

	return tr;
}


// 3. 등록 버튼 이벤트 적용 (addBtn)
// 3-1. 등록시 	번호,제목,내용,작성자 초기화 (비워주기)
function insertBoard(){
	let bno = document.getElementById("bno").value;
	let title = document.getElementById("title").value;
	let content = document.getElementById("content").value;
	let writer = document.getElementById("writer").value;
	let date = document.getElementById("creationDate").value;
	
	let param = 'bno='+bno+'&title='+title+'&content='+content+'&writer='+writer+'&job=insert';

	fetch('./board',{
		method: 'POST',
		headers: { 'Content-type': 'application/x-www-form-urlencoded' },
		body: param
	})	

	.then (result => result.text())
	.then (result => {
		console.log(result);
		if(result == 'success'){

			const mValues =
			{"bno" : bno,
			  "title":title,
			  "content":content,
			  "writer":writer,
			  "creationDate": creationDate}

			let tr = makeTr(mValues);
			document.getElementById('list').appendChild(tr);
			
	
		}else if(result == 'fail'){
			alert('처리 중 에러발생')			
		}			
	})
	.catch(error => console.error(error));

	document.getElementById("bno").value++ // 하나씩 더해져서 게시글 번호 + 
    document.getElementById("title").value =''
    document.getElementById("content").value =''
    document.getElementById("writer").value =''

    document.getElementById("bno").focus();
} 



// 4. 삭제 버튼 이벤트 적용(deleteBoard)
function deleteBoard(){
	let delTr = this.parenteElement.parenteElement
	console.log(delTr)
	let bno = document.getElementById('bno');
	let param = 'bno =' + bno + '&job=delete';
	
	//  <tr><td><button id="delBtn">삭제</button></td></tr>
	// button의 부모-> td, td의 부모 -> tr 


	fetch('./board',{
		method: 'POST',
		headers: { 'Content-type': 'application/x-www-form-urlencoded' },
		body: param
	})	

	.then (result => result.text())
	.then (result => {
		console.log(result);
		if(result == 'success'){
			let delBtn = document.getElementById('delBtn');
			delTr.remove();
		}else if(result == 'fail'){
			alert('처리 중 에러발생')			
		}			
	})
	.catch(error => console.error(error));
}