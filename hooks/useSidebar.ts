import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux';
import { filterByTransfer, turnAllTransfers } from '@/store/reducers/ticketsSlice';

const useSidebar = () => {
  const [checked, setChecked] = useState({
    all: false,
    zero: true,
    one: false,
    two: false,
    three: false,
  });

  const dispatch = useAppDispatch();
  const { tickets } = useAppSelector((state) => state.tickets);

  useEffect(() => {
    if (checked.all) dispatch(turnAllTransfers());
    if (!checked.all)
      dispatch(
        filterByTransfer([
          { number: 0, active: checked.zero },
          { number: 1, active: checked.one },
          { number: 2, active: checked.two },
          { number: 3, active: checked.three },
        ])
      );
    const allChecked = checked.zero && checked.one && checked.two && checked.three;

    if (allChecked) {
      setChecked({
        ...checked, all:true
      })
    }
  }, [checked, dispatch, tickets]);

  

  const handlerAll = () => {
    if (checked.all) {
      setChecked({
        zero: false,
        one: false,
        two: false,
        three: false,
        all: false,
      });
    } else {
      setChecked({
        zero: true,
        one: true,
        two: true,
        three: true,
        all: true,
      });
    }
  };

  const inputs = [
    { id: 'all', label: 'Все', func: () => handlerAll(), checked: checked.all },
    {
      id: 'without',
      label: 'Без пересадок',
      func: () => setChecked({ ...checked, zero: !checked.zero, all: false }),
      checked: checked.zero,
    },
    {
      id: '1',
      label: '1 пересадка',
      func: () => setChecked({ ...checked, one: !checked.one, all: false }),
      checked: checked.one,
    },
    {
      id: '2',
      label: '2 пересадки',
      func: () => setChecked({ ...checked, two: !checked.two, all: false }),
      checked: checked.two,
    },
    {
      id: '3',
      label: '3 пересадки',
      func: () => setChecked({ ...checked, three: !checked.three, all: false }),
      checked: checked.three,
    },
  ];

  return { inputs };
};

export default useSidebar;
