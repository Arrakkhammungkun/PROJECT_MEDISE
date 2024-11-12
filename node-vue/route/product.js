var express = require('express');
const router =express.Router();
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const {Category} = require('./categories'); 



const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    img: { type: String, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' }
  });
  const Product = mongoose.model('Product', productSchema);
  
  router.get('/', async (req, res) => {
    try {
      const products = await Product.find({}).populate('category');
      res.json(products);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  
 
  
  router.post('/add', [
    check('name', 'กรุณาป้อนชื่อสินค้า').not().isEmpty(),
    check('description', 'กรุณาป้อนรายละเอียดสินค้า').not().isEmpty(),
    check('price', 'กรุณาป้อนราคาสินค้า').isNumeric(),
    check('img', 'กรุณาป้อนภาพสินค้า').not().isEmpty()
  ], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  
    try {
      const { name, description, price, img, category } = req.body;
      const product = new Product({ name, description, price, img, category });
      await product.save();
      res.status(201).json(product);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
  router.get('/show', async (req, res, next) => {
    const categoryId = req.query.category;

    try {
      const categories = await Category.find({});
      let products = [];
    
      if (categoryId) {
        products = await Product.find({ category: new mongoose.Types.ObjectId(categoryId) }).populate('category');
      } else {
        products = await Product.find({}).populate('category');
      }
    
      res.json({
        categories: categories,
        products: products
      });
    } catch (err) {
      next(err);
    }
  });
  router.post('/cart', async (req, res, next) => {
    try {
      const product_id = req.body.product_id;
      req.session.cart = req.session.cart || {};
      let cart = req.session.cart; // ตะกร้าสินค้า
      console.log('Session data:', req.session);
console.log('Cart data:', req.session ? req.session.cart : 'Session is undefined');

      
      // ค้นหาสินค้าจากฐานข้อมูล
      const product = await Product.findById(product_id);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      
      if (cart[product_id]) {
        cart[product_id].qty++;
      } else {
        
        cart[product_id] = {
          img:product.img,
          item: product._id.toString(),
          title: product.name,
          price: product.price,
          qty: 1
        };
      }
   
      
      console.log('Cart after update:', JSON.stringify(req.session.cart, null, 2));

      
      req.session.save(err => {
        if (err) {
          console.error('Error saving session:', err);
          return next(err);
        }
        res.status(200).json({ cart });
        console.log('Cart after update Seve:', JSON.stringify(cart, null, 2));
        console.log('Session data after update:', JSON.stringify(req.session, null, 2));
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
      next(error);
    }
});
  router.get('/cart', (req, res, next) => {
    console.log('Session data:', req.session);
    console.log('Cart data:', req.session.cart);
    const cart = req.session.cart || {}; 
    
    const items = Object.values(cart); // แปลงเป็น array
    



    const displayCart = {
      items: items,
      total: items.reduce((total, item) => total + item.qty * item.price, 0)
    };
    
    
    res.json({ cart: displayCart });
  });

  router.post('/cart/update', async (req, res, next) => {
    try {
      const { product_id, qty } = req.body;
      req.session.cart = req.session.cart || {};
      let cart = req.session.cart;
  
      if (!cart[product_id]) {
        return res.status(404).json({ message: 'Product not found in cart' });
      }
  
      if (qty <= 0) {
        delete cart[product_id];
      } else {
        cart[product_id].qty = qty;
      }
  
      req.session.save(err => {
        if (err) {
          console.error('Error saving session:', err);
          return next(err);
        }
        res.status(200).json({ cart });
      });
    } catch (error) {
      console.error('Error updating cart quantity:', error);
      next(error);
    }
  });
  
  router.post('/cart/remove', async (req, res, next) => {
    try {
      const { product_id } = req.body;
      req.session.cart = req.session.cart || {};
      let cart = req.session.cart;
  
      
      if (cart[product_id]) {
        
        delete cart[product_id];
        
        
        req.session.cart = cart;
        await req.session.save(); // บันทึกการเปลี่ยนแปลง
  
        res.status(200).json({ cart });
      } else {
        res.status(404).json({ message: 'Product not found in cart' });
      }
    } catch (error) {
      console.error('Error removing product from cart:', error);
      next(error);
    }
  });
  router.post('/clear-cart', (req, res, next) => {
    req.session.cart = {}; 
    req.session.save(err => {
      if (err) {
        console.error('Error saving session:', err);
        return next(err);
      }
      res.status(200).json({ message: 'Cart cleared successfully', cart: req.session.cart });

    });
  });

router.delete('/:id', async (req, res) => {
  try {
    const productId = req.params.id; 

    
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการลบ' });
    }

    
    res.json({ message: 'ลบสินค้าสำเร็จ', deletedProduct });
  } catch (err) {
    res.status(500).send(err.message);
  }
});
  
router.get('/:id', async (req, res) => {
  try {
      const productId = req.params.id.trim();

      const product = await Product.findById(productId);
      if (!product) {
          return res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการ' });
      }
      res.json(product); 
  } catch (err) {
      res.status(500).send(err.message);
  }
});

router.put('/:id', async (req, res) => {
  try {
      const productId = req.params.id.trim(); 
      const updatedData = req.body;     

     
      const updatedProduct = await Product.findByIdAndUpdate(
          productId, 
          updatedData, 
          { new: true, runValidators: true } 
      );

      if (!updatedProduct) {
          return res.status(404).json({ message: 'ไม่พบสินค้าที่ต้องการอัปเดต' });
      }

      
      res.json({ message: 'อัปเดตสินค้าสำเร็จ', updatedProduct });
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


module.exports = router;