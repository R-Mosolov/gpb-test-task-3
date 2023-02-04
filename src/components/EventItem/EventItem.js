import { Link, useNavigate } from 'react-router-dom';
import { Space, Typography } from 'antd';
import { notifyUser } from '../../utils';
import './EventItem.scss';
import { EVENTS_PATH, DAY_EVENTS_PATH } from '../../constants/navigation';
import { useDispatch } from 'react-redux';
import { deleteEvent } from '../../store/reducers';

const defaultTitle = 'New Event';
const defaultStartTimestamp = '11:11';
const defaultEndTimestamp = '22:22';
const handleTimestamp = (timestamp) => new Date(timestamp).getHours()
  + ':' + new Date(timestamp).getMinutes() + ' ';

export const EventItem = ({ data, index }) => {
  const { id, title, startTimestamp, endTimestamp } = data;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Text } = Typography;

  return (
    <div key={index} className='event-item'>
      <Space size={265} direction="horizontal">
        <div className='range-width'>
          <div className='main-info'>
            <Space size={12} direction="vertical">
              <Text>{title || defaultTitle}</Text>
              <Text type="secondary">
                From {handleTimestamp(startTimestamp) || defaultStartTimestamp}
                to {handleTimestamp(endTimestamp) || defaultEndTimestamp}
              </Text>
            </Space>
          </div>
        </div>
        <div className='actions'>
          <Space size={12} direction="horizontal">
            <Link to={`${EVENTS_PATH}/${id}`}>
              Edit
            </Link>
            <button class="deleting-button" onClick={
              () => {
                dispatch(deleteEvent({ event: data }));
                navigate(DAY_EVENTS_PATH + '/' + startTimestamp?.split('T')[0] === id);
                notifyUser({
                  message: 'Notification',
                  description: 'The event has been deleted successfully!'
                });
              }
            }>
              Delete
            </button>
          </Space>
        </div>
      </Space>
    </div>
  );
};