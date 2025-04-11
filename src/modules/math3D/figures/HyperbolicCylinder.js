import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";


class HyperbolicCylinder extends Figure {
    constructor(count = 10){
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        

        //points
        let size = 5;
        for(let i = -count; i < count; i++){
            for(let j = 0; j < count; j++){
                const x = i + size / count;
                const y = x * x / size;
                const z = j - size;
                points.push(new Point(x,y,z));
            }
        }

        size = -5;
        for(let i = -count; i < count; i++){
            for(let j = 0; j < count; j++){
                const x = i - size / count;
                const y = x * x / size;
                const z = j + size;
                points.push(new Point(x,y,z));
            }
        }
        //edges
        for(let i = 0; i < points.length / 2; i++){
            if (i + 1 < points.length / 2 && (i + 1) % count !== 0){
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0){
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length / 2 - count){
                edges.push(new Edge(i, i + count));
            }
        }

        for (let i = points.length / 2; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i - count + 1));
            }
            if (i < points.length - count) {
                edges.push(new Edge(i, i + count));
            }
        }
        //polygons
    for (let i = 0; i < points.length / 2 - count; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]));
        }
    }
    for (let i = Math.floor(points.length / 2); i < points.length - count; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i - count + 1, i + 1, i + count]));
        }
    }
        
        
        return new Figure(points,edges,polygons);


    }
}

export default HyperbolicCylinder;