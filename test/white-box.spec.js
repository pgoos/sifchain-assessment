/*
* White-box tests are grouped into contexts to cover different logic paths and flows
* They are not proving the sorting function works correctly from use cases perspective
* They, instead, confirm, correctness and bug-free of the internal logic.
* The following contexts were defined
* - 1-level binary tree
* - 2-level binary tree
* - N-level binary tree
* - Other cases
*
* Chosen set of tests is complete since all logical paths are executed. 
* We get 100% statement, decision, branch and line coverage.
* On the other hand, that coverage could be achieved with just a single more complex input data set
* but we aim of white box tests is to verify on simple logic chunks.
* Moreover, it can be argued whether the tests chosen is a minimalistic set (for instance, (2-level binary tree vs N-level binary tree))
* However, with more complex data sets it is ensured that the algorithm doesn't fall into unspecified behavior/logic
* Assumptions made:
* reference algorithm taken for comparison of results is sort() algorithm from JS standard lib
* JavaScript works in such a way that unsorted array is passed to the sorting algorithm by reference (and not by value)
* that impacts organization of the tests.
*/
const chai = require('chai')
const expect = chai.expect
const quickSort = require("../QuickSort");

let inputArray
let sortedArray

describe('White-box testing of quick sort algorithm', () => {
    // This part covers most basic paths tests.
    context('1-level binary tree', () => {
        // It checks the logic of a decision path where input array is returned without further function execution
        it('returns immediately when single element is provided', () => {
            // comment: this is the same case as if input array would be empty
            inputArray = [6]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray)
        });
        // It checks the basic logic where element is assigned to the right side of the pivot element
        // Recursive function call immediately returns input element
        it('goes through the right (greater) side of the binary tree, once', () => {
            inputArray = [1,2]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray)
        });
        // It checks the basic logic where element is assigned to the left side of the pivot element
        // Recursive function call immediately returns input element
        it('goes through the left (lesser) side of the binary tree, once', () => {
            inputArray = [2, 1]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
    })
    // This part covers logic paths where binary tree is created by multiple recursion calls.
    // Through the For loop, both lesser and greater arrays are pushed 
    context('2-level binary tree', () => {
        // this scenario verifies logic of For loops from which both statements from both decisions are executed
        // it also verifies recursion calls where For loops cover both decision statements (lesser and greater than pivot)
        it('creates 2 level binary tree', () => {
            inputArray = [10,7,12,8,11]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
    })
    // This part is an extended 2-level binary tree that creates more complex tree structure 
    context('N-level binary tree', () => {
        // It checks the logic where element is assigned to the right side of the pivot element
        // Recursive function calls create leafs only on the right side of the tree
        it('goes through the left (lesser) side of the binary tree, n times', () => {
            inputArray = [9,8,6,2]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        // It checks the logic where element is assigned to the right side of the pivot element
        // Recursive function calls create leafs only on the left side of the tree
        it('goes through the right (greater) side of the binary tree, n times', () => {
            inputArray = [2,6,8,9]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
        // it creates a balanced binary tree. Every path of the function is executed here
        // 100% decision, statement, branch and line coverage achieved with this case
        it('has balanced binary tree', () => {
            inputArray = [9,6,12,3,10,1,11,9,20,8,15]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        });
    })
    context('Other cases', () => {
        // it checks the logic where items equal to pivot value are loaded into lesser array
        // sorted = sorted.concat(quickSort(GREATER)) is only called with empty array
        it('puts all equal values onto the left side of binary tree', () => {
            inputArray = [3,3,3]
            sortedArray = quickSort(inputArray)
            expect(sortedArray).to.eql(inputArray.sort(compareNumbers))
        })
    })

});

const compareNumbers = (a, b) => a - b