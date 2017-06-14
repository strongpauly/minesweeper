import React, { Component } from 'react';

class Cell extends Component {

  state = {
      checked: false
  }

  constructor(props) {
      super(props);
      this.checkCell = this.checkCell.bind(this);
  }

  checkCell() {
      if (!this.state.checked) {
          if(this.props.isMine) {
              this.props.onExplode();
          }
          this.setState({checked:true});
      }
  }

  render() {
      return <td className={ this.state.checked ? "cell checked" : "cell"} onClick={this.checkCell}>&nbsp;</td>
  }
}

export default Cell;
