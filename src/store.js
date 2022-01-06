import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loggedIn: false,
    snackbarLecturer: false,
    snackbarCourse: false,
    snackbarEnrolment: false,
    snackBarShow: false,
    snackBarData: {},
    course: {
      title: "",
      code: "",
      description: "",
      points: "",
      level: "",
    },
  },
  getters: {},
  mutations: {
    SET_LOGGED_IN_STATUS(state, loggedIn) {
      state.loggedIn = loggedIn;
    },
    // SET_COURSE(state, title, code, description, points, level) {
    //   state.course.title = title;
    //   state.course.code = code;
    //   state.course.description = description;
    //   state.course.points = points;
    //   state.course.level = level;
    // },
    SET_SNACKBAR_STATUS(state, data) {
      state.snackBarShow = data.show;
      state.snackBarData = data;
    },
    SET_SNACKBAR_LECTURER_STATUS(state, snackbarLecturer) {
      state.snackbarLecturer = snackbarLecturer;
    },
    SET_SNACKBAR_COURSE_STATUS(state, snackbarCourse) {
      state.snackbarCourse = snackbarCourse;
    },
    SET_SNACKBAR_ENROLMENT_STATUS(state, snackbarEnrolment) {
      state.snackbarEnrolment = snackbarEnrolment;
    },
  },
  actions: {
    login(context, credentials) {
      axios
        .post(`https://college-api-mo.herokuapp.com/api/login`, {
          email: credentials.email,
          password: credentials.password,
        })
        .then((response) => {
          context.commit("SET_LOGGED_IN_STATUS", true);
          localStorage.setItem("token", response.data.token);
        })
        .catch((error) => {
          console.log(error);
          console.log(error.response.data.message);
        });
    },
    registerLogin(context, response) {
      context.commit("SET_LOGGED_IN_STATUS", true);
      localStorage.setItem("token", response.data.token);
    },
    logout(context) {
      localStorage.removeItem("token");
      context.commit("SET_LOGGED_IN_STATUS", false);
    },
    displaySnackBar(context, data) {
      context.commit("SET_SNACKBAR_STATUS", data);
    },
  },
});
