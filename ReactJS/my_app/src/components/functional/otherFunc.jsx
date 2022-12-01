//import html2canvas from './html2convas'


export let alphabets = [
	{ string: '◼▩▨▦▥▣◫▢', name: 'Default'},
	{ string: '◆▶◈◭◬◇▷', name: 'Triangle'},
	{ string: '刺ぽをまちんのこ', name: 'Japan'},
	{ string: '顔笑泣心でてくっ', name: 'China'},
	{ string: 'MWNX0Okdlxoc;:,.', name: 'ASCII'},
	{ string: '製語道地食言あま本すセうワくー', name: 'Retro'},
	{ string: '⣿⠿⠟⠛⠋⠉⠁', name: 'Dots'},
	{ string: '@#%=+*:-.', name: 'Default ASCII'},
	{ string: '█▓▒░', name: 'Contrast'},
	{ string: '█▓▒░ ', name: 'Contrast2'},
	{string: '■□', name: 'Simple'}
];

// export const getScreenshotOfElement = async (element) => {
// 	try {
// 		let screenshotDOMElementGraphic = await html2canvas(element).then(console.log("Complete"))
// 		//copyToClipboard(screenshotDOMElementGraphic);
// 	}	catch(e) {
// 		console.log(e);
// 	}
// }

// export async function copyToClipboard(src) {
// 	await src.toBlob(blob => {
// 			try {
// 				navigator.clipboard.write([
// 					new ClipboardItem({
// 						[blob.type] : blob,
// 					})
// 				]).then(console.log("Copy"));
// 			} catch(e) {
// 				console.log(e);
// 			}
// 		}
// 	);
// }

export function rgba2hex(orig) {
	let a, isPercent,
	  rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
	  alpha = (rgb && rgb[4] || "").trim(),
	  hex = rgb ?
	  (rgb[1] | 1 << 8).toString(16).slice(1) +
	  (rgb[2] | 1 << 8).toString(16).slice(1) +
	  (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
  
	if (alpha !== "") {
	  a = alpha
	} else {
	  a = '01'
	}
	// multiply before convert to HEX
	a = ((a * 255) | 1 << 8).toString(16).slice(1)
	//hex = hex + a;
  
	return hex;
  }