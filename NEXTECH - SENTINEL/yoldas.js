(function() {
  // ── CSS ──────────────────────────────────────────────
  var style = document.createElement('style');
  style.textContent = `
    .yoldas-fab {
      position: fixed; bottom: 28px; right: 28px;
      width: 54px; height: 54px; border-radius: 50%;
      background: linear-gradient(135deg, #2563eb, #7c3aed);
      border: none; cursor: pointer; z-index: 800;
      display: flex; align-items: center; justify-content: center;
      font-size: 22px;
      box-shadow: 0 4px 20px rgba(37,99,235,0.45);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .yoldas-fab:hover { transform: scale(1.1); box-shadow: 0 6px 28px rgba(37,99,235,0.6); }

    .yoldas-overlay {
      position: fixed; inset: 0; background: rgba(0,0,0,0.45);
      z-index: 850; opacity: 0; pointer-events: none; transition: opacity 0.25s;
    }
    .yoldas-overlay.acik { opacity: 1; pointer-events: all; }

    .yoldas-drawer {
      position: fixed; top: 0; right: 0;
      width: 380px; height: 100vh;
      background: #0f1117;
      border-left: 1px solid #1e2130;
      z-index: 860; display: flex; flex-direction: column;
      transform: translateX(100%);
      transition: transform 0.28s cubic-bezier(0.4,0,0.2,1);
      box-shadow: -8px 0 40px rgba(0,0,0,0.5);
    }
    .yoldas-drawer.acik { transform: translateX(0); }

    .yoldas-header {
      padding: 18px 20px;
      background: linear-gradient(135deg, rgba(37,99,235,0.15), rgba(124,58,237,0.15));
      border-bottom: 1px solid #1e2130;
      display: flex; align-items: center; gap: 12px;
    }
    .yoldas-avatar {
      width: 38px; height: 38px; border-radius: 50%;
      background: linear-gradient(135deg,#2563eb,#7c3aed);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    .yoldas-header-info { flex: 1; }
    .yoldas-header-info strong { display: block; font-size: 14px; font-weight: 700; color: #f0f2f5; }
    .yoldas-header-info span { font-size: 11px; color: #6b7280; }
    .yoldas-kapat {
      width: 30px; height: 30px; border: none; background: #1c1f27;
      border-radius: 8px; color: #6b7280; cursor: pointer; font-size: 14px;
      display: flex; align-items: center; justify-content: center; transition: background 0.15s;
    }
    .yoldas-kapat:hover { background: #2a2d35; color: #f0f2f5; }

    .yoldas-mesajlar {
      flex: 1; overflow-y: auto; padding: 16px 18px;
      display: flex; flex-direction: column; gap: 12px;
    }

    .mesaj { display: flex; gap: 8px; max-width: 100%; }
    .mesaj.kullanici { flex-direction: row-reverse; }

    .mesaj-balon {
      padding: 10px 14px; border-radius: 14px; font-size: 13px; line-height: 1.5;
      max-width: 78%;
    }
    .mesaj.bot .mesaj-balon {
      background: #1c1f27; color: #d1d5db; border-radius: 4px 14px 14px 14px;
      border: 1px solid #2a2d35;
    }
    .mesaj.kullanici .mesaj-balon {
      background: linear-gradient(135deg,#2563eb,#1d4ed8);
      color: #fff; border-radius: 14px 4px 14px 14px;
    }
    .mesaj-ikon {
      width: 28px; height: 28px; border-radius: 50%; flex-shrink: 0; margin-top: 2px;
      display: flex; align-items: center; justify-content: center; font-size: 14px;
    }
    .mesaj.bot .mesaj-ikon { background: linear-gradient(135deg,#2563eb,#7c3aed); }
    .mesaj.kullanici .mesaj-ikon { background: #22262f; }

    .yazıyor {
      display: flex; gap: 4px; padding: 12px 14px;
      background: #1c1f27; border-radius: 4px 14px 14px 14px;
      border: 1px solid #2a2d35; width: fit-content;
    }
    .yazıyor span {
      width: 6px; height: 6px; background: #4b5563; border-radius: 50%;
      animation: yoldas-bounce 1.2s infinite;
    }
    .yazıyor span:nth-child(2) { animation-delay: 0.2s; }
    .yazıyor span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes yoldas-bounce {
      0%,60%,100%{transform:translateY(0)}
      30%{transform:translateY(-6px); background:#60a5fa;}
    }

    .yoldas-input-row {
      padding: 14px 18px; border-top: 1px solid #1e2130;
      display: flex; gap: 8px;
    }
    .yoldas-input {
      flex: 1; background: #1c1f27; border: 1px solid #2a2d35;
      border-radius: 10px; padding: 10px 14px; font-size: 13px;
      color: #f0f2f5; outline: none; font-family: inherit;
      transition: border-color 0.15s;
    }
    .yoldas-input:focus { border-color: #2563eb; }
    .yoldas-input::placeholder { color: #4b5563; }
    .yoldas-gonder {
      width: 38px; height: 38px; border-radius: 10px; border: none;
      background: #2563eb; color: #fff; cursor: pointer; font-size: 16px;
      display: flex; align-items: center; justify-content: center;
      transition: background 0.15s; flex-shrink: 0;
    }
    .yoldas-gonder:hover { background: #1d4ed8; }

    body.light .yoldas-drawer { background: #f9fafb; border-left-color: #e2e6ef; }
    body.light .yoldas-header { border-bottom-color: #e2e6ef; }
    body.light .yoldas-header-info strong { color: #111318; }
    body.light .yoldas-kapat { background: #f3f4f6; }
    body.light .mesaj.bot .mesaj-balon { background: #fff; color: #374151; border-color: #e2e6ef; }
    body.light .yoldas-input { background: #fff; border-color: #e2e6ef; color: #111318; }
    body.light .yoldas-input-row { border-top-color: #e2e6ef; }
  `;
  document.head.appendChild(style);

  // ── HTML ─────────────────────────────────────────────
  var html = `
    <div class="yoldas-overlay" id="yoldasOverlay"></div>
    <div class="yoldas-drawer" id="yoldasDrawer">
      <div class="yoldas-header">
        <div class="yoldas-avatar">🤖</div>
        <div class="yoldas-header-info">
          <strong>YOLDAŞ</strong>
          <span>Yapay Zeka Filo Asistanı · Aktif</span>
        </div>
        <button class="yoldas-kapat" id="yoldasKapatBtn">✕</button>
      </div>
      <div class="yoldas-mesajlar" id="yoldasMesajlar">
        <div class="mesaj bot">
          <div class="mesaj-ikon">🤖</div>
          <div class="mesaj-balon">Merhaba! Ben YOLDAŞ, filo yönetim asistanınızım. Sürücü performansı, rota optimizasyonu veya uyarılar hakkında soru sorabilirsiniz.</div>
        </div>
      </div>
      <div class="yoldas-input-row">
        <input class="yoldas-input" id="yoldasInput" placeholder="Soru sorun...">
        <button class="yoldas-gonder" id="yoldasGonderBtn">➤</button>
      </div>
    </div>
    <button class="yoldas-fab" id="yoldasFab" title="YOLDAŞ Asistan">🤖</button>
  `;
  var wrap = document.createElement('div');
  wrap.innerHTML = html;
  document.body.appendChild(wrap);

  // ── SABİT CEVAPLAR ────────────────────────────────────
  var TADILAT = '🚧 Merhaba! Ben YOLDAŞ, şu an yoğun bir gelişim sürecindeyim. Mühendislik ekibimiz yapay zeka altyapımı daha güçlü, daha akıllı ve daha hızlı hale getirmek için gece gündüz çalışıyor. Bu süreçte bazı sorularınıza yanıt veremeyebilirim — anlayışınız için teşekkür ederim. Yakında çok daha kapsamlı analizler, gerçek zamanlı filo önerileri ve proaktif uyarılarla karşınızda olacağım. Takipte kalın! 💙';

  var CEVAPLAR = {
    'Serkan Yıldız hakkında detaylı analiz ver':
      '⚠️ <strong>Serkan Yıldız — Detaylı Analiz</strong><br><br>' +
      '📉 Son 7 günlük performans skoru: <strong>%67</strong> (önceki ay ortalaması: %78)<br>' +
      '🛑 Ani fren olayı: Haftalık ortalama <strong>11.4 kez</strong> (filo ortalaması: 4.9 kez)<br>' +
      '⏱️ Ortalama tepki süresi normalin <strong>%40 üzerinde</strong><br>' +
      '📍 En fazla uyarı aldığı hat: <strong>Gebze – Adapazarı</strong> koridoru<br><br>' +
      '✅ <strong>Öneri:</strong> Bu hafta içinde birebir değerlendirme toplantısı yapılması, gerekirse savunmacı sürüş eğitimine yönlendirilmesi önerilir.',

    'İstanbul Ankara rota optimizasyonu öner':
      '📍 <strong>İstanbul – Ankara Rota Analizi</strong><br><br>' +
      '🕐 Mevcut ortalama gecikme: <strong>23 dakika</strong> (son 30 günlük veri)<br>' +
      '🔴 Kritik tıkanıklık noktası: <strong>Bolu Dağı geçişi</strong> (07:00–09:30 arası)<br>' +
      '🟡 İkincil sorun: <strong>Gerede kavşağı</strong> (17:00–19:00 arası)<br><br>' +
      '🗺️ <strong>Önerilen aksiyon:</strong><br>' +
      '• Çıkış saatini <strong>06:00 veya 09:45 sonrası</strong> olarak ayarlayın<br>' +
      '• Alternatif güzergah (D-100 yerine O-4 çevre yolu) yakıt tasarrufunda <strong>%8 iyileşme</strong> sağlayabilir<br>' +
      '• Hafta içi Salı-Çarşamba günleri trafik yoğunluğu en düşük seviyede',

    'Sürücü ödüllendirme sistemi öner':
      '🏆 <strong>Ahmet Yılmaz — Performans Raporu</strong><br><br>' +
      '✅ Art arda <strong>8 kusursuz sefer</strong> tamamlandı (sıfır uyarı)<br>' +
      '📈 Bu ay performans skoru: <strong>%92</strong><br>' +
      '⛽ Yakıt verimliliği filo ortalamasının <strong>%11 üzerinde</strong><br><br>' +
      '🎯 <strong>Ödüllendirme Önerileri:</strong><br>' +
      '• Aylık "En İyi Sürücü" rozeti ve dijital sertifika<br>' +
      '• Yakıt kartı bonusu veya prim tanımlaması<br>' +
      '• Yeni sürücülere mentor olarak atanması<br><br>' +
      '💡 Araştırmalar, tanınma bazlı ödüllendirmenin sürücü motivasyonunu ortalama <strong>%15 artırdığını</strong> göstermektedir.',

    'Sıcaklık uyarısı veren araçları listele':
      '🌡️ <strong>Sıcaklık Uyarısı — 3 Araç</strong><br><br>' +
      '🔴 <strong>34 MNO 005</strong> — Dorse sıcaklığı: +9°C (hedef: +2/+4°C) · Sürücü: Emre Şahin<br>' +
      '🟡 <strong>07 JKL 004</strong> — Dorse sıcaklığı: +7°C (hedef: +2/+4°C) · Sürücü: Ali Özkan<br>' +
      '🟡 <strong>06 PQR 006</strong> — Dorse sıcaklığı: -16°C (hedef: -18/-20°C) · Sürücü: Burak Aydın<br><br>' +
      '✅ <strong>Önerilen Aksiyon:</strong><br>' +
      '• İlk iki araç için soğutma ünitesi acil kontrol edilmeli<br>' +
      '• Üçüncü araçta termostat kalibrasyonu gerekebilir<br>' +
      '• İlaç/gıda yükü taşıyorsa teslimat öncesi ürün kontrol protokolü uygulanmalı',

    'Aylık uyarı trendi artan sürücüleri listele':
      '📊 <strong>Aylık Uyarı Trendi — Artış Tespit Edilen Sürücüler</strong><br><br>' +
      '🔴 <strong>Kaan Uslu</strong> — Geçen ay: 18 uyarı → Bu ay: 31 uyarı (<strong>+%72</strong>)<br>' +
      '🔴 <strong>Erdem Keskinci</strong> — Geçen ay: 22 uyarı → Bu ay: 34 uyarı (<strong>+%55</strong>)<br>' +
      '🟡 <strong>Serkan Yıldız</strong> — Geçen ay: 28 uyarı → Bu ay: 38 uyarı (<strong>+%36</strong>)<br>' +
      '🟡 <strong>Burak Aydın</strong> — Geçen ay: 19 uyarı → Bu ay: 25 uyarı (<strong>+%32</strong>)<br><br>' +
      '🔍 <strong>Uyarı Kaynakları (Ortalama):</strong><br>' +
      '• Ana Cihaz: %61 · Direksiyon Kılıfı: %24 · Dorse Kontrol: %15<br><br>' +
      '✅ <strong>Öneri:</strong> Kaan Uslu ve Erdem Keskinci için bu ay içinde birebir değerlendirme yapılması, uyarı eşiğini aşan sürücülere ek saha koçluğu planlanması önerilir.',

    'Bakım tarihi yaklaşan araçları listele':
      '🔧 <strong>Planlı Bakım Takvimi — Kritik 7 Araç</strong><br><br>' +
      '🔴 <strong>34 ABC 001</strong> · 3 gün · Periyodik bakım · Sürücü: Ahmet Yılmaz<br>' +
      '🔴 <strong>07 HIJ 012</strong> · 5 gün · Fren sistemi kontrolü · Sürücü: Furkan Öz<br>' +
      '🟡 <strong>06 DEF 002</strong> · 7 gün · Yağ değişimi · Sürücü: Mehmet Kaya<br>' +
      '🟡 <strong>34 GHI 003</strong> · 8 gün · Periyodik bakım · Sürücü: Can Demir<br>' +
      '🟡 <strong>34 STU 007</strong> · 9 gün · Lastik rotasyonu · Sürücü: Onur Kılıç<br>' +
      '⚪ <strong>06 BCD 010</strong> · 10 gün · Filtre değişimi · Sürücü: Ali Çetin<br>' +
      '⚪ <strong>34 EFG 011</strong> · 10 gün · Periyodik bakım · Sürücü: Hakan Arslan<br><br>' +
      '✅ Servis randevularının <strong>bugün alınması</strong> operasyonel aksama riskini sıfıra indirir.'
  };

  // ── LOGIC ─────────────────────────────────────────────
  function yoldasAc() {
    document.getElementById('yoldasDrawer').classList.add('acik');
    document.getElementById('yoldasOverlay').classList.add('acik');
    setTimeout(function() { document.getElementById('yoldasInput').focus(); }, 300);
  }

  function yoldasKapat() {
    document.getElementById('yoldasDrawer').classList.remove('acik');
    document.getElementById('yoldasOverlay').classList.remove('acik');
  }

  function mesajEkle(metin, tip) {
    var kutu = document.getElementById('yoldasMesajlar');
    var div = document.createElement('div');
    div.className = 'mesaj ' + tip;
    var ikon = tip === 'bot' ? '🤖' : '👤';
    div.innerHTML = '<div class="mesaj-ikon">' + ikon + '</div><div class="mesaj-balon">' + metin + '</div>';
    kutu.appendChild(div);
    kutu.scrollTop = kutu.scrollHeight;
  }

  function botCevapla(cevap) {
    var kutu = document.getElementById('yoldasMesajlar');
    var yazDiv = document.createElement('div');
    yazDiv.className = 'mesaj bot';
    yazDiv.id = 'yaziyorDiv';
    yazDiv.innerHTML = '<div class="mesaj-ikon">🤖</div><div class="yazıyor"><span></span><span></span><span></span></div>';
    kutu.appendChild(yazDiv);
    kutu.scrollTop = kutu.scrollHeight;
    setTimeout(function() {
      var el = document.getElementById('yaziyorDiv');
      if (el) el.remove();
      mesajEkle(cevap, 'bot');
    }, 1200);
  }

  function cevapBul(metin) {
    // birebir eşleşme
    if (CEVAPLAR[metin]) return CEVAPLAR[metin];
    // kısmi eşleşme (küçük harf)
    var kucuk = metin.toLowerCase();
    for (var anahtar in CEVAPLAR) {
      if (kucuk.indexOf(anahtar.toLowerCase().split(' ').slice(0,3).join(' ')) !== -1) {
        return CEVAPLAR[anahtar];
      }
    }
    return TADILAT;
  }

  function yoldasGonder() {
    var input = document.getElementById('yoldasInput');
    var metin = input.value.trim();
    if (!metin) return;
    input.value = '';
    mesajEkle(metin, 'kullanici');
    botCevapla(cevapBul(metin));
  }

  // event listeners
  document.getElementById('yoldasFab').addEventListener('click', yoldasAc);
  document.getElementById('yoldasKapatBtn').addEventListener('click', yoldasKapat);
  document.getElementById('yoldasOverlay').addEventListener('click', yoldasKapat);
  document.getElementById('yoldasGonderBtn').addEventListener('click', yoldasGonder);
  document.getElementById('yoldasInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') yoldasGonder();
  });

  // global erişim
  window.yoldasAc = yoldasAc;
  window.yoldasKapat = yoldasKapat;
  window.yoldasAcMesajla = function(mesaj) {
    yoldasAc();
    setTimeout(function() {
      mesajEkle(mesaj, 'kullanici');
      botCevapla(cevapBul(mesaj));
    }, 350);
  };
})();
