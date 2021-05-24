import React from 'react'
import { Modal, Button } from 'antd';

export function NotificationButton(props) {
  const followerCount = props.followerCount
  const modalTitle = "Notify updates"
  const [visible, setVisible] = React.useState(false);
  const [confirmLoading, setConfirmLoading] = React.useState(false);
  const [modalText, setModalText] = React.useState(`Your profile updates will be sent to your ${followerCount} followers.`);
  const [confirmVisible, setConfirmVisible] = React.useState(false);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setModalText('Notifications are on their way...');
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
      setConfirmVisible(true);
      setModalText(`Your profile updates will be sent to your ${followerCount} followers.`)
    }, 2000);
  };

  const handleCancel = () => {
    console.log('Clicked cancel button');
    setVisible(false);
  };

  const handleConfirmOk = () => {
      setConfirmVisible(false);
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Notify Followers
      </Button>
      <Modal
        title={modalTitle}
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <p>{modalText}</p>
      </Modal>

      <Modal
        title={modalTitle}
        visible={confirmVisible}
        onOk={handleConfirmOk}
      >
          <p>Notification Sent!</p>
      </Modal>
    </>
  );
};