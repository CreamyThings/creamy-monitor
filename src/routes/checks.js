const express = require('express');

// const Check = require('./../database/models/check');
const repository = require('./../monitors/repository');

const router = express.Router();

router.get('/check', async (req, res) => {
  const { user } = req;

  const monitors = await repository.byUser(user);

  res.json(monitors);
});

router.post('/check', async (req, res) => {
  const { user } = req;

  const checkToCreate = req.body;
  delete checkToCreate.id;
  checkToCreate.user_id = user.id;

  const check = await repository.upsertGraph(checkToCreate);

  res.json(check);
});

router.post('/check/:id', async (req, res) => {
  const { id } = req.params;

  const check = await repository.byUserAndId(req.user, id);

  if (!check) {
    res.sendStatus(404);
    return;
  }

  const newCheck = req.body;
  newCheck.user_id = check.user_id;
  newCheck.id = check.id;

  const updatedCheck = await repository.upsertGraph(newCheck);

  res.json(updatedCheck);
});

router.delete('/check/:id', async (req, res) => {
  const { id } = req.params;

  const check = await repository.byUserAndId(req.user, id);

  if (!check) {
    res.sendStatus(404);
    return;
  }

  await repository.delete(id);

  res.sendStatus(204);
});

module.exports = router;
