// $(document).ready(function(){
  $.get("http://localhost:3000/api/v1/foods")
    .then(function(foods){
      createFoodTable(foods);
      foods.forEach(function(food){
          $("#foodTable").find('tbody')
            .append($('<tr class=list>')
              .append($(`<td class=edit-name contenteditable=true>${food.name}</td> <td class=edit-calories contenteditable=true>${food.calories}</td><td><input type=button name=delete-food id=${food.id} value=delete </td>`)
                )
            )
      });
    });

// new food form handler works
$(".add-food-form").submit(function( event ) {
  //  $('#display').html("");
  // alert( "Handler for .submit() called." );
  // If .required's value's length is zero
  if ( $( ".new-food-name" ).val().length === 0 ) {
    alert( "provide new food name");
    event.preventDefault();
  } else {
    $.ajax({
      url: 'http://localhost:3000/api/v1/foods',
      type: 'POST',
      beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
      data: { food: { name: `${$(".new-food-name").val()}`, calories: `${$(".new-food-calories").val()}`} },
      success: function(response) {
        $('#result').append(`<td class=edit-name contenteditable=true>${response.name}</td> <td class=edit-calories contenteditable=true>${response.calories}</td><td><input type=button name=delete-food id=${response.id} value=delete </td>`);
      }
    });
  }
});
  // $.ajax({ url: 'http://localhost:3000/api/v1/foods',
  //   type: 'POST',
  //   beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
  //   data: { food: { name: "Salad", calories: "250"} },
  //   success: function(response) {
  //     $('#result').append(`<td class=edit-name contenteditable=true>${response.name}</td> <td class=edit-calories contenteditable=true>${response.calories}</td><td><input type=button name=delete-food id=${response.id} value=delete </td>`);
  //   }
  // });
// });


  // function makeFood(){
    // $.ajax({
    // type: "POST",
    // url: "http://localhost:3000/api/v1/foods",
    // data: { food: { name: "Cheries", calories: "300"} }
  // $.post("http://localhost:3000/api/v1/foods?food=#name=new-food&calories=new-food-calories")
  //   .then(function(food){
  //   $("#foodTable").find('tbody')
  //     .append($('<tr class=list>')
  //       .append($(`<td class=edit-name contenteditable=true>${food.name}</td> <td class=edit-calories contenteditable=true>${food.calories}</td><td><input type=button name=delete-food id=${data.id} value=delete </td>`)
  // ))})
  // $.ajax({ url: 'http://localhost:3000/api/v1/foods',
  //   type: 'POST',
  //   beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
  //   data: { food: { name: "Clam Chowder", calories: "450"} },
  //   success: function(response) {
  //     $('#result').html(response);
  //   }
  // success: function(response) {
  //   $('.list').html(response);
  // }

function createFoodTable(foods) {
	var table=$("<table id=foodTable>").appendTo('#food-table'),
		tbody=$("<tbody>").appendTo(table),
    headersRow=$("<tr id=headers>").appendTo(tbody),
    headerName=$("<th>").text("Food Name").appendTo(headersRow),
    headerCalories=$("<th>").text("Calories").appendTo(headersRow),
    newFoodRow=$("<tr id=result>").appendTo(`table tr:last`)
  };