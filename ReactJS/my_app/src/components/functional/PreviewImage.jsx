import { getPixelsColorCode } from "./getPixels.jsx";
import { getAlphabet } from "./Storage.jsx";
export default function PreviewImage() {
    let preview = document.querySelector('.previewIMG');
    let inputFile = document.getElementsByClassName('uploadPicture')

	let file = inputFile[0].files[0]
	let reader = new FileReader();
	reader.onloadend = function() {
        //alert('Загружается фоточка');
		preview.src = reader.result;
        if (getAlphabet() !== "") {
            getPixelsColorCode(preview.src);
        }
        else {
            alert('Выберите набор букв.');
        }
	};
	if (file) {
        reader.readAsDataURL(file)
	} else {
		alert('Выберите изображение.');
	}
}

//inputFile.addEventListener('change', previewImage);