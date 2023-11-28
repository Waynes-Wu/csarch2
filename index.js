const CACHE_BLOCK = 16
const CACHE_LINE = 32
var AVAILABLE_SPACE = CACHE_BLOCK
document.addEventListener('DOMContentLoaded', () => {

    const dataColumn = document.querySelectorAll('.left .data')
    dataColumn.forEach(el => {
        el.innerHTML = ''
    })

    // ! DEBUGING PART

    // change block 4 into 1
    dataColumn[3].innerHTML = 1


    // -------------------

    const cacheArray = Array.from(dataColumn).map(el => el.innerHTML);
    console.log(cacheArray)
    let returnData = cachaAccess(2, cacheArray)
    console.log(returnData.hit)
    console.log(returnData.index)




    //type of cacha thing: FA, random replacement data
    /*
    # cache blocks: 16
    cache line: 32 words
    read policy: load-through 
    # memory blocks: user input 
    */

    const sequence = []


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
        
    }
    return arayKo 

//Random sequence: 4n blocks (64)
}
function testcaseB(){
    disarrayMe = []
    return
}

//Mid-repeat blocks: start at block 0; 
function testcaseC(){
    scARRAY = []
    return scARRAY
}
