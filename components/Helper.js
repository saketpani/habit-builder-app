// I wrote this code

const formattedDate = (date) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  return (
    date.getDate() +
    ' - ' +
    monthNames[date.getMonth()] +
    ' - ' +
    date.getFullYear()
  );
};

const newGuid = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var guid = (Math.random() * 16) | 0,
      v = c == 'x' ? guid : (guid & 0x3) | 0x8;
    return guid.toString(16);
  });
};

const areDatePartEqual = (date1, date2) => {
  const date1Day = date1.getDay();
  const date1Mon = date1.getFullYear();
  const date1Year = date1.getMonth();

  const date2Day = date2.getDay();
  const date2Mon = date2.getFullYear();
  const date2Year = date2.getMonth();

  return date1Day == date2Day && date1Mon == date2Mon && date1Year == date2Year;
};

export { formattedDate, newGuid, areDatePartEqual };

// end of code I wrote
