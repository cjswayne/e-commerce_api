const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {

  // find all categories
  try {
    const categories = await Category.findAll({
      include: Product
    })
  
    res.send(categories);
  } catch(err){
    res.status(400).json(err);
    }

  
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  const cId = req.params.id;
  try{
    const category = await Category.findOne({
      where:{
        id:cId
      }
    });

    if (category){
      return res.send(category);
    } 
    return res.json({
      error: 401,
      message: 'Could not find Category'
    })
  } catch(err){
    res.status(400).json(err);  }

});

router.post('/', async (req, res) => {
  // create a new category
  const newCategory = req.body;

  try{
    const category = await Category.create(newCategory);

    res.json({
      message:'Category created succesfully',
      category:category
    })
  } catch(err){
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const cId = req.params.id;
  const updatedData = req.body;

  try{
    const [result] = await Category.update(updatedData, {
      where: { id: cId }
    })

    if(result){
      res.json({
        message:'Category updated'
      })
    } else {
      res.json({
        message:'Category does not exist or cannot be updated.'
      })
    }

  } catch(err){
    res.status(400).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const cId = req.params.id;

  try{
    
    await Product.destroy({ where: {category_id: cId} });
    const result = await Category.destroy({
      where: { id: cId }
    })

    if(result){
      res.json({
        message:`Category deleted`
      })
    } else {
      res.json({
        message:'Category does not exist or cannot be deleted.'
      })
    }

  } catch(err){
    res.status(400).json(err);
  }
});

module.exports = router;
