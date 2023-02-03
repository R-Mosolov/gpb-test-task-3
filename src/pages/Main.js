import { Calendar, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

export const Main = () => {
  const navigate = useNavigate();
  
  return (
    <>
      <Link to="/events/new">
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
        >
          Create an event
        </Button>
      </Link>
      
      <Calendar onSelect={() => navigate('/events')} />
    </>
  );
};