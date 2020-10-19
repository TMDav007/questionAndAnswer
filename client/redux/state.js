const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isRegistered: false,
  isLoading: false,
  serverMessage: "",
  errors: {}
}

export default initialState;