class Game {

    constructor() {
        this.canvas = document.getElementById("canvas");
        this.ctx = canvas.getContext("2d");
        this.time = Date.now();
        this.StateManager = new StateManager(resourceManager, this.ctx);
    }

    async start() {
        await resourceManager.init();
        this.StateManager.init();
        this.initEventSystem();
        this.startLoop();
    }

    initEventSystem() {
        this.canvas.addEventListener('click', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('mousemove', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keypress', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keydown', (ev) => {
            this.handleEvent(ev);
        });
        this.canvas.addEventListener('keyup', (ev) => {
            this.handleEvent(ev);
        });
    }

    handleEvent(ev) {
        this.StateManager.handleEvent(ev);
    }

    startLoop() {
        this.time = Date.now();
        this.step();
    }

    step() {
        const now = Date.now();
        const dt = (now - this.time) / 100;
        this.time = now;
        this.update(dt);
        this.render(dt);
		requestAnimationFrame(() => this.step());
    }

    update(dt) {
        this.StateManager.update(dt);
    }
	
    render(dt) {
        this.clearCtx();
        this.StateManager.render(dt);
    }
	
    clearCtx() {
        this.ctx.fillStyle = "white";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
