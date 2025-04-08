import React from 'react';
import Calculator from '../../modules/calculator/calculators/Calculator';

class Calc extends React.Component {
    constructor(options) {
        super(options);
    }
    operandHandler(event) {
        const A = document.getElementById('A').value;
        const B = document.getElementById('B').value;
        const calcul = new Calculator();
        const C = calcul[event](calcul.getEntity(A), calcul.getEntity(B));
        document.getElementById('C').value = C.toString();
    }
    addEventListeners() {
        const buttons = document.querySelectorAll('.operand');
        buttons.forEach(button => button.addEventListener('click', this.operandHandler));
    }
    render() {
        return (
            <div className="calc-container">
                <textarea id='A' placeholder="Первое слагаемое"></textarea>
                <textarea id='B' placeholder="Второе слагаемое"></textarea>
                <div className="buttons">
                    <button className="operand" data-operand="add"
                        onClick={() => this.operandHandler('add')}>+</button>

                    <button className="operand" data-operand="sub"
                    onClick={() => this.operandHandler('sub')}>-</button>

                    <button className="operand" data-operand="mult"
                    onClick={() => this.operandHandler('mult')}>×</button>

                    <button className="operand" data-operand="div"
                    onClick={() => this.operandHandler('div')}>÷</button>

                    <button className="operand" data-operand="pow"
                    onClick={() => this.operandHandler('pow')}>^</button>

                    <button className="operand" data-operand="prod"
                    onClick={() => this.operandHandler('prod')}>Prod</button>

                    <button className="operand" data-operand="zero"
                    onClick={() => this.operandHandler('zero')}>Zero</button>

                    <button className="operand" data-operand="one"
                    onClick={() => this.operandHandler('one')}>One</button>

                    <button className="operand" data-operand="getValue"
                    onClick={() => this.operandHandler('getValue')}>getValue</button>
                </div>
                <textarea id="C" placeholder="Результат"></textarea>
            </div>
        );
    }
}

export default Calc;

