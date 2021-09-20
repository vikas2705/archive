export function APIException(response) {
    this.status = response.status;
    this.message = response.message || 'Error';
  
    if (process.env.NODE_ENV === 'development') {
      this.message = response.message;
    }
}
  