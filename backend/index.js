const express = require('express');
const cors = require('cors');
const Product = require('./models/Product');
const sequelize = require('./database');

const app = express();
app.use(cors());
app.use(express.json());

// Rota para adicionar um produto
app.post('/products', async (req, res) => {
    try {
      const product = await Product.create(req.body); // Certifique-se de que o body inclui a categoria
      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao criar produto', error });
    }
  });

// Rota para listar todos os produtos
app.get('/products', async (req, res) => {
  const products = await Product.findAll();
  res.json(products);
});

// Rota para atualizar um produto
app.put('/products/:id', async (req, res) => {
    try {
      const product = await Product.update(req.body, {
        where: { id: req.params.id }
      });
      res.status(200).json(product);
    } catch (error) {
      res.status(500).json({ message: 'Erro ao atualizar produto', error });
    }
  });

// Rota para excluir um produto
app.delete('/products/:id', async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByPk(id);
  if (product) {
    await product.destroy();
    res.json({ message: 'Produto excluído' });
  } else {
    res.status(404).send('Produto não encontrado');
  }
});

// Iniciar o servidor
const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});


sequelize.sync() // Isso cria as tabelas se elas não existirem
  .then(() => {
    console.log('Banco de dados sincronizado.');
    app.listen(3000, () => {
      console.log('Servidor rodando na porta 3000');
    });
  })
  .catch((error) => {
    console.error('Erro ao sincronizar banco de dados:', error);
  });
