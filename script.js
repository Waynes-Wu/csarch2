const CACHE_BLOCK = 16
const CACHE_LINE = 32
let SEQCOUNTER = 0
let accessCount = 0
let hitCount = 0
let missCount = 0
let hitRate = 0
let missRate = 0
let aveAccessTime = 0
let totalAccessTime = 0
let numberOfMemory;

document.addEventListener('DOMContentLoaded', () => {

    numberOfMemory =  parseInt(document.querySelector('#memBlock').value)
    const dataColumn = document.querySelectorAll('.left .data')
    
    // REMOVE ALL EXISTING DATA
    clearLeftData()

    const testCaseSelect = document.querySelector('select');
    const customTextArea = document.querySelector('textarea');
    let sequence =  testcaseA();
    updateRightTable(sequence)
    

    // Event listener for change in select element
    testCaseSelect.addEventListener('change', function () {
        // update in case there are changes made to forms
        clearLeftData()
        if (this.value == 0) {
            // get data from textarea split 
            sequence = customTextArea.value.split(' ').map(value => parseInt(value));
            console.log(sequence)
        } 
        else {
            let a = this.value 
            if (a == 1){
                sequence = testcaseA()
            }
            if (a == 2){
                sequence = testcaseB()
            }
            if (a == 3){
                sequence = testcaseC()
            }
        }
            // ADD SEQUENCES TO THE TABLE
            updateRightTable(sequence)
            //reset when seuence is changed
            const button = document.querySelector("#reset")
            button.click()
    });

    
    //  STEP-BY-STEP NEXT BUTTON
    document.querySelector("#next").addEventListener('click', () => {

        if (SEQCOUNTER == sequence.length)
            return;

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

        if (returnData.hit == true){
            document.querySelectorAll('.right .hit')[SEQCOUNTER].innerHTML = "&#10003";
            hitCount += 1
        }
        else{
            document.querySelectorAll('.right .miss')[SEQCOUNTER].innerHTML = "&#10003";
            missCount += 1
        }
        
        accessCount += 1
        // index for accessing row in sequence
        SEQCOUNTER += 1

        hitRate = hitCount/accessCount
        missRate = missCount/accessCount
        let fetchDelay = parseInt(document.querySelector('#fetchDelay').value)
        let miss_penalty = (fetchDelay * CACHE_LINE) + 1
        aveAccessTime = (hitRate * 1) + missRate * miss_penalty
        totalAccessTime = (hitCount * CACHE_LINE) + missCount * (1+(CACHE_LINE*fetchDelay))

        // apply changes
        updateOutput()
    })

    // FAST FORWARD BUTTON (100 STEPS)
    document.querySelector('#ffwButton').addEventListener('click', ()=>{
        // if clicked press the button 100 times
        const button = document.querySelector("#next")
        for (let i = 0; i < 100; i++) {
            button.click()
        }
    })

    // RESET BUTTON
    document.querySelector('#reset').addEventListener('click', () => {
        // reset all values
        SEQCOUNTER = 0
        accessCount = 0
        hitCount = 0
        missCount = 0
        hitRate = 0
        missRate = 0
        aveAccessTime = 0
        totalAccessTime = 0
        // reset output
        updateOutput()
        // reset right table
        updateRightTable(sequence)
        // reset left table
        clearLeftData()
    })

    //type of cacha thing: FA, random replacement data
    /*
    # cache blocks: 16
    cache line: 32 words
    read policy: load-through 
    # memory blocks: user input 
    */
})

function updateRightTable(sequence){
    SEQCOUNTER = 0
    right_tbody = document.querySelector('.right tbody')
    right_tbody.innerHTML = ``
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
}

function getRndInteger(min, max) {
    // from min -> to (max - 1)
    return Math.floor(Math.random() * (max - min)) + min;
}


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
        if (nearestOpenSpace == -1) {
            // use randomizer here
            let rdmAccess = getRndInteger(0, cachearray.length)
            returnIndex = rdmAccess;
        }
        else {
            //put input into free space
            returnIndex = nearestOpenSpace
        }
    }
    return {
        hit: hit,
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

function clearLeftData(){
    const dataColumn = document.querySelectorAll('.left .data')
    dataColumn.forEach(el => {
        el.innerHTML = ''
    })
}
//Sequential sequence up to 2n cache blocks(32). repeat sequence 4 times
function testcaseA() {
    arayKo = []
    for (let index = 0; index < 4; index++) {
        // push [0 - 2*CACHE_BLOCK) to array
        for (let j = 0; j < 2 * CACHE_BLOCK; j++) {
            arayKo.push(j)
        }
    }
    return arayKo
}

//Random sequence: 4n blocks (64)
function testcaseB() {
    ahrray = []
    for (let i = 0; i < 4 * CACHE_BLOCK; i++) {
        ahrray.push(getRndInteger(0, numberOfMemory))
    }
    return ahrray
}

//Mid-repeat blocks: start at block 0; 
//repeat sequence in the middle 2 times up to n-1 blocks
//then continue up to 2n
function testcaseC() {
    scARRAY = []

    scARRAY.push(0)

    for (let j = 0; j < 2; j++) {
        for (let i = 1; i < CACHE_BLOCK-1; i++) {
            scARRAY.push(i);
        }        
    }

    for (let i = CACHE_BLOCK -1; i < 2 * CACHE_BLOCK; i++) {
        scARRAY.push(i);
    }
    return scARRAY
}

function updateOutput(){
    let outputArr = document.querySelectorAll('ol span')
    outputArr[0].innerHTML = accessCount
    outputArr[1].innerHTML = hitCount
    outputArr[2].innerHTML = missCount
    outputArr[3].innerHTML = `${Math.round(hitRate * 10000)/100}%`
    outputArr[4].innerHTML = `${Math.round(missRate * 10000)/100}%`
    outputArr[5].innerHTML = aveAccessTime
    outputArr[6].innerHTML = totalAccessTime
}