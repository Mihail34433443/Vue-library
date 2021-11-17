import firebase from "firebase/compat/app";

export function transferInCart(id, role) {
  localStorage.setItem('role', role)
  var desired = localStorage.getItem("desired");
  if (desired != null) {
    desired = JSON.parse(desired);
    for (let i = 0; i < desired.arrayDesired.length; i++) {
      firebase
        .firestore()
        .collection("cart")
        .where("user", "==", id)
        .where('book', '==', desired.arrayDesired[i].id)
        .get()
        .then((querySnapshot) => {
          console.log(querySnapshot)
          querySnapshot.docs.forEach((doc) => {
            if (doc) {
              firebase.firestore().collection('cart').doc(doc.id).update({
                'qty': doc.data().qty + desired.arrayDesired[i].qty,
              })
            }
          });
          if (!querySnapshot.docs.length) {
            firebase.firestore().collection("cart").add({
              book: desired.arrayDesired[i].id,
              user: id,
              qty: desired.arrayDesired[i].qty,
            })
          }
        });
    }
    localStorage.removeItem('desired');
  }
}