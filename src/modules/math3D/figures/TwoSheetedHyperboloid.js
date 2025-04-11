import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";


class TwoSheetedHyperboloid extends Figure {
    constructor(count = 10, a = 1, b = 1, c = 1) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];
        const dt = 2 * Math.PI / count;
        //points
        for(let i = 0; i <= Math.PI; i+= dt){
            for(let j = 0; j < 2 * Math.PI; j+= dt){
                const x = a * Math.sinh(i) * Math.cos(j);
                const y = c * Math.cosh(i);
                const z = b * Math.cosh(i) * Math.sin(j);
                points.push(new Point(x, y, z));
            }
        }
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                points.push(new Point(-a * Math.sinh(i) * Math.cos(j), -c * Math.cosh(i), -b * Math.cosh(i) * Math.sin(j)));
            }
        }
        //edges
        for (let i = 0; i < points.length / 2; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
            }
            if (i < points.length / 2 - count) {
                edges.push(new Edge(i, i + count));
            }
        }
        for (let i = points.length / 2 + count; i < points.length; i++) {
            if (i + 1 < points.length && (i + 1) % count !== 0) {
                edges.push(new Edge(i, i + 1));
            } else if ((i + 1) % count === 0) {
                edges.push(new Edge(i, i + 1 - count));
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
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
            }
        }
        for (let i = points.length / 2; i < points.length; i++) {
            if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
            } else if (i + count < points.length && (i + 1) % count === 0) {
                polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
            }
        }
        
        return new Figure(points,edges,polygons)
    }
}

export default TwoSheetedHyperboloid;