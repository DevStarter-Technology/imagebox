# 📦 ImageBox

**ImageBox** — современный, гибкий и лёгкий аналог [Lightbox2](https://lokeshdhakar.com/projects/lightbox2/), который автоматически инициализирует модальные галереи из изображений с нужными `data-*` атрибутами. Поддерживает разные типы контента, плагинную архитектуру и ленивую загрузку модулей.

---

## ✨ Особенности

- ✅ Автоматическая генерация галерей — без ручной разметки контейнера
- 🖼 Поддержка изображений, YouTube/Vimeo и HTML5-видео
- 🔌 Плагинная архитектура — легко расширяется (zoom, carousel, fullscreen и др.)
- 🛌 Ленивая загрузка модулей — по data-type
- 📚 Несколько независимых галерей на странице
- 🌟 Навигация клавишами и свайпами
- 🎨 Подписи, миниатюры, fullscreen и zoom

## 📦 Установка

Вы можете установить пакет удобным для вас способом: через npm, Bower или подключить напрямую через CDN.

### 📦 Установка через NPM

```bash
npm install @devstarter/imagebox
```

> Используйте, если вы подключаете скрипты и стили через сборщики (например, Webpack, Vite, Parcel).

### 📦 Установка через Bower

```bash
bower install DevStarter-Technology/imagebox --save
```

> Подходит для проектов, где используется Bower в качестве менеджера зависимостей.

### 🌐 Подключение через CDN

Если вы не используете сборщики, просто вставьте эти строки в ваш HTML:

#### jsDelivr

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@devstarter/imagebox@latest/dist/css/imagebox.min.css">
<script type="text/javascript" src="https://cdn.jsdelivr.net/npm/@devstarter/imagebox@latest/dist/js/imagebox.min.js"></script>
```

#### unpkg

```html
<link rel="stylesheet" href="https://unpkg.com/@devstarter/imagebox@latest/dist/css/imagebox.min.css">
<script type="text/javascript" src="https://unpkg.com/@devstarter/imagebox@latest/dist/js/imagebox.min.js"></script>
```

## 🛠 Использование

```html
<h1>ImageBox</h1>

<h2>Gallery #1</h2>
<img class="imagebox-thumbnail" src="img/thumb/img1.png" data-full="img/fullsize/img1.png" data-type="image" data-caption="Image description" data-gallery="gallery1">
<img class="imagebox-thumbnail" src="img/thumb/img2.png" data-full="img/fullsize/img2.png" data-type="image" data-caption="Image description 2" data-gallery="gallery1">
<img class="imagebox-thumbnail" src="img/thumb/img3.png" data-full="img/fullsize/img3.png" data-type="image" data-caption="Image description 3" data-gallery="gallery1">

<h2>Gallery #2</h2>
<img class="imagebox-thumbnail" src="img/thumb/img4.png" data-full="img/fullsize/img4.png" data-caption="First" data-gallery="gallery2">
<img class="imagebox-thumbnail" src="img/thumb/img5.png" data-full="img/fullsize/img5.png" data-caption="Second" data-gallery="gallery2">
<img class="imagebox-thumbnail" src="img/thumb/img6.png" data-full="img/fullsize/img6.png" data-caption="Another" data-gallery="gallery2">

<link rel="stylesheet" href="../dist/css/imagebox.min.css">
<script type="text/javascript" src="../dist/js/imagebox.min.js"></script>
<script type="text/javascript">
  ImageBox.init({ gallery: 'gallery1' });
  ImageBox.init({ gallery: 'gallery2' });
</script>
```

## 🪨 data-\* атрибуты
-------------------
| Атрибут | Описание |
| ------------ | ------------ |
| data-full | Ссылка на оригинальное изображение |
| data-type | Тип контента: image, video, youtube, vimeo |
| data-caption | Текст подписи |
| data-gallery | Имя галереи (для группировки) |
| data-thumb | Миниатюра для карусели (optional) |


## 🧰 Плагины

*   🔍 Zoom
*   🌍 Fullscreen
*   🔁 Carousel
*   🎬 YouTube / Vimeo / HTML5 video

## 🚩 Что дальше?

*   🧴 Pinch-to-zoom для тач-устройств
*   🎥 Анимации переходов
*   📂 Chunk loading

## 💬 Обратная связь

Если у вас есть предложения, замечания или баг-репорты — создайте issue или pull request в [репозитории на GitHub](https://github.com/DevStarter-Technology/imagebox).

## 🔐 Pro Features

This package follows an **open-core licensing model**:

- Core features — [MIT License](./LICENSE)
- Optional Pro Features — require a [commercial license](./COMMERCIAL_LICENSE.md)

To learn more about available Pro Features and licensing, [contact us](mailto:support@devstarter.technology).