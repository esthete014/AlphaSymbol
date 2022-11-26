var alphabets = [
	{ string: '◼▩▨▦▥▣◫▢', name: 'Default' },
	{ string: '◆▶◈◭◬◇▷', name: 'Triangle'},
	{ string: '刺ぽをまちんのこ', name: 'Japan'},
	{ string: '顔笑泣心でてくっ', name: 'China'},
	{ string: '⬛⬜', name: 'Black&white'},
	{ string: 'MWNX0Okdlxoc;:,.', name: 'ASCII'},
	{ string: '製語道地食言あま本すセうワくー', name: 'Retro'},
	{ string: '⣿⠿⠟⠛⠋⠉⠁', name: 'Dots'},
	{ string: '✪☯☢☮☪', name: 'Circls'},
	{ string: '@#%=+*:-.', name: 'Default ASCII'},
	{ string: '█▓▒░', name: 'Contrast'},
	{ string: '█▓▒░ ', name: 'Contrast2'},
	{string: '■□', name: 'Simple'}
];

let complete = false;
let _globalPhoto;


	

var limit = 4000000;
var maxWidth = 100;
var maxHeight = 100;

var inputFile = document.querySelector('.inputBox');
var preview = document.querySelector('.js-preview');
var asciiImage = document.querySelector('.js-ascii-image');
let dropList = document.querySelector('.dropList');
renderDropListAlphabets();
dropList.onchange = onChangeDropList

let inputs = document.querySelectorAll('.input__file');
Array.prototype.forEach.call(inputs, function (input) {
	let label = input.nextElementSibling,
	labelVal = label.querySelector('.input__file-button-text').innerText;

	input.addEventListener('change', function (e) {
	let countFiles = '';
	if (this.files && this.files.length >= 1)
		countFiles = this.files.length;

	if (countFiles)
		label.querySelector('.input__file-button-text').innerText = 'Выбрано файлов: ' + countFiles;
	else
		label.querySelector('.input__file-button-text').innerText = labelVal;
	});
});


// рисуем изображение с помощью символов
// чем темнее цвет пикселя, тем больше символ
function drawAsciiImage(colors, params){
	let ASCIIColors = alphabets[alphabets.findIndex(el => el.name == dropList.value)].string.split('');

	let width = params.width || 0;
	let height = params.height || 0;

	// если изображение больше maxWidth * maxHeight px, то не рисуем каждый пиксель,
	// а рисуем с шагом ratioWidth (ratioHeight)
	var ratioWidth = Math.ceil(width / maxWidth);
	var ratioHeight = Math.ceil(width / maxHeight);

	var str = '';

	for(var i = 0; i < height; i += ratioHeight) {
		var row = colors[i];

		for(var j = 0; j < width; j += ratioWidth) {
			var color = row[j];
			var symbol = ASCIIColors[color > 0 ? Math.ceil(color / 255 * ASCIIColors.length) - 1 : 0];
			str += symbol;
		}

		str += '<br>';
	}

	asciiImage.innerHTML = str;
}

// попиксельно парсим изображение, переводим все цвета в градации серого
var getPixelsColorCode = function(imageBase64) {
	var image = new Image();

	image.src = imageBase64;

	image.addEventListener('load', function () {
		if (this.width * this.height > limit) {
			alert('Изображение слишком большое. Максимальная плотность изображения ' + limit + 'px.');
			return false;
		}

		var canvas = document.createElement('canvas');
		var context = canvas.getContext('2d');
		var width = this.width;
		var height = this.height;

		canvas.width = width;
		canvas.height = height;

		context.drawImage(this, 0, 0);

		var imageData = context.getImageData(0, 0, width, height);
		var pixels = imageData.data;

		// каждый пиксел предствлен 4-мя значениями, например [... , 34, 136, 204, 255, ...];
		// используя первые три значения, получаем нужный оттенок серого цвета
		// и записываем значение в двумерный массив
		var pixelMatrix = [];
		var row = 0;
		pixelMatrix[0] = [];
		for(var i = 0; i < pixels.length; i += 4) {
			if ( (i / (row + 1)) >= (width * 4) ) {
				pixelMatrix[++row] = [];
			}

			var brightness = 255;
			// пиксель не полностью прозрачный
			if (pixels[i + 3] !== 0) {
				brightness = Math.round(0.34 * pixels[i] + 0.5 * pixels[i + 1] + 0.16 * pixels[i + 2]);
			}
			pixelMatrix[row].push(brightness);
		}

		drawAsciiImage(pixelMatrix, {width: width, height: height});
	});
};

// кодируем изображение в Base64 и загружаем его превью
function previewImage() {
	var file = inputFile.files[0];
	var reader = new FileReader();

	reader.onloadend = function() {
		if (!file.type.includes("image", 0)) {
			alert("Выбранно не изображение!");
			window.location.reload();
			return;
		}
		preview.src = reader.result;
		_globalPhoto = preview.src;
		getPixelsColorCode(preview.src);
	};
	if (file) {
		reader.readAsDataURL(file);
		complete = true;
	} else {
		window.location.reload();
		complete = false;
		alert('Выберите изображение.');
		
	}
}

inputFile.addEventListener('change', previewImage);


function onChangeDropList() {
	if (_globalPhoto) {
		previewImage();
	}
}

function renderDropListAlphabets() {
    alphabets.forEach(element => {
        const el = document.createElement('option');
        el.innerText = element.name;
        dropList.appendChild(el);
    });
}