const CACHE_BLOCK = 16
const CACHE_LINE = 32
let SEQCOUNTER = 0
let memoryAccessCount = 0
let hitCount = 0
let missCount = 0
let hitRate = 0
let accessCount = 0
let missRate = 0
let aveAccessTime = 0
let totalAccessTime = 0
let numberOfMemory = parseInt(document.querySelector('#memBlock').value)

document.addEventListener('DOMContentLoaded', () => {

    // REMOVE ALL EXISTING DATA
    const dataColumn = document.querySelectorAll('.left .data')
    dataColumn.forEach(el => {
        el.innerHTML = ''
    })

    const testCaseSelect = document.querySelector('select');
    const customTextArea = document.querySelector('textarea');
    let sequence = testcaseA();
    updateRightTable(sequence)


    // Event listener for change in select element
    testCaseSelect.addEventListener('change', function () {
        // update in case there are changes made to forms
        console.log(sequence)
        if (this.value == 0) {
            // get data from textarea split 
            sequence = customTextArea.value.split(' ').map(value => parseInt(value));
        }
        else {
            let a = this.value
            if (a == 1) {
                sequence = testcaseA()
            }
            if (a == 2) {
                sequence = testcaseB()
            }
            if (a == 3) {
                sequence = testcaseC()
            }
        }
        // ADD SEQUENCES TO THE TABLE
        updateRightTable(sequence)
    });


    //  ACTION FOR BUTTON
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

        if (returnData.hit == true) {
            document.querySelectorAll('.right .hit')[SEQCOUNTER].innerHTML = "&#10003";
            hitCount += 1
        }
        else {
            document.querySelectorAll('.right .miss')[SEQCOUNTER].innerHTML = "&#10003";
            missCount += 1
        }

        accessCount += 1
        // index for accessing row in sequence
        SEQCOUNTER += 1

        hitRate = hitCount / accessCount
        missRate = missCount / accessCount
        let fetchDelay = parseInt(document.querySelector('#fetchDelay').value)
        let miss_penalty = (fetchDelay * CACHE_LINE) + 1
        aveAccessTime = (hitRate * 1) + missRate * miss_penalty
        totalAccessTime = (accessCount * aveAccessTime)

        // apply changes
        updateOutput()
    })

    //type of cacha thing: FA, random replacement data
    /*
    # cache blocks: 16
    cache line: 32 words
    read policy: load-through 
    # memory blocks: user input 
    */
})



function updateRightTable(sequence) {
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
//then continue uup to 2n
//EX: 
function testcaseC() {
    scARRAY = []
    scARRAY.push(0)
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < CACHE_BLOCK - 1; i++) {
            const scARRAY = i;
        }
    }
    return scARRAY
}

function updateOutput() {
    let outputArr = document.querySelectorAll('ol span')
    outputArr[0].innerHTML = accessCount
    outputArr[1].innerHTML = hitCount
    outputArr[2].innerHTML = missCount
    outputArr[3].innerHTML = hitRate
    outputArr[4].innerHTML = missRate
    outputArr[5].innerHTML = aveAccessTime
    outputArr[6].innerHTML = totalAccessTime
}