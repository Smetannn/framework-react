import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";
class Conus extends Figure {
    constructor(count = 5, a = 1, b = 1, c = 1) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];

        const dt = Math.PI / count;
        const numPoints = Math.floor(2 * Math.PI / dt) + 1;

        for (let i = -Math.PI; i <= Math.PI; i += dt) {
            for (let j = 0; j <= 2 * Math.PI; j += dt) {
                const x = a * i * Math.cos(j);
                const y = b * i * Math.sin(j);
                const z = c * i;
                points.push(new Point(x, y, z));
            }
        }

        //edges
        for (let i = 0; i < points.length; i++) {
            if ((i + 1) % numPoints !== 0) {
                edges.push(new Edge(i, i + 1));
            } else {
                edges.push(new Edge(i, i - numPoints + 1));
            }
            if (i + numPoints < points.length) {
                edges.push(new Edge(i, i + numPoints));
            }
        }
        
        //polygons
        for (let i = 0; i < points.length - numPoints; i++) {
            if ((i + 1) % numPoints !== 0) {
                polygons.push(new Polygon([i, i + 1, i + 1 + numPoints, i + numPoints]));
            } else {
                polygons.push(new Polygon([i, i + 1 - numPoints, i + 1, i + numPoints]));
            }
        }

    return new Figure(points,edges,polygons);
    }
}

export default Conus;