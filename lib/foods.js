let localURL = "http://localhost:3000"

$(document).ready(function(){

// start of AJAX call to get all foods currently in db
  function getFoods(){
    $.get(`${localURL}/api/v1/foods`)
      .then(function(foods){
        foods.reverse();
        createFoodTable(foods); // reverse list of foods in response
        foods.forEach(function(food){
            $("#foodTable").find('tbody')
              .append($('<tr class=list>')
                .append($(`<td id=${food.id} class=edit-name contenteditable=true>${food.name}</td> <td class=edit-calories contenteditable=true>${food.calories}</td><td><input class=delete-food type=button name=delete-food id=${food.id} value=delete </td>`)
                  )
              )
        });
      });
    } // end of getFoods();

    // call these functions upon page load
    getFoods();
    errorMessage();
    // listenToEdit();
    // $.ajax({
    //     type: 'PATCH',
    //     url: `${localURL}api/v1/foods/61`,
    //     beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    //     data: { food: { name: "honey"} },
    //     success: function(response) {
    //       getFoods();
    //     },
    //     error: function() {
    //       debugger;
    //       alert("Error")
    //     }
    //   })
    // updateFood();
    //end of document.ready
  });

// listener for food items editing

//
// // function listenToEdit(){
//   $(document).on('focus','td', function(){
//    $(this).data("initialText", $(this).html());
//     $(document).on('blur','td', function() {
//         // ...if content is different...
//         if ($(this).data("initialText") == $(this).html()) {
//           event.preventDefault();
//         } else {
//             const newName = $(this).html();
//             const foodId = `${this.id}`;
//             // const data = { "[food]": newName}
//             // debugger;
//             // console.log($(this).html());
//               $.ajax({
//                   url: `${localURL}/api/v1/foods/61`,
//                   type: 'PATCH',
//                   // beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
//                   data: { food: { name: "honey", calories: "5"} },
//                   success: function(response) {
//                     debugger;
//                     getFoods();
//                   },
//                   error: function() {
//                     debugger;
//                     alert("Error")
//                   }
//                 })
//     };
// });
// })
// }

// upon loading page, make error message invisible with jQuery effects

function errorMessage(){
  $( ".sub-name" ).hide();
  $( ".sub-calories" ).hide();
}
// new food form handler works

$(".add-food-form").submit(function( event ) {
  if ( $( ".new-food-name" ).val().length === 0 & $( ".new-food-calories" ).val().length === 0) {
    alert( "provide new food name and calories");
    event.preventDefault();
    $(".sub-name").show();
    $(".sub-calories").show();
  } else if ( $( ".new-food-name" ).val().length === 0) {
    event.preventDefault();
    $(".sub-name").show();
  } else if ( $( ".new-food-calories" ).val().length === 0) {
    event.preventDefault();
    $(".sub-calories").show();
  } else {
    $.ajax({
      url: `${localURL}/api/v1/foods`,
      type: 'POST',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: { food: { name: `${$(".new-food-name").val()}`, calories: `${$(".new-food-calories").val()}`} },
      success: function(response) {
        getFoods();
      }
    });
  }
});

function createFoodTable(foods) {
	var table=$("<table id=foodTable>").appendTo('#food-table'),
		tbody=$("<tbody>").appendTo(table),
    headersRow=$("<tr id=headers>").appendTo(tbody),
    headerName=$("<th>").text("Food Name").appendTo(headersRow),
    headerCalories=$("<th>").text("Calories").appendTo(headersRow),
    newFoodRow=$("<tr id=result>").appendTo("table tr:last")
  };