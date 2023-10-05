import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Navbar from "./components/Navbar.tsx";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={client}>
    <BrowserRouter>
      <Navbar />
      <App />
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);
