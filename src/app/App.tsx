import { ThemeProvider } from "../context/ThemeContext";
import { ModeProvider } from "../context/ModeContext";
import AppRoutes from "./routes";

const App = () => {
  return (
    <ThemeProvider>
      <ModeProvider>
        <AppRoutes />
      </ModeProvider>
    </ThemeProvider>
  );
};

export default App;
