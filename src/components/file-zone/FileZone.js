import React, { PureComponent } from 'react'
import './FileZone.css'

class FileZone extends PureComponent {
  render() {
    const { text, selectText } = this.props
    return (
      <div id="file-zone">
        <div id="file" className="word-list" onDoubleClick={selectText}>
          {text}
        </div>
      </div>
    )
  }
}

export default FileZone;
