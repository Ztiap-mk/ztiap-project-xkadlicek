class SoundManager {
    _isMuted = false;
    currentMusic = null;
    playingSounds = [];
    playMusic() {
        this.stopMusic();
        this.currentMusic = resourceManager.getAudioSource('Dorian');
        this.currentMusic._isMuted = this._isMuted;
        this.currentMusic.currentTime = 0;
        this.currentMusic.loop = true;
        this.currentMusic.play();
    }
    stopMusic() {
        if (this.currentMusic) {
            this.currentMusic.pause();
            this.currentMusic.currentTime = 0;
        }
    }
    toggleSound() {
        this._isMuted = !this._isMuted;

        for (let i = 0; i < this.playingSounds.length; i++) {
            const sound = this.playingSounds[i];
            sound.muted = this._isMuted;
        }
        this.currentMusic.muted = this._isMuted;
    }
	isMuted() {
        return this._isMuted;
    }
}

const soundManager = new SoundManager();