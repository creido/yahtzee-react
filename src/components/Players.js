import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = state => ({players: state.gamePlay.players});

const Player = ({id, isActive, name}) => {
  return <li
    id={id} className={`player${isActive ? ' is-active': ''}`}>
      {name}
  </li>
}

const Players = ({players}) => {
  return <div>
      <ul>
        {players.map(player =>
          <Player
            key={player.id}
            {...player} />
        )}
      </ul>
  </div>;
}

export default connect(
  mapStateToProps,
  {}
)(Players);
