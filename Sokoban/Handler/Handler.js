const IMAGES = [
    {name: 'dvere', src: 'images/dvere.png'},
    {name: 'bomba1', src: 'images/bomba1.png'},
    {name: 'rytier', src: 'images/rytier.png'},
    {name: 'pozadie', src: 'images/ht.png'},
    {name: 'zvuk', src: 'images/zvuk.png'},
    {name: 'rr', src: 'images/rr.png'},
	{name: 'death', src: 'images/death.png'},
	{name: 'wasd', src: 'images/wasd.png'},
	{name: 'enter', src: 'images/enter.png'},
];

const SOUNDS = [
    {name: 'Dorian', src: 'sounds/Dorian.mp3'},
];

class ResourceManager {
    loadedImages = new Map();
    loadedSounds = new Map();

    async init() {
        await this.loadImages();
        await this.loadSounds();
    }

    async loadSounds() {
        
        await Promise.all(
            SOUNDS.map(sound => this.loadSound(sound)),
        )
    }

    async loadImages() {
        await Promise.all(
            IMAGES.map(image => this.loadImage(image)),
        )
    }
	async loadImage(imgResource) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.src = imgResource.src;
            img.onload = () => {
                this.loadedImages.set(imgResource.name, img);
                resolve(img);
            }
            img.onerror = (err) => {
                reject(err);
            }
        });
    }

    async loadSound(imgResource) {
        return new Promise((resolve, reject) => {
            const sound = new Audio(imgResource.src);
            sound.setAttribute("preload", "auto");
            sound.setAttribute("controls", "none");
            sound.style.display = "none";
            sound.oncanplaythrough = () => {
                this.loadedSounds.set(imgResource.name, sound);
                resolve(sound);
            }
            sound.onerror = (err) => {
                reject(err);
            }
        });
    }
    getImageSource(imageName) {
        const image = this.loadedImages.get(imageName);
        if (image == null) {
            throw new Error(`Image '${imageName}' not found`);
        }
        return image;
    }

    getAudioSource(audioName) {
        const audio = this.loadedSounds.get(audioName);
        if (audio == null) {
            throw new Error(`Audio '${audioName}' not found`);
        }
        return audio;
    }
}

const resourceManager = new ResourceManager();