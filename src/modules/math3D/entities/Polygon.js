class Polygon{
    constructor(points = [], color = "#FFD099"){
        this.points = points;
        this.color = this.hexToRgb(color);
        this.distance = 0;
        this.lumen = 1;
    }

    hexToRgb(hexColor){
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hexColor);
        return result ? {
            r : parseInt(result[1], 16),
            g : parseInt(result[2], 16),
            b : parseInt(result[3], 16)
        } : {r : 0, g : 0, b : 0};
    }

    rgbToHex(r, g, b) {
        return `rgb(${r}, ${g}, ${b})`;
    }

    setColor(color) {
        this.color = this.hexToRgb(color);
    }
        
}

export default Polygon;