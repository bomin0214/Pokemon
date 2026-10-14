const chip = document.querySelector(".chip");
const stage = document.querySelector(".stage");
const poke_name = document.querySelector(".name");
const btn = document.querySelector(".btn");
const msg = document.querySelector(".msg");
const pokeball = document.querySelector(".pokeball");

// localStorage에 저장된 잡은 포켓몬 목록 꺼내오기. 저장된게 없으면 빈 배열로 시작
const caught = JSON.parse(localStorage.getItem("caught")) || [];

// 잡은 포켓몬 수
const chip_count = document.querySelector(".count");
chip_count.textContent = caught.length;

btn.addEventListener("click", async () => {
  btn.disabled = true; //불투명도 on
  poke_name.textContent = "";
  msg.textContent = "";

  pokeball.classList.add("shake");

  const random = Math.floor(Math.random() * 151) + 1;
  try {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${random}`,
    );
    const data = await res.json();

    const ko = data.names.find((n) => n.language.name === "ko");
    const result_name = ko ? ko.name : data.name;

    pokeball.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${random}.png`;
    pokeball.alt = result_name;
    poke_name.textContent = result_name;

    if (caught.includes(random)) {
      msg.textContent = "중복입니다.";
    } else {
      caught.push(random);
      localStorage.setItem("caught", JSON.stringify(caught));
      chip_count.textContent = caught.length;
      msg.textContent = "새로 잡았다.";
    }
  } catch (error) {
    msg.textContent = "불러오기 실패";
  }
  // pokeball.classList.add("shake");
  // pokeball.addEventListener("animationend", () => {
  //   pokeball.classList.remove("shake");
  //   btn.disabled = false; //불투명도 off, 원래색으로
  // });

  btn.disabled = false;
});
