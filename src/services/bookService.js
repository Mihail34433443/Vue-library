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

const getLibrary = (that) => {
  firebase
    .firestore()
    .collection("library")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        that.library.push({
          id: doc.id,
          active_time: doc.data().active_time,
          address: doc.data().address,
          name: doc.data().name,
        });
      });
    });
}

const getOrders = (that) => {
  firebase
    .firestore()
    .collection("order")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        that.orders.push({
          id: doc.id,
          books: doc.data().books,
          user: doc.data().user,
          status: doc.data().status,
        });
      });
    });
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

const addBook = (that) => {
  firebase
    .firestore()
    .collection("books")
    .add({
      author: that.newBook.author,
      name: that.newBook.name,
      price: that.newBook.price,
      library: that.newBook.library,
      qty: Number(that.newBook.qty),
      availability: that.newBook.availability,
    });
}

const addCart = (that) => {
  firebase
    .firestore()
    .collection("cart")
    .where("user", "==", that.$store.getters.info.id)
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
          user: that.$store.getters.info.id,
          qty: that.qty,
        });
      }
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
  getLibrary,
  getOrders,
  deleteBook,
  deleteOrder,
  addBook,
  addCart,
  changeBook,
  openBook,
  searchBooks
}