# Markdeep Clone

This is an unofficial un-minified version of ``markdeep.mini.js``.

http://casual-effects.com/markdeep/

**As of ``0.10`` (2016-03-22), releases are signed with** [Minisign](https://jedisct1.github.io/minisign/).

Minisign is a ‘dead simple tool to sign files and verify signatures’. Signed files will be accompanied by a corresponding ``*.minisig`` file.

You can verify the signature using [my Minisign public key](http://reelsense.tv/keys):


```
minisign -Vm <file> -P RWSmY4o5Bad1vS60aYAiQUswWYVV2EuSdqc3ry7CWWF1E6bVbFG9kR/y
```

Authenticate the key *above* by copying the signature *below*, into [keybase.io/verify](https://keybase.io/verify). It's signed by [14C1182BC57936B2](http://reelsense.tv/keys).

```
-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

RWSmY4o5Bad1vS60aYAiQUswWYVV2EuSdqc3ry7CWWF1E6bVbFG9kR/y
-----BEGIN PGP SIGNATURE-----

wsFcBAABCgAGBQJX010gAAoJEBTBGCvFeTayH+UP/2cc+UNhGyDdLACyv7+eHI93
NAdskZQ+d8iiOkxgiMXoTg3W9/B6skRL5eZIX1QTgg7xldVcczOUr9/7/fGhQMHB
vEU6RwB/SnyRSqPiqnbsP8K7Xl6GHty2VorIKWR3zPCFSdMq2sOYJVXR0IZrB5O5
jMzkBLZQMUH+fgeiapassjN8hzl8Gc0A8HO48MVSsS2MQx05DN9uqAnX5XzY6dQL
jA9AatVTsx904fgz3TJogEOCoEbPSl02zZ5J5uRGMA5e5cyWU9+rTL4hhN/6HrAA
6Oe4ihEEGECTxC59LEgbPTxka8QU0ngrgVzrJZxBI7Q05oyznGazFWtJz53cxp60
b8jBht+PeVBnoKCodmAZu54N3f5BTNMldivvclRJDv0TAOJZK/UJW52BdBqrEHek
luFxCBlJ7MQe56fiQwCS1+KIBTTOzxFtQAi35gcZv/mqb2WRMBJWCtB4f0NC9TqT
BShvxk8N4z7yVZiykjpdHxslNtfoVR1iRcZ0+xVQBtT+pEdl5ONexSazUsvKXGxR
g9IKP0qTNBu38lHDZSABsb3b+WTax+xDd/mcZC3SJO9aFXPP0uoL0ON1JpB/d0FQ
54ixCr4VK9aO9RNZuvV9yYKWTsNXh3hqY+AuRfv4Cv0YkEnqKVgUUozIkSI9WP57
rkYQXUCXXP1XUMDpJCfo
=BL+u
-----END PGP SIGNATURE-----
```
[signature mirror](http://reelsense.tv/public-key-rwsmy4o5bad1vs60ayaiquswwyvv2eusdqc3ry7cwwf1e6bvbfg9kr/y)

**Markdeep** is a technology for writing plain text documents that will look good in any web browser. It supports diagrams, common styling conventions, and equations as extensions of Markdown syntax.

Markdeep is free and easy to use. It doesn't need a plugin, or Internet connection. There's nothing to install. Just start writing in Vi, Nodepad, Emacs, Visual Studio, Atom, or another editor! You don't have to export, compile, or otherwise process your document.

Markdeep is ideal for design documents, specifications, README files, code documentation, lab reports, and technical web pages. Because the source is plain text, Markdeep works well with software development toolchains.

Markdeep was created by Morgan McGuire at [Casual Effects](http://casual-effects.com) with inspiration from John Gruber's [Markdown](https://daringfireball.net/projects/markdown/). The current minified-only beta release is public in order to find bugs and get feedback, but a full and stable version with natural source is coming soon after some more code cleanup.

# Style Features

Unique features:
* Diagrams
* Title formatting
* CSS stylable
* Title and subtitle detection
* Section numbering
* Equation typesetting and numbering
* Works in any browser by adding one line to the bottom of a text document
* Fallback to ASCII in a browser if you have neither the local file or Internet access

Plus, best-of-breed Maruku Markdown features:
* Tables
* Paragraph formatting
* Automatic e-mail address and URL linking
* Nested, numbered and bulleted lists
* Fenced code blocks
* Bold, italic, code, strikethrough
* Hyperlinks
* Blockquotes
* Images
* Doesn't italicize math with * or words containing underscores
* Unicode
* HTML passthrough
* Optionally process server-side or offline in Node.js

# Get Started

To create a Markdeep document, just open any text editor and start writing. Paste the following at the bottom of your document as a single line. Then, save it as plain text with a filename with extension ```.md.html```.

	<style class="fallback">body{white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="http://casual-effects.com/markdeep/latest/markdeep.min.js"></script>

You can drag your document into a web browser or double click on it to see it with formatting. You can also read the document in a browser when you don't have an Internet connection. If you want to avoid losing formatting when offline, just keep markdeep.min.js in the same folder.

View the plain source of the feature demo to learn the formatting styles that you can use. Markdeep extends Markdown, and to quote John Gruber:

The overriding design goal for Markdown's formatting syntax is to make it as readable as possible. The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions.
To inspect the original text source for a Markdeep document in a browser, just add `?noformat` to the end of its URL.

# Origin and Credits

I created Markdeep because I was no longer willing to choose between design documents that looked good and those that worked well with programming tools. I liked what _**Markdown**_ did on web servers, so I used that as a starting point and added more styling features and a way to directly view the documents client side in a browser.

HTML is "_**markup**_" that extends plain text with formatting. Unfortunately, the formatting tags often make original document source hard to read and write. This is slow and annoying, especially for those of us who use programming tools for document editing or want formatting in documentation files.

John Gruber invented [Markdown](https://daringfireball.net/projects/markdown/) to address HTML's editing problems. The name "mark**_down_**" conveys styling in the opposite direction of the "mark**_up_**" tag syntax. Markdown beautifies text without explicit tags, based on common practices from ASCII e-mail and plain-text documents

"_**Markdeep**_" is farther "down" from "_**markdown**_" on the autostyling and beautification path. Markdeep combines an easy-to-use and browser-friendly packaging with new unique features for diagrams. The code includes some of the best previous Javascript document formatting libraries and links to [MathJax](https://www.mathjax.org/) for equation typesetting

Markdeep was created by Morgan McGuire. It extends the work of:

  * John Grubber's original Markdown concept and specification
  * Ben Hollis' [Maruku](http://maruku.rubyforge.org/maruku.html) (aka "Githib") Markdown dialect specification
  * Michel Fortin's [Extra](https://michelf.ca/projects/php-markdown/extra/) Markdown dialect specification
  * Dominic Baggott's [markdown.js](https://github.com/evilstreak/markdown-js) implementation for table and list processing
  * Ivan Sagalaev's [highlight.js](https://highlightjs.org/) for syntax coloring
  * Contributors to the above open source projects

# License

Markdeep is open source. You may use, extend, and redistribute Markdeep without charge under the terms of the [BSD license](https://opensource.org/licenses/BSD-2-Clause):


          Copyright 2015, Morgan McGuire
          All rights reserved.

          Redistribution and use in source and binary forms,
          with or without modification, are permitted provided that the
          following conditions are met:

          1. Redistributions of source code must retain the above
          copyright notice, this list of conditions and the following
          disclaimer.

          2. Redistributions in binary form must reproduce the above
          copyright notice, this list of conditions and the following
          disclaimer in the documentation and/or other materials provided
          with the distribution.

          THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND
          CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES,
          INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
          MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
          DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR
          CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
          SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
          LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF
          USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED
          AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
          LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING
          IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
          THE POSSIBILITY OF SUCH DAMAGE.


Markdeep includes markdown.js, so you are also bound by the MIT license (which is BSD-compatible):


          Permission is hereby granted, free of charge, to any person
          obtaining a copy of this software and associated documentation
          files (the "Software"), to deal in the Software without
          restriction, including without limitation the rights to use,
          copy, modify, merge, publish, distribute, sublicense, and/or
          sell copies of the Software, and to permit persons to whom the
          Software is furnished to do so, subject to the following
          conditions:

          The above copyright notice and this permission notice shall be
          included in all copies or substantial portions of the Software.

          THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
          EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
          OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
          NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
          HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
          WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
          FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
          OTHER DEALINGS IN THE SOFTWARE.


...and the highlight.js BSD license:


          Copyright (c) 2006, Ivan Sagalaev
          All rights reserved.

          Redistribution and use in source and binary forms, with or
          without modification, are permitted provided that the following
          conditions are met:

          * Redistributions of source code must retain the above copyright
          notice, this list of conditions and the following disclaimer.
          * Redistributions in binary form must reproduce the above copyright
          notice, this list of conditions and the following disclaimer in the
          documentation and/or other materials provided with the distribution.
          * Neither the name of highlight.js nor the names of its contributors
          may be used to endorse or promote products derived from this software
          without specific prior written permission.

          THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS
          IS'' AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
          LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
          FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
          SHALL THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
          INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
          DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
          SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR
          BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
          LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
          (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF
          THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
          SUCH DAMAGE.


# Release History

Old releases are archived as:

> `http://casual-effects.com/markdeep/_VERSION_/markdeep.min.js`

You can modify the Markdeep line at the bottom of a document to hardcode to a specific version instead of the default version of "`latest`".

You can report bugs to [morgan@casual-effects.com](mailto:morgan@casual-effects.com) by sending a Markdeep document and what you think is wrong about the way that it appears.

  * 2017-12-31 Version 0.23: Code
    1. Tweaked the apidoc.css style.
    2. Fixed top-level header formatting broken in the previous release.
    3. Code blocks now use four-space tabs (instead of eight spaces).
    4. Added syntax coloring for Go, Rust, R, Lua, TypeScript, and Swift code blocks.
    5. Added support for back-to-back code blocks with no text between them.
    6. Improved robustness of schedule list detection and removed warning messages from speculative parser.
    7. Localized smart quotation marks to the same region as other keywords, following this spec.
    8. Fixed email address detection for 2-letter domains with a patch by Michael Smirnov.

  * 2017-11-25 Version 0.22: Unity
    1. Added support for long <-- and --> arrows in body text.
    2. Added support for ordered lists that begin with numbers other than 1.
    3. Markdeep now strips HTML comments that are not in code blocks at the beginning of processing.
    4. Added Japanese localization by Takashi Masuyama.
    5. Added optional CSS classes to fenced code blocks.
    6. Added multiple unioned code blocks for use in highlighting and multi-language examples.
    7. Fixed CSS to not leak outside Markdeep blocks when in html embedding mode.
    8. Added support for LaTeX when in doxygen and html embedding modes.
    9. Added admonitions (callout notes for the reader).
    10. Added `apidoc.css` stylesheet and corresponding template by Aras Pranckevičius.

  * 2017-10-03 Version 0.21: Robustness
    1. Upgraded to [`highlight.js 9.12.0`](https://highlightjs.org/), included shell session highlighting.
    2. Fixed excess whitespace due to `<p>` tags being generated near section headers.
    3. Capitalized "Contents" in English.
    4. Made title and list pattern detection more robust.
    5. Improved parsing of image grids when near other individual images.
    6. Made all images hyperlink to their full-resolution versions.
    7. Improved wide character support for diagrams contributed by Torsten Grust.
    8. Changed implicit URL parsing to consider a trailing period as punctuation instead of part of the URL. Use explicit URL syntax of `<http://...>` to force it to be part of the URL.
    9. Added an explicit CSS class for `tocNumber` to support hiding them.
    10. Added support for nested blockquotes.
    11. Fixed indented lists immediately after a header.

  * 2017-06-30 Version 0.20: Customization
    1. Updated Mathjax for files included via (insert) to use cloudflare.
    2. Fixed events from other JavaScript libraries interfering with Markdeep.
    3. Updated `wkhtmltopdf` instructions to work around bugs in their `0.12.4` version.
    4. Avoided generating empty <a> tags to work around a longstanding `wkhtmltopdf` bug.
    5. Improved colors for tables in the dark template.
    6. Added Swedish localization by Nils Nilsson.
    7. Added captionAbove option for figures, listings, and tables.

  * 2017-05-27 Version 0.19: Layout
    1. Adjusted the generation of paragraph tags around lists to better support HTML post-processing.
    2. Fixed recursive (insert X here) statements triggering multiple tables of contents.
    3. Renamed showURLs to showLabels and made it display both labels and URLs.
    4. Added localization for the Contents text in the table of contents.
    5. Switched to cloudflare CDN for Mathjax.
    6. Fixed table layout in the presence of an empty first or last column cell.
    7. Added `\un` Latex macro for units in math.
    8. Added slide template (thanks to Torsten Grust).
    9. Allowed leading space before tables with outside borders.
    10. Added support for single-column tables.
    11. Avoided page breaks after headers.
    12. Improved rendering of high-index Unicode characters in diagrams.
    13. Fixed font-weight of unnumbered H2 sections.
    14. Removed stroke borders from grayscale Unicode blocks in diagrams.
    15. Support for `\pagebreak`, `\newpage`, and page breaks with `++++++++`.
    16. Made the `dark.css` style sheet print with a white background.

  * 2017-03-31 Version 0.18: Lists and links
    1. Improved detection of the end of lists followed by indented content
    2. Improved handling of multiple lists within a single schedule list day
    3. Removed console debug output that was accidentally enabled in version 0.17
    4. Defaulted to including the markdeep.min.js script with a trailing ?, to force updates under new aggressive browser caching
    5. Support for subfigures in references, e.g., Figure `[dinosaur](a)`
    6. Support for quoted URLs (needed for URLs containing unescaped parentheses)
    7. Allowed fenced code blocks to be indented
    8. Added support for both single and double arrows
    9. Fixed incorrect floating on diagrams that lack a right border
    10. Fixed citations at the end of figure captions

  * 2017-02-12 Version 0.17: Style
    1. Diagrams that are not floating may now omit the right-edge markers
    2. Workarounds for Wordpress compatibility
    3. Workaround for Firefox-specific bug with canvas in iframe affecting include statements
    4. Allowed listing captions to be up to four lines long
    5. Improved robustness of underscores and italics within words
    6. Added Polish translation by Dariusz Kuśnierek
    7. Added Latex and Dark style sheets.
    8. Documented paragraph numbering

  * 2016-12-20 Version 0.16: Printing support
    1. Removed hyperlinking of svn and perforce URLs (they are still typset as URLs)
    2. Improved Latex single-$ parsing
    3. Fixed lists after unnumbered sections needing too much whitespace
    4. Made horizontal rule parsing more permissive
    5. Made layout avoid page breaks in tables, listings, and images when printed
    6. Experimental `insert` support
    7. Added version number to Markdeep footer

  * 2016-10-28 Version 0.15: Proof support
    1. Changed windows code font to Consolas because Lucida Console's capital 'V' character is confusingly small.
    2. Now only only floating images have constrained caption widths
    3. Captions are always justified within the centered block
    4. Added showURLs option
    5. Added German and Hungarian localization contributed by Berczi Sándor
    6. "Contents"/"Table of Contents" header is now localized
    7. Added console warnings for broken reference links
    8. Added console warnings for unused reference links
    9. Added console warnings for unreferenced figures, tables, etc.
    10. Added console warnings for broken links to figures, tables, etc

  * 2016-09-10 Version 0.14: Robustness
    1. Switched double minus signs to parse as em dash instead of en dash, since they visually resemble em dash in the text.
    2. Corrected parsing of lists with spaces between the elements.
    3. Grids of images are recognized and preserved.
    4. Made table of contents work for documents with incorrect header nesting
    5. Fixed an obscure browser-lockup bug resulting from parsing protected substrings as numbers for later markdown
    6. Fixed protect accidentally generating sequences that look like dimensions.
    7. Fixed links and images within footnotes and bibliography entries.
    8. Increased character count for "short" definition lists to 160 characters.

  * 2016-08-01 Version 0.13: Book support
    1. Added support for youtu.be URL shortened videos
    2. Documented lang advanced option
    3. Exposed tocStyle advanced option
    4. Added support for multiple entries per date in schedule lists
    5. Added support for auto-hiding weekends in schedule lists
    6. Switched all date computations to UTC to avoid daylight time problems
    7. Added parenthesized entries for schedule lists
    8. Added support for arbitrary attributes on regular links
    9. Terse formatting for definition lists with short definitions
    10. Fixed fancy quotes in non-unicode documents
    11. Reduced file size slightly
    12. Improved syntax auto-highlighting in code blocks

  * 2016-06-28 Version 0.12: Localization
    1. Prevented double underscores in variable names inside of diagrams, e.g., ``__FILE__``, from being parsed as lines
    2. Prevented decoration characters from being stripped from diagrams when on false-diagonal lines composed entirely of decorations
    3. Matched fixed-width fonts between diagrams and code blocks, and code block font sizes across platforms
    4. Added localization support via markdeepOptions.lang and ``<meta lang="..." ...>``
    5. Increased robustness of section links
    6. Added unnumbered sections using (#)

  * 2016-05-14 STANDBY Morgan erased /0.11/markdeep.min.js from his server. Wish he used version control.

  * 2016-05-06 Version 0.11: Integration
    1. Added ?export option to extract raw HTML
    2. Switched to font-rendering: antialiased; for lighter fonts
    3. Added support for numeric exponents outside of math mode
    4. Made spaces in figure/listing/table references unbreakable
    5. Fixed processing of max-width and width on images
    6. Added default max-width of 100% on images (can be overriden per image)
    7. Extended minus-sign beautification to negative numbers immediately following an open parenthesis
    8. Tweaked code syntax highlighting
    9. Updated to use highlight.js 0.9.3
    10. Fixed smart quotes after numbers
    11. Made fancy quotes fully CSS-stylable
    12. Made diagrams CSS-stylable
    13. Protected style tags
    14. Protected table of contents link names
    15. Fixed long table of contents link to first section
    16.
    17. Added gravizo support

  * 2016-03-22 Version 0.10: Calendars and Images
    1. Fixed alignment in table cells
    2. Added support for links with no text
    3. Added starter.md.html to web page
    4. Switched default raw URL font to Georgia for more weight and better slashes
    5. Table of contents now becomes its own section if it is longer than the abstract
    6. Added support for Latex equation, eqnarray, and equation* environments
    7. Fixed current-day highlighting on calendars
    8. Fixed multiple single-$ Latex expressions on a single line
    9. Allowed definition list terms to begin with non-word characters
    10. Added support for daylight saving time independent of country
    11. Improved robustness of parsing links within image captions
    12. Added support for floating, captioned images
    13. Fixed centering of multiple images in separate blocks
    14. Allowed definition lists to have a single space between the colon and definition

  * 2016-02-02 Version 0.09: References and Internal Links
    1. Added support for schedule lists
    2. 10x performance increase over version 0.08
    3. Added IE11 support
    4. Added support for calendars
    5. Added support for HTML attributes on images
    6. Added support for video
    7. Added CSS classes for different list bullets
    8. Added support for Youtube and Vimeo video
    9. Fixed multiple centered images in a group
    10. Fixed multiple colons in schedule event titles
    11. Added fancy quotes
    12. Highlighted current day on calendars

  * 2016-01-18 Version 0.08: References and Internal Links
    1. Prevented HTML tags in the title from appearing in the browser tab
    2. Fixed single-character bold and italic text hanging across lines
    3. Fixed indented bold and italic text crossing lines
    4. Added reference-style links
    5. Added footnotes/endnotes
    6. Added citations
    7. Allowed code blocks within other formatting
    8. Code blocks can now contain diagram syntax without it becoming a diagram
    9. Optimized performance of documents with many blocks
    10. Updated Markdeep line hides the document until formatting succeeds or loading markdeep.js times out
    11. Added smart quotes for double quotation marks
    12. Fixed strict mode for Firefox
    13. Protected raw ```<code>``` blocks from processing
    14. Added automatic section links
    15. Added table and listing captions
    16. Added figure, table, and listing numbering and references
    17. Fixed single-letter italic words in lists
    18. Allowed lists to omit the leading blank line if the previous line ends in a colon or comma
    19. Allowed inline code to wrap around a line
    20. Stylized ```~~~~```code blocks appropriately for listings, while leaving ```` blocks unadorned
    21. Fixed URLs with underscores and tildes
    22. Added robust processing of lists with inconsistent indenting
    23. Added support for lists within definition lists
    24. Fixed definition lists with multiple :-indented lines
    25. Added support for multiple paragraphs in definition lists
    26. Added support for multiple paragraphs in regular lists

  * 2015-12-31 Version 0.07: Polish
    1. Fixed white dot decorations next to lines in diagrams
    2. Fixed floating images (broken in 0.06)
    3. Fixed diagonal up-left arrows not reaching boxes
    4. Added support for captionless images
    5. Added captions below images
    6. Added support for centered images
    7. Fixed processing of tables with short delimiters
    8. Fixed diagonals appearing inside curves with vertices in diagrams
    9. Allowed points vertically and horizontally adjacent to lines and points in diagrams
    10. Improved unicode line and box character appearance in diagrams
    11. Allowed leading space and shorter lines for Setext-style headers
    12. Added Unicode block character support for diagrams
    13. Enlarged Unicode hexagons to form tighter grids
    14. Text is now selectable in diagrams
    15. Added tiny grid examples to features.md.html
    16. Added dot grid examples to features.md.html
    17. Added Unicode examples to features.md.html
    18. Added beautification of a number followed by "degrees"
    19. Single linebreaks now allowed in italics, bold, and strikethrough
    20. Hid the document until formatting is complete, once it is known that the script is available
    21. Increased spacing between section numbers and titles

  * 2015-11-30 Version 0.06: Bug Fixes
    1. Improved arrowheads at points
    2. Improved arrowheads at boxes
    3. Improved processing of words with 'o' in boxes
    4. Script tag workaround for C++ template/Java generic syntax in code examples with capitalized classes
    5. Fixed blocks beginning at the top of the document
    6. Allow LaTeX expressions at the end of a sentence
    7. Relaxed whitespace rules for LaTeX expressions
    8. Fixed URLs in subtitles
    9. Centered diagrams by default
    10. Switched to https by default for Markdeep and Mathjax

  * 2015-11-10 Version 0.05: Beta
    1. Added named anchors to all sections
    2. Fixed ```$$``` in code blocks
    3. Fixed header on the first line of a document
    4. Added table of contents generation
    5. Adjusted link styling
    6. Added markdeepOptions.detectMath
    7. Fixed ```==>``` arrows in html mode
    8. Released implementation source code

  * 2015-10-27 Version 0.04: Optimization
    1. Reduced minified script size to 56k (v0.03 was 88k)
    2. Added notes about Unicode source
    3. En dash ```(--)```, em dash ```(---)```, and minus sign
    4. Transform x into × in cases such as "1920×1080"
    5. Fixed e-mail addresses in subtitles
    6. Fixed arrows in the middle of lines not appearing
    7. Removed borders around diagrams in the default stylesheet
    8. Made tables centered in the default stylesheet
    9. Added support for left floating diagrams

  * 2015-10-21 Version 0.03: Embedding Support
    1. Improved handling of underscore lines and parentheses in diagrams
    2. Added support for short verticals in diagrams, e.g., ```_.- -._```
    3. Added support for hyperlinking of URLs containing ? and &
    4. Added CSS class support for `<em>` and `<strong>` tags to allow reinterpretation of *em* vs. _em_ syntax.
    5. Fixed single quotes and dollar signs in fenced code blocks

  * 2015-10-18 Version 0.02: Conformance
    1. Reduced minified script size by 1k (to 83k)
    2. Added support for as a list bullet
    3. Explicitly protected script and style blocks (CommonMark)
    4. No longer allow spaces between flanking bold and italic delimiter runs and enclosed words (CommonMark)
    5. Switched to ```<em>``` and ```&emstrong>``` tags from explicit italic and bold ones

  * 2015-10-15 Version 0.01: Initial release
