class KleinBottle extends Figure {
    constructor(a = 2, density = 50) {
        super();
        const points = [];
        const edges = [];
        const polygons = [];

        // Генерация точек
        for (let u = 0; u <= Math.PI; u += Math.PI / density) {
            for (let v = 0; v < 2 * Math.PI; v += 2 * Math.PI / density) {
                // Параметрическое уравнение бутылки Клейна
                const x = (a + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.cos(u);
                const y = (a + Math.cos(u / 2) * Math.sin(v) - Math.sin(u / 2) * Math.sin(2 * v)) * Math.sin(u);
                const z = Math.sin(u / 2) * Math.sin(v) + Math.cos(u / 2) * Math.sin(2 * v);

                points.push(new Point(x, y, z));
            }
        }

        // Генерация рёбер
        for (let m = 0; m < density; m++) {
            for (let n = 0; n < density; n++) {
                const currentIndex = m * (density + 1) + n;
                const nextRow = (m + 1) * (density + 1) + n;

                // Горизонтальные рёбра
                edges.push(new Edge(currentIndex, currentIndex + 1));

                // Вертикальные рёбра
                edges.push(new Edge(currentIndex, nextRow));

                // Диагональные рёбра
                edges.push(new Edge(currentIndex + 1, nextRow));
                edges.push(new Edge(nextRow, nextRow + 1));
            }
        }

        // Генерация полигонов
        for (let m = 0; m < density; m++) {
            for (let n = 0; n < density; n++) {
                const currentIndex = m * (density + 1) + n;
                const nextRow = (m + 1) * (density + 1) + n;

                // Полигоны (квадраты)
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