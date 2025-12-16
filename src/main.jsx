import "./styles.css";
import { createRoot } from "react-dom/client";
import FitnessApp from "./components/FitnessApp";

const App = () => <FitnessApp />;

createRoot(document.getElementById("root")).render(<App />);
