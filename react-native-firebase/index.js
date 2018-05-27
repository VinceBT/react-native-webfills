const firebase = {
  messaging() {
    return {
      getToken() {
        console.warn('Warning: the token delivered is just a stub and will not work by any mean');
        return 'a'.repeat(11) + ':' + 'a'.repeat(140);
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
