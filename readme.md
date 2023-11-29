# Cache Simulation Project
A cache simulation web application made as part of the requirements for __CSARCH2__.
Description~~~~

**Cache Memory Type:** FA + Random replacement algorithm

## Authors
**GROUP 1 | S13**
- Co Chiong, Shawn
- [Sia, Chantal Hyacynth](https://github.com/AisuChantal)
- [Veron, Ana Muriel](https://github.com/anamurielveron)
- [Wu, Waynes Weyner](https://github.com/Waynes-Wu)

## Analysis

### Test Case A
Type of replacement algorithm: FA, random replacement data
cache blocks: 16
cache line: 32 words
read policy: load-through
Input data: 0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0,1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31

In this test case the sequence contains the numbers 0 to 31 repeated 4 times for a total sequence length of 128 (32* 4). The first 16 passes are the same where cache block 0 - 15 all receive new data to store. Then on sequence #17 after finding no more empty spaces to fill it triggers our random replacement algorithm where it will pick a random block to replace with the new input. It searches for copies  before using the replacement algorithm. After the first sequence of 0 -31 is the second iteration which gives it a chance to “hit”. After finding a copy it increments hit count and continues on like this until the last data input. 

For this run the hit rate was 9.38% and the miss rate was 90.63%. The average memory access time was 291 with a total of 37248.


### Test Case B
Type of replacement algorithm: FA, random replacement data
cache blocks: 16
cache line: 32 words
read policy: load-through
Input data: [64 random numbers, range 0-31]

In this test case the sequence data are random numbers. The code starts filling up the blocks until no more can be filled in which case it triggers our random replacement algorithm. After checking there exists no copy of the data to hit, it finds a random cache block to replace and repeats this process until it finds a match. It will increment our hit count ( while it was previously incrementing miss count only) before continuing again. 

With this range we got an average of 20% hit rate and 80% miss rate. 
By changing the range of the data numbers we can observe that it drastically changes the hit rate as the sample size increases which makes the code replace more often as it has a large amount of numbers to forget and remember. 

### Test Case C
Type of replacement algorithm: FA, random replacement data
cache blocks: 16
cache line: 32 words
read policy: load-through
Input: 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31

In this test case it follows the same pattern as previous where in the beginning data fills our cache blocks. However in this case the data inputs trigger the hit on the midway as it reaches 1 (sequence [16]). It triggers hits continuously until 16 where it turns back to misses. The random replacement algorithm triggers again from data input 17 onwards where the algorithm picks a random cache block and replaces its data with new data. Upon reaching the next midway iteration some numbers that were not randomly replaced trigger a hit.

For this run the hit rate was 30%~ while the miss rate was ~70%. The average memory access time was 223 with a total of 10720.
