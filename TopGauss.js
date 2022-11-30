import { max } from "mathjs"

//8
let matrix = [
    // [2.31,31.49,1.52, 40.95],
    // [4.21, 22.42, 3.85, 30.24],
    // [3.49, 4.85, 28.72, 42.81]
    [1,2,1,1],
    [-1,-2,2,1],
    [0,1,1,2]
    // [10, 2, 3, 15],
    // [2, 13, 4, 17],
    // [3, 4, 12, 19]
]
let matrix_copy =[ 
    // [10, 2, 3, 15],
    // [2, 13, 4, 17],
    // [3, 4, 12, 19]
    [1,2,1,1],
    [-1,-2,2,1],
    [0,1,1,2]
]
//
// let matrix =[
//     [2.74, -1.18,3.17, 2.18],
//     [1.12, 0.83, -2.16,-1.15],
//     [0.81, 1.27, 0.76, 3.23]
// ]

// let matrix_copy =[
//     [2.74, -1.18, 3.17, 2.18],
//     [1.12, 0.83, -2.16, -1.15],
//     [0.81, 1.27, 0.76, 3.23]
// ]

let answers = []
let answers_copy = []
let infelicitys = []
let infelicitys_copy = []

if(matrix[0].length !== matrix.length+1 ) throw 'a lot of answers';

function MaxInCollumn(col, matrix){
    let max = Number.NEGATIVE_INFINITY
    let index = -1;
    for (let i = 0; i < matrix.length; i++) {
        if (Math.abs(matrix[i][col]) > max && matrix[i][col] !== 0) {
            max = matrix[i][col]
            index = i
        }
    }
    
    if(max == 0 || index == -1) throw 'Max element = 0 !';
    console.log(max)
    return index
}

function ChangeToTop(row_now, row_max, matrix){
    if(row_now !== row_max){
        console.log(row_now, row_max)
        const temp = matrix[row_max].map(n=>n)
        matrix[row_max]=matrix[row_now].map(n=>n)
        matrix[row_now]=temp
    }
   
    console.log("ChangeToTop:\n", matrix)
}

function Normalisation(row, matrix){
    const temp = matrix[row][row]
    for(let i = 0; i < matrix.length+1; i++) {
        matrix[row][i]/=temp
    }
    console.log("Normalisation:\n", matrix)
}

function DoZeros(row_now, matrix){
    for(let i = row_now+1; i < matrix.length; i++) {
        //console.log(i,row_now)
        let temp = matrix[i][row_now]
        var take_minus = -1

        if(temp > 0)
            take_minus = -1
        
        for(let j = 0; j < matrix.length+1; j++) {
            matrix[i][j] +=matrix[row_now][j]*temp*take_minus;
        }
    }
    console.log("DoZeros:\n", matrix)
}
export function ReverseMotion(matrix, k){

   let x3 = matrix[2][3]
   let x2 = matrix[1][3]-matrix[1][2]*x3
   let x1 = matrix[0][3]-matrix[0][1]*x2-matrix[0][2]*x3
   console.log(x1, x2, x3)
   if(k == 1) answers.push(x1, x2, x3)
   else answers_copy.push(x1, x2, x3)
}

export function AntiReverseMotion(matrix){
    let x1 = matrix[0][3]
    let x2 = matrix[1][3]-matrix[1][0]*x1
    let x3 = matrix[2][3]-matrix[2][0]*x1-matrix[2][1]*x2
    console.log(x1, x2, x3)
}


function Fallibility(matrix, k){
    // console.log(matrix_copy)
    for(let i = 0; i < matrix.length; i++){
        let sum = 0; 
        for (let j = 0; j < matrix.length; j++){
            if(k == 1) sum+=matrix_copy[i][j] * answers[j]
            else sum+=matrix_copy[i][j] * answers_copy[j]
            //matrix_copy[i][j]
        }
        console.log(sum, matrix_copy[i][3])
        if(k == 1) 
            infelicitys.push(matrix_copy[i][3]-sum)
        else 
            infelicitys_copy.push(matrix_copy[i][3]-sum)
        matrix_copy[i][3] = sum
    }
    // console.log(matrix_copy)
}

export function Gauss(matrix){
    for(let i = 0; i < matrix.length; i++){
        const row_max = MaxInCollumn(i, matrix)
        ChangeToTop(i, row_max, matrix)
        Normalisation(i, matrix)
        DoZeros(i,matrix)
    }
}

function Fault(ans_1, ans_2){
    let delta = 0;
    let ans_max = 0;
    for(let i = 0; i < ans_1.length; i++){
        let temp = Math.abs(ans_1[i] - ans_2[i]);
        if(delta < temp)
            delta = temp;
    }
    for(let i = 0; i < ans_1.length; i++){
        if(ans_max < Math.abs(ans_1[i])){
            ans_max = ans_1[i]
        }
    }
    let err  = delta / ans_max
    console.log('Fault:\n',delta,'/',ans_max, '=',err)

}

Gauss(matrix)
ReverseMotion(matrix, 1)
console.log('answers:\n',answers)
Fallibility(matrix, 1)
console.log('nevyazka:\n',infelicitys,
            '\nnorma nevyazki:\n', 
            Math.max(...infelicitys.map(
                el => Math.abs(el))),
'\n___________________________________________________\n')



Gauss(matrix_copy)
ReverseMotion(matrix_copy, -1)
Fallibility(matrix_copy, -1)
console.log('answers_1\n', answers,'\nanswers_2\n', answers_copy)
Fault(answers, answers_copy)