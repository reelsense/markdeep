# Markdeep Clone

This is an unofficial un-minified version of ``markdeep.mini.js``.

http://casual-effects.com/markdeep/
Markdeep

✒

[**Demo**][1] | Features | Get Started | Credits |  License

   [1]: http://casual-effects.com/markdeep/features.md.html

**Markdeep** is a technology for writing plain text documents that will look good in any web browser. It supports diagrams, common styling conventions, and equations as extensions of Markdown syntax.

Markdeep is free and easy to use. It doesn't require a plugin or Internet connection. Your document never leaves your machine and there's nothing to install. Just start writing in Vi, Nodepad, Emacs, Visual Studio, Atom, or another editor! You don't have to export, compile, or otherwise process your document.

Markdeep is ideal for design documents, specifications, README files, code documentation, lab reports, and technical web pages. Because the source is plain text, Markdeep works well with software development toolchains.

Markdeep was created by Morgan McGuire at [Casual Effects][2] with inspiration from John Gruber's [Markdown][3]. The current minified-only beta release is public in order to find bugs and get feedback, but a full and stable version with natural source is coming soon after some more code cleanup.

   [2]: http://casual-effects.com
   [3]: https://daringfireball.net/projects/markdown/

# Style Features

(See the [demo][4]!)

   [4]: http://casual-effects.com/markdeep/features.md.html

Unique features:

  * Diagrams
  * Title formatting
  * CSS stylable
  * Title and subtitle detection
  * Section numbering
  * LaTeX equation typesetting and numbering
  * Works in any browser by adding one line to the bottom of a text document
  * Fallback to ASCII in a browser if you have neither the local file nor Internet access

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

To create a Markdeep document, just open any text editor and start writing. Paste the following at the bottom of your document as a single line. Then, save it as plain text with a filename with extension `.md.html`.

` <!-- Markdeep: --><style class="fallback">body{white-space:pre;font-family:monospace}</style><script src="markdeep.min.js"></script><script src="http://casual-effects.com/markdeep/latest/markdeep.min.js"></script>`

You can drag your document into a web browser or double click on it to see it with formatting. You can also read the document in a browser when you don't have an Internet connection. If you want to avoid losing formatting when offline, just keep [markdeep.min.js][5] in the same folder.

   [5]: markdeep.min.js

View the [plain source][6] of the [feature demo][7] to learn the formatting styles that you can use. Markdeep extends Markdown, and to quote John Gruber:

   [6]: http://casual-effects.com/markdeep/features.md.html?noformat
   [7]: http://casual-effects.com/markdeep/features.md.html

> _ The overriding design goal for Markdown's formatting syntax is to make it as readable as possible. The idea is that a Markdown-formatted document should be publishable as-is, as plain text, without looking like it's been marked up with tags or formatting instructions. _

To inspect the original text source for a Markdeep document in a browser, just add `?noformat` to the end of its URL.

If you wish to use Unicode characters in your source document, you must put `<meta charset="utf-8">` at the top.

# Diagram Tips

There are a lot of techniques that can make drawing diagrams in plain text easier. I just Visual Studio or Emacs in overwrite mode, and do everything by hand. I find that pretty quick and much easier than installing or learning a new tool. Here are some basic editor tricks:

  * In most editors, pressing the insert key will enter overwrite mode, where you can type without inserting. If you're on a Macbook in Bootcamp, press `fn + return` for insert. Or, in Emacs, use `M-x overwrite-mode` to toggle overwriting.
  * In Visual Studio, hold down Alt while selecting to make a selection rectangle. This allows you to insert, type, and delete across multiple lines.
  * In Emacs, you can define a macro on the fly with `C-x (`, some key strokes, and then `C-x )`. Pres `C-x e` to play back the macro, and keep repeating `e` to keep executing it. I use this to eliminate the manual work of repetitive actions, for example, adding a space on the left of an object and deleting one on its right to shift the object right.

Others prefer more sophisticated options:

  * Overwrite-mode, Artist-mode, or Picture-mode in Emacs. These are minor modes that you can toggle on top of your major (language) mode.
  * Vim [DrawIt!][8]
  * [ASCIIFlow Infinity][9] is a free web tool for drawing ASCII diagrams.
  * Org-mode is a major mode in Emacs for...everything. Markdeep diagrams are largely compatibile with its ditaa diagram syntax.
  * [Asciio][10] is a standalone tool.
  * [JavE][11] is a standalone diagram tool, but its syntax isn't entirely compatible with Markdeep.
  * The Unix tool groff has an interpreter for the [Pic][12] language, which can be used to generate diagrams from graphs,
  * [graph-easy][13] can convert Dot and other graph languages to ASCII.
  * [Monodraw][14] is an OS X _Unicode_ art editor that can produce Markdeep diagrams, but you should avoid using non-ISO 8859-1 (Latin 1) characters, since they won't produce lines.
  * [FIGlet][15] will convert text to ASCII art banners. Some of its fonts are Markdeep compatible.

   [8]: http://www.vim.org/scripts/script.php?script_id=40
   [9]: asciiflow.com
   [10]: http://search.cpan.org/dist/App-Asciio/lib/App/Asciio.pm
   [11]: http://www.jave.de/
   [12]: https://en.wikipedia.org/wiki/Pic_language
   [13]: http://search.cpan.org/~tels/Graph-Easy/bin/graph-easy
   [14]: http://monodraw.helftone.com/
   [15]: http://www.figlet.org/

What about the "ASCII drawing characters," the DOS code page 437 and 850 characters? They're not widely supported in most modern monospace fonts (and thus editors), which are keyed to Unicode. Although Unicode has the same box drawing characters, they're now at different code points and not well supported by text-only tools (alas! I grew up with text-mode graphics and miss them).

# Advanced Applications

_The following features are experimental and may change at any time. See the release history for change information between versions._

## Options

Markdeep looks in the `window.markdeepOptions` object to determine its behavior. The only option is `mode`, which is a String. The legal options are:

  * `'markdeep'` - the default: process the document as Markdeep
  * `'script'` - do not modify the document
  * `'html'` - process the document as HTML with embedded Markdeep nodes
  * `'doxygen'` - process special tags in Doxygen documentation


> <h2>Markdeep in HTML Documents<h2>

By default, Markdeep passes HTML commands through to the browser. This is for HTML in a primarily Markdeep document. If you have a document that is instead primarily HTML and you want to use Markdeep within it, then load the script with:

`<script>window.markdeepOptions = {mode: 'html'};</script>   
>&lt;script src="markdeep.min.js"&gt;&lt;script&gt;<code>

This will process `<markdeep>` tags as Markdeep (which may include embedded diagrams enclosed in asterisks), `<diagram>` tags as Markdeep diagrams (which do not need enclosing asterisks), and leave any other content in the document unmodified as HTML.

You can also use `<pre class="markdeep">` and `<pre class="diagram">` tags.


> <h2>Markdeep with Doxygen<h2>

Set an explicit footer in `Doxyfile` with:

`HTML_FOOTER = footer.html`

Include the following lines in the `footer.html`:

`<script>window.markdeepOptions = {mode: 'doxygen'};</script>   
>&lt;script src="markdeep.min.js"&gt;&lt;script&gt;<code>

Use `<pre class="markdeep">` and `<pre class="diagram">` tags in your documentation.


> <h2>Javascript API<h2>

You can prevent Markdeep from autoformatting a document so that you can use it as a Javascript library by loading it as:

`<script>window.markdeepOptions = {mode: 'script'};</script>   
>&lt;script src="markdeep.min.js"&gt;&lt;script&gt;<code>

This allows you to then manually invoke diagram processing or full Markdeep processing from within your own Javascript programs. Markdeep exports the following members on `window.markdeep`:

**`function format(src, noTitles)`**

> Converts a String or DOM Element containing Markdeep content into a String of HTML that is returned. The result does not include the Markdeep header (stylesheet and math library script tags) or footer (signature line). The input is not modified.
>
> Optional argument `noTitles` defaults to false. Set `noTitles = true` if processing an internal node to avoid turning a bold first word into a title. Section captions are unaffected by this argument.
>
>   
> <blockquote>
>
> **`function formatDiagram(str, alignment)`**
>
>> Converts a Markdeep diagram (without the surrounding asterisks) to a String containing SVG HTML that is returned.
>>
>> `alignment` is an optional String value for the `float` attribute of the SVG node. It may be `'left'`, `'right'`, or `undefined`.
>>
>>   
> <blockquote>
>>
>> **`function stylesheet()`**
>>
>>> Returns the Markdeep default stylesheet used for short documents. Markdeep adds extra spacing around the title when formatting a large document.   
> <blockquote>
>>>
>>> # Origin and Credits
>>>
>>> I created Markdeep because I was no longer willing to choose between design documents that looked good and those that worked well with programming tools. I liked what Mark_**down**_ did on web servers, so I used that as a starting point and added more styling features and a way to directly view the documents client side in a browser.
>>>
>>> HTML is "mark_**up**_" that extends plain text with formatting. Unfortunately, the formatting tags often make original document source hard to read and write. This is slow and annoying, especially for those of us who use programming tools for document editing or want formatting in documentation files.
>>>
>>> John Gruber invented [Markdown][16] to address HTML's editing problems. The name "mark**_down_**" conveys styling in the opposite direction of the "mark**_up_**" tag syntax. Markdown beautifies text without explicit tags, based on common practices from ASCII e-mail and plain-text documents.
>>>
>>>    [16]: https://daringfireball.net/projects/markdown/

"Mark_**deep**_" is farther "down" from "mark_**down**_" on the autostyling and beautification path. Markdeep combines an easy-to-use and browser-friendly packaging with new unique features for diagrams. The code includes some of the best previous Javascript document formatting libraries and links to [MathJax][17] for equation typesetting.
>>>
>>>    [17]: https://www.mathjax.org/

Markdeep was created by Morgan McGuire. It extends the work of:
>>>
>>>   * John Gruber's original [Markdown][18] concept and specification
>>>   * Ben Hollis' [Maruku][19] (aka "Github") Markdown dialect specification
>>>   * Michel Fortin's [Extra][20] Markdown dialect specification
>>>   * Dominic Baggott's [markdown.js][21] implementation for table and list processing
>>>   * Ivan Sagalaev's [highlight.js][22] for syntax coloring
>>>   * Contributors to the above open source projects
>>>
>>>    [18]: https://daringfireball.net/projects/markdown/
   [19]: http://maruku.rubyforge.org/maruku.html
   [20]: https://michelf.ca/projects/php-markdown/extra/
   [21]: https://github.com/evilstreak/markdown-js
   [22]: https://highlightjs.org/

# License
>>>
>>> Markdeep is open source. You may use, extend, and redistribute Markdeep without charge under the terms of the [BSD license][23]:
>>>     
>>>        [23]: https://opensource.org/licenses/BSD-2-Clause


>>>           Copyright 2015, Morgan McGuire
>>>           All rights reserved.
>>>     
>>>           Redistribution and use in source and binary forms, with or without modification,
>>>           are permitted provided that the following conditions are met:
>>>     
>>>           1. Redistributions of source code must retain the above copyright notice, this
>>>           list of conditions and the following disclaimer.
>>>     
>>>           2. Redistributions in binary form must reproduce the above copyright notice, this
>>>           list of conditions and the following disclaimer in the documentation and/or other
>>>           materials provided with the distribution.
>>>     
>>>           THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
>>>           ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
>>>           WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
>>>           IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
>>>           INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING,
>>>           BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
>>>           DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
>>>           LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE
>>>           OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
>>>           THE POSSIBILITY OF SUCH DAMAGE.
>>>         
>>>
>>> Markdeep includes markdown.js, so you are also bound by the MIT license (which is BSD-compatible):
>>>     
>>>     
>>>           Permission is hereby granted, free of charge, to any person obtaining a copy of this
>>>           software and associated documentation files (the "Software"), to deal in the Software
>>>           without restriction, including without limitation the rights to use, copy, modify,
>>>           merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
>>>           permit persons to whom the Software is furnished to do so, subject to the following
>>>           conditions:
>>>           
>>>           The above copyright notice and this permission notice shall be included in all copies
>>>           or substantial portions of the Software.
>>>           
>>>           THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
>>>           INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
>>>           PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
>>>           FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
>>>           OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
>>>           DEALINGS IN THE SOFTWARE.
>>>         
>>>
>>> ...and the highlight.js BSD license:
>>>     
>>>     
>>>           Copyright (c) 2006, Ivan Sagalaev
>>>           All rights reserved.
>>>     
>>>           Redistribution and use in source and binary forms, with or without modification, are
>>>           permitted provided that the following conditions are met:
>>>           
>>>           * Redistributions of source code must retain the above copyright notice, this list of
>>>           conditions and the following disclaimer.
>>>           * Redistributions in binary form must reproduce the above copyright notice, this list
>>>           of conditions and the following disclaimer in the documentation and/or other materials
>>>           provided with the distribution.
>>>           * Neither the name of highlight.js nor the names of its contributors may be used to
>>>           endorse or promote products derived from this software without specific prior written
>>>           permission.
>>>           
>>>           THIS SOFTWARE IS PROVIDED BY THE REGENTS AND CONTRIBUTORS ``AS IS'' AND ANY EXPRESS OR
>>>           IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF
>>>           MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL
>>>           THE REGENTS AND CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
>>>           EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
>>>           SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION)
>>>           HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR
>>>           TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
>>>           SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
>>>         
>>>
>>> # Release History
>>>
>>> Starting in November 2015, old releases will be archived as
>>>
>>>> `http://casual-effects.com/markdeep/_VERSION_/markdeep.min.js`
>>>
>>> You can modify the Markdeep line at the bottom of a document to hardcode to a specific version instead of the default version of "`latest`".
>>>
>>> You can report bugs to [morgan@casual-effects.com][24] by sending a Markdeep document and what you think is wrong about the way that it appears.
>>>
>>>    [24]: mailto:morgan@casual-effects.com

  * 2015-10-TBD Version 0.04: TBD
>>>
>>>     1. Added notes about Unicode source (still looking for a more elegant solution)
>>>
>>>   
> <li>
>>>   * 2015-10-21 Version 0.03: Embedding Support
>>>
>>>     1. Added public Javascript API
>>>     2. Added support for embedding isolated Markdeep diagrams and content tags in HTML
>>>     3. Wrapped Markdeep styles in a `md` class
>>>     4. Moved Markdeep stylesheet to the top of `<head>` to make it easier to override
>>>     5. Improved handling of underscore lines and parentheses in diagrams
>>>     6. Added support for short verticals in diagrams, e.g., `_.- -._`
>>>     7. Added support for hyperlinking of URLs containing `?` and `&`
>>>     8. Added CSS class support for `<em>` and `<strong>` tags to allow reinterpretation of `*em*` vs. `_em_` syntax.
>>>     9. Fixed single quotes and dollar signs in fenced code blocks
>>>     10. Adjusted default style sheet spacing for long and short documents
>>>
>>>   
> <li>
>>>   * 2015-10-18 Version 0.02: Conformance
>>>
>>>     1. Reduced minified script size by 1k
>>>     2. Fixed subheading numbering
>>>     3. Fixed diagram decorated points at T junctions
>>>     4. Added support for * and + as list bullets
>>>     5. Explicitly protected script and style blocks (CommonMark conformance)
>>>     6. No longer allow spaces between flanking bold and italic delimiter runs and enclosed words (CommonMark conformance)
>>>     7. Switched to <em> and <strong> tags from explicit italic and bold ones
>>>     8. Added support for ATX ## headers ## up to h6 (CommonMark conformance)
>>>     9. Allowed lists to begin immediately after headers
>>>     10. Remapped arrows in text from `==>` and `<==`
>>>     11. Fixed a lock-up bug in highlight.js by upgrading to the latest version...increasing size by 2k (now 85k)
>>>     12. Added support for acute `__\` corners in diagrams
>>>
>>>   
> <li>
>>>   * 2015-10-15 Version 0.01: Initial release
>>>
>>> ![][25]

   [25]: tentacles.png
