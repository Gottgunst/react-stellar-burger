import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { POINT } from '../../utils/data';
import { io } from 'socket.io-client';

// export const burgerWss = createApi({
//   reducerPath: 'burgerWss',
//   baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_WSS_URL }),
//   tagTypes: ['Orders'],
//   endpoints: (build) => ({
//     getOrders: build.query({
//       query: (token = null) =>
//         `${POINT.ORDERS}${token ? '?token=$' + token : '/all'}`,
//       async onCacheEntryAdded(
//         _,
//         { cacheDataLoaded, cacheEntryRemoved, updateCachedData },
//       ) {
//         try {
//           await cacheDataLoaded;
//           // the /chat-messages endpoint responded already

//           const socket = io(process.env.REACT_APP_WSS_URL, {
//             withCredentials: true,
//           });

//           // socket.on(ChatEvent.ReceiveMessage, (message) => {
//           //   updateCachedData((draft) => {
//           //     draft.push(message);
//           //   });
//           // });

//           await cacheEntryRemoved;
//         } catch {
//           // if cacheEntryRemoved resolved before cacheDataLoaded,
//           // cacheDataLoaded throws
//         }
//       },
//     }),
//   }),
// });

// export const { useGetOrdersQuery } = burgerWss;
