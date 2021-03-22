/*
*   Black box tests are grouped by the usage of the algorithm
*   - small arrays (for verification on small data sets)
*   - big arrays/big numbers (for verification on large data sets or sets of big numbers)
*   - floating values (for verification of collections of float numbers)
*   - negative (for verification of improper data, though this is limited as JS in untyped language by its nature)
*       That said, no test cases like mixed type of data: numbers vs non-numbers etc.
*   - others (like verification if the sorting algorithm is stable)
*   For set completeness, non-functional verification should also be done - like time or resource consumption.
*   But given we don't know the details of algorithm under test, we cannot specify requirements/metrics for this measure.
*
* Note: reference sort() funtion was taken from JS standard lib for comparison of results.
*/

const chai = require('chai')
const expect = chai.expect
const quickSort = require("../QuickSort");
const quickSortV2 = require("../QuickSortV2");

let inputArray
let sortedArray

describe('Black-box testing of a (any) sorting algorithm', () => {
    context('small arrays', () => {
        it('returns correctly already sorted array', () => {
            inputArray = [1, 2, 3, 4, 5, 6]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray)
        });
        it('returns single element if input array contains only 1 element', () => {
            inputArray = [50]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray)
        });
        it('sorts correctly when there are same numbers multiple times', () => {
            inputArray = [5, 8, 5, 12, 5, 19, 5, 2, 3, 4, 6, 5]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('sorts negative numbers correctly', () => {
            inputArray = [-22, -11, 1, -50, 4]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('sorts correctly partially sorted array', () => {
            inputArray = [1, 2, 3, 4, 5, 6, 20, 11, 14, 9]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('sorts correctly reverse sorted array', () => {
            inputArray = [10, 9, 7, 5, 3, 2, 1]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('sorts correctly unsorted array of positive values', () => {
            inputArray = randomArrayGenerator({
                min: 1,
                max: 100,
                elements: 20
            })
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('sorts correctly unsorted array with zeros', () => {
            inputArray = randomArrayGenerator({
                min: 1,
                max: 100,
                elements: 20
            })
            inputArray[10] = 0
            inputArray[14] = 0
            inputArray[19] = 0
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
    })
    context('big arrays/big numbers', () => {
        it('sorts correctly big array', () => {
            inputArray = randomArrayGenerator({
                min: 1,
                max: 10000,
                elements: 10000
            })
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('sorts correctly array of big numbers', () => {
            inputArray = inputArray = randomArrayGenerator({
                min: 1000000000000000,
                max: 9000000000000000,
                elements: 50
            })
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
    })
    context('floating values', () => {
        it('sorts correctly an array of float values', () => {
            inputArray = [1.23, 4.67, 2.11, 8.59, 0.001, 2.00001, 10.333333333]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        })
        it('sorts correctly an array of mix integer and float values', () => {
            inputArray = [1.23, 60, 600, 4.67, 10, 9, 2.11, 8.59, 0.001, 2.00001, 10.333333333, 11, 9]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        })
    })
    context('negative', () => {
        it('returns empty array if empty array input is provided', () => {
            inputArray = []
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql([])
        });
    })
    context('others', () => {
        it('verifies sorting algorithm is stable', () => {
            inputArray = [{
                id: 5,
                name: 'paul'
            }, {
                id: 8,
                name: 'eva'
            }, {
                id: 2,
                name: 'john'
            }, {
                id: 10,
                name: 'nick'
            }, {
                id: 5,
                name: 'kevin'
            }, {
                id: 5,
                name: 'mike'
            }, {
                id: 18,
                name: 'peter'
            }, {
                id: 1,
                name: 'adam'
            }]
            console.log('input array=', inputArray)
            sortedArray = quickSortV2(inputArray)
            console.log('sorted array=', sortedArray)

            const {
                inputArrayIndexes,
                sortedArrayIndexes
            } = findIndexes(['paul', 'kevin', 'mike'])

            console.log(inputArrayIndexes)
            console.log(sortedArrayIndexes)

            // verify that elements with the same id (same key), have relative order maintained
            sortedArrayIndexes.forEach((element, index) => {
                expect(element["index"]).to.be.at.least(inputArrayIndexes[index]["index"])
            })
        });
    })
});

const compareNumbers = (a, b) => a - b

const randomArrayGenerator = ({
    min,
    max,
    elements
}) => {
    let array = []
    let el

    for (var i = 0; i < elements; i++) {
        el = Math.floor(Math.random() * (max - min)) + min;
        array.push(el)
    }
    return array
}

const findIndexes = (names) => {
    let inputArrayIndexes = []
    let sortedArrayIndexes = []
    let index
    names.forEach(name => {
        index = inputArray.findIndex((el, index) => {
            if (el.name === name) {
                return index
            }
        })
        inputArrayIndexes.push({
            name: name,
            index: index
        })

        index = sortedArray.findIndex((el, index) => {
            if (el.name === name) {
                return index
            }
        })
        sortedArrayIndexes.push({
            name: name,
            index: index
        })
    });
    return {
        inputArrayIndexes,
        sortedArrayIndexes
    }
}