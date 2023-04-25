const slider = document.getElementById("image-slider");

window.onmousedown = (e) => {
  slider.dataset.mouseDownAt = e.clientX;
};

window.onmouseup = () => {
  slider.dataset.mouseDownAt = "0";
  slider.dataset.prevPercentage = slider.dataset.percentage;
};

window.onmousemove = (e) => {
  if (slider.dataset.mouseDownAt === "0") return;

  const mouseDelta = parseFloat(slider.dataset.mouseDownAt) - e.clientX;
  const maxDelta = window.innerWidth / 2;

  const percentage = (mouseDelta / maxDelta) * -100;
  const nextPercentage = parseFloat(slider.dataset.prevPercentage) + percentage;
  const nextPercentageConstrained = Math.max(Math.min(nextPercentage, 0), -100);

  slider.dataset.percentage = nextPercentageConstrained;

  slider.animate(
    { transform: `translate(${nextPercentageConstrained}%, -50%)` },
    { duration: 1200, fill: "forwards" }
  );

  for (const image of slider.getElementsByClassName("image")) {
    image.animate(
      { objectPosition: `${100 + nextPercentageConstrained}% center` },
      { duration: 1500, fill: "forwards" }
    );
  }
};
