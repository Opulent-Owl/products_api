var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var products = new Schema({
  name: {
    type: String,
    required: true
  },
  slogan: {
    type: String
  },
  description: {
    type: String
  },
  category: {
    type: String
  },
  default_price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  related:
});

var styles = new Schema({
  products_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'products'
  },
  name: {
    type: String
  },
  sale_price: {
    type: Schema.Types.Decimal128
  },
  original_price: {
    type: Schema.Types.Decimal128,
    required: true
  },
  default ? : {
    type: Number,
    required: true
  },
  skus: {
    type: skus
  },
  photos: {
    type: photos
  }
});

var features = new Schema({
  products: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'products'
  },
  feature: {
    type: String
  },
  value: {
    type: String
  }
});

var skus = new Schema({
  styles_id: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'styles'
  },
  size: {
    type: String
  },
  quantity: {
    type: Number
  }
});

var photos = new Schema({
  url: {
    type: String
  },
  thumbnail_url: {
    type: String
  }
});