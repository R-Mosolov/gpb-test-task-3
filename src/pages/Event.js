import React, { useCallback, useState } from 'react';
import { Modal, Input, DatePicker, Space, InputNumber, Typography } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import { notifyUser } from '../utils';
import { createEvent, updateEvent } from '../store/reducers';
import { useDispatch, useSelector } from 'react-redux';
import { MINUTES_IN_DAY } from '../constants/global';
import { v4 as uuidv4 } from 'uuid';
import { MAIN_PATH } from '../constants/navigation';
import dayjs from 'dayjs';
import { handleDate } from './Events';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const fullWidth = { width: '185%' };
const dateFormat = "YYYY-MM-DD";

export const Event = (isModalOpen) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { all: events } = useSelector(store => store.events);
  const isCreating = id === 'new';
  const [event, setEvent] = useState({
    id: (() => {
      if (id === 'new') {
        return uuidv4();
      } else {
        return id;
      }
    })(),
    title: events.find(({ id: _id }) => _id === id)?.title || '',
    // Хранят значения в ISO 8601 с нулевым смещением (UTC+0)
    startTimestamp: events.find(({ id: _id }) => _id === id)?.startTimestamp || new Date(),
    endTimestamp: events.find(({ id: _id }) => _id === id)?.startTimestamp || new Date(),
    reminderTime: events.find(({ id: _id }) => _id === id)?.reminderTime
  });
  
  const handleOk = () => {
    notifyUser({
      message: 'Notification',
      description: 'The event has been created successfully!'
    });
    
    isCreating
      ? dispatch(createEvent({ event: event }))
      : dispatch(updateEvent({ event: event }));
    
    navigate(MAIN_PATH);
  };
  
  const handleClose = () => navigate(MAIN_PATH);

  const handleTitleChange = useCallback((value) => {
    setEvent(event => ({
      ...event,
      title: event.title + value.nativeEvent.data
    }));
  }, []);

  const handleTimestamps = useCallback((value) => {
    const startTimestamp = value[0]['$d'];
    const endTimestamp = value[1]['$d'];

    setEvent(event => ({
      ...event,
      startTimestamp,
      endTimestamp,
    }));
  }, []);

  const handleReminderTime = useCallback((value) => {
    setEvent(event => ({
      ...event,
      reminderTime: value,
    }));
  }, []);

  return (
    <Modal
      title={isCreating ? 'Creating an Event' : 'Editing an Event'}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleClose}
    >
      <Space size={12} direction="vertical">
        <Text>An Event Title</Text>
        <Input
          style={fullWidth}
          placeholder="E.g., make a coffee"
          value={event?.title || ''}
          onChange={handleTitleChange}
        />
        
        <Text>Start and End Timestamp</Text>
        <RangePicker
          style={fullWidth}
          defaultValue={[
            dayjs(handleDate(event.startTimestamp || new Date()), dateFormat),
            dayjs(handleDate(event.endTimestamp || new Date()), dateFormat)
          ]}
          format={dateFormat}
          onChange={handleTimestamps}
        />
        
        <Text>Reminder Interval, min.</Text>
        <InputNumber
          style={fullWidth}
          min={1}
          max={MINUTES_IN_DAY}
          defaultValue={5}
          value={event?.reminderTime || ''}
          onChange={handleReminderTime}
        />
      </Space>
    </Modal>
  );
};