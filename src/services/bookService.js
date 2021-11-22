
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

const addCart = (that, userId) => {
  firebase
    .firestore()
    .collection("cart")
    .where("user", "==", userId)
    .where("book", "==", that.book.id)
    .get()
    .then((querySnapshot) => {
      querySnapshot.docs.forEach((doc) => {
        if (doc) {
          firebase
            .firestore()
            .collection("cart")
            .doc(doc.id)
            .update({
              qty: doc.data().qty + that.qty,
            });
        }
      });
      if (!querySnapshot.docs.length) {
        firebase.firestore().collection("cart").add({
          book: that.book.id,
          user: userId,
          qty: that.qty,
        });
      }
    });
  firebase.firestore().collection('books').doc(that.book.id).update({
    qty: that.book.qty - that.qty
  })
}

const addOrder = (that) => {
  firebase
    .firestore()
    .collection("order")
    .add({
      user: that.$store.getters.info.id,
      books: that.cart,
      status: "new",
    })
    .then(() => {
      for (let i = 0; i < that.cart.length; i++) {
        firebase
          .firestore()
          .collection("cart")
          .doc(that.cart[i].id)
          .delete();
      }
      that.books = [];
      that.cart = [];
      console.log("ваш заказ принят");
    });
}

const changeBook = (that) => {
  firebase.firestore().collection("books").doc(that.book.id).set({
    name: that.book.name,
    author: that.book.author,
    availability: that.book.availability,
    library: that.book.library,
    price: that.book.price,
    qty: Number(that.book.qty),
  });
}

const openBook = (that) => {
  firebase
    .firestore()
    .collection("books")
    .doc(that.$route.query.book)
    .get()
    .then((doc) => {
      if (doc.exists) {
        that.book.id = doc.id;
        that.book.name = doc.data().name;
        that.book.author = doc.data().author;
        that.book.library = doc.data().library;
        that.book.price = doc.data().price;
        that.book.availability = doc.data().availability;
        that.book.qty = doc.data().qty;
      } else {
        console.log("такой книги нет");
      }
    });
}

const searchBooks = (that) => {
  firebase
    .firestore()
    .collection("books")
    .where("name", ">=", that.$route.query.search)
    .where("name", "<=", that.$route.query.search + "\uf8ff")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        that.books.push({
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
    .where("author", ">=", that.$route.query.search)
    .where("author", "<=", that.$route.query.search + "\uf8ff")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        that.books.push({
          id: doc.id,
          name: doc.data().name,
          author: doc.data().author,
          price: doc.data().price,
          library: doc.data().library,
        });
      });
    });
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