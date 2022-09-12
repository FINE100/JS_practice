// html, css 작업
//1. 박스 2개 만들기
//2. 드랍다운 리스트 만들기 
//2. 환율 정보 들고오기 
//3. 드랍다운 리스트에서 아이템 선택하면 아이템이 바뀜
//4. 금액을 입력하면 환전이 된다. 
//5. 드랍다운 리스트에서 아이템을 선택하면 다시 그 단위기준으로 환전이 됨 


//7. 반대로 하단 박스에서 숫자를 바꿔도 위의 박스에 환율이 적용 된다.
//6. 숫자 -> 한국어 읽는 법 
 

const currencyRatio = {
    USD : {
        KRW : 1362.51,
        USD : 1,
        VND : 23462.50,
        unit : "달러",
        img: "https://cdn-icons-png.flaticon.com/512/555/555526.png",
    },
    KRW : {
        KRW : 1,
        USD : 0.00073,
        VND : 17.06,
        unit : "원",
        img: "https://cdn.countryflags.com/thumbs/south-korea/flag-400.png",
    },
    VND : {
        KRW : 0.059,
        USD : 0.000043,
        VND : 1,
        unit : "동",
        img: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Flag_of_Vietnam.svg/2560px-Flag_of_Vietnam.svg.png"
    }
}

let unitWords= ["", "만", "억", "조", "경"]
let splitUnit = 10000;
let fromCurrency = 'USD'
let toCurrency = 'USD'

let toButton = document.getElementById("to-button");
let fromButton = document.getElementById("from-button");

// 객체 내 요소 불러오기
// 1. console.log(currencyRatio.VND.unit);
// 2. console.log(currencyRatio['VND']['unit'])
// 3. console.log(currencyRatio["VND"].unit) >> 섞어서 써도 OK



// // id : #, class : .
// document.querySelectorAll("#from-currency-list li")
// .forEach((menu)=> menu.addEventListener("click", function(){
//     //1. 버튼 가져온다
//     //2. 버튼 값을 바꾼다
//     //fromButton.textContent= this.textContent;
    
//     //3. 선택된 currency값을 변수에 저장해준다 
//     //fromCurrency = this.textContent;
//     fromCurrency = this.id;
//     fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}">${fromCurrency}`;
//     console.log("fromCurrency 는? " + fromCurrency)
//     convert("from");
// }));

// document.querySelectorAll("#to-currency-list li")
// .forEach((menu)=> menu.addEventListener("click",function(){
//     //1. 버튼 가져온다
//     //2. 버튼 값을 바꾼다
//     //toButton.textContent = this.textContent;
 
//     //3. 선택된 currency값을 변수에 저장해준다 
//     //toCurrency = this.textContent;
//     toCurrency = this.id;
//     console.log("toCurrency 는? "+ toCurrency)
//     toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}">${toCurrency}`;
//     convert("from");
// }));

document.querySelectorAll("#from-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
      fromCurrency = this.id;
      fromButton.innerHTML = `<img class="flag-img"src="${currencyRatio[fromCurrency].img}"/>${fromCurrency}`;
      convert("from");
    });
  });
  
  document.querySelectorAll("#to-currency-list li").forEach(function (item) {
    item.addEventListener("click", function () {
      toCurrency = this.id;
      toButton.innerHTML = `<img class="flag-img"src="${currencyRatio[toCurrency].img}"/>${toCurrency}`;
      convert("from");
    });
  });



  function convert(type) {
    console.log("here");
    let amount = 0;
    if (type == "from") {
      //입력갑 받기
      amount = document.getElementById("fromAmount").value;
      // 환전하기
      let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency];
      // 환전한값 보여주기
      document.getElementById("toAmount").value = convertedAmount;
      //환전한값 한국어로
      renderKoreanNumber(amount, convertedAmount);
    } else {
      amount = document.getElementById("toAmount").value;
      let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency];
      document.getElementById("fromAmount").value = convertedAmount;
      renderKoreanNumber(convertedAmount, amount);
    }
  }
  function renderKoreanNumber(from, to) {
    document.getElementById("fromNumToKorea").textContent =
      readNum(from) + currencyRatio[fromCurrency].unit;
    document.getElementById("toNumToKorea").textContent =
      readNum(to) + currencyRatio[toCurrency].unit;
  }
  function readNum(num) {
    let resultString = "";
    let resultArray = [];
    for (let i = 0; i < unitWords.length; i++) {
      let unitResult =
        (num % Math.pow(splitUnit, i + 1)) / Math.pow(splitUnit, i);
      unitResult = Math.floor(unitResult);
      if (unitResult > 0) {
        resultArray[i] = unitResult;
      }
    }
    for (let i = 0; i < resultArray.length; i++) {
      if (!resultArray[i]) continue;
      resultString = String(resultArray[i]) + unitWords[i] + resultString;
    }
    return resultString;
  }




// //1. 키를 입력하는 순간
// //2. 환전이 돼서
// //3. 환전된 값이 보인다. 

// // 기능을 정의해서 만드는 것 = function, 내가 만들어서 가져다 쓸수 있는 도구
// function convert(type){
//     console.log("here")
//    //1. 환전 
//    // 얼마를 환전? (= 유저가 입력한 값, input 내용) 
//    // 가지고 있는 돈이 뭔지, 바꾸고자 하는 돈이 뭔지, 
//    // 돈 * 환율 = 환전금액 


//    // 1. 드랍다운 리스트에 값이 바뀔때마다
//     // 2. 환전을 다시 한다. 

//    //value를 쓰면 input 태그 안의 내용을 가져올 수 있다.
//    if(type == "from"){
//    let amount = document.getElementById("fromAmount").value
//    let convertedAmount = amount * currencyRatio[fromCurrency][toCurrency]
//    console.log("환전결과",convertedAmount)

//    document.getElementById("toAmount").value = convertedAmount;
// // 환전한 값 한국어로   
//     renderKoreaNumber(amount, convertedAmount)

// } else{
//     amount = document.getElementById("toAmount").value
//     let convertedAmount = amount * currencyRatio[toCurrency][fromCurrency]
//     document.getElementById("fromAmount").value = convertedAmount;
//     renderKoreaNumber(convertedAmount, amount)
// }
   


// }

// function renderKoreaNumber(from, to){
//     document.getElementById("fromAmount").textContent
//     readNum(from) + currencyRatio[fromCurrency].unit
//     document.getElementById("toAmount").textContent
//     readNum(to) + currencyRatio[toCurrency].unit
    
// }

// function readNum(num){
//     let resultString = "";
//     let resultAry = []; 
//     for(let i =0; i<unitWord.length; i++){
//         let unitResult = 
//         (num%Math.pow(splitUnit, i+1)) / Math.pow(splitUnit,1);
//     unitResult = Math.floor(unitResult);

//     if(unitResult>0){
//         resultAry[i] = unitResult;
//         }
//     }
//     for(let i =0 ; i<resultAry.length; i++){
//         if(!resultAry[i]) continue;
//         resultString = String(resultAry[i]) + unitWord[i] + resultString;
//     }
//         return resultString;        
//     }


