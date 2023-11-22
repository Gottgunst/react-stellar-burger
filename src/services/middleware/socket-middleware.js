import { updateToken } from '../user/action';

export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type } = action;
      const {
        wsConnect,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect.type) {
        socket = new WebSocket(action.payload);
        dispatch(wsConnecting());
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(onOpen());
        };

        socket.onerror = (event) => {
          dispatch(onError('Error'));
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);

          // if (parsedData.message === 'Invalid or missing token') {
          //   dispatch(updateToken());
          //   dispatch(wsConnect());
          // }
          dispatch(onMessage(parsedData));
        };

        socket.onclose = (event) => {
          dispatch(onClose());
        };

        // Так как браузерный веб-сокет не обладает возможностью переподключения
        // из-за обрыва соединения - желательно это делать самому через setTimeout
        // if()

        if (wsSendMessage && type === wsSendMessage.type) {
          socket.send(JSON.stringify(action.payload));
        }

        if (wsDisconnect.type === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
