class ToastState {
  show = $state(false);
  message = $state('');

  trigger(msg: string) {
    this.message = msg;
    this.show = true;
    setTimeout(() => {
      this.show = false;
    }, 3000);
  }
}

export const toast = new ToastState();
