export function getQty(id, qty) {
  let wishBooks = localStorage.getItem('desired')
  wishBooks = JSON.parse(wishBooks);
  if (wishBooks && wishBooks.arrayDesired) {
    const book = wishBooks.arrayDesired.find(book => book.id === id)
    if (book) return qty - book.qty
  }
  return qty
}