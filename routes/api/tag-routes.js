const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", async (req, res) => {
  const tagData = await Tag.findAll().catch((err) => {
    res.json(err);
  });
  res.json(tagData);
});

router.get("/:id", async (req, res) => {
  const tagData = await Tag.findByPk(req.params.id).catch((err) => {
    res.json(err);
  });
  res.json(tagData);
});

router.post("/", async (req, res) => {
  try {
    const tagData = await Tag.create(req.body);

    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const tagData = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tagData[0]) {
      res.status(404).json({ message: "No Tag with this id!" });
      return;
    }
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  const tagData = await Tag.destroy({
    where: {
      id: req.params.id,
    },
  });
  res.json(tagData);
});

module.exports = router;