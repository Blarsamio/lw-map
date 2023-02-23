const autoComplete = (listOf) => {
  const teachers = []
  fetch(listOf).then((response) => response.json()).then((data) => {
    for (const feature of data.feature) {
      const teacher = feature.properties.title;
      teachers.push(teacher);

      const inputButton = document.querySelector(".form-control");
      inputButton.addEventListener("keyup", () => {
        const input = document.querySelector("input").value;
      });

      $(inputButton).autocomplete({
        source: teachers,
      });
    };
  });
};

export { autoComplete };
