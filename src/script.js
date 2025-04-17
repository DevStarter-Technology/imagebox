class ImageBoxInstance {
	constructor(options = {}) {
		this.galleryName = options.gallery || 'default';
		this.thumbnails = Array.from(document.querySelectorAll(`.imagebox-thumbnail[data-gallery="${this.galleryName}"]`));
		this.options = Object.assign({
			zoom: true,
			fullscreen: true,
			loop: true,
			lazyLoad: true
		}, options);

		this.currentIndex = 0;
		this.isZoomed = false;
		this.isFullscreen = false;

		this.createDOM();
		this.bindThumbnails();
		this.bindGlobalEvents();
	}

	createDOM() {
		// Создаём контейнер галереи
		this.container = document.createElement('div');
		this.container.classList.add('imagebox');
		this.container.innerHTML = `
			<span class="close-btn">&times;</span>
			<span class="fullscreen-btn">⛶</span>
			<button class="nav-btn prev-btn">&larr;</button>
			<button class="nav-btn next-btn">&rarr;</button>
			<div class="imagebox-content">
				<div class="imagebox-media-container"></div>
				<div class="caption"></div>
			</div>
			<div class="imagebox-thumbnails"></div>
		`;

		document.body.appendChild(this.container);

		// Кэшируем элементы
		this.mediaContainer = this.container.querySelector('.imagebox-media-container');
		this.caption = this.container.querySelector('.caption');
		this.thumbBar = this.container.querySelector('.imagebox-thumbnails');
		this.fullscreenBtn = this.container.querySelector('.fullscreen-btn');

		// Навешиваем кнопки
		this.container.querySelector('.close-btn').addEventListener('click', () => this.close());
		this.container.querySelector('.prev-btn').addEventListener('click', () => this.showPrev());
		this.container.querySelector('.next-btn').addEventListener('click', () => this.showNext());

		if (this.options.fullscreen) {
			this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
		} else {
			this.fullscreenBtn.style.display = 'none';
		}

		// Свайпы
		this.mediaContainer.addEventListener('touchstart', (e) => this.startX = e.touches[0].clientX, { passive: true });
		this.mediaContainer.addEventListener('touchend', (e) => {
			const endX = e.changedTouches[0].clientX;
			if (this.startX - endX > 50) this.showNext();
			if (endX - this.startX > 50) this.showPrev();
		}, { passive: true });
	}

	bindThumbnails() {
		this.thumbnails.forEach((thumb, index) => {
			thumb.addEventListener('click', () => this.open(index));
		});
	}

	bindGlobalEvents() {
		document.addEventListener('keydown', (e) => {
			if (this.container.style.display !== 'block') return;
			switch (e.key) {
				case 'Escape': this.close(); break;
				case 'ArrowLeft': this.showPrev(); break;
				case 'ArrowRight': this.showNext(); break;
				case 'f': this.toggleFullscreen(); break;
			}
		});
	}

	open(index) {
		this.currentIndex = index;
		this.updateMedia(index);
		this.renderThumbBar();

		this.container.style.display = 'block';
		document.body.style.overflow = 'hidden';
		setTimeout(() => this.container.classList.add('show'), 10);
	}

	close() {
		this.container.classList.remove('show');
		setTimeout(() => {
			this.container.style.display = 'none';
			document.body.style.overflow = 'auto';
		}, 300);
	}

	updateMedia(index) {
		this.currentIndex = index;
		const item = this.thumbnails[index];
		const src = item.dataset.full || item.src;
		const caption = item.dataset.caption || '';
		const type = item.dataset.type || 'image';

		this.mediaContainer.innerHTML = '';
		this.caption.textContent = caption;

		if (type === 'image') {
			const img = document.createElement('img');
			img.src = src;
			img.classList.add('imagebox-media');
			if (this.options.zoom) {
				img.addEventListener('wheel', (e) => this.handleZoom(e));
				img.addEventListener('click', () => this.resetZoom());
			}
			this.mediaContainer.appendChild(img);
		} else if (type === 'video') {
			const videoWrapper = document.createElement('div');
			videoWrapper.classList.add('video-container');
			videoWrapper.innerHTML = `<iframe src="${src}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
			this.mediaContainer.appendChild(videoWrapper);
		} else if (type === 'html5video') {
			const video = document.createElement('video');
			video.src = src;
			video.controls = true;
			video.autoplay = this.options.videoAutoplay;
			video.classList.add('imagebox-media');
			this.mediaContainer.appendChild(video);
		}

		// Highlight active thumbnail
		this.thumbBar.querySelectorAll('img').forEach((t, i) => {
			t.classList.toggle('active', i === index);
		});
	}

	renderThumbBar() {
		this.thumbBar.innerHTML = '';
		this.thumbnails.forEach((thumb, i) => {
			const img = document.createElement('img');
			img.src = thumb.src;
			img.classList.add('imagebox-thumbnail');
			if (i === this.currentIndex) img.classList.add('active');
			img.addEventListener('click', () => this.updateMedia(i));
			this.thumbBar.appendChild(img);
		});
	}

	showPrev() {
		this.currentIndex = (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
		this.updateMedia(this.currentIndex);
	}

	showNext() {
		this.currentIndex = (this.currentIndex + 1) % this.thumbnails.length;
		this.updateMedia(this.currentIndex);
	}

	handleZoom(e) {
		if (e.deltaY < 0 && !this.isZoomed) {
			e.target.classList.add('zoomed');
			this.isZoomed = true;
		}
	}

	resetZoom() {
		const el = this.container.querySelector('.imagebox-media.zoomed');
		if (el) {
			el.classList.remove('zoomed');
			this.isZoomed = false;
		}
	}

	toggleFullscreen() {
		if (!this.isFullscreen) {
			this.container.requestFullscreen?.().catch(console.error);
			this.isFullscreen = true;
		} else {
			document.exitFullscreen?.();
			this.isFullscreen = false;
		}
	}
}

// Глобальный экспорт
const ImageBox = {
	init: function (options) {
		new ImageBoxInstance(options);
	}
};

window.ImageBox = ImageBox;