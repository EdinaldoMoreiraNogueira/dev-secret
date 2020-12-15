module.exports = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let ramdomIndex;

    while (currentIndex !== 0) { 

        ramdomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex =-1


        temporaryValue = array[currentIndex]
        array[currentIndex] = array[ramdomIndex]
        array[ramdomIndex] = temporaryValue
    }
    return array
}