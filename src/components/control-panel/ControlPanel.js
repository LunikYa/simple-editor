import React, { PureComponent } from 'react'
import './ControlPanel.css'

class ControlPanel extends PureComponent {
  render() {
    const { doOnBoldClick, doOnItalicClick, doOnUnderlineClick } = this.props
    return (
      <div id="control-panel">
        <div id="format-actions">
          <ActionButton onClick={doOnBoldClick} content={<b>B</b>} />
          <ActionButton onClick={doOnItalicClick} content={<i>I</i>} />
          <ActionButton onClick={doOnUnderlineClick} content={<u>U</u>} />
        </div>
      </div>
    )
  }
}

const ActionButton = ({ onClick, content }) => 
    <button className="format-action" type="button" onClick={onClick}>
        {content}
    </button>

export default ControlPanel
