const EDITOR_MESSAGE = `# Instructions:

Use # to create headers of different sizes:

# Big Header
## Smaller Header
### Even Smaller Header
#### I think you get it...

Use:
 ** to make text **bold!**
\\* to make text *italic* (You can also use \\ to escape characters)
~~ to ~~strike through text~~

Use *, -, or + for unordered lists:
* This
- is an
+ unordered list

Use any number followed by a period to create an ordered list:
1. This is
2. an
56. ordered list

Use \\\` to create inline code:
\`<div>Wow! Inline code!</div>\`

Use triple backticks (\`\`\`) to create a code block:
\`\`\`
function example(arg1, arg2) {
  return "I am inside a block of code";
}
\`\`\`
You can also create [links](https://www.google.com)

or

embed images:

![text that displays when the image can't load](https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_272x92dp.png)

Create rules with three underscores:
___

Visit the [Markdown Guide](https://www.markdownguide.org/basic-syntax/) to learn more!`;

const { useState, useEffect } = React;
import { marked } from "https://esm.sh/marked";
import DOMPurify from "https://esm.sh/dompurify";

const MarkdownPreviewer = () => {
  const [editorText, setEditorText] = useState(EDITOR_MESSAGE);
  const [sanitizedHtml, setSanitizedHtml] = useState("");

  marked.setOptions({
    tables: true,
    breaks: true,
    smartLists: true,
    highlight: function (code, lang) {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value;
      } else {
        return hljs.highlightAuto(code).value; // Auto-detect if language is not provided
      }
    } });

  return /*#__PURE__*/(
    React.createElement("div", { className: "row h-100  justify-content-evenly row-class" }, /*#__PURE__*/
    React.createElement("div", { style: { height: `calc(${window.innerHeight}px - 2rem)` }, className: "col-11 col-lg-5 bg-dark shadow-lg p-0 d-flex flex-column my-3" }, /*#__PURE__*/
    React.createElement("div", { className: "w-100 fs-4 fw-bold p-1 border border-2 border-secondary" }, /*#__PURE__*/
    React.createElement("i", { className: "bi bi-pencil p-2" }), "Editor"), /*#__PURE__*/


    React.createElement("div", { id: "editor-container", className: "w-100 h-100" }, /*#__PURE__*/
    React.createElement(Editor, { editorText: editorText, setEditorText: setEditorText, setSanitizedHtml: setSanitizedHtml }))), /*#__PURE__*/


    React.createElement("div", { style: { height: `calc(${window.innerHeight}px - 2rem)` }, className: "col-11 col-lg-5 bg-dark shadow-lg p-0 d-flex flex-column my-3" }, /*#__PURE__*/
    React.createElement("div", { className: "w-100 fs-4 fw-bold p-1 border border-2 border-secondary" }, /*#__PURE__*/
    React.createElement("i", { className: "bi bi-eye p-2" }), "Preview"), /*#__PURE__*/


    React.createElement("div", { id: "preview-container", className: "w-100 h-100" }, /*#__PURE__*/
    React.createElement(Previewer, { sanitizedHtml: sanitizedHtml })))));




};

const Editor = ({ editorText, setEditorText, setSanitizedHtml }) => {

  const renderMarkdown = () => {
    const rawHtmlOutput = marked(editorText);
    setSanitizedHtml(DOMPurify.sanitize(rawHtmlOutput));
  };

  const handleChange = event => {
    setEditorText(event.target.value);
  };

  useEffect(() => {
    renderMarkdown();
  }, [editorText]);

  return /*#__PURE__*/(
    React.createElement("textarea", { id: "editor", type: "text", className: "d-block w-100 h-100 p-2", value: editorText, onChange: handleChange }));

};

const Previewer = ({ sanitizedHtml }) => {
  useEffect(() => {
    hljs.highlightAll();
  }, [sanitizedHtml]);

  return /*#__PURE__*/(
    React.createElement("div", { id: "preview", className: "w-100 p-2", dangerouslySetInnerHTML: { __html: sanitizedHtml } }));


};
ReactDOM.render( /*#__PURE__*/React.createElement(MarkdownPreviewer, null), document.getElementById("app-wrapper"));