let alphabets = [
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


	

let limit = 4000000;
let maxWidth = 100;
let maxHeight = 100;

let inputFile = document.querySelector('.inputBox');
let preview = document.querySelector('.js-preview');
let asciiImage = document.querySelector('.js-ascii-image');
let dropList = document.querySelector('.dropList');
renderDropListAlphabets();
dropList.onchange = onChangeDropList

let btnCopy = document.querySelector('.copyBtn');
btnCopy.addEventListener('click', () => {
	const content = document.querySelector('.js-ascii-image');
  	getScreenshotOfElement(content);
}) 

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
function drawAsciiImage(colors, params, hexColors){
	let ASCIIColors = alphabets[alphabets.findIndex(el => el.name == dropList.value)].string.split('');

	let width = params.width || 0;
	let height = params.height || 0;

	// если изображение больше maxWidth * maxHeight px, то не рисуем каждый пиксель,
	// а рисуем с шагом ratioWidth (ratioHeight)
	let ratioWidth = Math.ceil(width / maxWidth);
	let ratioHeight = Math.ceil(width / maxHeight);

	let str = '' ;
	let hex;
	let counter = 0;
	for(let i = 0; i < height; i += ratioHeight) {
		let row = colors[i];
		hex = hexColors[i];
		for(let j = 0; j < width; j += ratioWidth) {
			let color = row[j];
			let symbol = ASCIIColors[color > 0 ? Math.ceil(color / 255 * ASCIIColors.length) - 1 : 0];
			str += `<mark class='Symbol_${counter}' >${symbol}</mark>`; //style="background: white"
			counter++;
		}
		str += `<br>`;
	}

	asciiImage.innerHTML = str;
	let c = 0;

	for(let i = 0; i < height; i += ratioHeight) {
		for(let j = 0; j < width; j += ratioWidth) {
			let char = document.querySelector(`.Symbol_${c}`);
			c++;
			char.style = `background: #010010; color: #${hexColors[i][j]}`; // char.style = `background: #${hexColors[i][j]}; color: #${hexColors[i][j]}`; // `background: white; color: #${hexColors[i][j]}`
		}
	}
	//console.log(hexColors);
}

// попиксельно парсим изображение, переводим все цвета в градации серого
let getPixelsColorCode = function(imageBase64) {
	let image = new Image();

	image.src = imageBase64;

	image.addEventListener('load', function () {
		if (this.width * this.height > limit) {
			alert('Изображение слишком большое. Максимальная плотность изображения ' + limit + 'px.');
			return false;
		}

		let canvas = document.createElement('canvas');
		let context = canvas.getContext('2d');
		let width = this.width;
		let height = this.height;

		canvas.width = width;
		canvas.height = height;

		context.drawImage(this, 0, 0);

		let imageData = context.getImageData(0, 0, width, height);
		let pixels = imageData.data;
		// каждый пиксел предствлен 4-мя значениями, например [... , 34, 136, 204, 255, ...];
		// используя первые три значения, получаем нужный оттенок серого цвета
		// и записываем значение в двумерный массив
		let pixelMatrix = [];
		let pixelMatrixColor = [];
		let row = 0;
		pixelMatrix[0] = [];
		pixelMatrixColor[0] = [];
		for(let i = 0; i < pixels.length; i += 4) {
			if ( (i / (row + 1)) >= (width * 4) ) {
				pixelMatrix[++row] = [];
				pixelMatrixColor[row] = [];
			}
			let brightness = 255;
			// пиксель не полностью прозрачный
			if (pixels[i + 3] !== 0) {
				
			
				brightness = Math.round(0.34 * pixels[i] + 0.5 * pixels[i + 1] + 0.16 * pixels[i + 2]);
			}
			pixelMatrixColor[row].push(rgba2hex(`rgba(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]})`))
			pixelMatrix[row].push(brightness);
		}

		drawAsciiImage(pixelMatrix, {width: width, height: height}, pixelMatrixColor);
	});
};

// кодируем изображение в Base64 и загружаем его превью
function previewImage() {
	let file = inputFile.files[0];
	let reader = new FileReader();

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

const getScreenshotOfElement = async (element) => {
	try {
		let screenshotDOMElementGraphic = await html2canvas(element).then(console.log("Complete"))
		copyToClipboard(screenshotDOMElementGraphic);
	}	catch(e) {
		console.log(e);
	}
}

async function copyToClipboard(src) {
	await src.toBlob(blob => {
			try {
				navigator.clipboard.write([
					new ClipboardItem({
						[blob.type] : blob,
					})
				]).then(console.log("Copy"));
			} catch(e) {
				console.log(e);
			}
		}
	);
}

function rgba2hex(orig) {
	let a, isPercent,
	  rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
	  alpha = (rgb && rgb[4] || "").trim(),
	  hex = rgb ?
	  (rgb[1] | 1 << 8).toString(16).slice(1) +
	  (rgb[2] | 1 << 8).toString(16).slice(1) +
	  (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
  
	if (alpha !== "") {
	  a = alpha;
	} else {
	  a = 01;
	}
	// multiply before convert to HEX
	a = ((a * 255) | 1 << 8).toString(16).slice(1)
	//hex = hex + a;
  
	return hex;
  }

  function test(colorcode) {
	console.log(colorcode, rgba2hex(colorcode));
  }
