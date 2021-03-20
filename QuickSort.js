/*
* Quick sort is a comparison sorting algorithm that uses a divide and conquer strategy.
* For more information see here: https://en.wikipedia.org/wiki/Quicksort
*/

/*
*  Doctests
*
*  > quickSort([5, 4, 3, 10, 2, 1])
*  [1, 2, 3, 4, 5, 10]
*  > quickSort([])
*  []
* > quickSort([5, 4])
*  [4, 5]
*  > quickSort([1, 2, 3])
*  [1, 2, 3]
*/

const quickSort = (items) => {
  var length = items.length

  if (length <= 1) {
    return items
  }
  var PIVOT = items[0]
  var GREATER = []
  var LESSER = []

  for (var i = 1; i < length; i++) {
    if (items[i] > PIVOT) {
      GREATER.push(items[i])
    } else {
      LESSER.push(items[i])
    }
  }

  var sorted = quickSort(LESSER)
  sorted.push(PIVOT)
  sorted = sorted.concat(quickSort(GREATER))

  return sorted
}

// export default quickSort
module.exports = quickSort
