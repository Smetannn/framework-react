import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";


class OneSheetedHyperboloid extends Figure {
    constructor(count = 20, a = 7, b = 10, c = 20) {
        super();
            const points = [];
            const edges = [];
            const polygons = [];
        
            //точки
            const dt = Math.PI * 2 / count;
            const du = 2 / count;
            for (let i = -1; i <= 1; i += du) {
                for (let j = 0; j < 2 * Math.PI; j += dt) {
                    points.push(new Point(
                        a * Math.cosh(i) * Math.cos(j),
                        c * Math.sinh(i),
                        b * Math.cosh(i) * Math.sin(j)
                    ));
        
                }
            }
        
            //ребра
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
        
            //полигоны
            for (let i = 0; i < points.length; i++) {
                if (i + 1 + count < points.length && (i + 1) % count !== 0) {
                    polygons.push(new Polygon([i, i + 1, i + 1 + count, i + count]));
                } else if (i + count < points.length && (i + 1) % count === 0) {
                    polygons.push(new Polygon([i, i + 1 - count, i + 1, i + count]))
                }
            }
        
            return new Figure(points, edges, polygons);
        
        
    }
}

export default OneSheetedHyperboloid;