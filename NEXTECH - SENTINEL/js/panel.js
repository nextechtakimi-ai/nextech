<script>
document.querySelectorAll(".user button").forEach(btn => {
  btn.addEventListener("click", () => {
    alert("Sürücü detay paneli açılıyor (demo)");
  });
});
</script>

<script>
const modal = document.getElementById("userModal");
const closeBtn = document.querySelector(".close");

function showDetail(btn) {
  document.getElementById("modalName").innerText = btn.dataset.name;
  document.getElementById("modalTrips").innerText = btn.dataset.trips;
  document.getElementById("modalPerf").innerText = "%" + btn.dataset.perf;
  modal.style.display = "flex";
}

closeBtn.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
  if (e.target === modal) modal.style.display = "none";
};
</script>

// ----------------- Sürücü Verisi -----------------
const drivers = [
    {name:"Ahmet Yılmaz", trips:58, perf:92, img:"https://i.pravatar.cc/100?img=12"},
    {name:"Mehmet Kaya", trips:42, perf:78, img:"https://i.pravatar.cc/100?img=32"},
    {name:"Can Demir", trips:49, perf:88, img:"https://i.pravatar.cc/100?img=45"},
    {name:"Emre Şahin", trips:35, perf:81, img:"https://i.pravatar.cc/100?img=18"},
    {name:"Burak Aydın", trips:30, perf:74, img:"https://i.pravatar.cc/100?img=21"},
    {name:"Onur Kılıç", trips:50, perf:89, img:"https://i.pravatar.cc/100?img=27"},
    {name:"Serkan Yıldız", trips:28, perf:67, img:"https://i.pravatar.cc/100?img=33"},
    {name:"Mert Koç", trips:46, perf:85, img:"https://i.pravatar.cc/100?img=41"},
    {name:"Ali Çetin", trips:33, perf:73, img:"https://i.pravatar.cc/100?img=50"},
    {name:"Hakan Arslan", trips:52, perf:90, img:"https://i.pravatar.cc/100?img=56"},
    {name:"Furkan Öz", trips:36, perf:76, img:"https://i.pravatar.cc/100?img=60"},
    {name:"Yusuf Polat", trips:40, perf:83, img:"https://i.pravatar.cc/100?img=65"},
    {name:"Kaan Uslu", trips:25, perf:69, img:"https://i.pravatar.cc/100?img=68"},
    {name:"Oğuzhan Er", trips:48, perf:87, img:"https://i.pravatar.cc/100?img=72"},
    {name:"İsmail Kurt", trips:31, perf:71, img:"https://i.pravatar.cc/100?img=75"},
    {name:"Ali Can", trips:45, perf:80, img:"https://i.pravatar.cc/100?img=10"},
    {name:"Ayşe Demir", trips:55, perf:93, img:"https://i.pravatar.cc/100?img=11"},
    {name:"Emine Kaya", trips:38, perf:77, img:"https://i.pravatar.cc/100?img=13"},
    {name:"Fatma Yıldız", trips:29, perf:70, img:"https://i.pravatar.cc/100?img=14"},
    {name:"Cem Özkan", trips:50, perf:85, img:"https://i.pravatar.cc/100?img=15"},
    {name:"Eren Polat", trips:42, perf:79, img:"https://i.pravatar.cc/100?img=16"},
    {name:"Merve Koç", trips:36, perf:74, img:"https://i.pravatar.cc/100?img=17"},
    {name:"Selim Arslan", trips:48, perf:88, img:"https://i.pravatar.cc/100?img=19"},
    {name:"Burcu Kurt", trips:33, perf:72, img:"https://i.pravatar.cc/100?img=20"},
    {name:"Tolga Er", trips:51, perf:86, img:"https://i.pravatar.cc/100?img=22"},
    {name:"Deniz Can", trips:37, perf:75, img:"https://i.pravatar.cc/100?img=23"},
    {name:"Bahar Yılmaz", trips:44, perf:82, img:"https://i.pravatar.cc/100?img=24"},
    {name:"Onur Demir", trips:39, perf:78, img:"https://i.pravatar.cc/100?img=25"},
    {name:"Serap Öz", trips:41, perf:80, img:"https://i.pravatar.cc/100?img=26"},
    {name:"Emir Koç", trips:53, perf:91, img:"https://i.pravatar.cc/100?img=28"},
];

// ----------------- Sürücüleri HTML'e ekle -----------------
const userList = document.getElementById("userList");

drivers.forEach(driver => {
    const div = document.createElement("div");
    div.classList.add("user");
    div.innerHTML = `
        <img src="${driver.img}">
        <div>
            <strong>${driver.name}</strong>
            <span>Performans: %${driver.perf}</span>
        </div>
        <button>Detay</button>
    `;
    userList.appendChild(div);
});

// ----------------- Modal -----------------
const modal = document.getElementById("userModal");
const modalName = document.getElementById("modalName");
const modalTrips = document.getElementById("modalTrips");
const modalPerf = document.getElementById("modalPerf");
const closeBtn = modal.querySelector(".close");

document.querySelectorAll(".user button").forEach((btn, index)=>{
    btn.addEventListener("click", ()=>{
        const driver = drivers[index];
        modalName.textContent = driver.name;
        modalTrips.textContent = driver.trips;
        modalPerf.textContent = "%" + driver.perf;
        modal.style.display = "flex";
    });
});

closeBtn.addEventListener("click", ()=> modal.style.display="none");
window.addEventListener("click", e=>{
    if(e.target===modal) modal.style.display="none";
});
