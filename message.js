const scriptURLPost = "https://script.google.com/macros/s/AKfycbwM2NNaNRqRcZJMGFltgCRoO3DSc_fjW9s2kXBPYqTRhRxqWd9oHu-ny4GlZOE9taJ4/exec";
const form = document.forms["titip-pesan"];
const btnKirim = document.querySelector(".btn-kirim");
const btnLoading = document.querySelector(".btn-loading");
const myAlert = document.querySelector(".alert-warning");
const container = document.querySelector("#message-box");
const scriptURLGet =
  "https://script.googleusercontent.com/macros/echo?user_content_key=AehSKLgSjCbD5X8b631EmkGBEVr4AyXJKs_lORHKv9DmyWu5oUBozE9zQifpd4SKthv9qTlYEXXzJSyRyrJ2PxLCJTa3HdsrlQLsHk1Y26gYHZq_9q8D-lVueirVwGIHzcEdYzdQH-YhmrNBd3K5xlTYuN5MOc9S_yKcfVoaWOlfi17dqNsOoAwG-eYymfknIRVLB6BseZYgV43VciFQxxysC74J-qGaBIRbYP2IASQbQMPeMPQacLF0vaYunKXvH3-TiKkPN7AKYzCrqkBoYunYrH_2Q-gjYQ&lib=MXmdWRyV0bgPKdDboftv77IQAT1r8vRmO";
fetchMessage();

form.addEventListener("submit", (e) => {
  e.preventDefault();
  btnKirim.classList.toggle("d-none");
  btnLoading.classList.toggle("d-none");
  fetch(scriptURLPost, { method: "POST", body: new FormData(form) })
    .then((response) => {
      form.reset();
      btnKirim.classList.toggle("d-none");
      btnLoading.classList.toggle("d-none");
      myAlert.classList.toggle("d-none");
      setTimeout(() => {
        myAlert.classList.toggle("d-none");
      }, 3000);
      fetchMessage();
    })
    .catch((error) => console.error("Error!", error.message));
});

function fetchMessage() {
  container.innerHTML = `<div class="spinner-border text-warning mt-5" style="width: 2.5rem; height: 2.5rem;" role="status">
                          <span class="visually-hidden">Loading...</span>
                        </div>`;
  fetch(scriptURLGet)
    .then((resp) => resp.json())
    .then((data) => {
      maker(data);
    });
}

function maker(data) {
  let content = "";
  data.reverse().forEach((message) => {
    content += `<div class="col-lg-7 col-md-10 col-12">
              <div class="bubble-message d-flex align-items-center mb-3">
                <div class="user-photo me-4">
                  <img src="assets/img/user-icon.svg" width="50px" />
                </div>
                <div class="message ms-1">
                  <p class="fw-bolder">${message.nama}</p>
                  <p>${message.pesan}</p>
                </div>
              </div>
            </div>`;
  });
  container.innerHTML = content;
}

