const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: Product
    })
    res.send(tags);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data

  const tId = req.params.id;

  try {
    const tag = await Tag.findOne({
      where: {
        id: tId
      }
    })

    if (tag) return res.send(tag);

    return res.json({
      error: 401,
      message: 'Could not find Tag'
    })

  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new tag

  const newTag = req.body;
  try {
    const tag = await Tag.create(newTag);

    res.json({
      message:'Tag created succesfully',
      tag:tag
    })

  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value

  const tId = req.params.id;
  const updatedTag = req.body;
  try {
    const [result] = await Tag.update(updatedTag, {
      where: { id: tId }
    })

    if (result) return res.json({
      message:'Tag Updated'
    });

    return res.json({
      message:'Tag cannot be updated.'
    });



  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const tId = req.params.id;

  try {
    const result = await Tag.destroy({
      where: { id:tId }
    })

    if (result) return res.json({
      message:'Tag deleted'
    })

    return res.json({
      message:'Tag does not exist or cannot be deleted'
    })
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
