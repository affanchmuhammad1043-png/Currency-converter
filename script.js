const Base_URL="https://v6.exchangerate-api.com/v6/8ab3ea86d2b5d4d567730025/latest/USD"

const dropdown=document.querySelectorAll(".dropdown select")
const btn=document.querySelector("form button")
const fromcurr=document.querySelector(".from select")
const tocurr=document.querySelector(".to select")
const msg = document.querySelector(".msg");


for(let select of dropdown){
    for (code in countryList){
    let newOption=document.createElement("option")
    newOption.innerText=code
    newOption.value=code
    if(select.name==="from" && code==="USD"){
        newOption.selected="selected"
    } else if(select.name==="to" && code==="PKR"){
        newOption.selected="selected"
    }
    select.append(newOption)
   }
    select.addEventListener("change", (evt) => {
      updateflag(evt.target)
    }
    )
}

const updateflag=(element) => {
  let code=element.value
  let countrycode=countryList[code]
  let newrsrc= `https://flagsapi.com/${countrycode}/flat/64.png`
 let img= element.parentElement.querySelector("img")
 img.src=newrsrc
}

btn.addEventListener("click",async (evt) => {
  evt.preventDefault()
  let amount=document.querySelector(".amount input")
  let amtval=amount.value
  if(amtval ===""||amtval < 1){
    amtval=1
    amount.value="1"
  }
// console.log(fromcurr.value,tocurr.value)
 const URL=Base_URL
try {
    let response = await fetch(URL);
    let data = await response.json();

    let fromRate = data.conversion_rates[fromcurr.value];
    let toRate = data.conversion_rates[tocurr.value];

    let finalAmount = (amtval * toRate) / fromRate;

    msg.innerText = `${amtval} ${fromcurr.value} = ${finalAmount.toFixed(2)} ${tocurr.value} `;
  } catch (error) {
    msg.innerText = "Error fetching data ";
    console.error(error);
  }
});



