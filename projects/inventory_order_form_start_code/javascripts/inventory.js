// var inventory;

// (function() {
//   inventory = {
//     lastId: 0,
//     collection: [],
//     setDate: function() {
//       var date = new Date();
//       $("#order_date").text(date.toUTCString());
//     },
//     cacheTemplate: function() {
//       var $iTmpl = $("#inventory_item").remove();
//       this.template = $iTmpl.html();
//     },
//     add: function() {
//       this.lastId++;
//       var item = {
//         id: this.lastId,
//         name: "",
//         stock_number: "",
//         quantity: 1
//       };
//       this.collection.push(item);

//       return item;
//     },
//     remove: function(idx) {
//       this.collection = this.collection.filter(function(item) {
//         return item.id !== idx;
//       });
//     },
//     get: function(id) {
//       var found_item;

//       this.collection.forEach(function(item) {
//         if (item.id === id) {
//           found_item = item;
//           return false;
//         }
//       });

//       return found_item;
//     },
//     update: function($item) {
//       var id = this.findID($item),
//           item = this.get(id);

//       item.name = $item.find("[name^=item_name]").val();
//       item.stock_number = $item.find("[name^=item_stock_number]").val();
//       item.quantity = $item.find("[name^=item_quantity]").val();
//     },
//     newItem: function(e) {
//       e.preventDefault();
//       var item = this.add(),
//           $item = $(this.template.replace(/ID/g, item.id));

//       $("#inventory").append($item);
//     },
//     findParent: function(e) {
//       return $(e.target).closest("tr");
//     },
//     findID: function($item) {
//       return +$item.find("input[type=hidden]").val();
//     },
//     deleteItem: function(e) {
//       e.preventDefault();
//       var $item = this.findParent(e).remove();

//       this.remove(this.findID($item));
//     },
//     updateItem: function(e) {
//       var $item = this.findParent(e);

//       this.update($item);
//     },
//     bindEvents: function() {
//       $("#add_item").on("click", $.proxy(this.newItem, this));
//       $("#inventory").on("click", "a.delete", $.proxy(this.deleteItem, this));
//       $("#inventory").on("blur", ":input", $.proxy(this.updateItem, this));
//     },
//     init: function() {
//       this.setDate();
//       this.cacheTemplate();
//       this.bindEvents();
//     }
//   };
// })();

// $($.proxy(inventory.init, inventory));

class Inventory {
  constructor() {
    this.lastId = 0,
    this.collection = [],
    this.setDate();
    this.template = Handlebars.compile(document.querySelector('#itemTemplate').innerHTML);
    this.bindEvents();
  }

  setDate() {
    let date = new Date();
    let dateInput = document.querySelector('#order_date');
    dateInput.textContent = date.toUTCString();
  }

  add() {
    this.lastId++;
    let item = {
      id: this.lastId,
      name: "",
      stock_number: "",
      quantity: 1,
    };
    this.collection.push(item);
    return item;
  }

  remove(idx) {
    this.collection = this.collection.filter(function(item) {
      return item.id !== idx;
    });
  }

  get(id) {
    let found_item;

    this.collection.forEach(function(item) {
      if (item.id === id) {
        found_item = item;
        return false;
      }
    });

    return found_item;
  }

  update(tr) {
    let id = this.findID(tr),
        item = this.get(id);

    item.name = tr.querySelector("[name^=item_name]").value;
    item.stock_number = tr.querySelector("[name^=item_stock_number]").value;
    item.quantity = tr.find("[name^=item_quantity]").value;
  }

  findID(item) {
    return +item.querySelector("input[type=hidden]").value;
  }

  newItem(e) {
    e.preventDefault();
    let item = this.add(),
        format = this.template(item);
    
    document.querySelector('#inventory').innerHTML += format;
  }

  deleteItem(e) {
    e.preventDefault();
    if (e.target.tagName === 'A') {
      let item = e.target.parentNode.parentNode;

      this.remove(this.findID(item));
      item.remove()
    }
  }

  updateItem(e) {
    if (e.target.tagName === 'INPUT') {
      let item = e.target.parentNode.parentNode;;
      this.update(item);
    } 
  }

  bindEvents() {
    document.querySelector("#add_item").addEventListener("click", this.newItem.bind(this));
    document.querySelector("#inventory").addEventListener("click", this.deleteItem.bind(this));
    document.querySelector('#inventory').addEventListener("blur", this.updateItem.bind(this));
  }
}

document.addEventListener('DOMContentLoaded', () => {
  let inventoryOrder = new Inventory();

})