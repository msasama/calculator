let ops=["+","-","*"]
let btns=document.querySelector('.btns')
let disp=document.querySelector('.disp');
let num=0,j=0;
let op_present=false;
let eq_press=false;
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
        "/":(a,b)=>b==0?"cmon bruhh...":a/b,
    }
    this.solve=function(str){
        let split=str.split(' ');
        a=+split[0];
        op=split[1];
        b=+split[2];
       let result = this.methods[op](a,b);
        
        // If it's the snarky error, just return it without rounding
        if (result === "cmon bruhh...") return result; 
        
        // Round to 3 decimal places so it doesn't overflow
        return Math.round(result * 1000) / 1000;
    }
}

let calc=new Calc();

let btn=document.querySelectorAll('.cell');
btn.forEach((bt)=>{
    bt.addEventListener('click',()=>{
        if (disp.textContent === "cmon bruhh...") {
            disp.textContent = "";
            op_present = false;
            eq_press = false;
        }
        let str;
        if(bt.classList.contains('clear')){
             str="";
             op_present=false;
             eq_press=false;
        }
        else if(bt.classList.contains('op')){
            // Check if the last character is a space (meaning an operator is already there waiting for a number)
            if (disp.textContent.endsWith(" ")) {
                let split = disp.textContent.split(' ');
                str = split[0] + " " + bt.textContent + " "; // Swap the operator
            } else {
                if(op_present==true) disp.textContent=calc.solve(disp.textContent);
                str=disp.textContent+" "+bt.textContent+" ";
                op_present=true;
            }
            eq_press=false;
        }
        else {//means that contains num . 
            if(eq_press==true) disp.textContent="";
            str=disp.textContent+bt.textContent;
            eq_press=false;
        }
       if(bt.textContent=="="){
            let split = disp.textContent.split(' ');
            // Only solve if op_present is true AND the second number isn't blank
            if(op_present && split[2] !== ""){
             str=calc.solve(disp.textContent);
             op_present=false;
             eq_press=true;
            }
            else str=disp.textContent;
        }
        disp.textContent=str;
    })
})

