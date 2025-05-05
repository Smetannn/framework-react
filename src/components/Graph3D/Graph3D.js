import React from "react";
import Point from "../../modules/math3D/entities/Point";
import Light from "../../modules/math3D/entities/Light";
import Cube from "../../modules/math3D/figures/Cube";
import Sphere from "../../modules/math3D/figures/Sphere";
import Pyramid from "../../modules/math3D/figures/Pyramid";
import Cylinder from "../../modules/math3D/figures/Cylinder";
import Thor from "../../modules/math3D/figures/Thor";
import Conus from "../../modules/math3D/figures/Conus";
import EllipticalCylinder from "../../modules/math3D/figures/EllipticalCylinder";
import OneSheetedHyperboloid from "../../modules/math3D/figures/OneSheetedHyperboloid";
import ParabolicCylinder from "../../modules/math3D/figures/ParabolicCylinder";
import HyperbolicCylinder from "../../modules/math3D/figures/HyperbolicCylinder";
import TwoSheetedHyperboloid from "../../modules/math3D/figures/TwoSheetedHyperboloid";
import EllipticalParaboloid from "../../modules/math3D/figures/EllipticalParaboloid";
import HyperbolicParaboloid from "../../modules/math3D/figures/HyperbolicParaboloid";
import Math3D from "../../modules/math3D/Math3D";
import Canvas from "../../modules/Canvas/Canvas";

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        window.oRequestAnimationFrame ||
        window.msRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        }
})();


class Graph3D extends React.Component {
    constructor(options) {
        super(options);

        this.pendingRender = false;

        this.WIN = {
            LEFT: -5,
            BOTTOM: -5,
            WIDTH: 10,
            HEIGHT: 10,
            CENTER: new Point(0, 0, 30),
            CAMERA: new Point(0, 0, 50),
        };

        this.LIGHT = new Light(-40, 5, 10, 100000);
        this.figures = {
            'Cube': Cube,
            'Sphere': Sphere,
            'Pyramid': Pyramid,
            'Cylinder': Cylinder,
            'Thor': Thor,
            'Conus': Conus,
            'EllipticalCylinder': EllipticalCylinder,
            'ParabolicCylinder': ParabolicCylinder,
            'HyperbolicCylinder': HyperbolicCylinder,
            'OneSheetedHyperboloid': OneSheetedHyperboloid,
            'TwoSheetedHyperboloid': TwoSheetedHyperboloid,
            'EllipticalParaboloid': EllipticalParaboloid,
            'HyperbolicParaboloid': HyperbolicParaboloid,
        }
        this.scene = new Cube();
        this.math3D = new Math3D({ WIN: this.WIN });
        this.canRotate = false;
        this.pointShow = true;
        this.edgeShow = true;
        this.polygonShow = true;
        this.dx = 0;
        this.dy = 0;
    }

    componentDidMount() {
        this.canvas = new Canvas({
            id: 'canvas3D',
            width: 500,
            height: 500,
            WIN: this.WIN,
            callbacks: {
                wheel: (event) => this.wheel(event),
                mousemove: (event) => this.mousemove(event),
                mouseup: () => this.mouseup(),
                mousedown: (event) => this.mousedown(event),
                mouseleave: () => this.mouseleave(),
            },
        });
        let countFPS = 0;
        let FPS = 0;
        let lastTimeStamp = Date.now();
        const loop = () => {
            countFPS++;
            const timeStamp = Date.now();
            if (timeStamp - lastTimeStamp >= 1000) {
                FPS = countFPS;
                countFPS = 0;
                lastTimeStamp = timeStamp;
            }
            if (!this.pendingRender) {
                this.pendingRender = true;
                window.requestAnimationFrame(() => {
                    this.renderFrame(FPS);
                    this.pendingRender = false;
                });
            }

            window.requestAnimationFrame(loop);
        };

        window.requestAnimationFrame(loop);


        loop();
    }

    componentWillUnmount() {
        window.cancelAnimationFrame(this.reqId);
    }

    wheel(event) {
        const delta = (event.wheelDelta > 0) ? 1.1 : 0.9;
        this.scene.points.forEach(point => this.math3D.zoom(delta, point));
        this.renderFrame();
    }

    mouseup() {
        this.canRotate = false;
    }

    mouseleave() {
        this.canRotate = false;
    }

    mousedown(event) {
        this.canRotate = true;
        this.dx = event.offsetX;
        this.dy = event.offsetY;
    }

    mousemove(event) {
        if (this.canRotate) {
            const ROTATION_SENSITIVITY = 5;
            const gradus = Math.PI / 180 / ROTATION_SENSITIVITY;

            this.scene.points.forEach(point => {
                this.math3D.rotateOy(-(this.dx - event.offsetX) * gradus, point);
                this.math3D.rotateOx(-(this.dy - event.offsetY) * gradus, point);
            });

            this.dx = event.offsetX;
            this.dy = event.offsetY;
            this.renderFrame();
            if (!this.pendingRender) {
                this.pendingRender = true;

                window.requestAnimationFrame(() => {
                    this.renderFrame();
                    this.pendingRender = false;
                });
            }
        }
    }

    selectFigureHandler(event) {
        const selectedFigure = event.target.value;
        if (selectedFigure && this.figures[selectedFigure]) {
            this.scene = new this.figures[selectedFigure]();
            this.math3D.scene = this.scene;
            this.renderFrame();
        }
        if (!this.pendingRender) {
            this.pendingRender = true;
            window.requestAnimationFrame(() => {
                this.renderFrame();
                this.pendingRender = false;
            });
        }
    }

    colorFigureHandler(event) {
        const color = event.target.value;
        this.scene.polygons.forEach(polygon => polygon.setColor(color));
        if (!this.pendingRender) {
            this.pendingRender = true;
            window.requestAnimationFrame(() => {
                this.renderFrame();
                this.pendingRender = false;
            });
        }
    }

    renderFrame(FPS = 0) {

        if (!this.canvas) return;

        this.scene.points.forEach(point => {
            point.xs_cached = null;
            point.ys_cached = null;
        });
    
        this.canvas.clear();

        this.math3D.calcDistance(this.scene, this.WIN.CAMERA, 'distance');
        this.math3D.calcDistance(this.scene, this.LIGHT, 'lumen');
        this.math3D.sortByArtistAlgorithm(this.scene.polygons);

        this.canvas.text(`FPS:${FPS}`, -4.5, 4.5, '#000000');

        const polygonsCheckbox = document.getElementById("polygonsCheckbox");
        const edgesCheckbox = document.getElementById("edgesCheckbox");
        const pointsCheckbox = document.getElementById("pointsCheckbox");

        if (polygonsCheckbox && polygonsCheckbox.checked) {
            this.scene.polygons.forEach(polygon => {
                const array = [];
                polygon.points.forEach(index =>
                    array.push({
                        x: this.math3D.xs(this.scene.points[index]),
                        y: this.math3D.ys(this.scene.points[index]),
                    })
                );

                const lumen = this.math3D.calcIllumination(polygon.lumen, this.LIGHT.lumen);
                let { r, g, b } = polygon.color;
                r = Math.round(r * lumen);
                g = Math.round(g * lumen);
                b = Math.round(b * lumen);

                this.canvas.polygon(array, polygon.rgbToHex(r, g, b));
            });
        }

        if (edgesCheckbox && edgesCheckbox.checked) {
            this.scene.edges.forEach(edge => {
                const point1 = this.scene.points[edge.p1];
                const point2 = this.scene.points[edge.p2];
                this.canvas.line(
                    this.math3D.xs(point1),
                    this.math3D.ys(point1),
                    this.math3D.xs(point2),
                    this.math3D.ys(point2)
                );
            });
        }

        if (pointsCheckbox && pointsCheckbox.checked) {
            this.scene.points.forEach(point => {
                this.canvas.point(
                    this.math3D.xs(point),
                    this.math3D.ys(point)
                );
            });
        }
    }

    render() {
        return (
            <div className="graph3D">
                <select onChange={(event) => this.selectFigureHandler(event)}>
                    <option value="Cube">Куб</option>
                    <option value="Sphere">Сфера</option>
                    <option value="Pyramid">Пирамида</option>
                    <option value="Cylinder">Цилиндр</option>
                    <option value="Thor">Тор</option>
                    <option value="Conus">Конус</option>
                    <option value="EllipticalCylinder">Эллиптический цилиндр</option>
                    <option value="ParabolicCylinder">Параболический цилиндр</option>
                    <option value="HyperbolicCylinder">Гиперболический цилиндр</option>
                    <option value="OneSheetedHyperboloid">Однополостный гиперболоид</option>
                    <option value="TwoSheetedHyperboloid">Двухполостный гиперболоид</option>
                    <option value="EllipticalParaboloid">Эллиптический параболоид</option>
                    <option value="HyperbolicParaboloid">Гиперболический параболоид</option>
                </select>
                <div className="checkboxes">
                    <label><input type="checkbox" id="pointsCheckbox" defaultChecked onChange={() => this.renderFrame()} /> Точки</label>
                    <label><input type="checkbox" id="edgesCheckbox" defaultChecked onChange={() => this.renderFrame()} /> Ребра</label>
                    <label><input type="checkbox" id="polygonsCheckbox" defaultChecked onChange={() => this.renderFrame()} /> Полигоны</label>
                </div>
                <div className='col'>
                    <input type="color" onChange={(event) => this.colorFigureHandler(event)} />
                </div>
                <div className="light-control">
                    <label for="lightPower">Мощность света: <span id="lightPowerValue">50</span></label><br />
                    <input type="range" id="lightPower" min="0" max="100000" className="slider"
                        onChange={(event) => {
                            const powerValue = parseInt(event.target.value);
                            this.LIGHT.lumen = powerValue;
                            document.getElementById('lightPowerValue').textContent = powerValue;
                            this.renderFrame();
                        }} />
                </div>
                <canvas className="canvas" id="canvas3D"></canvas>
            </div>
        );
    }
}

export default Graph3D;
