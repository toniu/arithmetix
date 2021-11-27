/* Quiz functions */

/* Types of quiz questions -
Number question - number required
String question - string required
Graph question - inputs of coordinates required
*/
/**
 * Displays the working out before the final answer.
 * The working out of the solution can be in multiple lines
 * @param {String[]} WOLines - lines of working out
 */
function showWorkingOut(WOLines) {
    for (var i = 0; i < WOLines.length; i++) {
        if (WOLines[i]) {
            console.log(WOLines[i]);
        }
    }  
}

/**
 * Displays the question with the given parameters of numbers in the question
 * which will be randomised and processed. 
 * @param {String[]} numbersMentioned - numbers mentioned in question
 */
function generateQuestion() {
    
}
