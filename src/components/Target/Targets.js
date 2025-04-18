class Targets extends Component {

    
    targetShotHandler() {
        const count = document.querySelector('.target-input').value - 0;
        if (count > 0) {
            const result = (new Shot()).shotToTarget(count);    
            document.querySelector('.target-result').innerHTML=`Результат: ${result}`;
        }
    }
    

    addEventListeners() {
        document.querySelector('.target-shot')
            .addEventListener('click', () => this.targetShotHandler());
    }
}