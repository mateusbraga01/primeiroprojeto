import { useState, useEffect } from 'react';

function ProductForm({ selectedProduct, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: '', // Adicionando a propriedade de categoria
  });

  useEffect(() => {
    if (selectedProduct) {
      setFormData(selectedProduct);
    } else {
      setFormData({
        name: '',
        description: '',
        price: '',
        quantity: '',
        category: '', // Reiniciar a categoria também
      });
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData); // Send formData back to parent (App.jsx)
    setFormData({
      name: '',
      description: '',
      price: '',
      quantity: '',
      category: '', // Limpar também a categoria
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedProduct ? 'Editar Produto' : 'Adicionar Produto'}</h2>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Nome do Produto"
        required
      />
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Descrição"
        required
      />
      <input
        type="number"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Preço"
        required
      />
      <input
        type="number"
        name="quantity"
        value={formData.quantity}
        onChange={handleChange}
        placeholder="Quantidade"
        required
      />
      
      {/* Campo para selecionar a categoria */}
      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
      >
        <option value="">Selecione uma categoria</option>
        <option value="Categoria1">Categoria 1</option>
        <option value="Categoria2">Categoria 2</option>
        <option value="Categoria3">Categoria 3</option>
        {/* Adicione mais opções de categoria conforme necessário */}
      </select>

      <button type="submit">Salvar</button>
    </form>
  );
}

export default ProductForm;
