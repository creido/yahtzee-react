const MESSAGE_RESET = 'MESSAGE_RESET';
const MESSAGE_SHOW = 'MESSAGE_SHOW';

export const showMessage = (msg) => ({type: MESSAGE_SHOW, payload: msg});

export default function(state = '', action) {
  switch(action.type) {
    case MESSAGE_SHOW:
      return action.payload;

    case MESSAGE_RESET:
      return '';

    default:
      return state;
  }
};
