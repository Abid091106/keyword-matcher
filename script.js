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

    // Get feedback, progess ring, score percentage, and warning button items
    const feedback = document.querySelector('#feedback');
    const progressRing = document.querySelector("#progress");
    const score = document.querySelector("#percentage-score");
    const warning = document.getElementById("warning");

    // Must match the circle's radius (r="50" in the HTML and the calc() in the CSS)
    const circumference = Math.PI*2*50;
    
    document.querySelector("#check").addEventListener("click", function() {
        //Grab the inputs from the user, and remove whitespace from front/back of the text
        const resumeText = document.querySelector("#resume").value.trim();
        const jobDescText = document.querySelector("#job-desc").value.trim();
        
        // If either box is empty, show the warning and skip the matching
        if (resumeText.length === 0 || jobDescText.length === 0){
            
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
        const fraction = result.matches.length/keywords.size;

        if (keywords.size === 0){
            feedback.textContent = "You have 0 keywords in your job description.";
            score.textContent = "N/A";
            score.style.fill = "grey";
            progressRing.style.strokeDashoffset = circumference;
            return;
        }

        else if (keywords.size === result.matches.length){
            feedback.textContent = "Congrats on matching all keywords in the job description!!";
            progressRing.style.strokeDashoffset = 0;
            progressRing.style.stroke = "hsl(120, 100%, 50%)";
        }
        
        else {
            // Template literal (backticks) puts variables inside the string, like Python f-strings
            feedback.textContent = `You have ${result.matches.length} keyword matches out of a total ${keywords.size}.\nYou were missing the following words: ${result.missing.join(", ")}.`;
            // Offset = the part of the ring left empty
            progressRing.style.strokeDashoffset = circumference*(1-fraction);
            // Hue goes from 0 (red) to 120 (green) as the match fraction goes from 0 to 1
            progressRing.style.stroke = `hsl(${fraction*120}, 100%, 50%)`;
        }
        
        // Show the percentage in the middle of the ring, in a matching (darker) colour
        score.textContent = `${Math.round(fraction*100)}%`;
        score.style.fill = `hsl(${fraction*120}, 100%, 35%)`;
    });
    
    
});