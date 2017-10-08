module.exports = function(array) {
  score = []
   for(var i = 0; i < array.length; i++){
     if(array[i] > 85) {
       score.push('A')
     } else if(array[i] > 70) {
       score.push('B')
     } else if(array[i] > 55) {
       score.push('C')
     } else if(array[i] <= 55 && array[i] > 0) {
       score.push('E')
     } else {
       score.push('Empty')
     }
   }
  return score
}
