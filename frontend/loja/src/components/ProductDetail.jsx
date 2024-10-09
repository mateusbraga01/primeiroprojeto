function ProductDetail({ product }) {
  return (
    <div>
      <h2>Detalhes do Produto</h2>
      <p>Nome: {product.name}</p>
      <p>Descrição: {product.description}</p>
      <p>Preço: R${product.price}</p>
      <p>Quantidade: {product.quantity} unidades</p>
    </div>
  );
}

export default ProductDetail;
