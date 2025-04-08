import React from "react";
import RPGmod from "../../modules/rpg/RPGmod";

class RPG extends React.Component {
    constructor(options) {
        super(options);
    }

    componentDidMount() {
        (new RPGmod()).RPGrender();
    }
    
    render() {
        return (
            <div className="rpg-container">
                <h1 className="rpg-title" id="title"></h1>
                <h1 className="hp" id="hp" ></h1>
                <h1 className="money" id="money"></h1>
                <img className="roomImage" id="roomImage" height="400px" />
                <p className="description" id="description"></p>
                <div className="exits" id="exits"></div>
            </div>
        );
    }
}

export default RPG;