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

export function formatDateFromNumber(dateNumber: number): string {
  const date = new Date(dateNumber);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}