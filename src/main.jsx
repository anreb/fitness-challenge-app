import "./styles.css";
import { createRoot } from "react-dom/client";
import FitnessApp from "./components/FitnessApp";
import { initializeLocalStorage } from "./data/initialData";

// Initialize localStorage with challenges and users data
initializeLocalStorage();

const App = () => <FitnessApp />;

createRoot(document.getElementById("root")).render(<App />);
