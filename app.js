let posts = JSON.parse(localStorage.getItem("posts")) || [];

function addPost() {
  const type = document.getElementById("type").value;
  const title = document.getElementById("title").value;
  const text = document.getElementById("text").value;
  const file = document.getElementById("media").files[0];

  if (!title) return alert("Başlık gerekli");

  const post = {
    type,
    title,
    text,
    media: file ? URL.createObjectURL(file) : null,
    comments: []
  };

  posts.unshift(post);
  localStorage.setItem("posts", JSON.stringify(posts));
  clearInputs();
  render();
}

function addComment(i, id) {
  const input = document.getElementById(id);
  if (!input.value) return;

  posts[i].comments.push(input.value);
  localStorage.setItem("posts", JSON.stringify(posts));
  render();
}

function render() {
  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach((p, i) => {
    let mediaHTML = "";

    if (p.type === "image" && p.media) {
      mediaHTML = `<img src="${p.media}">`;
    }

    if (p.type === "video" && p.media) {
      mediaHTML = `<video controls src="${p.media}"></video>`;
    }

    container.innerHTML += `
      <div class="post">
        <h3>${p.title}</h3>
        ${mediaHTML}
        <p>${p.text || ""}</p>

        <h4>Yorumlar</h4>
        ${p.comments.map(c => `<div class="comment">💬 ${c}</div>`).join("")}

        <input id="c${i}" placeholder="Yorum yaz...">
        <button onclick="addComment(${i}, 'c${i}')">Gönder</button>
      </div>
    `;
  });
}

function clearInputs() {
  document.getElementById("title").value = "";
  document.getElementById("text").value = "";
  document.getElementById("media").value = "";
}

render();

