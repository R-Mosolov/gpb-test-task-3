import { Badge, Calendar, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { destructureTimestamp } from '../../utils';
import { DAY_EVENTS_PATH, EVENTS_PATH } from '../../constants/navigation';
import './Main.scss';

const getMonthData = (value) => {
  if (value.month() === 8) {
    return 1394;
  }
};

export const Main = () => {
  const navigate = useNavigate();
  const { all: events } = useSelector(store => store.events);

  const monthCellRender = (value) => {
    const num = getMonthData(value);
    
    return num ? (
      <div className="notes-month">
        <section>{num}</section>
        <span>Backlog number</span>
      </div>
    ) : null;
  };
  
  const dateCellRender = (value) => {
    const listData = events
      .filter(item => {
        const timestamp = destructureTimestamp(item.startTimestamp)
        
        if (
          timestamp.day === value.date()
          && timestamp.month === value.month()
          && timestamp.year === value.year()
        ) {
          return true;
        }
      })
      .map(({ title }) => ({
        type: 'success',
        content: title,
      }));
    
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge status={item.type} text={item.content} />
          </li>
        ))}
      </ul>
    );
  };
  
  return (
    <>
      <Link to={`${EVENTS_PATH}/new`}>
        <Button
          type="primary"
          size="large"
          icon={<PlusOutlined />}
        >
          Create an event
        </Button>
      </Link>
      
      <Calendar
        onSelect={(value) => {
          const date = value['$d'];
          const handledDate = date.toISOString().split('T')[0];

          navigate(`${DAY_EVENTS_PATH}/${handledDate}`);
        }}
        dateCellRender={dateCellRender}
        monthCellRender={monthCellRender}
      />
    </>
  );
};