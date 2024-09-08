const mongoose = require('mongoose');

const registerSchema = new mongoose.Schema({

  srNumber: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  srType: {
    type: String,
    required: true,
  },
  nameOfApplicant: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  tariff: {
    type: String,
    required: true,
  },
  load: {
    type: Number,
    required: true,
  },
  phase: {
    type: String,
    enum: ['Single Phase', 'Three Phase'],
    required: true,
  },
  regiCharge: {
    type: Number,
    required: true,
  },
  rcDate: {
    type: Date,
    required: true,
  },
  rcMrNo: {
    type: String,
    required: true,
  },
  ggrc: {
    type: String,
    required: false,
  },
  surveyCategory: {
    type: String,
    required: false,
  },
  dateOfSurvey: {
    type: Date,
    required: false,
  },
  tsAmount: {
    type: Number,
    required: false,
  },
  tsNo: {
    type: Number,
    required: false,
  },
  tsDate: {
    type: Date,
    required: false,
  },
  htLineLength: {
    type: Number,
    required: false,
  },
  ltLineLength: {
    type: Number,
    required: false,
  },
  tcCapacity: {
    type: Number,
    required: false,
  },
  fqNo: {
    type: Number,
    required: false,
  },
  fqDate: {
    type: Date,
    required: false,
  },
  fqSd: {
    type: Number,
    required: false,
  },
  fqAmountTotal: {
    type: Number,
    required: false,
  },
  fqMrNo: {
    type: String,
    required: false,
  },
  fqMrDate: {
    type: Date,
    required: false,
  },
  tmnNumber: {
    type: Number,
    required: false,
  },
  tmnDate: {
    type: Date,
    required: false,
  },
  trAmount: {
    type: Number,
    required: false,
  },
  trMrNumber: {
    type: String,
    required: false,
  },
  trDate: {
    type: Date,
    required: false,
  },
  dateOfRelease: { 
    type: Date,
    required: false,
  },
  consumerNumber: {
    type: Number,
    required: false,
  },
  srStatus: {
    type: String,
    required: false,
  },
  remark: {
    type: String,
    required: false,
  },
  h3Number: {
    type: Number,
    required: false,
  },
  h3OutwardNumber: {
    type: Number,
    required: false,
  },
  h3Date: {
    type: Date,
    required: false,
  },
  firstUnit: {
    type: Number,
    required: false,
  },
  contractorName: {
    type: String,
    required: false,
  },
  workOrderOutwardNo: {
    type: Number,
    required: false,
  },
  workOrderDate: {
    type: Date,
    required: false,
  },
  
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

module.exports = mongoose.model('Register', registerSchema);
