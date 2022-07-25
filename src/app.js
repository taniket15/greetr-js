import $ from "jquery";

// G$("Taniket", "Mehra", "en").greet(true).log();
// var g = G$("Taniket", "Mehra", "en");
// g.greet();

$("#login").click(function () {
  const selectedValue = $("#lang").val();
  G$("Taniket", "Mehra", selectedValue).HTMLGreeting("#greeting");
});
