import React, { useCallback, useState } from 'react';
import { Modal, Input, DatePicker, Space, InputNumber, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { notifyUser } from '../utils';
import { createEvent } from '../store/reducers';
import { useDispatch } from 'react-redux';
import { MINUTES_IN_DAY } from '../constants/global';
import { v4 as uuidv4 } from 'uuid';

const { Text } = Typography;
const { RangePicker } = DatePicker;
const fullWidth = { width: '124%' };

export const Event = (isModalOpen) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [event, setEvent] = useState({
    id: uuidv4(),
    title: '',
    startTimestamp: '', // Хранит значения в ISO 8601 с нулевым смещением (UTC+0)
    endTimestamp: '', // Хранит значения в ISO 8601 с нулевым смещением (UTC+0)
    reminderTime: 5
  });
  
  const handleOk = () => {
    notifyUser({
      message: 'Notification',
      description: 'The event has been created successfully!'
    });
    dispatch(createEvent({ event: event }));
    navigate('/');
  };
  
  const handleClose = () => navigate('/');

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
      title="Creating an Event"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleClose}
    >
      <Space size={12} direction="vertical">
        <Text>An Event Title</Text>
        <Input
          style={fullWidth}
          placeholder="E.g., make a coffee"
          onChange={handleTitleChange}
        />
        
        <Text>Start and End Timestamp</Text>
        <RangePicker style={fullWidth} showTime onChange={handleTimestamps} />
        
        <Text>Reminder Interval, min.</Text>
        <InputNumber
          style={fullWidth}
          min={1}
          max={MINUTES_IN_DAY}
          defaultValue={5}
          onChange={handleReminderTime}
        />
      </Space>
    </Modal>
  );
};