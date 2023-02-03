import React from 'react';
import { Modal, Input, TimePicker, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { notifyUser } from '../utils';
import { createEvent } from '../store/reducers';
import { useDispatch } from 'react-redux';

export const Event = (isModalOpen) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleOk = () => {
    notifyUser({
      message: 'Notification',
      description: 'The event has been created successfully!'
    });
    dispatch(createEvent({ taskTitle: 'Task Title' }));
  };
  const handleClose = () => navigate('/');

  return (
    <Modal
      title="Creating an Event"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleClose}
    >
      <Space size={12} direction="vertical">
        <Input style={{ width: '265%' }} placeholder="Event title" />
        <TimePicker style={{ width: '265%' }} />
        <TimePicker style={{ width: '265%' }} />
      </Space>
    </Modal>
  );
};