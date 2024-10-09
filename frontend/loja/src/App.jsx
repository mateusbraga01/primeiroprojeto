import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductForm from './components/ProductForm';
import ProductList from './components/ProductList';
import ProductDetail from './components/ProductDetail';
import ProductChart from './components/ProductChart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('');

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  

  // Fetch products from backend on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:3000/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };
    fetchProducts();
  }, []);

  // Function to add or edit a product
  const handleSaveProduct = async (product) => {
    try {
      if (product.id) {
        await axios.put(`http://localhost:3000/products/${product.id}`, product);
      } else {
        await axios.post('http://localhost:3000/products', product);
      }
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
      setSelectedProduct(null);
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
    }
  };

  // Function to delete a product
  const handleDeleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/products/${id}`);
      const response = await axios.get('http://localhost:3000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
    }
  };

  // Função para lidar com a alteração do filtro de categoria
  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  // Filtrando produtos com base na categoria
  const filteredProducts = categoryFilter 
    ? products.filter(product => product.category === categoryFilter) 
    : products;

  return (
    <div className="App">
      <h1>Gerenciamento de Produtos</h1>
      
      {/* Filtro de categorias */}
      <div className="category-filter">
        <label htmlFor="category">Filtrar por categoria:</label>
        <select id="category" value={categoryFilter} onChange={handleCategoryChange}>
          <option value="">Todos</option>
          <option value="Categoria1">Categoria 1</option>
          <option value="Categoria2">Categoria 2</option>
          <option value="Categoria3">Categoria 3</option>
          {/* Adicione mais opções de categoria conforme necessário */}
        </select>
      </div>

      <ProductForm selectedProduct={selectedProduct} onSave={handleSaveProduct} />
      <ProductList products={filteredProducts} onEdit={setSelectedProduct} onDelete={handleDeleteProduct} />
      {selectedProduct && <ProductDetail product={selectedProduct} />}
      <ProductChart data={filteredProducts} />
    </div>
  );
}

export default App;
