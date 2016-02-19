$(function(){
  var templates = {};

  var inventoryItems = [];

  $("[type='x-handlebars-template']").each(function(template) {
    templates[$(this).attr("id")] = Handlebars.compile($(this).html());
  });

  function render() {
    $("#inventoryItems").html(templates.inventoryItems({inventoryItems: inventoryItems}));
  }


  Handlebars.registerPartial("inventoryItem", $("#inventoryItem").html());

  $("#add").on("submit", function(e) {
    e.preventDefault();
    var form_fields = {}
    $(this).find("input[type=text]").each(function() {
      form_fields[$(this).attr("id")] = $(this).val();
    });
    inventoryItems.push(form_fields);
    inventoryItems[inventoryItems.length - 1]["id"] = inventoryItems.length - 1;
    render();
    this.reset();
  });

  $("table").on("click", ".delete_button", function(e) {
    e.preventDefault();
    var $this = $(this);
    var check = confirm("Are you sure you want to delete " + inventoryItems[$this.attr("data-id")].name + " ?");
    if (check) {
      inventoryItems.splice([$this.attr("data-id"), 1]);
      render();
    }
  });

  $("table").on("dblclick", "tr", function(e) {
    var $this = $(this);
    var id = ($this.find("a").attr("data-id"));
    var current_item = inventoryItems[id];
    $this.html("");
    $this.html(templates.editInventory(current_item));
  });

  $(document).on("blur", ".edit", function(e) {
    var $e = $(e.currentTarget),
        input_values = {};


        setTimeout(function() {
          if ($("input:focus").length > 0 ) {
            console.log("still editing the form");
          } else {
            console.log("done editing the form");
            render();
            //$(".edit").find("input[type=text]").each(function() {
            //  input_values[$(this).attr("id")] = $(this).val();
            //});
          }
        }, 0)
  });

  $(document).on("submit", ".edit", function(e) {
    e.preventDefault();
    console.log("submitted");
    var form_fields = {};
    var id = $(this.find("a").attr("data-id"));
    $(this).find("input[type=text]").each(function() {
      form_fields[$(this).attr("id")] = $(this).val();
    });
    inventoryItems[id] = form_fields
    console.log(inventoryItem[id]);
    render();
  });
  //Handlebars.compile($("[script*=x-handlebars-template"]).html());
  //Handlebars.registerPartial("name", $([script*=x-handlebars-partial"]).html());
  // $("div").html(template_function({key: value}));
});
