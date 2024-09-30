import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from './components/Layout.tsx';
import CreateCliente from "./pages/Cliente/CreateCliente.tsx";
import EntityLayout from "./components/EntityLayout.tsx";
import SearchCliente from "./pages/Cliente/SearchCliente.tsx";
import FindAllCliente from "./pages/Cliente/FindAllCliente.tsx";
import DeleteCliente from "./pages/Cliente/DeleteCliente.tsx";
import UpdateCliente from "./pages/Cliente/UpdateCliente.tsx";
import CreateCategoria from "./pages/Categoria/CreateCategoria.tsx";
import FindAllCategoria from "./pages/Categoria/FindAllCategoria.tsx";
import SearchCategoria from "./pages/Categoria/SearchCategoria.tsx";
import DeleteCategoria from "./pages/Categoria/DeleteCategoria.tsx";
import UpdateCategoria from "./pages/Categoria/UpdateCategoria.tsx";
import CreateProducto from "./pages/Producto/CreateProducto.tsx";
import SearchProducto from "./pages/Producto/SearchProducto.tsx";
import FindAllProducto from "./pages/Producto/FindAllProducto.tsx";
import DeleteProducto from "./pages/Producto/DeleteProducto.tsx";
import UpdateProducto from "./pages/Producto/UpdateProducto.tsx";
import CreateCompra from "./pages/Compra/CreateCompra.tsx";
import FindAllCompra from "./pages/Compra/FindAllCompra.tsx";
import SearchCompra from "./pages/Compra/SearchCompra.tsx";
import DeleteCompra from "./pages/Compra/DeleteCompra.tsx";
import UpdateCompra from "./pages/Compra/UpdateCompra.tsx";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/cliente" element={<EntityLayout entityName="Cliente"/>}>
            <Route path="create" element={<CreateCliente />} />
            <Route path="search" element={<SearchCliente />} />
            <Route path="list" element={<FindAllCliente />} />
            <Route path="delete/:id" element={<DeleteCliente />} />
            <Route path="update/:id" element={<UpdateCliente />} />
          </Route>
          <Route path="/categoria" element={<EntityLayout entityName="Categoria"/>}>
            <Route path="create" element={<CreateCategoria />} />
            <Route path="list" element={<FindAllCategoria />} />
            <Route path="search" element={<SearchCategoria />} />
            <Route path="delete/:id" element={<DeleteCategoria />} />
            <Route path="update/:id" element={<UpdateCategoria />} />
          </Route>
          <Route path="/producto" element={<EntityLayout entityName="Producto"/>}>
            <Route path="create" element={<CreateProducto />} />
            <Route path="list" element={<FindAllProducto />} />
            <Route path="search" element={<SearchProducto />} />
            <Route path="delete/:id" element={<DeleteProducto />} />
            <Route path="update/:id" element={<UpdateProducto />} />
          </Route>
          <Route path="/compra" element={<EntityLayout entityName="Compra"/>}>
            <Route path="create" element={<CreateCompra />} />
            <Route path="list" element={<FindAllCompra />} />
            <Route path="search" element={<SearchCompra />} />
            <Route path="delete/:id" element={<DeleteCompra />} />
            <Route path="update/:id" element={<UpdateCompra />} />
          </Route>
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
