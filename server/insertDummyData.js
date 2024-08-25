const mongoose = require('mongoose');
const Register = require('./models/Register'); // Adjust the path as needed

const dummyData = [
  {
    srNumber: 1,
    srType: "New Connection",
    nameOfApplicant: "John Doe",
    address: "123 Main St, Cityville",
    tariff: "Residential",
    load: 5,
    phase: "Single Phase",
    regiCharge: 1000,
    rcDate: new Date('2024-01-15'),
    rcMrNo: "RC12345",
    surveyCategory: "Category A",
    dateOfSurvey: new Date('2024-01-20'),
    tsAmount: 200,
    tsNo: 123,
    tsDate: new Date('2024-02-01'),
    htLineLength: 150,
    ltLineLength: 100,
    tcCapacity: 10,
    fqNo: 456,
    fqDate: new Date('2024-02-10'),
    fqSd: 5,
    fqAmountTotal: 250,
    fqMrNo: 789,
    fqMrDate: new Date('2024-02-15'),
    tmnNumber: 111,
    tmnDate: new Date('2024-02-20'),
    trAmount: 500,
    trMrNumber: "TR123",
    trDate: new Date('2024-03-01'),
    consumerNumber: 12345678901,
    h3Number: 222,
    h3OutwardNumber: 333,
    h3Date: new Date('2024-03-05'),
    firstUnit: 0,
    srStatus: true,
    remark: "No issues noted",
  },
  // Add more entries as needed
];

async function saveDummyData() {
  try {
    await mongoose.connect('mongodb://localhost:27017/Technical', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Register.insertMany(dummyData);
    console.log('Dummy data saved successfully');
  } catch (error) {
    console.error('Error saving dummy data:', error);
  } finally {
    await mongoose.disconnect();
  }
}

saveDummyData();
