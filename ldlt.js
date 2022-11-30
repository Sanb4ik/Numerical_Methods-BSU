const matrix = [
    [10, 2, 3],
    [2, 13, 4],
    [3, 4, 12]
]
let B = [15, 17, 19]
let L_Down = []; L_Down.length = 3
let L_Up = []; L_Up.length = 3
let D = []; D.length = 3

function Make_D(matrix, index){
switch(index){
        case(0):{
            D[0][0] = matrix[0][0];
            break;}
        case(1):{
            // console.log(matrix[1][1], '\t',D[0][0],'\t', L_Down[1][0], '\n', Math.pow(L_Down[1][0],2));
            D[1][1] = matrix[1][1] - D[0][0] * Math.pow(L_Down[1][0],2);
            break;}
        case(2):{
            D[2][2] = matrix[2][2] - D[0][0] * L_Down[2][0]**2 - D[1][1] * L_Down[2][1]**2
            break;}
    }
     console.log('---Make D:\n',D)
}

function Make_L(matrix, index){
    switch(index) {
        case(0):{
            L_Down[1][0] = matrix[1][0]/D[0][0]
            L_Down[2][0] = matrix[2][0]/D[0][0]
            break
        }
        case(1): {
            L_Down[2][1] = (matrix[2][1] - D[0][0] * L_Down[1][0]*L_Down[2][0])/D[1][1]
            break
        }
        default: {console.log('default')
            break}
    }
    console.log('---Make L_Down:\n',L_Down)
}

function Init_L_D(L, D){
    for(let i = 0; i < L.length; i++){
        L[i] = []
        D[i] = []
        for(let j = 0; j < L.length; j++){
            if(i == j) L[i][j] = D[i][j] = 1
            else L[i][j] = D[i][j] = 0
        }
    }
    console.log('---Init:\nL_Down:\n',L,'\nD:\n',D)
}

function Transpouse(L_Down){
    for(let i = 0; i < 3; i++){
        L_Up = L_Down[i].map((col, i) => L_Down.map(row => row[i]))
    }
    console.log('---Transpouse:\n\tL_Down:\n\t',L_Down,"\n\tL_Up:\n\t", L_Up)
}



function UpReverseMotion(L, B){
    console.log(L)
    let x3 = B[2]
    let x2 = B[1]-L[1][2]*x3
    let x1 = B[0]-L[0][1]*x2-L[0][2]*x3
    B.splice(0,3)
    B.push(x1, x2, x3)
    console.log('L_Up answers:\n',B)
}

function DownReverseMotion(L, B){
    let x1 = B[0]
    let x2 = B[1]-L[1][0]*x1
    let x3 = B[2]-L[2][0]*x1-L[2][1]*x2
    console.log(B)
    B.splice(0,3)
    B.push(x1, x2, x3)
    console.log('L_Down answers:\n',x1, x2, x3, B)
}

function DiagonalMoution(D, B){
    console.log(B[1], D[1][1])
    let x1 = B[0]/D[0][0]
    let x2 = B[1]/D[1][1]
    let x3 = B[2]/D[2][2]
    B.splice(0,3)
    B.push(x1, x2, x3)
    console.log('\ndiagonal:\n',x1, x2, x3)
}

function ldlt(){
    for(let i = 0; i < matrix.length; i++){
        Make_D(matrix,i)
        Make_L(matrix,i)
    }
}

Init_L_D(L_Down, D)
ldlt()
Transpouse(L_Down, L_Up)

DownReverseMotion(L_Down, B)
// DiagonalMoution(L_Down,B)
DiagonalMoution(D,B)
UpReverseMotion(L_Up, B)
