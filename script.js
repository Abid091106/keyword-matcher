function cleanWords(text){

    //Converts string text to lowercase but it doesnt affect numbers and punctuation, quite nice:)
    let lowerText = text.toLowerCase();
    
    //Replace all non alphabets, numbers and spaces with "" i.e. nothing
    //'/[^a-z0-9\s+]/g' is the regex meaning all things that
    //are NOT alphanumeric, spaces, or "+" gets replaced with "" i.e. nothing
    let cleanedText = lowerText.replace(/[^a-z0-9\s+]/g, "");

    /*Split the words on cleaned text based on spaces, any number of spaces.
    '/\s+/' (the regex for 1 or more space) means split words based on 1 or more spaces in between them.
    This helps prevent the empty space between 2 consecutive spaces from being included in output array.
    trim() removes whitespaces at the start and end of the string, and is still needed even after the
    initial trim, because cleaning up the words may result in new whitespaces at the start end. For example,
    cleaning "_ python" leads to " python", which now has a whitespace at the start, so it needs to be trimmed
    again */
    const words = cleanedText.trim().split(/\s+/);

    return words;
}

const fillerWords = new Set(["the", "and", "a", "to", "of", "in", "for", "with", "you", "we", "our", "will", "is", "are", "be", "on", "as", "this"]);

function removeFillerWords(array){
    //new Set() is the way to create a set, which basically takes an array and removes all duplicate words
    //and creates a set
    let keywords = new Set();

    //const word of attay is the same as for word in array: in python
    for (const word of array){
        if (!fillerWords.has(word)){
            keywords.add(word);
        }
    }

    return keywords;
}

function checkForMatches(keywordSet, inputSet){
    let matches = [];
    let missing = [];    
    for (const word of keywordSet){

        if (inputSet.has(word)){
            matches.push(word);
        }
        else {
            missing.push(word);
        }
    }

    return {matches, missing};
}

//Wait for DOM contents to load
document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#check").addEventListener("click", function() {
        let resumeText = document.querySelector("#resume").value.trim();
        let jobDescText = document.querySelector("#job-desc").value.trim();
        let warning = document.getElementById("warning");

        //Checks for conditions to trigger warning box
        //Also if user quick pastes a job desc and resume and clicks check within the 4 second wait for the warning box to go
        //then the code would continue running, and you wont need to wait until warning box goes away
        if (resumeText.length == 0 || jobDescText.length == 0){
            
            //stops a user from making box reappear until it disappears
            if (warning.textContent === ""){
                //Add code for warning block popup
                
                warning.className = "show";
                warning.textContent = "Please fill out both boxes";

                //Does the function inside after the time (2nd param in milliseconds) passes
                //The inner timer only starts once the outer one fires, so its 500ms is counted from 3.5s, which lands at 4s.
                setTimeout(function(){
                    //Clear className
                    warning.className = "";
                    setTimeout(function(){
                        //clear textContent
                        warning.textContent = "";
                    }, 500);
                }, 1500);
            }
            
            //Stop here either way, so the matching never runs with an empty box
            return;
        }


        const keywords = removeFillerWords(cleanWords(jobDescText));
        const resumeWords = new Set(cleanWords(resumeText));

        const result = checkForMatches(keywords, resumeWords);

        let feedback = document.querySelector('#feedback');

        //Using a template literal (with backticks, i.e. ` (key in top left of keyboard)) is the same
        //as the f"" statements in python, and allows for variables to be put within the string output.
        feedback.textContent = `You have ${result.matches.length} keyword matches out of a total ${keywords.size}.\nYou were missing the following words: ${result.missing.join(", ")}.`;
        
    });
    
    
});