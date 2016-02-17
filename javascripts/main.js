$(function(){
  var templates = {};

  var inventoryItems = [];

  $("[type='x-handlebars-template']").each(function(template) {
    templates[$(this).attr("id")] = Handlebars.compile($(this).html());
  });

  console.log(templates);

  Handlebars.registerPartial("inventoryItem", $("#inventoryItem").html());

  $("form").on("submit", function(e) {
    e.preventDefault();
    var form_fields = {}
    $(this).find("input[type=text]").each(function() {
      form_fields[$(this).attr("id")] = $(this).val();
    });
    inventoryItems.push(form_fields);
    this.reset();
    $("#inventoryItems").html(templates.inventoryItems({inventoryItems: inventoryItems}));
  });
  //Handlebars.compile($("[script*=x-handlebars-template"]).html());
  //Handlebars.registerPartial("name", $([script*=x-handlebars-partial"]).html());
  // $("div").html(template_function({key: value}));
});
