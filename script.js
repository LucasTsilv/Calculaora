const op01Text = document.querySelector("#op01");
const op02Text = document.querySelector("#op02");
const buttons = document.querySelectorAll ("#botao button");


class calculadora {
    constructor (op01Text, op02Text) {
        this.op01Text = op01Text;
        this.op02Text = op02Text;
        this.op02 = "";
    }

// Adicionar digito na tela 

    addDigit(digit) {
        if (digit === "." && this.op02Text.innerText.includes(".")){
            return;
        }

        this.op02 = digit;
        this.updateScreen();
       
    }

    // Processar calculos 

    processOperation(operation) {
        if(this.op02Text.innerText === "" && operation !=="C"){
            if(this.op01Text.innerText !== "") {
                this.changeoperation(operation)
            }
            return;
        }


        // valor atual e anterior

        let operationValue;
        const previous = +this.op01Text.innerText.split(" ") [0];
        const current = +this.op02Text.innerText;

        switch(operation){
            case "+":
            operationValue = previous + current 
            this.updateScreen(operationValue, operation, current, previous)
                break;
                case "-":
            operationValue = previous - current 
            this.updateScreen(operationValue, operation, current, previous)
                break;
                case "/":
            operationValue = previous / current 
            this.updateScreen(operationValue, operation, current, previous)
                break;
                case "*":
                    operationValue = previous * current 
                    this.updateScreen(operationValue, operation, current, previous)
                        break;
                        case "DEL":
                            this.opdel ();
                                break;
                                case "CE":
                            this.opCE ();
                                break;
                                case "C":
                                    this.opC ();
                                        break;
                                        case "=":
                                            this.opigual ();
                                                break;
                    default:
                        return; 
        }
    }

// Mudar digito na tela e fazer que apareça
    updateScreen(
        operationValue = null, 
        operation = null, 
        current = null, 
        previous = null){ 

        if (operationValue === null){
            this.op02Text.innerText += this.op02;
        } else {
            if (previous === 0){
                operationValue = current
            }
            this.op01Text.innerText = `${operationValue} ${operation}`;
            this.op02Text.innerText = "";
        }
        
    }

    changeoperation (operation){
        const mathOperation = ["+","-","*","/"]
        if(!mathOperation.includes(operation)){
            return;

        }

        this.op01Text.innerText= this.op01Text.innerText.slice(0, -1) + operation;

    }
    opdel (){
        this.op02Text.innerText = this.op02Text.innerText.slice(0, -1);
    }

    opCE (){
        this.op02Text.innerText = "";

   }
   opC (){
    this.op02Text.innerText = "";
    this.op01Text.innerText = "";

    
}
opigual (){
 const operation = op01Text.innerText.split(" ") [1]
this.processOperation(operation)
}




}

const calc = new calculadora (op01Text, op02Text);

buttons.forEach((btn) => {
    btn.addEventListener ("click", (e) => {
    const value = e.target.innerText;

    if (+value >=0 || value ===".") {
        calc.addDigit(value);
    }
    else {
        calc.processOperation(value);
        

    }
 });
});

