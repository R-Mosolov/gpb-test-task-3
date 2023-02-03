import { Modal } from 'antd';
import { EventItem } from '../components';
import { useNavigate } from 'react-router-dom';

export const Events = () => {
  const navigate = useNavigate();
  const handleClose = () => navigate('/');

  return (
    <Modal
      title="Viewing Events"
      open={true}
      onCancel={handleClose}
    >
      <EventItem />
      <EventItem />
      <EventItem />
    </Modal>
  );
};