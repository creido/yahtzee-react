import React, {Component} from 'react';

class Score extends Component {

  shouldComponentUpdate(nextProps) {
    return (nextProps.tempScore !== this.props.tempScore ||
      nextProps.value !== this.props.value ||
      nextProps.status !== this.props.status);
  }

  render() {
    const {tempScore, value, status} = this.props;

    console.log('cell');
    return <td className={`score-item ${status}`}>
      {value}
      <span className="temp-score">{tempScore}</span>
    </td>
  }
}

export default Score;
