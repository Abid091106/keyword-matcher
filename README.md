# Keyword Matcher

A web app that compares a resume against a job description, shows how many of the job's keywords appear in the resume, and lists the ones that are missing.

**Live demo:** https://abid091106.github.io/keyword-matcher/

## Features

- Paste a resume and a job description side by side, then click **Check**
- An animated score ring fills up to your match percentage, shifting from red through yellow to green as the score rises
- Shows how many keywords matched, and lists the missing ones so you know what to add
- Ignores common filler words like "the", "and" and "with"
- Handles edge cases: a warning pop-up for empty boxes, and clear messages when the job description has no keywords or every keyword matches
- Responsive layout: the boxes sit side by side on wide screens and stack on phones

## How it works

1. **Cleaning the text:** both texts are lowercased, punctuation is removed (except `+`, so terms like "C++" survive), and the text is split into words.
2. **Finding keywords:** filler words are removed from the job description, and the rest are stored in a `Set`, which removes duplicates automatically.
3. **Matching:** each keyword is checked against the resume's words, also stored in a `Set`. Set lookups are O(1) on average, compared with O(n) for searching an array, so the whole check runs in linear time.
4. **The score ring:** the ring is an SVG circle whose outline is one long dash, set with `stroke-dasharray`. `stroke-dashoffset` hides part of that dash, so the offset is calculated as `circumference × (1 − match fraction)`, and a CSS transition animates it.
5. **The colour:** the ring uses HSL colours, where the hue is `match fraction × 120`. This maps 0% to red (hue 0), 50% to yellow (hue 60), and 100% to green (hue 120).

## Built with

- HTML
- CSS (flexbox, media queries, SVG styling and transitions)
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
- Every keyword counts equally, even though some skills matter more than others in a job description.

## Future improvements

- Show matched and missing keywords as coloured tags
- Upload a resume as a `.txt` file
- Recognise synonyms and common multi-word phrases
- Add automated tests for the matching functions
- Rebuild with Next.js and TypeScript, and add AI-powered feedback on weak bullet points

## What I learned

This was my first project after finishing CS50x. Through it I learned how to:

- Use Git and GitHub from the command line, and deploy a site with GitHub Pages
- Structure a page with semantic HTML and build a responsive layout with flexbox and media queries
- Handle user input and update the page with JavaScript
- Use regular expressions to clean and split text
- Choose between arrays and Sets based on how the data is used
- Draw and animate shapes with SVG, and use HSL colours to create smooth colour scales
- Handle timing with `setTimeout` and prevent bugs from repeated clicks