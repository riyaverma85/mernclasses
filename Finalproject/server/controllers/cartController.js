const Cart = require("../models/Cart");

const getCart = async (req,res)=>{
  let cart = await Cart.findOne({buyerId:req.user._id}).populate("products.productId");
  if(!cart){
    cart = await Cart.create({buyerId:req.user._id, products:[]});
  }
  res.json(cart);
};

const addToCart = async (req,res)=>{
  const {productId,quantity} = req.body;
  let cart = await Cart.findOne({buyerId:req.user._id});
  if(!cart){
    cart = await Cart.create({buyerId:req.user._id, products:[]});
  }
  const index = cart.products.findIndex(p=>p.productId.toString()===productId);
  if(index>-1){
    cart.products[index].quantity += quantity;
  }else{
    cart.products.push({productId,quantity});
  }
  await cart.save();
  res.json(cart);
};

const removeFromCart = async (req,res)=>{
  const {productId} = req.params;
  const cart = await Cart.findOne({buyerId:req.user._id});
  if(cart){
    cart.products = cart.products.filter(p=>p.productId.toString()!==productId);
    await cart.save();
    res.json(cart);
  }else{
    res.status(404).json({message:"Cart not found"});
  }
};

module.exports = {getCart,addToCart,removeFromCart};
