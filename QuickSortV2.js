// this is slightly a modified quickSort function
// where `items` is an array of objects and inside partition block
// we are comparing based on `id` property
const quickSortV2 = (items) => {
  var length = items.length

  if (length <= 1) {
    return items
  }
  var PIVOT = items[0]
  var GREATER = []
  var LESSER = []

  for (var i = 1; i < length; i++) {
    if (items[i].id > PIVOT.id) {
      GREATER.push(items[i])
    } else {
      LESSER.push(items[i])
    }
  }

  var sorted = quickSortV2(LESSER)
  sorted.push(PIVOT)
  sorted = sorted.concat(quickSortV2(GREATER))

  return sorted
}

module.exports = quickSortV2
