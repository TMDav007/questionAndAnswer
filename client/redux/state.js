const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isRegistered: false,
  isLoading: false,
  serverMessage: "",
  isAuthenticated: false,
  user: {},
  errors: {}
}

export default initialState;