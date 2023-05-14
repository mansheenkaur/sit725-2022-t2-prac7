

const clickMe = () => {
  alert("Thanks for clicking me. Hope you have a nice day!");
};

const submitForm = () => {
  let formData = {};
  formData.title = $("#title").val();
  formData.image = $("#image").val();
  formData.link = $("#link").val();
  formData.description = $("#description").val();
  console.log("Form Data Submitted: ", formData);
  addCat(formData);
};

const addCat = (cat) => {
  $.ajax({
    url:'/api/cats',
    data: cat,
    type: 'POST',
    success: (result) =>{
      alert(result.message);
      location.reload();
    }
  });
}

const addCards = (items) => {
  items.forEach((item) => {
    let itemToAppend =
      '<div class="col s4 center-align">' +
      '<div class="card"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
      item.image +
      '">' +
      '</div><div class="card-content">' +
      '<span class="card-title activator grey-text text-darken-4">' +
      item.title +
      '<span id="more_vert" class="material-symbols-outlined">more_vert</span></span><p><a href="#">' +
      item.link +
      "</a></p></div>" +
      '<div class="card-reveal">' +
      '<span class="card-title grey-text text-darken-4">' +
      item.title +
      '<i class="material-icons right">close</i></span>' +
      '<p class="card-text">' +
      item.description +
      "</p>" +
      "</div></div></div>";

    $("#card-section").append(itemToAppend);
  });
};

const getCats = () => {
  var baseUrl = "http://localhost:3001";
  $.ajaxSetup({
    beforeSend: function (xhr, options) {
      options.url = baseUrl + options.url;
    },
  });

  $.get("/api/cats", (response) => {
    if (response.statusCode === 200) {
      addCards(response.data);
    }
  });
}


// connect to the socket​
const socket = io("http://localhost:3001");
// const socket = io();
socket.on('number', (msg) =>{
console.log('Random number: ' + msg);
})


$(document).ready(function () {
  $(".materialboxed").materialbox();
  $("#formSubmit").click(() => {
    submitForm();
  });
  getCats();
  $(".modal").modal();
});
