const datetimeformat = (date) => {
    if (date instanceof Date && !isNaN(date)) {
      return date.toISOString().slice(0, 19).replace('T', ' ');
    }
    // Return a default date if the input is invalid or not provided
    return '2000-01-01 00:00:00';
  };
  
  module.exports = datetimeformat;
  