let ops=["+","-","*"]
let btns=document.querySelector('.btns')
let disp=document.querySelector('.disp');
let num=0,j=0;
for(let i=1;i<=13;i++){
    let div=document.createElement('div');
    div.classList.add('cell');
    div.style.width=`calc(100%/4)`
    div.style.height=`calc(100%/4)`
    if(i%4==0){
        div.classList.add('op')
        div.textContent=ops[j++];
    }
    else{
    div.classList.add('num')
    div.textContent=num++;
    }
    btns.appendChild(div);
}
function createbtn(c1,str){
    let div=document.createElement('div')
    div.classList.add('cell')
    div.classList.add(c1);
    div.textContent=str;
    div.style.width=`calc(100%/4)`;
div.style.height=`calc(100%/4)`;
btns.appendChild(div);
}
createbtn('clear',"AC");
createbtn('op','=');
createbtn('op','/');
function Calc(){
    this.methods={
        "+":(a,b)=>a+b,
        "-":(a,b)=>a-b,
        "*":(a,b)=>a*b,
        "/":(a,b)=>a/b,
    }
    this.solve=function(str){
        let split=str.split(' ');
        a=+split[0];
        op=split[1];
        b=+split[2];
        return this.methods[op](a,b);
    }
}
let calc=new Calc();
let btn=document.querySelectorAll('.cell');
btn.forEach((bt)=>{
    bt.addEventListener('click',()=>{
        let str;
        if(bt.classList.contains('op')) str=disp.textContent+" "+bt.textContent+" ";
        else str=disp.textContent+bt.textContent;
        if(bt.textContent=="=") str=calc.solve(str);
        disp.textContent=str;
    })
})