import React, { useMemo, useState } from 'react';

export const RoomDetailDrawerContext = React.createContext({
  isOpen: false,
  room: null,
  setRoom: (_: any) => {},
});

export const RoomDetailDrawerProvider = ({ children }: any) => {
  const [room, setRoom] = useState(null);

  const value = useMemo(() => {
    return {
      isOpen: !!room,
      room,
      setRoom: (value: any) => setRoom(value),
    };
  }, [room, setRoom]);

  return (
    <RoomDetailDrawerContext.Provider value={value}>{children}</RoomDetailDrawerContext.Provider>
  );
};
