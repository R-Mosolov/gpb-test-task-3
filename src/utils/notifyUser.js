import { notification } from 'antd';

export const notifyUser = ({ message, description, handler }) => {
  const defaultMessage = 'Notification Title';
  const defaultDescription = 'This is the content of the notification.';
  const defaultHandler = () => console.log('Notification Clicked!');

  notification.open({
    message: message || defaultMessage,
    description: description || defaultDescription,
    onClick: handler || defaultHandler,
  });
};