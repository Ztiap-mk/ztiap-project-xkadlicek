const STATES = {
    GAME: 'gameState',
    MAIN_MENU: 'mainMenu',
    INFO: 'info',
	SOUND_MUTE: 'mute',
	DEATH: 'death',
}

class StateManager {
    states = {};
    currentState = null;

    constructor(resourceManager, ctx) {
        this.resourceManager = resourceManager;
        this.ctx = ctx;
    }

    init() {
        const ctx = this.ctx;
        this.states = {
            gameState: new GameState(this, ctx),
            mainMenu: new MainMenu(this, ctx),
            info: new InfoState(this, ctx),
			death: new DeathState(this, ctx),
        };
        this.currentState = this.states.mainMenu;
    }

    changeState(state) {
        const newState = this.states[state];
        if (!newState) {
            throw new Error(`State '${state}' not found`)
        }
        this.currentState.deinit();
        this.currentState = newState;
        this.currentState.init();
    }

    update(dt) {
        this.currentState.update(dt);
    }

    handleEvent(ev) {
        this.currentState.handleEvent(ev);
    }

    render() {
        this.currentState.render(this.ctx);
    }
}

class BaseState {
    objects = [];
    constructor(stateManager, ctx) {
        this.stateManager = stateManager;
        this.ctx = ctx;
    }
    init() {

    }
    deinit() {

    }
    render() {
        this.objects.forEach(object => object.render(this.ctx));
    }
    update(dt) {

    }
    handleEvent(ev) {

    }
}

class MainMenu extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
		this.bgImage = resourceManager.getImageSource('pozadie');
        const startGameButton = new TextButton(600, 200, 200, 50, 50, 'NEW GAME');
        startGameButton.onClick((ev) => {
            this.stateManager.changeState(STATES.GAME);
        });

        const infoButton = new TextButton(600, 300, 200, 50, 50, 'SETTINGS');
        infoButton.onClick((ev) => {
            this.stateManager.changeState(STATES.INFO);
        });
		
		const deathButton = new TextButton(600, 400, 200, 50, 50, 'DEATH');
        deathButton.onClick((ev) => {
            this.stateManager.changeState(STATES.DEATH);
        });

        this.objects = [
            startGameButton,
            infoButton,
			deathButton,
        ];
    }
	render() {
		this.ctx.drawImage(this.bgImage,0,0,1500,700);
        this.objects.forEach(object => object.render(this.ctx));
    }
	update(dt) {
        if (this.isPaused) {
            return;
        }
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}

class GameState extends BaseState {
    isPaused = false;
    isMenuOpened = false;
    constructor(stateManager, ctx) {
        super(stateManager, ctx);
		this.bgImage = resourceManager.getImageSource('pozadie');
		this.Image1 = resourceManager.getImageSource('rytier');
		this.Image2 = resourceManager.getImageSource('dvere');
		this.Image3 = resourceManager.getImageSource('rr');
		const rytier = new ImageButton(400, 350, 100, 100, resourceManager.getImageSource('rytier'));
        const soundToggleButton = new SoundToggleButton(10, 10 , 30, 30, resourceManager.getImageSource('zvuk'), resourceManager.getImageSource('zvuk'), true);

        soundToggleButton.onClickHandler = () => {
            soundManager.toggleSound();
            soundToggleButton.isOn = !(soundManager.isMuted());
        };
		rytier.onClickHandler = () => {
            soundManager.playSound();
        };
		this.objects.push(soundToggleButton, rytier);
    }

    init() {
        super.init();
        soundManager.playMusic();
    }
    deinit() {
        super.deinit();
        soundManager.stopMusic();
    }
    render() {
		this.ctx.drawImage(this.bgImage,0,0,1500,700);
		this.ctx.drawImage(this.Image1,400,350,100,100);
		this.ctx.drawImage(this.Image2,800,350,100,100);
		this.ctx.drawImage(this.Image3,1200,350,100,100);
		this.objects.forEach(object => object.render(this.ctx));
    }
    update(dt) {
        if (this.isPaused) {
            return;
        }
    }
	handleEvent(ev) {
        if (isKeyUpEvent(ev)) {
            this.toggleMenu();
        }
    }
    toggleMenu() {
        this.isMenuOpened = !this.isMenuOpened;
    }
}

class InfoState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
		this.Wasd = resourceManager.getImageSource('wasd');
		this.Enter = resourceManager.getImageSource('enter');
        this.objects = [
            new Background(0, 0, canvas.width, canvas.height, resourceManager.getImageSource('pozadie')),
            new TextButton(300, 250, 300, 100, 100, 'Movement'),
            new TextButton(300, 450, 300, 100, 100, 'Activate'),
        ];
    }
	render(ctx) {
		this.ctx.drawImage(this.Wasd,0,0,50,50);
        this.ctx.drawImage(this.Enter,0,0,50,50);
        this.objects.forEach(object => object.render(this.ctx));
    }
	update(dt) {
        if (this.isPaused) {
            return;
        }
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}

class DeathState extends BaseState {
    constructor(manager, ctx) {
        super(manager, ctx);
        this.bgImage = resourceManager.getImageSource('pozadie');
		this.Death = resourceManager.getImageSource('death');
    }
	
	render() {
		this.ctx.drawImage(this.bgImage,0,0,1500,700);
        this.ctx.drawImage(this.Death,500,100,400,500);
        this.objects.forEach(object => object.render(this.ctx));
    }
	update(dt) {
        if (this.isPaused) {
            return;
        }
    }
    handleEvent(ev) {
        this.objects.forEach((object) => {
            object.handleEvent(ev);
        });
    }
}