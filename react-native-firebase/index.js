const firebase = {
  messaging() {
    return {
      getToken() {
        return "STUB";
      },
      requestPermissions() {
        // Nothing
      },
      onTokenRefresh() {
        // Nothing
      },
      onMessage() {
        return new Promise((resolve, reject) => {});
      },
      getInitialNotification() {
        return new Promise((resolve, reject) => {});
      },
      removeDeliveredNotification() {
        // Nothing
      },
      cancelLocalNotification() {
        // Nothing
      },
      deleteInstanceId() {
        // Nothing
      },
      subscribeToTopic() {
        // Nothing
      },
      unsubscribeFromTopic() {
        // Nothing
      },
    };
  }
};

export default firebase;
