import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { EventItem } from '../components';
import { useNavigate, useParams } from 'react-router-dom';
import { MAIN_PATH } from '../constants/navigation';
import { useMemo } from 'react';

const errorHandler = 'At this day, you have not events.';
export const handleDate = (date) => {
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth() + 1;
  const day = new Date(date).getDate();

  return year
    + '-' + (month < 10 ? `0${month}` : month)
    + '-' + (day < 10 ? `0${day}` : day);
};

export const Events = () => {
  const navigate = useNavigate();
  const handleClose = () => navigate(MAIN_PATH);
  const { id } = useParams();
  const { all: events } = useSelector(store => store.events);

  const handledEvents = useMemo(() => {

    return events.filter(
      ({ startTimestamp }) => handleDate(startTimestamp) === id
    );
  }, [events]);

  return (
    <Modal
      title="Viewing Events"
      open={true}
      onCancel={handleClose}
    >
      {(handledEvents.length > 0)
        ? handledEvents.map((item, index) => (
          <EventItem key={index} data={item} index={index} />
        ))
        : errorHandler}
    </Modal>
  );
};