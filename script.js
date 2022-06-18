
// Pegando os elementos da página
const inputs = window.document.getElementsByClassName('txt')
const res = window.document.getElementById('res')


// Botões
const buttons = {
    calc: window.document.getElementById('calc-id'),
    clear: window.document.getElementById('clearRes-id'),

    history: {
        history: window.document.getElementById('history-id'),
        clear: null
    }
}


// Configurando o botão de limpar o histórico
buttons.history.clear       = window.document.createElement('button')
buttons.history.clear.id    = 'historyClear-id'
buttons.history.clear.value = 'Limpar histórico'
buttons.history.clear.onclick = 'a()'
//

function a() {console.log('a')}


// Configurando o click dos botões
buttons.calc.addEventListener('click', calcular)
buttons.clear.addEventListener('click', clearRes)
buttons.history.history.addEventListener('click', history)

/* ======================================================== */


// Declarando um array que guardará as equações
let HistoryArr = ['Histórico de equações: <br>', '<br> Nada ainda :P']


// Delcarando uma bool para executar determinada parte do cod apenas 1 vez
let onlyOnce = true


/* ======================================================== */

// Funções
function calcular() {

    // Declarando valores
    const A = inputs[0].value
    const B = inputs[1].value
    const C = inputs[2].value

    /* ======================================================== */

    // Verificando se algum input está vazio
    if(A.length === 0 || B.length === 0 || C.length === 0) {
        return window.alert('Está faltando algum valor')
    }
    
    /* ======================================================== */

    // Declarando os valores que serão usados no histórico
    let A_ofHistory = A
    let B_ofHistory = B
    let C_ofHistory = C
    
    
    /*
     O A não precisa ser modificado como o B e o C,
     pq se ele for positivo não importa se o sinal aparece ou não.
     se for negativo ele já aparece (isso acontece em todos)
    */
    
    // Se o B não tiver - (não for um valor negativo)
    if(!B.includes('-')) {
        
        // Ele recebe ele mesmo, mas, com um + na frente
        B_ofHistory = B.replace(B, `+${B}`)
    }
    
    // Mesma coisa do C
    if(!C.includes('-')) {
    
        C_ofHistory = C.replace(C, `+${C}`)
    }
    
    
    if(onlyOnce) {

        // Tirando o 'Nada ainda :P' do Array
        HistoryArr.pop()


        // Setando a bool para false
        onlyOnce = false
    }


    // Colocando a equação no Array
    HistoryArr.push(`<br> ${A_ofHistory}x²${B_ofHistory}x${C_ofHistory} = 0`)
    
    
    /* ======================================================== */

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
    
    /* ======================================================== */

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
     
    /* ======================================================== */

    /* Declarando uma string do cálculo de delta
     o // será modificado dps
    */
    let DeltaCalc = `${B ** 2}//${-4 * A * C}`

    
    // Se o cálculo não tiver um -, (não for para subtrair)
    if(DeltaCalc.replace('-', '') === DeltaCalc) {

        // Ele recebe um + entre os números
        DeltaCalc = DeltaCalc.replace('//', '+')

     // Senão
    } else {

        // O // é apenas removido do cálculo
        DeltaCalc = DeltaCalc.replace('//', '')
    }

    /* ======================================================== */

    // Colocando o resultado na div de resultados
    res.innerHTML = `<strong> Delta: </strong> <br>
                     Δ = (${B})² - 4.(${A}).(${C}) <br>
                     Δ = ${DeltaCalc} <br>
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
    
    /* ======================================================== */
} 



function clearRes() {

    // "Limpando" a div de resultados
    res.innerHTML = 'Limpo!'


    // Limpando os inputs
    inputs[0].value = ''
    inputs[1].value = ''
    inputs[2].value = ''


    // Focando no 1º input
    inputs[0].focus()
}



function history() {

    /* Limpando a div 

     isso é necessário, pois lá em baixo tem:
        res.innerHTML += ...
    
     ent o que está nela não seria apagado
    */
    res.innerHTML = ''

    
// ======================================================== 


    // Colocando o botão de limpar o histórico na div de resultados
    res.appendChild(buttons.history.clear)


    // Colocando um espaço na div, para a escrita não ficar "colada no botão"
    res.innerHTML += '<br><br>'


// ========================================================


    /* Colocando o histórico na div sem a primeira vírgula 
     EX:
        Histórico de equações:
        ,
        Nada ainda :P


     Aí tiraria essa vírgula
    */
    res.innerHTML += String(HistoryArr).replace(',', '')

}