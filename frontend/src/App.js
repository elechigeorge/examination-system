import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "./component/Navigation.js";
import AdminDashboard from "./screen/AdminDashboard.js";
import LoginScreen from "./screen/Login.js";
import StudentDashboard from "./screen/StudentDashboard.js";
import RegisterScreen from "./screen/Register.js";
import ExaminationScreen from "./screen/ExaminationScreen.js";
import HomeScreen from "./screen/HomeScreen.js";
import ExaminationRecord from "./screen/ExaminationRecord.js";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigation />}>
          <Route index element={<HomeScreen />} />
          <Route path="/login" index element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="/student/dashboard"
            element={<StudentDashboard />}
          />
          <Route
            path="/allexams"
            element={<ExaminationRecord />}
          />

          <Route path={`/examination/:id`} element={<ExaminationScreen />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
