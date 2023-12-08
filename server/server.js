const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');
require('dotenv').config();

const app = express();
const path = __dirname + "/../client/dist/";
const category = "what's-new";
const encodedCategory = encodeURIComponent(category);

history({
  index: 'index.htmp'
});

// Middleware
app.use(express.static(path));
app.use(cors());
app.use(express.json());  // for parsing application/json
app.use(history());       // Use since  SPA is not server side rendering.
                          // At least for the majority. So, when you access 
                          // /anything your web server won't redirect it to index.html. 

const { Pool, DatabaseError } = require('pg');

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});


// API endpoint to get topping menu items
app.get('/menu-items/topping', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'topping\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get classic menu items
app.get('/menu-items/classic', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'classic\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get espresso menu items
app.get('/menu-items/espresso', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'espresso\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

//console.log('/menu-items/' + category);
app.get('/menu-items/what\'s-new', async (req, res) => {
  try {
    const queryText = 'SELECT * FROM menu WHERE category = $1';
    const { rows } = await pool.query(queryText, [category]);
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get milk tea menu items
app.get('/menu-items/milk-tea', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'milk tea\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get slush menu items
app.get('/menu-items/slush', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'slush\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get yogurt menu items
app.get('/menu-items/yogurt', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'yogurt\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get milk cap menu items
app.get('/menu-items/milk-cap', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'milk cap\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get punch menu items
app.get('/menu-items/punch', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'punch\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get milk strike menu items
app.get('/menu-items/milk-strike', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'milk strike\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get menu categories
app.get('/menu-items/category', async (req, res) => {
  console.log("Happening");
  try {
    console.log("Category Request");
    const { rows } = await pool.query('SELECT DISTINCT category FROM menu');
    res.json(rows);
    console.log("Finished Category Request");
  } catch (err) {
    console.log("Error");
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get users
app.get('/menu-items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

app.get('/menu-items/toppings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'topping\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

async function getNextIds() {
  // Query for the maximum orderid
  const orderRes = await pool.query('SELECT MAX(orderid) as maxorderid FROM order_log');
  const maxOrderId = orderRes.rows[0].maxorderid;

  // Query for the maximum toppingid
  const toppingRes = await pool.query('SELECT MAX(toppingid) as maxtoppingid FROM topping');
  const maxToppingId = toppingRes.rows[0].maxtoppingid;

  const drinkres = await pool.query('SELECT MAX(drinkid) as maxdrinkid FROM drink');
  const maxDrinkId = drinkres.rows[0].maxdrinkid;

  return {
    nextOrderId: maxOrderId + 1,
    nextDrinkId: maxDrinkId + 1,
    nextToppingId: maxToppingId + 1
  };
}

// Endpoint to submit an order
app.post('/submit-order', async (req, res) => {
  const { drinks, total, tip, empid, date, time } = req.body;
  const ids = await getNextIds();
  try {
    await pool.query('BEGIN');
    const orderQuery = 'INSERT INTO order_log (orderid, empid, date, time, total, tip) VALUES ($1, $2, $3, $4, $5, $6)';
    await pool.query(orderQuery, [ids.nextOrderId, empid, date, time, total, tip]);

    for (const drink of drinks) {
      const drinkQuery = 'INSERT INTO drink (drinkid, orderid, name, category, size, temp, ice_level, sugar_level, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      await pool.query(drinkQuery, [ids.nextDrinkId, ids.nextOrderId, drink.name, drink.categoryString, drink.size, drink.temp, drink.iceLevel, drink.sugarLevel, drink.price]);

      for (const topping of drink.toppings) {
        const toppingQuery = 'INSERT INTO topping (toppingid, drinkid, name, quantity, price) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(toppingQuery, [ids.nextToppingId, drink.itemID, topping.name, topping.quantity, topping.price]);
        ids.nextToppingId++;
      }
      ids.nextDrinkId++;
    }

    await pool.query('COMMIT');
    res.status(200).send('Order submitted successfully');
  } catch (error) {
    console.log(error);
    await pool.query('ROLLBACK');
    res.status(500).send('Error submitting order');
  }
});

// ======= LOGIN API REQUESTS FOR LOGIN INFORMATION ==========
app.get("/login/info/:email", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM employee WHERE email = \'" + req.params.email + "\'");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(404).json('Could not find user');
  }
})


// Endpoint to submit an order
app.post('/submit-order', async (req, res) => {
  const { drinks, total, tip, empid, date, time } = req.body;
  const ids = await getNextIds();
  try {
    await pool.query('BEGIN');
    const orderQuery = 'INSERT INTO order_log (orderid, empid, date, time, total, tip) VALUES ($1, $2, $3, $4, $5, $6)';
    await pool.query(orderQuery, [ids.nextOrderId, empid, date, time, total, tip]);

    for (const drink of drinks) {
      const drinkQuery = 'INSERT INTO drink (drinkid, orderid, name, category, size, temp, ice_level, sugar_level, price) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)';
      await pool.query(drinkQuery, [ids.nextDrinkId, ids.nextOrderId, drink.name, drink.categoryString, drink.size, drink.temp, drink.iceLevel, drink.sugarLevel, drink.price]);

      for (const topping of drink.toppings) {
        const toppingQuery = 'INSERT INTO topping (toppingid, drinkid, name, quantity, price) VALUES ($1, $2, $3, $4, $5)';
        await pool.query(toppingQuery, [ids.nextToppingId, drink.itemID, topping.name, topping.quantity, topping.price]);
        ids.nextToppingId++;
      }
      ids.nextDrinkId++;
    }

    await pool.query('COMMIT');
    res.status(200).send('Order submitted successfully');
  } catch (error) {
    console.log(error);
    await pool.query('ROLLBACK');
    res.status(500).send('Error submitting order');
  }
});

// ======= LOGIN API REQUESTS FOR LOGIN INFORMATION ==========
app.get("/login/info/:email", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM employee WHERE email = \'" + req.params.email + "\'");
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(404).json('Could not find user');
  }
})

// This one uses google OAuth and the simple email to check what our data.
app.get("/login/info/google/:email", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM employee WHERE email = \'" + req.params.email + "\'");
    if(rows.length == 0) {
      res.status(404).json('Could not find user with email ', req.params.email);
    } else {
      res.json(rows);
    }

  } catch (err) {
    console.error(err.message);
    res.status(404).json('Could not find user with email ', req.params.email);
  }
})

// ======= MANAGER API REQUESTS FOR INVENTORY INFORMATION ==========
app.get("/manager/inventory", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM inventory");
    res.json(rows);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.get("/manager/employee", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM employee WHERE employee.title!=\'Manager\'");
    res.json(rows);
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.post("/manager/api/new-request", async (req, res) => {
  const { item_name, quantity, request_id } = req.body;
  const reqIdQuery = "SELECT request_id FROM inventory_requests ORDER BY request_id DESC LIMIT 1;"
  const insertReqQuery = "INSERT INTO inventory_requests (item_name, quantity, request_id) VALUES($1, $2, $3)"
  try {
    // Get new request_id from db.
    let ReqIdResponse = await pool.query(reqIdQuery);
    // Variable contains the new, unique requestid.
    let newReqId = ReqIdResponse.rows[0].request_id + 1;
    
    await pool.query(insertReqQuery, [item_name, quantity, newReqId]);
    res.status(201).send("Inventory Request added succesfully");
    
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.post("/manager/api/delete-request", async(req, res) => {
  const {item_name, quantity, request_id} = req.body;
  const deleteReqQuery = "DELETE FROM inventory_requests WHERE request_id=" + request_id;
  try {
    await pool.query(deleteReqQuery);
    res.status(201).send("Inventory request deleted succesfully");
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.post("/manager/api/new-employee", async(req, res) => {
  const {empid, fname, lname, title, email, password} = req.body; 
  const empIdQuery = "SELECT empid FROM employee ORDER BY empid DESC LIMIT 1;";
  const insertEmpQuery = "INSERT INTO employee (empid, fname, lname, title, email, password) VALUES($1, $2, $3, $4, $5, $6)"
  try {
    // Get new empid from db.
    let empIdResponse = await pool.query(empIdQuery);
    let newEmpId = empIdResponse.rows[0].empid + 1000;
    await pool.query(
      insertEmpQuery,
      [newEmpId, fname, lname, title, email, password]);
    res.status(201).send("Employee addes successfully");
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.post("/manager/api/delete-employee", async(req, res) => {
  const {empid, fname, lname, title, email, password} = req.body; 
  const deleteEmpQuery = "DELETE FROM employee WHERE empid=" + empid;
  try {
    await pool.query(deleteEmpQuery);
    res.status(201).send("Inventory request deleted succesfully");
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.post("/manager/api/add-menu", async(req, res) => {
  const {name, category, price, lprice} = req.body; 
  console.log(name);
  const menuIdQuery = "SELECT menuid FROM menu ORDER BY menuid DESC LIMIT 1;";
  const invIdQuery = "SELECT inventoryid FROM menu ORDER BY inventoryid DESC LIMIT 1;";


  const insertMenuQuery = "INSERT INTO menu ( menuid, inventoryid, name, category, price) VALUES($1, $2, $3, $4, $5)";

  try {
    // Get new empid from db.
    let menuIdResponse = await pool.query(menuIdQuery);
    let invIdResponse = await pool.query(invIdQuery);

    let menuId = menuIdResponse.rows[0].menuid + 1;
    let invId = invIdResponse.rows[0].inventoryid + 1;



    if(category == "topping" || category == "merchandise"){
      await pool.query(
        insertMenuQuery,
        [menuId, invId, name, category, price]);
    }
    else {
      await pool.query(
        insertMenuQuery,
        [menuId, invId, name + "_M", category, price]);
  
      await pool.query(
          insertMenuQuery,
          [menuId + 1, invId, name + "_L", category, lprice]);
    }
    res.status(201).send("Employee addes successfully");
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.post("/manager/api/del-menu", async(req, res) => {
  const {name, category, price, lprice} = req.body; 
  let deleteMenuQuery = '';
  if(category == "Y"){
     deleteMenuQuery = "DELETE FROM menu WHERE name IN ('" + name + "_M', '" + name + "_L')";
  }
  else{
     deleteMenuQuery = "DELETE FROM menu WHERE name = '" + name + "'";
  }
  console.log(name);
  console.log(deleteMenuQuery);
  try {
    await pool.query(deleteMenuQuery);
    res.status(201).send("Menu Item deleted succesfully");
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.get("/manager/inventory_requests", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM inventory_requests");
    res.json(rows);
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.post("/manager/api/orders_data", async (req, res) => {
  const { datesSelected } = req.body;
  // Casting all passed dates to Date datatype.
  casted_dates = [];
  datesSelected.forEach((element) => {
    let casted_element = new Date(element);
    casted_dates.push("\'" + 
      casted_element.getFullYear() + "-" +
       (casted_element.getMonth() + 1).toString().padStart(2, '0') + "-" + 
       casted_element.getDate().toString().padStart(2, '0')
       + "\'");
  });

  // Creating SQL Query
  const getDateSalesQuery = "SELECT total FROM order_log WHERE date=";
  try {
    var result = [];
    for(let i = 0; i < casted_dates.length; i++) {
      let response = await pool.query(
        getDateSalesQuery + casted_dates[i]
        );
      result.push({
        dataDate: casted_dates[i],
        data: response,
      });
    }
    res.json({ result });
  } catch(err) {
    console.error(err.message);
      res.status(500).json('Server Error');
  }
})

app.get("/translate/:text", async(req, res) => {
  try {
    result = await translateText(req.params.text, 'es');
    res.json(result[0]);

  } catch (error) {
    console.log(error);
  }
})

app.get("/translateEnglish/:text", async(req, res) => {
  try {
    result = await translateText(req.params.text, 'en');
    res.json(result[0]);

  } catch (error) {
    console.log(error);
  }
})

const {Translate} = require('@google-cloud/translate').v2

const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);

const translate = new Translate({
  credentials: CREDENTIALS,
  projectId: CREDENTIALS.project_id
})

const translateText = async (text, targetLanguage) =>  {
  try {
    let response = await translate.translate(text, targetLanguage);
    return response;
  } catch (error) {
    console.log('error at translateText' + error);
    return 0;
  }
}

// Define the port
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});