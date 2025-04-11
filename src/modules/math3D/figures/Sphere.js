import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";


class Sphere extends Figure {
constructor(count = 20, R = 15) {
super();
    const points = [];
    const edges = [];
    const polygons = [];
   
    const dt = Math.PI * 2 / count;
    for (let i = 0; i <= Math.PI; i += dt) {
        for (let j = 0; j < Math.PI * 2; j += dt) {
            points.push(new Point(
                R * Math.cos(j) * Math.sin(i),
                R * Math.cos(i),
                R * Math.sin(j) * Math.sin(i),
            ));
        }
    }

    for (let i = 0; i < points.length; i++) {
        if (i + 1 < points.length && (i + 1) % count !== 0) {
            edges.push(new Edge(
                i,
                i + 1
            ));
        } else if ((i + 1) % count === 0) {
            edges.push(new Edge(
                i,
                i + 1 - count
            ));
        }
        if (i < points.length - count) {
            edges.push(new Edge(
                i,
                i + count
            ));
        }
    }
    for (let i = 0; i < points.length; i++) {
        if (i + 1 + count < points.length && (i + 1) % count !== 0) {
            polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
        } else if (i + count < points.length && (i + 1) % count === 0) {
            polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
        }
    }


    return new Figure(points, edges,polygons);

}
}

export default Sphere;