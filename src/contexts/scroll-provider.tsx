// Imported
import React, {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

interface ScrollProviderProps {
  children: ReactNode;
}

export const ScrollContext = createContext({
  isScrolling: false,
  offset: 0,
  scrollDirection: 'down',
  onEndReached: false,
  isOffsetNegative: false,
  /* eslint-disable */
  updateOffset: (verticalOffset: number) => {},
  updateIsScrolling: (isScrolling: boolean) => {},
  updateOnEndReached: (reached: boolean) => {},
  updateOnDragEnd: (ended: boolean) => {},
  updateOnMomentumScrollEnd: (ended: boolean) => {},
});

export const ScrollProvider = ({ children }: ScrollProviderProps) => {
  const [offset, setOffset] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const [isOffsetNegative, setIsOffsetNegative] = useState<boolean>(false);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down');
  const [onEndReached, setOnEndReached] = useState<boolean>(false);
  const [onDragEnd, setOnDragEnd] = useState<boolean>(false);
  const [onMomentumScrollEnd, setOnMomentumScrollEnd] =
    useState<boolean>(false);

  const setScrollDown = () => setScrollDirection('down');
  const setScrollUp = () => setScrollDirection('up');

  const updateOffset = (verticalOffset: number) => {
    if (verticalOffset <= 0) {
      setIsOffsetNegative(true);
    } else {
      setIsOffsetNegative(false);
    }
    setOffset(verticalOffset);
    if (verticalOffset > offset) {
      setScrollDown();
    }
    if (verticalOffset < offset) {
      setScrollUp();
    }
  };

  const updateIsScrolling = (scroll: boolean) => {
    setIsScrolling(scroll);
  };

  const updateOnEndReached = (reached: boolean) => {
    setOnEndReached(reached);
  };

  const updateOnDragEnd = (ended: boolean) => {
    setOnDragEnd(ended);
  };

  const updateOnMomentumScrollEnd = (ended: boolean) => {
    setOnMomentumScrollEnd(ended);
  };

  const resetOnDragEndAndOnMomentumScrollEnd = () => {
    setOnDragEnd(false);
    setOnMomentumScrollEnd(false);
  };

  useEffect(() => {
    if (onDragEnd && onMomentumScrollEnd) {
      setIsScrolling(false);
      resetOnDragEndAndOnMomentumScrollEnd();
    }
  }, [onDragEnd, onMomentumScrollEnd]);

  const value = {
    isScrolling: isScrolling,
    offset: offset,
    scrollDirection: scrollDirection,
    onEndReached: onEndReached,
    isOffsetNegative: isOffsetNegative,
    updateOffset: updateOffset,
    updateIsScrolling: updateIsScrolling,
    updateOnEndReached: updateOnEndReached,
    updateOnDragEnd: updateOnDragEnd,
    updateOnMomentumScrollEnd: updateOnMomentumScrollEnd,
  };

  return (
    <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
