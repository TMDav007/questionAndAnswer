const initialState = {
  token: localStorage.getItem('token'),
  isLoggedIn: false,
  isRegistered: false,
  isLoading: false,
  serverMessage: "",
  isAuthenticated: false,
  allQuestions: [],
  comments:[],
  question: [],
  user: {},
  errors: {},
  show: false,
  submitType: "Ask",
  image: [],
  user: []
}

export default initialState;