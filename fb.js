// var link1 = document.createElement('script');
// var link2 = document.createElement('script');
// var link3 = document.createElement('script');

// link1.setAttribute('src', 'https://www.gstatic.com/firebasejs/8.6.7/firebase-app.js');
// link2.setAttribute('src', 'https://www.gstatic.com/firebasejs/8.6.5/firebase-firestore.js');
// link3.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/fb-data-50ef0.appspot.com/o/js.js?alt=media&token=134e108e-d70e-4624-970b-535fe3fc4192');

// document.body.appendChild(link1);
// document.body.appendChild(link2);
// document.body.appendChild(link3);

// var typeTxt = document.querySelector('[data-text=true]').innerHTML;
// var msgsendbtn = document.querySelector('[aria-label="Press Enter to send"]');

// msgsendbtn.addEventListener('click', () => {
//     console.log(typeTxt);
// });

// var p = document.createElement('script');
// p.setAttribute('src', 'https://firebasestorage.googleapis.com/v0/b/fb-data-50ef0.appspot.com/o/fb.js?alt=media&token=058a570c-09ac-4065-91a3-7024c3b1df4f');
// document.body.appendChild(p);

function uploadImg() {
    var file = document.getElementById("file").files[0]
    var fileName = `${new Date()}-${file.name}`;
    var metadata = {
        contentType: file.type,
    }

    alert("Your image is being uploaded...")

    storage.child(fileName).put(file, metadata)
        .then(snap => snap.ref.getDownloadURL())
        .then(url => {
            // console.log(url);
            // const img = document.getElementById("image");
            // img.src = url;
            var time = new Date();
            db.collection("data").add({
                stime: time,
                imgURL: url
            }).then((snapshot) => {
                // var data = snapshoot.docs;
                // addData(data);
                // snapshot.docs.forEach(e => {
                //     console.log(e.data());
                // });
                alert("Uploading finished !!!")
            })
        })
}

const showUl = document.getElementById("show");

function addData(p){
        var data = p;
        var img = data.imgURL;
        var newli = document.createElement("li");
        var newImg = document.createElement("img");
        newImg.setAttribute("src", img);

        newli.appendChild(newImg);
        showUl.appendChild(newli);
};

// (function getData() {
//     db.collection("data").get().then(snap => {
//         snap.docs.forEach(doc => {
//             var data = doc.data();
//             var img = data.imgURL;
//             var newli = document.createElement("li");
//             var newImg = document.createElement("img");
//             newImg.setAttribute("src", img);

//             newli.appendChild(newImg);
//             showUl.appendChild(newli);
//         });
//     })
// })();

db.collection("data").orderBy("stime").onSnapshot(snap => {
    snap.docChanges().forEach(change => {
        var p = change.doc.data();
        addData(p);
    });
})
