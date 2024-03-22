// queries.js

const queries = {
     vouchernumberquery : 'SELECT voucherstartdate, expirydate FROM voucherdetails WHERE vouchernumber = ?',
     voucherrecordquery : 'SELECT * FROM voucherrecord WHERE email = ? OR mobileNumber = ?',
     voucherrecordinsert : 'INSERT INTO voucherrecord (email, mobileNumber, vouchernumber) VALUES (?, ?, ?)'

    // Add more queries as needed
  };
  
  module.exports = queries;
  