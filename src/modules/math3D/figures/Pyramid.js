import Figure from "../entities/Figure";
import Point from "../entities/Point";
import Edge from "../entities/Edge";
import Polygon from "../entities/Polygon";


class Pyramid extends Figure {
    constructor(size = 5, height = 10) {
        super();
        this.points = [
            new Point(-size, 0, -size),
            new Point(size, 0, -size),
            new Point(size, 0, size),
            new Point(-size, 0, size),
            new Point(0, height, 0),
        ];
        this.edges=[
         new Edge(0, 1),
         new Edge(1, 2),
         new Edge(2, 3),
         new Edge(3, 0),

         new Edge(4, 0),
         new Edge(4, 1),
         new Edge(4, 2),
         new Edge(4, 3),
        ];
        this.polygons=[

        
         new Polygon([0, 1, 4]),
         new Polygon([1, 2, 4]),
         new Polygon([2, 3, 4]),
         new Polygon([3, 0, 4]),
         new Polygon([0, 1, 2, 3]),
    ];

    }
}

export default Pyramid;