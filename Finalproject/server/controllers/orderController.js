const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");

const placeOrder = async (req,res)=>{
  const cart = await Cart.findOne({buyerId:req.user._id}).populate("products.productId");
  if(!cart || cart.products.length===0) return res.status(400).json({message:"Cart is empty"});

  let totalAmount=0;
  const items = cart.products.map(p=>{
    totalAmount += p.productId.price*p.quantity;
    return {productId:p.productId._id,quantity:p.quantity,price:p.productId.price};
  });

  const order = await Order.create({buyerId:req.user._id,items,totalAmount,status:"pending"});
  cart.products=[];
  await cart.save();
  res.status(201).json(order);
};

const getOrders = async (req,res)=>{
  const orders = await Order.find({buyerId:req.user._id}).populate("items.productId");
  res.json(orders);
};

module.exports = {placeOrder,getOrders};
