const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isRegistered: false,
  isLoading: false,
  serverMessage: "",
  isAuthenticated: false,
  allQuestions: [],
  user: {},
  errors: {},
  show: false,
  submitType: "Ask"
}

export default initialState;