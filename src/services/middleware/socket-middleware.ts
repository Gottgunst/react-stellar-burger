// import { updateToken } from '../user/action';
import { Middleware } from 'redux';
import { RootState, WsFeedAction, WsMyFeedAction } from 'services/store';
import { TMidAction } from 'types';

export const socketMiddleware = (
  wsActions: WsFeedAction | WsMyFeedAction,
): Middleware<{}, RootState> => {
  return (store) => {
    let socket: WebSocket | null = null;

    return (next) => (action) => {
      const { dispatch } = store;
      const { type, payload } = action as TMidAction;
      const {
        wsConnect,
        // wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsConnecting,
        wsDisconnect,
      } = wsActions;

      if (type === wsConnect.type) {
        socket = new WebSocket(payload);
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

          // if (data === 'ping') {
          //   socket.send('pong');
          // }

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

        // Функции отправки сообщения в данном проекте нет
        // if (wsSendMessage && type === wsSendMessage.type) {
        //   socket.send(JSON.stringify(payload));
        // }

        if (wsDisconnect.type === type) {
          socket.close();
          socket = null;
        }
      }

      next(action);
    };
  };
};
