const Review = require("../models/Review");

const addReview = async (req,res)=>{
  const {productId,rating,comment} = req.body;
  const review = await Review.create({productId,userId:req.user._id,rating,comment});
  res.status(201).json(review);
};

const getReviews = async (req,res)=>{
  const reviews = await Review.find({productId:req.params.productId}).populate("userId","name");
  res.json(reviews);
};

module.exports = {addReview,getReviews};
