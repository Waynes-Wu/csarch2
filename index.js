const CACHE_BLOCK = 16
const CACHE_LINE = 32
var AVAILABLE_SPACE = CACHE_BLOCK
let SEQCOUNTER = 0
document.addEventListener('DOMContentLoaded', () => {

    const dataColumn = document.querySelectorAll('.left .data')
    dataColumn.forEach(el => {
        el.innerHTML = ''
    })

    // put sequences in right side
    right_tbody = document.querySelector('.right tbody')
    let sequence = testcaseA()
    for (let index = 0; index < sequence.length; index++) {
        right_tbody.innerHTML += `
        <tr>
            <td class="sequence">${sequence[index]}</td>
            <td class="hit"></td>
            <td class="miss"></td>
            <td class="blockNumber"></td>
        </tr>
    `
    }

    // ! DEBUGING PART
    
    // change block 4 into 1
    dataColumn[3].innerHTML = 1
    
    // -------------------
    
    document.querySelector("#next").addEventListener('click', ()=>{
        // array of cache
        const cacheArray = Array.from(dataColumn).map(el => el.innerHTML);
        console.log(cacheArray)
        
        let currentSeq = document.querySelectorAll('.right .sequence')[SEQCOUNTER].innerHTML;
        let returnData = cachaAccess(currentSeq, cacheArray)
        console.log(returnData.hit)
        console.log(returnData.index)
        
        // 
        document.querySelectorAll('.right .blockNumber')[SEQCOUNTER].innerHTML = returnData.index;
        
        // at cache memory [index] replace the data
        dataColumn[returnData.index].innerHTML = currentSeq

        if (returnData.hit == true)
            document.querySelectorAll('.right .hit')[SEQCOUNTER].innerHTML = "&#10003";
        else
            document.querySelectorAll('.right .miss')[SEQCOUNTER].innerHTML = "&#10003";
        // replace hit or no hit
        
        SEQCOUNTER += 1
    })
    

    

    // replace right block with index
    // replace hit or no hit 




    //type of cacha thing: FA, random replacement data
    /*
    # cache blocks: 16
    cache line: 32 words
    read policy: load-through 
    # memory blocks: user input 
    */




})


//define functions here
function getRndInteger(min, max) {
    // from min -> to (max - 1)
    return Math.floor(Math.random() * (max - min)) + min;
}
//  just assume m will be > 2n


function cachaAccess(input, cachearray) {
    input = input.toString()
    
    let hit = false
    let returnIndex

    //check existence
    let searchlight = cachearray.indexOf(input)
    // found
    if (searchlight != -1) {
        hit = true
        returnIndex = searchlight
    }
    // not found
    else {
        let nearestOpenSpace = cachearray.indexOf('') //gets a free soace

        //  this means that there is no more free space
        if( nearestOpenSpace == -1){
            // use randomizer here
            let rdmAccess = getRndInteger(0, cachearray.length)
            returnIndex = rdmAccess;
        }
        else{
            //put input into free space
            returnIndex = nearestOpenSpace
        }
    }
    
    return {
        hit : hit,
        index: returnIndex
    }
}

    /*
    ! TEST CASES
    * A:
        sequential (0 - m)
        repeat 4 times
    * B:
        random(o - m-1) 
        repeat 48 times
    * C:
        0
        1 - (n-2) 
        1 - (n-2) 
        (n-1) - 2n
    */

    
//Sequential sequence up to 2n cache blocks(32). repeat sequence 4 times
function testcaseA(){
    arayKo = []
    for (let index = 0; index < 4; index++) {
        // push [0 - 2*CACHE_BLOCK) to array
        for(let j = 0; j < 2*CACHE_BLOCK; j++){
            arayKo.push(j)
        }
    }
    return arayKo 
}

//Random sequence: 4n blocks (64)
function testcaseB(){
    ahrray = []
    return
}

//Mid-repeat blocks: start at block 0; 
//repeat sequence in the middle 2 times up to n-1 blocks
//then continue uup to 2n
//EX: 
function testcaseC(){
    scARRAY = []
    return scARRAY
}
