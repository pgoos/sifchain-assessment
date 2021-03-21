const chai = require('chai')
const expect = chai.expect
const quickSort = require("../QuickSort");

let inputArray
let sortedArray

describe('White-box testing of quick sort algorithm', () => {
    context('1-level binary tree', () => {
        it('returns immediately when single element is provided', () => {
            // comment: this is the same case as if input array would be empty
            inputArray = [6]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray)
        });
        it('goes through the right (greater) side of the binary tree, once', () => {
            inputArray = [1,2]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray)
        });
        it('goes through the left (lesser) side of the binary tree, once', () => {
            inputArray = [2, 1]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('goes through the left (lesser) side of the binary tree, once', () => {
            inputArray = [2, 1]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
    })
    context('2-level binary tree', () => {
        it('creates 2 level binary tree', () => {
            inputArray = [10,7,12,8,11]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
    })
    context('N-level binary tree', () => {
        it('goes through the left (lesser) side of the binary tree, n times', () => {
            inputArray = [9,8,6,2]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('goes through the right (greater) side of the binary tree, n times', () => {
            inputArray = [2,6,8,9]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        it('has balanced binary tree', () => {
            inputArray = [9,6,12,3,10,1,11,9,20,8,15]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
    })
    context('Other cases', () => {
        it('puts all equal values onto the left side of binary tree', () => {
            inputArray = [3,3,3]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        })
    })

});

const compareNumbers = (a, b) => a - b