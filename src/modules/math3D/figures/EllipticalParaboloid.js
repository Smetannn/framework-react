import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";


class EllipticalParaboloid extends Figure {
    constructor(count = 10, a = 7, b = 4) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];

        //Генерация точек
        const dt = Math.PI * 2 / count;
        for (let i = 0; i <= Math.PI; i += dt) {
            for (let j = 0; j < 2 * Math.PI; j += dt) {
                const x = a * i * Math.cos(j);
                const y = i * i;
                const z = b * i * Math.sin(j);
                points.push(new Point(x, y, z));
            }
            //Генерация граней
            for (let i = 0; i < points.length; i++) {
                if (i + 1 < points.length && (i + 1) % count !== 0) {
                    edges.push(new Edge(i, i + 1));
                } else if ((i + 1) % count === 0) {
                    edges.push(new Edge(i, i + 1 - count));
                }
                if (i < points.length - count) {
                    edges.push(new Edge(i, i + count));
                }
            }
            //Генерация полигонов
            for (let i = 0; i < points.length - count; i++) {
                if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
                } else if (i + count < points.length && (i + 1) % count === 0) {
                    polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]));
                }
            }

        }
        return new Figure(points, edges, polygons);
    }
}

export default EllipticalParaboloid;