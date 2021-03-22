/*
*   Black box tests are grouped by the typical use cases:
*   - small arrays (for verification on small data sets)
*   - big arrays/big numbers (for verification on large data sets or sets of big numbers)
*   - floating values (for verification of collections of float numbers)
*   - negative (for verification of improper data, though this is limited as JS in untyped language by its nature)
*       That said, test cases like mixed type of data: numbers vs non-numbers are not particularly practical.
*   - others (like verification if the sorting algorithm is stable)
*   For set completeness, non-functional verification should also be done - like time or resource consumption.
*   But given we don't know the details of algorithm under test, we cannot specify requirements/metrics for this measure.
*
* Notes: 
*   reference sort() function was taken from JS standard lib for comparison of results.
*   sorting function was slightly modified (inside QuickSortV2) to support input array of objects to check algorithm's stability
*   
*/

const chai = require('chai')
const expect = chai.expect
const quickSort = require("../QuickSort");
const quickSortV2 = require("../QuickSortV2");

let inputArray
let sortedArray

describe('Black-box testing of a (any) sorting algorithm', () => {
    // group 1: small arrays
    context('small arrays', () => {
        // it needs to work with input data already sorted
        it('returns correctly already sorted array', () => {
            inputArray = [1, 2, 3, 4, 5, 6]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray)
        });
        // it needs return input data when it has only a single element
        it('returns single element if input array contains only 1 element', () => {
            inputArray = [50]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray)
        });
        // another case is when in the input array some values are duplicated
        it('sorts correctly when there are same numbers multiple times', () => {
            inputArray = [5, 8, 5, 12, 5, 19, 5, 2, 3, 4, 6, 5]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        // it also needs to support sorting of negative values
        it('sorts negative numbers correctly', () => {
            inputArray = [-22, -11, 1, -50, 4]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        // input array might be partially sorted. It needs to be handled.
        it('sorts correctly partially sorted array', () => {
            inputArray = [1, 2, 3, 4, 5, 6, 20, 11, 14, 9]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        // input array might be reverse ordered. It needs to be handled and sorted ascending
        it('sorts correctly reverse sorted array', () => {
            inputArray = [10, 9, 7, 5, 3, 2, 1]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        // another typical case that should be supported is an array of natural values
        it('sorts correctly unsorted array of positive values (including zeros)', () => {
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
        // sorting of different mixed data primitives could be supported.
        // However, there is no arbitrary way of verifying correct behavior.
        // Objects can also be passed. On the other hand, such case is only supported in untyped languages
        // Note: this case is not practical
        it('supports sorting mixed data primitives and objects', () => {
            inputArray = ['cat', 'dog', 55, 11, 60, {foo: 'bar'}]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql([{foo: 'bar'}, 11, 55, 60, 'cat', 'dog'])
        });
    })
    // group 2: bigger data set and set of data with big numbers
    context('big arrays/big numbers', () => {
        // worth covering is the case of bigger input array set to check if it's handled
        // Note: since we do not know the details of the algorithm, we cannot expect certain time computation or resource allocation
        it('sorts correctly big array', () => {
            inputArray = randomArrayGenerator({
                min: 1,
                max: 10000,
                elements: 10000
            })
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        // numbers can be represented by BigInt.Such big values should also be sortable
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
    // group 3: support for float values.
    context('floating values', () => {
        // another business case is when passed data is an array of floating values 
        it('sorts correctly an array of float values', () => {
            inputArray = [1.23, 4.67, 2.11, 8.59, 0.001, 2.00001, 10.333333333]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        })
        // use case to support mixed number types
        it('sorts correctly an array of mix integer and float values', () => {
            inputArray = [1.23, 60, 600, 4.67, 10, 9, 2.11, 8.59, 0.001, 2.00001, 10.333333333, 11, 9]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        })
    })
    // group 4: negative cases
    // since JavaScript is untyped language, there is actually no point in passing incorrect input
    context('negative', () => {
        // when an empty array is passed, it should be handled gracefully
        it('returns empty array if empty array input is provided', () => {
            inputArray = []
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql([])
        });
    })
    // group 5: other cases
    context('others', () => {
        // Stability check. This is an interesting one. Some sorting algorithms are stable, some not. 
        // Quick sort is usually not but it depends on the actual implementation. In order to cover this case,
        // sorting function needed to be modified to support passing objects.
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