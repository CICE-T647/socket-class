$(document).ready(() => {
  $("#login").on("submit", e => {
    e.preventDefault();

    const user = {
      email: $("input[name=email]").val(),
      name: $("input[name=name]").val(),
      password: $("input[name=password]").val()
    };
    //Esto no me lo hagáis
    localStorage.setItem("name", user.name);
    $.ajax({
      type: "post",
      url: "http://localhost:3000/login",
      data: user,
      typeText: "text"
    }).done(data => {
      const { token } = data;

      localStorage.setItem("token", token);

      window.location = "/chat.html";
    });
  });
});
