// Turns raw text into an array of lowercase words
function cleanWords(text){

    // Lowercase so "Python" and "python" count as the same word
    let lowerText = text.toLowerCase();

    // Remove anything that isn't a letter, digit, whitespace or "+" (keeps words like "c++")
    let cleanedText = lowerText.replace(/[^a-z0-9\s+]/g, "");

    // trim() again because removing punctuation can leave new spaces at the edges (e.g. "- python" -> " python").
    // Splitting on /\s+/ treats any run of whitespace as one gap, so no empty strings end up in the array.
    const words = cleanedText.trim().split(/\s+/);

    return words;
}

// Common words that shouldn't count as keywords (a Set for fast .has() lookups)
const fillerWords = new Set(["the", "and", "a", "to", "of", "in", "for", "with", "you", "we", "our", "will", "is", "are", "be", "on", "as", "this"]);

// Returns the unique words from the array that aren't filler words
function removeFillerWords(array){
    // .add() on a Set ignores duplicates, so each keyword is only stored once
    let keywords = new Set();

    for (const word of array){
        if (!fillerWords.has(word)){
            keywords.add(word);
        }
    }

    return keywords;
}

// Sorts each keyword into found in the resume (matches) or not (missing)
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

document.addEventListener("DOMContentLoaded", function(){

    document.querySelector("#check").addEventListener("click", function() {
        let resumeText = document.querySelector("#resume").value.trim();
        let jobDescText = document.querySelector("#job-desc").value.trim();
        let warning = document.getElementById("warning");

        // If either box is empty, show the warning and skip the matching
        if (resumeText.length == 0 || jobDescText.length == 0){
            
            // Only show the warning if it isn't already active (its text is cleared once it has fully faded out)
            if (warning.textContent === ""){
                warning.className = "show";
                warning.textContent = "Please fill out both boxes";

                // Start fading out after 1.5s, then clear the text once the 0.5s fade has finished (2s in total)
                setTimeout(function(){
                    warning.className = "";
                    setTimeout(function(){
                        warning.textContent = "";
                    }, 500);
                }, 1500);
            }
            
            return;
        }


        const keywords = removeFillerWords(cleanWords(jobDescText));
        const resumeWords = new Set(cleanWords(resumeText));

        const result = checkForMatches(keywords, resumeWords);

        let feedback = document.querySelector('#feedback');

        // Template literal (backticks) puts variables inside the string, like Python f-strings
        feedback.textContent = `You have ${result.matches.length} keyword matches out of a total ${keywords.size}.\nYou were missing the following words: ${result.missing.join(", ")}.`;
        
    });
    
    
});