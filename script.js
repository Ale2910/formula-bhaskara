
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


    /* Declarando a raiz de delta (pra calcular apenas 1 vez a raiz)
     e os valores de X
    */
    const RaizDeDelta = Math.sqrt(Delta)

    let X1 = (-B + RaizDeDelta) / (2 * A)
    let X2 = (-B - RaizDeDelta) / (2 * A)
    
    
    // Se X1 não for um número inteiro
    if(parseInt(X1) !== X1) {

        // Ele fica assim, EX: -4/-2, ao invés de dividir. O replace é para o / ficar em negtito
        X1 = `${-B + RaizDeDelta}<strong>/</strong>${2 * A}`
    }


    // Mesma coisa do X1
    if(parseInt(X2) !== X2) {
        
        X2 = `${-B - RaizDeDelta}<strong>/</strong>${2 * A}`
    }
    

    /* Se o X1 tiver /, (um valor sobre o outro), ele receberá o valor dividido também
     (Precisa do String pra n bugar)
    */
    if(String(X1).includes('/')) {

        // Atribuindo mais valores ao X. (precisa daquele espaço antes do ou)
        X1 += ` ou ${(-B + RaizDeDelta) / (2 * A)}`
    }   

    // Mesma coisa do anterior
    if(String(X2).includes('/')) {

        X2 += ` ou ${(-B - RaizDeDelta) / (2 * A)}`
    }
     


    // Colocando o resultado na div de resultados
    res.innerHTML = `<strong> Delta: </strong> <br>
                     Δ = ${Delta} <strong>|</strong> √Δ = ${RaizDeDelta} <br>
                        <br>
                        
                     <strong> Valores de X: </strong> <br>
                     x = -(${B}) ± √${Delta} <strong>/</strong> 2.(${A}) <br>
                        <br>
                     x¹ = ${-B} + ${RaizDeDelta} <strong>/</strong> ${2 * A} <br>
                     x² = ${-B} - ${RaizDeDelta} <strong>/</strong> ${2 * A} <br>
                        <br>
                     x¹ = ${X1} <br>
                     x² = ${X2}`
} 



function clearRes() {

    // "Limpando" a div de resultados
    res.innerHTML = 'Limpo!'
}