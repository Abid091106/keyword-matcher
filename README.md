# Keyword Matcher

A simple web app that compares a resume against a job description and shows which keywords from the job description appear in the resume, and which are missing. A small starting project, just to explore and learn how these languages interact within an app/web page.

## Features

- Paste in a resume and a job description, then click **Check**
- Shows how many of the job description's keywords appear in the resume
- Lists the keywords that are missing, so you know what to add
- Ignores common filler words like "the", "and" and "with"
- Shows a warning pop-up if either box is left empty

## How it works

1. **Cleaning the text:** both texts are converted to lowercase, punctuation is removed (except `+`, so terms like "C++" survive), and the text is split into individual words.
2. **Finding keywords:** filler words are removed from the job description, and the remaining words are stored in a `Set`, which removes duplicates automatically.
3. **Matching:** each keyword is checked against the resume's words, which are also stored in a `Set`. Sets make each lookup fast, instead of scanning through a whole list every time.
4. **Results:** the number of matches and the list of missing keywords are displayed on the page.

## Built with

- HTML
- CSS
- JavaScript (no frameworks or libraries)

## Running it locally

1. Clone the repository:
```bash
   git clone https://github.com/Abid091106/keyword-matcher.git
```
2. Open `index.html` in your browser.

No installation or setup needed.

## Limitations

- **Multi-word skills** like "machine learning" are split into separate words.
- **Word variations** such as "manage", "managed" and "management" are treated as different words.
- **Synonyms and abbreviations** aren't recognised, so "JS" won't match "JavaScript".
- **Punctuation inside words** is removed, so "Node.js" becomes "nodejs".
- The **filler word list** is small, so some generic words may still be counted as keywords.

## Future improvements

- Recognise common multi-word phrases
- Add a synonym list (e.g. "JS" → "JavaScript")
- Handle word endings, so related word forms match
- Allow uploading a `.txt` resume file
- Rebuild with Next.js and add AI-powered feedback on weak bullet points

## What I learned

This was my first project after finishing CS50x. Through it I learned how to:

- Use Git and GitHub from the command line
- Structure a web page with semantic HTML and style it with CSS
- Handle user input and update the page with JavaScript
- Use regular expressions to clean and split text
- Choose between arrays and Sets based on how the data is used
- Create smooth CSS transitions and handle timing with `setTimeout`