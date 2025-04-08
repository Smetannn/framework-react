import React from 'react';

class Menu extends React.Component {
    render() {
        return(
            <div className='menu'>

                <button className='esse-button'
                    onClick={() => this.props.onSelect('esse')}
                >Эссе
                </button>

                

                <button className='calc-button'
                    onClick={() => this.props.onSelect('calc')}
                >Калькулятор
                </button>

                <button className='rpg-button'
                    onClick={() => this.props.onSelect('rpg')}
                >RPG
                </button>

                

            </div>
        );
    }
}

export default Menu;