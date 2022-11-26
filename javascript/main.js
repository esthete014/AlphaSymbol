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
function drawAsciiImage(colors, params, hexColors){
	let ASCIIColors = alphabets[alphabets.findIndex(el => el.name == dropList.value)].string.split('');

	let width = params.width || 0;
	let height = params.height || 0;

	// если изображение больше maxWidth * maxHeight px, то не рисуем каждый пиксель,
	// а рисуем с шагом ratioWidth (ratioHeight)
	var ratioWidth = Math.ceil(width / maxWidth);
	var ratioHeight = Math.ceil(width / maxHeight);

	//var str = '<font color="#fa8e47"</font>';
	//var str = '<font color="#fa8e47"</font>';
	let str = '' ;
	let hex;
	let counter = 0;
	for(var i = 0; i < height; i += ratioHeight) {
		var row = colors[i];
		hex = hexColors[i];
		//console.log(row);
		for(var j = 0; j < width; j += ratioWidth) {
			var color = row[j];
			var symbol = ASCIIColors[color > 0 ? Math.ceil(color / 255 * ASCIIColors.length) - 1 : 0];
			//str += `<font color="${hex}"</font>`;
			str += `<mark class='Symbol_${counter}' >${symbol}</mark>`; //style="background: white"
			counter++;
			//str += `<mark class='Symbol_${counter}' style = "background: #${hexColors[i]}">${symbol}</mark>`;
			//counter++;
			//asciiImage.innerHTML = asciiImage.innerHTML + str;
			//str = '';
		}
		//console.log(hex);
		str += `<br>`;
	}

	asciiImage.innerHTML = str;
	//console.log(document.querySelector(`body`).style.background = '#00ced1');
	//console.log(document.getElementsByClassName(`Symbol_${1}`).style = "background: #00ced1");
	//document.querySelector(`.Symbol_${1}`).style.color = hexColors[1];
	//console.log(document.querySelector(`.Symbol_${1}`));
	let c = 0;

	for(var i = 0; i < height; i += ratioHeight) {
		for(var j = 0; j < width; j += ratioWidth) {
			let char = document.querySelector(`.Symbol_${c}`);
			c++;
			char.style = `background: #010010; color: #${hexColors[i][j]}`; // char.style = `background: #${hexColors[i][j]}; color: #${hexColors[i][j]}`; // `background: white; color: #${hexColors[i][j]}`
			//console.log(char);
		//console.log(char);
		// let char = document.querySelector(`.Symbol_${counter}`);
		// console.log(char);
		//char.style.background = hexColors[i];
		}
	}
	//console.log(hexColors);
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
		//console.log(pixels);
		// каждый пиксел предствлен 4-мя значениями, например [... , 34, 136, 204, 255, ...];
		// используя первые три значения, получаем нужный оттенок серого цвета
		// и записываем значение в двумерный массив
		let pixelMatrix = [];
		let pixelMatrixColor = [];
		var row = 0;
		pixelMatrix[0] = [];
		pixelMatrixColor[0] = [];
		for(var i = 0; i < pixels.length; i += 4) {
			if ( (i / (row + 1)) >= (width * 4) ) {
				pixelMatrix[++row] = [];
				pixelMatrixColor[row] = [];
			}
			//test(`rgba(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]}, ${pixels[i + 3]})`);
			//pixelMatrixColor[row].push(argbToRGB(`rgba(${i}, ${i + 1}, ${i + 2}, ${i + 3})`));
			let brightness = 255;
			// пиксель не полностью прозрачный
			if (pixels[i + 3] !== 0) {
				
			
				brightness = Math.round(0.34 * pixels[i] + 0.5 * pixels[i + 1] + 0.16 * pixels[i + 2]);
			}
			pixelMatrixColor[row].push(rgba2hex(`rgba(${pixels[i]}, ${pixels[i + 1]}, ${pixels[i + 2]})`))
			pixelMatrix[row].push(brightness);
		}

		drawAsciiImage(pixelMatrix, {width: width, height: height}, pixelMatrixColor);
		//srceenshot
		const content = document.querySelector('.js-ascii-image');
  		getScreenshotOfElement(content);
		
		//console.log(div);
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

const getScreenshotOfElement = async (element) => {
	//const _image = await html2canvas(element).then(canvas => canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))).then(alert("Screenshot"));
	await html2canvas(element).then(canvas => canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})]))).then(c => alert("Screenshot complete"));
	
	//document.body.appendChild(_image)
	//html2canvas(document.querySelector("#copyToImage")).then(canvas => canvas.toBlob(blob => navigator.clipboard.write([new ClipboardItem({'image/png': blob})])));
}

function argbToRGB(argb) {
	//return '#' + argb.match(/[0-9|.]+/g).map((x,i) => i === 3 ? parseInt(255 * parseFloat(x)).toString(16) : parseInt(x).toString(16)).join('')

	//return "#00" + argb[1].toString(16) + argb[2].toString(16) + argb[3].toString(16);
	//return ((parseInt(argb,10)) & 0x00FFFFFF).toString(16);
	//let str = '#00';
	//str += (parseInt(num,10)) & 0x00FFFFFF;
    return "#" + argb.toString(16).padStart(6, '0');
}

function rgba2hex(orig) {
	var a, isPercent,
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


  //let body = document.querySelector('body').style.background = '#' + rgba2hex('rgba(111, 222, 333, 255)');
  //console.log(body);
  //test("rgba(0, 255, 0, 0.5)");