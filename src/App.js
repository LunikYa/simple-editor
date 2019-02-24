import React, { Component } from 'react'
import './App.css'
import ControlPanel from './components/control-panel/ControlPanel'
import FileZone from './components/file-zone/FileZone'
import getMockText, { getSelectedText, getSynonyms } from './services/text.service'
import { makeId } from './services/helpers.service'
import { WORD_OPTIONS_MAP } from './constants/app'

class App extends Component { 
  state = {
    text: '',
    synonyms: [],
    selectedNodeId: null,
    styleNodesMap: {}
  }
  wordRefMap = {}

  componentDidMount() {
    this.getText()
  }
  getText = async () => {
    const text = await getMockText()  /* FIXME */
    this.setState({
      text
    })
  }
  toggleBold = () => {
    this.toggleStyle(WORD_OPTIONS_MAP.BOLD)
  }
  toggleItalic = () => {
    this.toggleStyle(WORD_OPTIONS_MAP.ITALIC)
  }
  toggleUnderlined = () => {
    this.toggleStyle(WORD_OPTIONS_MAP.UNDERLINED)
  }
  changeSelectedWord = (word) => {
    if (word) {
      this.toggleStyle(WORD_OPTIONS_MAP.WORD, word)
    }
  }
  selectWord = (id) => {
    this.setState({
      selectedNodeId: id
    })
  }
  splitText = () => {
    const { styleNodesMap, text, selectedNodeId } = this.state
    const words = text.split(' ')
    
    const processedText = words.map((word, id) => {
      // const id = makeId() FIXME
      const data = styleNodesMap[id] || {}
      return (
        <span 
          key={id} 
          className={`
            word-item 
            ${data.bold ? 'bold-text' : ''} 
            ${data.underlined ? 'underlined-text' : ''}
            ${data.italic ? 'italic-text' : ''} 
            ${selectedNodeId === id ? 'selected-text' : ''}
          `} 
          ref={(el) => this.registerWordsRefs(el, id, word)}
          onDoubleClick={() => this.selectWord(id)}
        >
          {data.word || word}
        </span>
      )
    })
    return processedText
  }
  registerWordsRefs = (el, key, word) => {
    if (!this.wordRefMap[key]) {
      this.wordRefMap[key] = {
          el,
          word
        }
      }
  }
  handleTextSelection = async (event) => {
    const { selectedNodeId } = this.state
    const wordData = this.wordRefMap[selectedNodeId]
    const selection = (wordData && wordData.word) || event.target.textContent
    if (selection) {
      const synonyms = await getSynonyms(selection)  /* FIXME */
      this.setState({
        synonyms
      })
    }
  }
  toggleStyle = (styleKey, value) => {
    const { selectedNodeId, styleNodesMap } = this.state
    
    const wordStyles = styleNodesMap[selectedNodeId]
    const newValue = wordStyles ? !wordStyles[styleKey] : true

    this.setState({
      styleNodesMap: {
        ...styleNodesMap,
        [selectedNodeId]: {
          ...wordStyles,
          [styleKey]: value || newValue
        }
      }
    })
  }
  render() {
    const { synonyms } = this.state
    return (
      <div className="App">
        <header>
          <span>Simple Text Editor</span>
          <div className="synonyms-list">
            {synonyms.map(item =>
              <div key={makeId()} className="synonyms-list-item" onClick={() => this.changeSelectedWord(item.word)}>
                {item && item.word}
              </div>
            )}
          </div>
        </header>
        <main>
          <ControlPanel 
            doOnBoldClick={this.toggleBold}
            doOnItalicClick={this.toggleItalic}
            doOnUnderlineClick={this.toggleUnderlined}
          />
          <FileZone 
            text={this.splitText()} /* FIXME */
            selectText={this.handleTextSelection}
          />
        </main>
      </div>
    )
  }
}

export default App
