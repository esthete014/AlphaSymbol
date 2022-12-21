import { alphabets } from "./otherFunc";
import { getHeight, getWidth, getAlphabet } from "./Storage";
import { getBackColor, getSymbolsColor } from "./Storage";
// drop list TODO
export default function drawAsciiImage(colors, params, hexColors){
	let ASCIIColors = alphabets[alphabets.findIndex(el => el.name == alphabets[getAlphabet()].name)].string.split('');
    let asciiImage = document.querySelector('.js-ascii-image');
	let width = params.width || 0;
	let height = params.height || 0;

	// если изображение больше maxWidth * maxHeight px, то не рисуем каждый пиксель,
	// а рисуем с шагом ratioWidth (ratioHeight)
	let ratioWidth = Math.ceil(width / getWidth());
	let ratioHeight = Math.ceil(width / getHeight());

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
			char.style = `background: #${getBackColor() ? hexColors[i][j] : '010010'}; color: #${getSymbolsColor() ? hexColors[i][j] : 'ffffff'}`; // char.style = `background: #${hexColors[i][j]}; color: #${hexColors[i][j]}`; // `background: white; color: #${hexColors[i][j]}`
		}
	}
} // `background: #010010; color: #${hexColors[i][j]}`
//char.style = `background: #${getBackColor() ? hexColors[i][j] : '010010'};