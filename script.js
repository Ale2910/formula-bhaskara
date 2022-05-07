
// Pegando os elementos HTML
const inputs = window.document.getElementsByClassName('txt')
const res = window.document.getElementById('res')

const buttons = {
    calc: window.document.getElementById('calc'),
    clear: window.document.getElementById('clearRes')
}

// Configurando o click dos botões
buttons.calc.addEventListener('click', calcular)
buttons.clear.addEventListener('click', clearRes)



// Funções
function calcular() {

    // Declarando valores
    const A = inputs[0].value
    const B = inputs[1].value
    const C = inputs[2].value


    // Verificando se algum input está vazio
    if(A.length === 0 || B.length === 0 || C.length === 0) {
        return window.alert('Está faltando algum valor')
    }


    // Declarando o delta Δ
    const Delta = B ** 2 - 4 * A * C


    // Verificando se o delta é menor que 0
    if(Delta < 0) {
        return res.innerHTML = 'V = ∅'
    }


    // Declarando os valores de X
    let X1 = (-B + Math.sqrt(Delta)) / (2 * A)
    let X2 = (-B - Math.sqrt(Delta)) / (2 * A)

    
    // Se X1 não for um número inteiro
    if(parseInt(X1) !== X1) {

        // Ele fica assim, EX: -4/-2. ao invés de dividir
        X1 = `${(-B + Math.sqrt(Delta))}/${2 * A}`
    }


    // Mesmca coisa do X1
    if(parseInt(X2) !== X2) {
        
        X2 = `${(-B + Math.sqrt(Delta))}/${2 * A}`
    }


    res.innerHTML = `Δ = ${Delta} <br><br> 
                     x¹ = ${X1} <br>
                     x² = ${X2}`
}


function clearRes() {

    res.innerHTML = 'Limpo!'
}