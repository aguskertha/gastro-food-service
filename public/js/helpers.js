// var jsdom = require("jsdom");
// const { JSDOM } = jsdom;
// const { window } = new JSDOM();
// const { document } = (new JSDOM('')).window;
// global.document = document;

// var $ = jQuery = require('jquery')(window);

// function addIngredient (label, number, button, wrapper){
//     var ingredientTypeNumber = $(number).val();
//     $(button).on('click', () => {
//         var ingredientTypeWapper = $(wrapper);
//         $(number).val(++ingredientTypeNumber);
//         $(ingredientTypeWapper).append(`
//         <div class="row" id="rowIngredient${ingredientTypeNumber}">
//             <div class="col-md-10">
//                 <input
//                     type="text"
//                     id="ingredient${ingredientTypeNumber}"
//                     name="ingredient${ingredientTypeNumber}"
//                     class="form-control mt-1"
//                     placeholder="Enter Ingredient"
//                     value=""
//                 />
//                 <input type="hidden" id="itemNumber${ingredientTypeNumber}" name="itemNumber${ingredientTypeNumber}" value="1">
//                 <div class="itemWrapper${ingredientTypeNumber}">
//                     <div class="row" id="rowItem${ingredientTypeNumber}1">
//                         <div class="col-md-10">
//                             <input
//                                 type="text"
//                                 id="item${ingredientTypeNumber}1"
//                                 name="item${ingredientTypeNumber}1"
//                                 class="form-control mt-1 ms-3"
//                                 placeholder="Enter Item"
//                                 value="<%= typeof lifeStyle != 'undefined' ? lifeStyle : '' %>"
//                             />
//                         </div>
//                     </div>
//                 </div>
                
//                 <div class="row">
//                     <div class="col-md-10">
//                         <hr>
//                     </div>
//                     <div class="col mt-1" align="center">
//                         <button type="button" class="btn btn-primary btn-md" id="itemButton${ingredientTypeNumber}"><i class="bi bi-node-plus"></i></button>
//                     </div>
//                 </div>
                
//             </div>
//             <div class="col mt-1" align="center">
//                 <button type="button" class="btn btn-danger btn-md" id="ingredientTypeButton${ingredientTypeNumber}"><i class="bi bi-node-minus"></i></button>
//             </div>
//         </div>
//         `);  

//         // addIngredient('Ingredient', '#ingredientTypeNumber', `#ingredientTypeButton${ingredientTypeNumber}`, ".ingredientTypeWapper");
//         removeField(`#rowIngredient${ingredientTypeNumber}`, `#ingredientTypeButton${ingredientTypeNumber}`);
//         addItem('Item', number, `#itemNumber${ingredientTypeNumber}`, `#itemButton${ingredientTypeNumber}`, `.itemWrapper${ingredientTypeNumber}`);
//     })
// }
// function addItem (label, number, numberItem, button, wrapper){
//     var ingredientTypeNumber = $(number).val();
//     var itemNumber = $(numberItem).val();
//     $(button).on('click', () => {
//         var ingredientTypeWapper = $(wrapper);
//         $(numberItem).val(++itemNumber);
//         $(ingredientTypeWapper).append(`
//         <div class="row" id="rowItem${ingredientTypeNumber}${itemNumber}">
//             <div class="col-md-10">
//                 <input
//                     type="text"
//                     id="item${ingredientTypeNumber}${itemNumber}"
//                     name="item${ingredientTypeNumber}${itemNumber}"
//                     class="form-control mt-1 ms-3"
//                     placeholder="Enter Item"
//                 />
//             </div>
//             <div class="col mt-1" align="center">
//                 <button type="button" class="btn btn-danger btn-md" id="itemButton${ingredientTypeNumber}${itemNumber}"><i class="bi bi-node-minus"></i></button>
//             </div>
//         </div>
//         `);  

//         // addIngredient('Ingredient', '#ingredientTypeNumber', `#ingredientTypeButton${ingredientTypeNumber}`, ".ingredientTypeWapper");
//         removeField( `#rowItem${ingredientTypeNumber}${itemNumber}`, `#itemButton${ingredientTypeNumber}${itemNumber}`);
//     })
// }

// function addField (label, name, number, button, wrapper, row){
//     var _number = $("#"+number).val();
//     $("#"+button).on('click', () => {
//         var _wrapper = $("."+wrapper);
//         $("#"+number).val(++_number);
//         $(_wrapper).append(`
//         <div class="row" id="${row}${_number}">
//             <div class="col-md-10">
//                 <input
//                     type="text"
//                     id="${name}${_number}"
//                     name="${name}${_number}"
//                     class="form-control mt-1"
//                     placeholder="Enter ${label}"
//                     value=""
//                 />
                
//             </div>
//             <div class="col mt-1" align="center">
//                 <button type="button" class="btn btn-danger btn-md" id="${button}${_number}"><i class="bi bi-node-minus"></i></button>
//             </div>
//         </div>
//         `);  

//         removeField(`#${row}${_number}`, `#${button}${_number}`);
//     })
// }


// function removeField ( row, button){
//     $(button).on('click', () => {
//         var oldBtn = $(row);
//         oldBtn.remove()
//     })
// }

// module.exports = {
//     addIngredient, 
//     addField,
//     addItem,
//     removeField
// }