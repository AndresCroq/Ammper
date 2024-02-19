export function getDateThreeMonthsAgo() {
  const currentDate = new Date();
  
  // Subtract three months
  currentDate.setMonth(currentDate.getMonth() - 3);

  // Format the date as yyyy-mm-dd
  const year = currentDate.getFullYear();
  const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
  const day = currentDate.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;
  
return formattedDate;
}