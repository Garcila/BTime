const connection = require(`./connection.js`);

// Helper function for SQL syntax.
// Let's say we want to pass 3 values into the mySQL query.
// In order to write the query, we need 3 question marks.
// The above helper function loops through and creates an array of question marks - ["?", "?", "?"] - and turns it into a string.
// ["?", "?", "?"].toString() => "?,?,?";
function printQuestionMarks(num) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    arr.push('?');
  }
  return arr.toString();
}

// Helper function to convert object key/value pairs to SQL syntax
function objToSql(ob) {
  let arr = [];

  // loop through the keys and push the key/value as a string int arr
  for (let key in ob) {
    let value = ob[key];
    console.log('value ', value.indexOf(' '));
    // check to skip hidden properties
    if (Object.hasOwnProperty.call(ob, key)) {
      // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
      if (typeof value === 'string' && value.indexOf(' ') >= 0) {
        value = "'" + value + "'";
      }
      // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
      // e.g. {sleepy: true} => ["sleepy=true"]
      // arr.push(key + '=' + "'" + value + "'"); // this did not work for me ??
      arr.push(`${key} = '${value}'`);
    }
  }

  // translate array of strings to a single comma-separated string
  return arr.toString();
}

const orm = {
  //TODO: TEST: SelectAll
  selectAll: (tableInput, cb) => {
    let queryString = `SELECT * FROM ${tableInput};`;
    connection.query(queryString, (err, result) => {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },

  insertOne: (table, cols, vals, cb) => {
    let queryString = `INSERT INTO ${table} (${cols.toString()}) 
      VALUES (${printQuestionMarks(vals.length)})
    `;

    console.log(queryString);
    connection.query(queryString, vals, (err, result) => {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

  updateOne: (table, objColVals, condition, cb) => {
    let queryString = `UPDATE ${table} SET ${objToSql(objColVals)}
     WHERE ${condition};
    `;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }
      cb(result);
    });
  },
};

module.exports = orm;