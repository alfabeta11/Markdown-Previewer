// Now Let the work Begin;
// Components;

// 1- The Legende
function Legende(props) {
  return (
    <div className="legende">
      <span className="name">{props.name}</span>
    </div>
  )
}

// 2- The Editor;
function Editor(props) {
 // We want to set a default textarea value and make it render in the preview;
  return (
    <div className="editor-container">
      <Legende
        name="editor"
      />
      <textarea
        onChange= {props.onChange}
        id="editor"
        value= {props.input}
        rows= "15"
        >
      </textarea>
    </div>
  )
}

// 3- The Previewer
function Preview (props) {
  // The default input is parsed by **marked**
  let markedInput = marked.parse(props.input);
  return (
    <div className="preview-container">
      <Legende
        name="preview"
      />
      <div 
        id="preview"
        // Unfortunately I had to use **dangerouslySetInnerHTML**;
        dangerouslySetInnerHTML={{__html: markedInput}}
        >
        {/* You are welcome to leave a note of how to do it better */}
      </div>
    </div>
  )
}

// 4- MyApp Component that holds the stae and will be rendered
class MyApp extends React.Component {
  constructor (props) {
    super (props);
    // Sorry guys this is not clean code ;)
    this.state = {
      // Default textarea input;
      input: `
# Welcome to my React Markdown Previewer!
## This is a sub-heading...
u can also make text **bold**... whoa!
`+ '`<div>This is a div!</div>`' + "\n ``` \n // This is a line of code \n ```" + `
There's also [links](https://www.freecodecamp.org), and
> Block Quotes!
- And of course there are lists.
  - Some are bulleted.
     - With different indentation levels.
        - That look like this.
![freeCodeCamp Logo](https://cdn.freecodecamp.org/testable-projects-fcc/images/fcc_secondary.svg)
      `,
    };
    
    this.handleChange = this.handleChange.bind(this);
  }
  
  // Each time ther is a change in the textarea; we update the state.input;
  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }
  
  render() {
    return (
      <div id="wrapper">
        <Editor 
          onChange = {(e) => this.handleChange(e)}
          input = {this.state.input}
          iconClass = {this.state.iconClass}
        />
        <Preview 
          input = {this.state.input}
          iconClass = {this.state.iconClass}
        />
      </div>
    );
  }
}

let root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<MyApp />)
