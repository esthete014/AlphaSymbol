
export function setWidth(value) {
    localStorage.setItem('GlobalWidth', JSON.stringify(value))  
} 

export function getWidth() {
    return JSON.parse(localStorage.getItem('GlobalWidth'))
}

export function setHeight(value) {
    localStorage.setItem('GlobalHeight', JSON.stringify(value))  
}

export function getHeight() {
    return JSON.parse(localStorage.getItem('GlobalHeight'))
}

export function setAlphabet(value) {
    localStorage.setItem('SelectedAlphabet', JSON.stringify(value))
}

export function getAlphabet(value) {
    return JSON.parse(localStorage.getItem('SelectedAlphabet'))
}

export function setBackColor(value) {
    localStorage.setItem('BackColor', JSON.stringify(value)) 
}

export function getBackColor() {
    return JSON.parse(localStorage.getItem('BackColor'))
}

export function setSymbolsColor(value) {
    localStorage.setItem('SymbolsColor', JSON.stringify(value))  
}

export function getSymbolsColor() {
    return JSON.parse(localStorage.getItem('SymbolsColor'))
}