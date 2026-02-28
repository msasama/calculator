let ops=["+","-","*"]
let btns=document.querySelector('.btns')
let disp=document.querySelector('.disp');
let num=0,j=0;
let op_present=false;
function createbtn(c1,str){
    let div=document.createElement('div')
    div.classList.add('cell')
    div.classList.add(c1);
    div.textContent=str;
    div.style.width=`calc(100%/4)`;
    div.style.height=`calc(100%/4)`;
    btns.appendChild(div);
}
for(let i=1;i<=13;i++){
    if(i%4==0) createbtn('op',ops[j++]);
    else createbtn('num',num++);
}
createbtn('clear',"AC");
createbtn('eq','=');
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
        if(bt.classList.contains('clear')){
             str="";
             op_present=false;
        }
        else if(bt.classList.contains('op')){
            if(op_present==true) disp.textContent=calc.solve(disp.textContent);
            str=disp.textContent+" "+bt.textContent+" ";
            op_present=true;
        }
        else {//means that contains num . 
            str=disp.textContent+bt.textContent;
        }
        if(bt.textContent=="="){
            if(op_present){
             str=calc.solve(disp.textContent);
             op_present=false;
            }
            else str=disp.textContent;
        }
        disp.textContent=str;
    })
})

