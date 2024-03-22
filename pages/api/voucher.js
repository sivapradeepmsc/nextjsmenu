import db from '../db'; // Import your DB configuration
import { useRouter } from 'next/router';



export const config = {
  api: {
    externalResolver: true,
  },
};
const API_KEY = process.env.API_KEY;

//twttoken
export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const { apiKey } = req.headers;

      const { email, mobileNumber, vouchernumber } = req.body;
console.log(req.headers);
console.log(apiKey);
console.log(process.env.API_KEY);

      if (!apiKey || apiKey !== process.env.API_KEY) {
        return res.status(401).json({ message: 'Unauthorized' });
      }   

      // Validate email, mobile number, and voucher number
      if (!email || !mobileNumber) {
        return res.status(400).json({ message: 'Please provide email and mobile number' });
      }

      // Check if the voucher is expired
      //const queries = require('./queries');

       const selectQuery = 'SELECT voucherstartdate, expirydate FROM voucherdetails WHERE vouchernumber = ?';
      db.query(selectQuery, [vouchernumber], (error, results, fields) => {
        if (error) {
          console.error('Error checking voucher expiry:', error);
          return res.status(500).json({ message: 'Error checking voucher expiry' });
        }

        if (results.length > 0) {
          const { voucherstartdate, expirydate } = results[0];
          const currentDate = new Date();

          // Check if the expiry date is in the past
    if (new Date(expirydate) < currentDate) {
    console.log('Voucher already expired');
    return res.status(400).json({ message: 'Voucher already expired', expired: true });
    }

 else {
            // Proceed to check if the record already exists
         const selectRecordQuery = 'SELECT * FROM voucherrecord WHERE email = ? OR mobileNumber = ?';
            db.query(selectRecordQuery, [email, mobileNumber], (error, results, fields) => {
              if (error) {
                console.error('Error checking existing records:', error);
                return res.status(500).json({ message: 'Error checking existing records' });
              }

              if (results.length > 0) {
                console.log('Record already exists');
                return res.status(400).json({ message: 'Record already exists' });
              } else {

                // Insert data into the database
                const insertQuery = 'INSERT INTO voucherrecord (email, mobileNumber, vouchernumber) VALUES (?, ?, ?)';
                db.query(insertQuery, [email, mobileNumber, vouchernumber], (error, results, fields) => {
                  if (error) {
                    console.error('Error inserting data:', error);
                    return res.status(500).json({ message: 'Error inserting data' });
                  }
                  return res.status(201).json({ message: 'Data inserted successfully' });
                });
              }
            });
          }
        } else {
          console.log('No voucher found');
          return res.status(400).json({ message: 'No voucher found' });
        }
      });
    } catch (error) {
      console.error('Error handling request:', error);
      return res.status(500).json({ message: 'Server error' });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
}
