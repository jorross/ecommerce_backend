const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  const catData = await Category.findAll({
    include: [{ model: Product }],
  }).catch((err) => {
    res.json(err);
  });
  res.json(catData);
});

router.get("/:id", async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const catData = await Category.findByPk(req.params.id, {
    include: [{ model: Product }],
  }).catch((err) => {
    res.json(err);
  });
  res.json(catData);
});

router.post("/", (req, res) => {
  // create a new category
  Category.create(req.body)
    .then((category) => {
      return res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", async (req, res) => {
  // update a category by its `id` value
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((category) => {
      return res.status(200).json(category);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", async (req, res) => {
  // delete a category by its `id` value
  const catData = await Category.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(catData);
});

module.exports = router;
