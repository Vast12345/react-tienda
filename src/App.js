import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout.tsx';
import CreateCliente from "./pages/CreateCliente.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/create" element={<CreateCliente />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
