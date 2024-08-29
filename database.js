const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nome_do_banco', 'usuario', 'senha', {
    host: 'localhost',
    dialect: 'mysql'
  });

  module.exports = sequelize;

  const express = require('express');
  const router = express.Router();
  const Produto = require(/*coloque seu diretorio aqui*/ );

  //Criar um novo produto
router.post(/*coloque seu diretorio*/ async (req, res) => {
    try {
        const produto = await Produto.create(req.body);
        res.status(201).send(produto);
    }catch (error) {
        res.status(500).send(error);
    }
});

// Atualizar um produto
router.put('/produto/:id', async (req, res) => {
    try {
      const produto = await Produto.findByPk(req.params.id);
      if (!produto) {
        return res.status(404).send();
      }
      await produto.update(req.body);
      res.send(produto);
    } catch (error) {
      res.status(400).send(error);
    }
  });

//Deletar um produto