const buttons = document.querySelector('.buttons')
const process = document.querySelector('.process')
const result = document.querySelector('.result')

let processScreen = '', resultScreen = '', flag = 0

buttons.addEventListener('click', e => {
    if (e.target.nodeName === 'BUTTON') {
        const type = e.target.dataset.type
        if (type === 'clear') {
            clear()
        } else if (type === 'backspace') {
            backspace()
        } else if (type === 'percent') {
            percent()
        } else if (type === 'operation') {
            operation(e.target.innerHTML)
        } else if (type === 'equal') {
            equal()
        } else {
            pushNumber(e.target.innerHTML)
        }
    }

})
// 清空
function clear() {
    processScreen = ''
    resultScreen = ''
    flag = 0
    process.innerHTML = ''
    result.innerHTML = '0'
}
// 后退一格
function backspace() {
    processScreen = processScreen.slice(0, -1)
    process.innerHTML = processScreen
    if (processScreen === '') {
        resultScreen = ''
        flag = 0
        result.innerHTML = '0'
    } else {
        result.innerHTML = ''
    }
}
// 百分号
function percent() {
    equal()
    resultScreen = resultScreen / 100
    result.innerHTML = resultScreen
}
// 运算符
function operation(operator) {
    if (processScreen === '') return
    if(flag!==0){
        equal()
        processScreen = resultScreen     
    }
    processScreen += operator
    process.innerHTML = processScreen
    flag++
}
// 数字输入
function pushNumber(num) {
    processScreen += num
    process.innerHTML = processScreen
    result.innerHTML = ''
    if(processScreen.length > 12){
        alert('数据过大')
        backspace()
    }
}
// 等于运算
function equal() {
    let a = /\+|\-|\*|\÷/;
    let arr = processScreen.split(a)
    let sign = processScreen.match(a)[0]
    switch (sign) {
        case '+':
            resultScreen = +arr[0] + +arr[1]
            break;
        case '-':
            resultScreen = arr[0] - arr[1]
            break;
        case '*':
            resultScreen = arr[0] * arr[1]
            break;
        case '÷':
            resultScreen = arr[0] / arr[1]
            resultScreen =Math.round(resultScreen*(10**8)) /(10**8)
            break;
        default:
            break;
    }
    result.innerHTML=resultScreen
}