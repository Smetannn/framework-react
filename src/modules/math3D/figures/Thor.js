import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";


class Thor extends Figure {
    constructor(r = 2, R = 6, count = 15) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];

        for (let m = 0; m <= count; m++) {
            for (let n = 0; n <= count; n++) {
                let phi = 2 * Math.PI * m / count;
                let teta = 2 * Math.PI * n / count;

                points.push(new Point(
                    (R + r * Math.cos(teta)) * Math.cos(phi),
                    r * Math.sin(teta),
                    (R + r * Math.cos(teta)) * Math.sin(phi)
                ));
            }
        }

        for (let m = 0; m < count; m++) {
            for (let n = 0; n < count; n++) {
                const currentIndex = m * (count + 1) + n;
                const nextRow = (m + 1) * (count + 1) + n;

                edges.push(new Edge(currentIndex, currentIndex + 1));

                edges.push(new Edge(currentIndex, nextRow));

                edges.push(new Edge(currentIndex + 1, nextRow));
                edges.push(new Edge(nextRow, nextRow + 1));
            }
        }

        for (let m = 0; m < count; m++) {
            for (let n = 0; n < count; n++) {
                const currentIndex = m * (count + 1) + n;
                const nextRow = (m + 1) * (count + 1) + n;

                polygons.push(new Polygon(
                    [currentIndex, currentIndex + 1, nextRow + 1, nextRow],

                ));
            }
        }

        // Создание фигуры
        this.points = points;
        this.edges = edges;
        this.polygons = polygons;
    }
}

export default Thor;