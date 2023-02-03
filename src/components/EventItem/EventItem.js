import { Link } from 'react-router-dom';
import { Space, Typography } from 'antd';
import { notifyUser } from '../../utils';
import './EventItem.scss';

export const EventItem = () => {
  const { Text } = Typography;

  return (
    <div className='event-item'>
      <Space size={265} direction="horizontal">
        <Space size={12} direction="vertical">
          <Text>New Event</Text>
          <Text type="secondary">From 11:11 to 22:22</Text>
        </Space>
        <Space size={12} direction="horizontal">
          <Link to="/events/1">
            Edit
          </Link>
          <Link to="/events">
            <div onClick={
              () => notifyUser({
                message: 'Notification',
                description: 'The event has been deleted successfully!'
              })
            }>
              Delete
            </div>
          </Link>
        </Space>
      </Space>
    </div>
  );
};