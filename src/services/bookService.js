
import firebase from "firebase/compat/app";

const getCatalog = () => {
  var result = []
  firebase
    .firestore()
    .collection("books")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        result.push({
          id: doc.id,
          name: doc.data().name,
          author: doc.data().author,
          price: doc.data().price,
          library: doc.data().library,
          availability: doc.data().availability,
          qty: doc.data().qty,
        });
      });
    });
  return result
}

/*const getBook = (books, id, qty) => {
  firebase
    .firestore()
    .collection("books")
    .doc(id)
    .get()
    .then((doc) => {
      if (doc.exists) {
        books.push({
          id: doc.id,
          name: doc.data().name,
          author: doc.data().author,
          price: doc.data().price,
          library: doc.data().library,
          availability: doc.data().availability,
          qty: qty,
        });
      }
    });
}*/

const getLibrary = () => {
  return new Promise(function (resolve, reject) {
    var library = [];
    firebase
      .firestore()
      .collection("library")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          library.push({
            id: doc.id,
            active_time: doc.data().active_time,
            address: doc.data().address,
            name: doc.data().name,
          });
        });
      });
    resolve(library)
  })
}

const getOrders = () => {
  return new Promise(function (resolve, reject) {
    var orders = []
    firebase
      .firestore()
      .collection("order")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          orders.push({
            id: doc.id,
            books: doc.data().books,
            user: doc.data().user,
            status: doc.data().status,
          });
        });
      });
    resolve(orders)
  })
}

const getOrder = (id) => {
  return new Promise(function (resolve, reject) {
    firebase
      .firestore()
      .collection("order")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          var order = doc.data().books
        }
        let books = [];
        for (let i = 0; i < order.length; i++) {
          firebase
            .firestore()
            .collection("books")
            .doc(order[i].book)
            .get()
            .then((doc) => {
              if (doc.exists) {
                books.push({
                  id: doc.id,
                  name: doc.data().name,
                  author: doc.data().author,
                  price: doc.data().price,
                  library: doc.data().library,
                  availability: doc.data().availability,
                  qty: doc.data().qty,
                });
              }
            });
        }
        resolve(books)
      });
  })
}

const getOrderStatus = (id) => {
  return new Promise(function (resolve, reject) {
    firebase.firestore().collection('order').doc(id).get().then((doc) => {
      if (doc.exists) {
        resolve(doc.data().status)
      }
    })
  })
}

const updateOrderStatus = (id) => {
  firebase.firestore().collection('order').doc(id).update({
    status: 'approved'
  })
}

const deleteBook = (id) => {
  firebase
    .firestore()
    .collection("books")
    .doc(id)
    .delete()
    .then(() => {
      console.log("книга удалена");
    });
}

const deleteOrder = (id) => {
  firebase
    .firestore()
    .collection("order")
    .doc(id)
    .delete()
    .then(() => {
      console.log("заказ удалён");
    });
}

const addBook = (book) => {
  firebase
    .firestore()
    .collection("books")
    .add({
      author: book.author,
      name: book.name,
      price: book.price,
      library: book.library,
      qty: Number(book.qty),
      availability: book.availability,
    });
}

const addCart = (book, qty, userId) => {
  firebase
    .firestore()
    .collection("cart")
    .where("user", "==", userId)
    .where("book", "==", book.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        if (doc) {
          firebase
            .firestore()
            .collection("cart")
            .doc(doc.id)
            .update({
              qty: doc.data().qty + qty,
            });
        }
      });
      if (!querySnapshot.docs.length) {
        firebase.firestore().collection("cart").add({
          book: book.id,
          user: userId,
          qty: qty,
        });
      }
    });
  firebase.firestore().collection('books').doc(book.id).update({
    qty: book.qty - qty
  })
}

const addOrder = (userId, cart) => {
  firebase
    .firestore()
    .collection("order")
    .add({
      user: userId,
      books: cart,
      status: "new",
    })
    .then(() => {
      for (let i = 0; i < cart.length; i++) {
        firebase
          .firestore()
          .collection("cart")
          .doc(cart[i].id)
          .delete();
      }
      console.log("ваш заказ принят");
    });
}

const changeBook = (book) => {
  firebase.firestore().collection("books").doc(book.id).set({
    name: book.name,
    author: book.author,
    availability: book.availability,
    library: book.library,
    price: book.price,
    qty: Number(book.qty),
  });
}

//доделать (на странице book не обновляються данные)
const openBook = (bookId) => {
  return new Promise(function (resolve, reject) {
    var book = {}
    firebase
      .firestore()
      .collection("books")
      .doc(bookId)
      .get()
      .then((doc) => {
        if (doc.exists) {
          book.id = doc.id;
          book.name = doc.data().name;
          book.author = doc.data().author;
          book.library = doc.data().library;
          book.price = doc.data().price;
          book.availability = doc.data().availability;
          book.qty = doc.data().qty;
        } else {
          console.log("такой книги нет");
        }
      });
    resolve(book)
  })
}

//тоже самое что и сверху
const searchBooks = (search) => {
  return new Promise(function (resolve, reject) {
    var books = []
    firebase
      .firestore()
      .collection("books")
      .where("name", ">=", search)
      .where("name", "<=", search + "\uf8ff")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          books.push({
            id: doc.id,
            name: doc.data().name,
            author: doc.data().author,
            price: doc.data().price,
            library: doc.data().library,
          });
        });
      });
    firebase
      .firestore()
      .collection("books")
      .where("author", ">=", search)
      .where("author", "<=", search + "\uf8ff")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          books.push({
            id: doc.id,
            name: doc.data().name,
            author: doc.data().author,
            price: doc.data().price,
            library: doc.data().library,
          });
        });
      });
    resolve(books)
  })
}

export {
  getCatalog,
  //getBook,
  getLibrary,
  getOrders,
  getOrder,
  getOrderStatus,
  updateOrderStatus,
  deleteBook,
  deleteOrder,
  addBook,
  addCart,
  addOrder,
  changeBook,
  openBook,
  searchBooks
}