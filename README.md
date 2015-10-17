# markdeep clone

This is an officicial un-minified version of markdeep.mini.js.

http://casual-effects.com/markdeep/

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

```<style class="fallback">body{white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="http://casual-effects.com/markdeep/latest/markdeep.min.js"></script>```

You can drag your document into a web browser or double click on it to see it with formatting. You can also read the document in a browser when you don't have an Internet connection. If you want to avoid losing formatting when offline, just keep markdeep.min.js in the same folder.

View the plain source of the feature demo to learn the formatting styles that you can use. Markdeep extends Markdown, and to quote John Gruber:

The overriding design goal for Markdown's formatting syntax is to make it as readable as possible. The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions.
To inspect the original text source for a Markdeep document in a browser, just add ```?noformat``` to the end of its URL.

# Origin and Credits

I created Markdeep because I was no longer willing to choose between design documents that looked good and those that worked well with programming tools. I liked what Mark_**down**_ did on web servers, so I used that as a starting point and added more styling features and a way to directly view the documents client side in a browser.

HTML is "mark_**up**_" that extends plain text with formatting. Unfortunately, the formatting tags often make original document source hard to read and write. This is slow and annoying, especially for those of us who use programming tools for document editing or want formatting in documentation files.

John Gruber invented [Markdown][1] to address HTML's editing problems. The name "mark**_down_**" conveys styling in the opposite direction of the "mark**_up_**" tag syntax. Markdown beautifies text without explicit tags, based on common practices from ASCII e-mail and plain-text documents.

   [1]: https://daringfireball.net/projects/markdown/

"Mark_**deep**_" is farther "down" from "mark_**down**_" on the autostyling and beautification path. Markdeep combines an easy-to-use and browser-friendly packaging with new unique features for diagrams. The code includes some of the best previous Javascript document formatting libraries and links to [MathJax][2] for equation typesetting.

   [2]: https://www.mathjax.org/

Markdeep was created by Morgan McGuire. It extends the work of:

  * John Grubber's original Markdown concept and specification
  * Ben Hollis' [Maruku][3] (aka "Githib") Markdown dialect specification
  * Michel Fortin's [Extra][4] Markdown dialect specification
  * Dominic Baggott's [markdown.js][5] implementation for table and list processing
  * Ivan Sagalaev's [highlight.js][6] for syntax coloring
  * Contributors to the above open source projects

   [3]: http://maruku.rubyforge.org/maruku.html
   [4]: https://michelf.ca/projects/php-markdown/extra/
   [5]: https://github.com/evilstreak/markdown-js
   [6]: https://highlightjs.org/


# License

Markdeep is open source. You may use, extend, and redistribute Markdeep without charge under the terms of the [BSD license][1]:

       [1]: https://opensource.org/licenses/BSD-2-Clause


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

Starting in November 2015, old releases will be archived as

> `http://casual-effects.com/markdeep/_VERSION_/markdeep.min.js`

You can modify the Markdeep line at the bottom of a document to hardcode to a specific version instead of the default version of "`latest`".

You can report bugs to [morgan@casual-effects.com][2] by sending a Markdeep document and what you think is wrong about the way that it appears.

   [2]: mailto:morgan@casual-effects.com

  * 2015-10-16 Version 0.02: Conformance

    1. Reduced minified script size by 1k (to 83k)
    2. Added support for as a list bullet
    3. Explicitly protected script and style blocks (CommonMark)
    4. No longer allow spaces between flanking bold and italic delimiter runs and enclosed words (CommonMark)
    5. Switched to <em> and &emstrong> tags from explicit italic and bold ones

  * 2015-10-15 Version 0.01: Initial release
