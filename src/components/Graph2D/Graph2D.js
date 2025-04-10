import React from 'react';
import Canvas from '../../modules/Canvas/Canvas';
import UI2D from './UI/UI2D';

class Graph2D extends React.Component {
    constructor(options) {
        super(options);

        this.WIN = {
            LEFT: -10,
            BOTTOM: -10,
            WIDTH: 20,
            HEIGHT: 20
        };

        this.funcs = [];
        this.canMove = false;
        this.derivativeX = 0;
        this.currentMouseX = 0;
        this.ZOOM = 0.5;
    }

    componentDidMount() {
        this.graph = new Canvas({
            id: 'canvas2D',
            width: 600,
            height: 600,
            WIN: this.WIN,
            callbacks: {
                mousemove: (event) => this.mousemove(event),
                wheel: (event) => this.wheel(event),
                mouseup: () => this.mouseup(),
                mousedown: () => this.mousedown(),
                mouseleave: () => this.mouseleave()
            }
        });

        this.ui=new UI2D({
            id: 'ui',
            parent: this.id,
            callbacks: {
                addFunction: (f, num, color, flag) => this.addFunction(f, num, color, flag),
                delFunction: (num) => this.delFunction(num),
            }
        });

        this.render2D();
    }

    addFunction(f, num, color, printDer) {
        this.funcs[num] = {
            f: f,
            color: color || 'red',
            printDer: printDer || false
        };
        this.render2D();
    }

    delFunction(num) {
        this.funcs[num] = null;
        this.render2D();
    }

    setColor(color, num) {
        if (this.funcs[num]) {
            this.funcs[num].color = color;
            this.render2D();
        }
    }

    setFlag(flag, num) {
        if (this.funcs[num]) {
            this.funcs[num].flag = flag;
            this.render2D();
        }
    }

    mousemove(event) {
        if (this.canMove) {
            this.WIN.LEFT -= this.graph.sx(event.movementX);
            this.WIN.BOTTOM += this.graph.sy(event.movementY);
        }
        this.derivativeX = this.WIN.LEFT + this.graph.sx(event.offsetX);
        this.render2D();
    }

    wheel(event) {
        event.preventDefault();
        const delta = event.deltaY > 0 ? this.ZOOM : -this.ZOOM;
        this.WIN.WIDTH += delta;
        this.WIN.HEIGHT += delta;
        this.WIN.LEFT -= delta / 2;
        this.WIN.BOTTOM -= delta / 2;
        this.render2D();
    }

    mousedown() {
        this.canMove = true;
    }

    mouseup() {
        this.canMove = false;
    }

    mouseleave() {
        this.canMove = false;
    }

    printOXY() {
        const { LEFT, BOTTOM, HEIGHT, WIDTH } = this.WIN;
        // Разметка
        for (let i = 0; i < LEFT + WIDTH; i += 1) {
            this.graph.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#ddd');
            this.graph.line(i, -0.1, i, 0.1, 'black');
        }
        for (let i = 0; i > LEFT; i -= 1) {
            this.graph.line(i, BOTTOM, i, BOTTOM + HEIGHT, '#ddd');
            this.graph.line(i, -0.1, i, 0.1, 'black');
        }
        for (let i = 0; i < BOTTOM + HEIGHT; i += 1) {
            this.graph.line(LEFT, i, LEFT + WIDTH, i, '#ddd');
            this.graph.line(-0.1, i, 0.1, i, 'black');
        }
        for (let i = 0; i > BOTTOM; i -= 1) {
            this.graph.line(LEFT, i, LEFT + WIDTH, i, '#ddd');
            this.graph.line(-0.1, i, 0.1, i, 'black');
        }
        // Стрелки
        this.graph.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.7, 0.3, 'black', 1);
        this.graph.line(LEFT + WIDTH, 0, LEFT + WIDTH - 0.7, -0.3, 'black', 1);
        this.graph.line(0, BOTTOM + HEIGHT, 0.3, BOTTOM + HEIGHT - 0.7, 'black', 1);
        this.graph.line(0, BOTTOM + HEIGHT, -0.3, BOTTOM + HEIGHT - 0.7, 'black', 1);
        // 0X
        this.graph.line(LEFT, 0, LEFT + WIDTH, 0, 'black', 2);
        this.graph.text("X", (LEFT + WIDTH - 0.8), (-0.8), 'black');
        // 0Y
        this.graph.line(0, BOTTOM, 0, BOTTOM + HEIGHT, 'black', 2);
        this.graph.text("Y", (-0.8), (BOTTOM + HEIGHT - 0.8), 'black');
    }
    renderFunction(f, color) {
        let x = this.WIN.LEFT;
        const dx = this.WIN.WIDTH / 500;
        while (x < this.WIN.WIDTH + this.WIN.LEFT) {
            const y1 = f(x);
            const y2 = f(x + dx);
            this.graph.line(x, y1, x + dx, y2, color);
            x += dx;
        }
    }

    render2D() {
        this.graph.clear();
        this.printOXY();

        for (let i = 0; i < this.funcs.length; i++) {
            if (this.funcs[i]) {
                this.renderFunction(this.funcs[i].f, this.funcs[i].color);
            }
        }
    }
    render() {
        return (
            <div className="graph2d-container">
                <canvas id="canvas2D"></canvas>
                <div class="ui2D">
                <button id = "addFunction" 
                onClick={() => this.ui.addFunction()}>Добавить функцию</button>
                <div id="funcsInputs"></div>
            </div>
            </div>
        );
    }
}

export default Graph2D;