import { rgba2hex } from "./otherFunc";
import drawAsciiImage from "./drawASCII.jsx";
export function getPixelsColorCode(imageBase64) {
	let image = new Image();

	image.src = imageBase64;
    let limit = 4000000
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