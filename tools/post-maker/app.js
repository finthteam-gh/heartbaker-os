// Heartbaker Post Maker v0.1 (prototype).
// ChatGPT supplies the picture and the words. This page supplies the real logo and the brand fonts.
(() => {
  const CFG = window.HB_CONFIG;
  const $ = (s) => document.querySelector(s);
  const state = { img: null, name: "" };
  const assets = { logos: {}, collection: {} };

  // ---------- loading ----------
  function loadImage(src) {
    return new Promise((resolve, reject) => {
      const im = new Image();
      im.onload = () => resolve(im);
      im.onerror = () => reject(new Error("Cannot load " + src));
      im.src = src;
    });
  }

  async function loadAssets() {
    for (const [key, file] of Object.entries(CFG.logos)) {
      if (file) assets.logos[key] = await loadImage(CFG.assetBase + file);
    }
    for (const key of ["black", "white"]) {
      assets.collection[key] = await loadImage(CFG.assetBase + CFG.collection[key]);
    }
    await Promise.all(CFG.fonts.preload.map((f) => document.fonts.load(f, "กขค Aa")));
  }

  // ---------- text parsing ----------
  const KEYS = { HEADLINE_TH: "hTH", HEADLINE_EN: "hEN", SUB_TH: "sTH", SUB_EN: "sEN", CTA: "cta", COLLECTION: "collection" };

  function parseBlock(text) {
    const out = {};
    let cur = null;
    const clean = text.replace(/[*`]/g, "").replace(/^\s*[-•]\s+/gm, "");
    for (const raw of clean.split(/\r?\n/)) {
      const m = raw.match(/^\s*([A-Za-z_]+)\s*[:：]\s*(.*)$/);
      if (m && KEYS[m[1].toUpperCase()]) {
        cur = KEYS[m[1].toUpperCase()];
        out[cur] = m[2].trim();
      } else if (cur && raw.trim()) {
        out[cur] += "\n" + raw.trim();
      }
    }
    return out;
  }

  const phraseRe = new RegExp(CFG.collection.phrase.replace(/\s+/g, "\\s+"), "i");

  function stripPhrase(text) {
    return text.replace(phraseRe, "").replace(/^[\s,.:;|/\-–—•]+|[\s,.:;|/\-–—•]+$/g, "");
  }

  function applyPastedBlock() {
    const parsed = parseBlock($("#paste").value);
    const ids = { hTH: "#hTH", hEN: "#hEN", sTH: "#sTH", sEN: "#sEN", cta: "#cta" };
    for (const [k, sel] of Object.entries(ids)) if (k in parsed) $(sel).value = parsed[k];
    if (/^(yes|true|y|ใช่)/i.test(parsed.collection || "")) $("#collection").checked = true;
    syncCollectionFromText();
    if (Object.keys(parsed).length) $("#modeText").checked = true;
    updateMode();
  }

  // When the phrase appears in any text field, move it into the script lockup automatically.
  function syncCollectionFromText() {
    for (const sel of ["#hTH", "#hEN", "#sTH", "#sEN", "#cta"]) {
      const el = $(sel);
      if (phraseRe.test(el.value)) {
        el.value = stripPhrase(el.value);
        $("#collection").checked = true;
      }
    }
  }

  // ---------- image analysis ----------
  function analyse(ctx, x, y, w, h) {
    const X = Math.max(0, Math.round(x)), Y = Math.max(0, Math.round(y));
    const W = Math.max(1, Math.round(w)), H = Math.max(1, Math.round(h));
    const d = ctx.getImageData(X, Y, W, H).data;
    let n = 0, sum = 0, sum2 = 0;
    for (let i = 0; i < d.length; i += 16) {
      const l = (0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]) / 255;
      sum += l; sum2 += l * l; n++;
    }
    const mean = sum / n;
    return { mean, sd: Math.sqrt(Math.max(0, sum2 / n - mean * mean)) };
  }

  function drawCover(ctx, img, W, H, fy) {
    const s = Math.max(W / img.naturalWidth, H / img.naturalHeight);
    const dw = img.naturalWidth * s, dh = img.naturalHeight * s;
    ctx.drawImage(img, (W - dw) / 2, (H - dh) * fy, dw, dh);
  }

  // ---------- text layout ----------
  const segmenter = typeof Intl !== "undefined" && Intl.Segmenter ? new Intl.Segmenter("th", { granularity: "word" }) : null;
  const tokens = (t) => (segmenter ? Array.from(segmenter.segment(t), (s) => s.segment) : Array.from(t));

  function wrap(ctx, text, maxW) {
    const lines = [];
    for (const para of text.split(/\n/)) {
      let line = "";
      for (const tok of tokens(para)) {
        const test = line + tok;
        if (!line || ctx.measureText(test).width <= maxW) line = test;
        else { lines.push(line.trimEnd()); line = tok.trimStart(); }
      }
      lines.push(line.trimEnd());
    }
    return lines;
  }

  const fontStack = (lang) => (lang === "th" ? `"${CFG.fonts.th}", "${CFG.fonts.en}", sans-serif` : `"${CFG.fonts.en}", "${CFG.fonts.th}", sans-serif`);

  const STYLES = {
    hTH: { lang: "th", weight: 700, size: 0.08, lh: 1.2 },
    hEN: { lang: "en", weight: 700, size: 0.06, lh: 1.15 },
    sTH: { lang: "th", weight: 400, size: 0.04, lh: 1.45 },
    sEN: { lang: "en", weight: 500, size: 0.038, lh: 1.4 },
  };

  function buildBlock(ctx, o, W, maxW, scale) {
    const rows = [];
    const gap = W * 0.022 * scale;
    let total = 0;
    const push = (row) => { rows.push(row); total += row.h; };

    if (o.collection) {
      const img = assets.collection[o.onDark ? "white" : "black"];
      const w = Math.min(maxW, W * 0.64) * Math.min(1, scale + 0.15);
      push({ type: "collection", img, w, h: (w * img.naturalHeight) / img.naturalWidth, gapAfter: gap * 1.2 });
      total += gap * 1.2;
    }
    for (const key of ["hTH", "hEN", "sTH", "sEN"]) {
      const text = (o[key] || "").trim();
      if (!text) continue;
      const st = STYLES[key];
      const size = W * st.size * scale;
      ctx.font = `${st.weight} ${size}px ${fontStack(st.lang)}`;
      const lines = wrap(ctx, text, maxW);
      const widest = Math.max(...lines.map((l) => ctx.measureText(l).width));
      push({ type: "text", key, lines, size, lh: size * st.lh, weight: st.weight, lang: st.lang, h: lines.length * size * st.lh, widest, gapAfter: gap });
      total += gap;
    }
    const cta = (o.cta || "").trim();
    if (cta) {
      const size = W * 0.034 * scale;
      ctx.font = `700 ${size}px ${fontStack("th")}`;
      const padX = size * 1.2, padY = size * 0.55;
      const tw = ctx.measureText(cta).width;
      push({ type: "cta", text: cta, size, padX, padY, w: tw + padX * 2, h: size * 1.2 + padY * 2, gapAfter: 0 });
    }
    // remove the trailing gap
    if (rows.length && rows[rows.length - 1].gapAfter) total -= rows[rows.length - 1].gapAfter;
    return { rows, total };
  }

  function roundRect(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // ---------- render one format ----------
  function renderFormat(fmt, o) {
    const { w: W, h: H, safe } = fmt;
    const warnings = [];
    const canvas = document.createElement("canvas");
    canvas.width = W; canvas.height = H;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
    drawCover(ctx, state.img, W, H, o.focusY);

    // Logo placement
    const logoW = W * CFG.logoWidthRatio;
    const ref = assets.logos.colour;
    const logoH = (logoW * ref.naturalHeight) / ref.naturalWidth;
    const logoX = (W - logoW) / 2;
    const logoY = o.logoPos === "top" ? safe.top : H - safe.bottom - logoH;
    const pad = logoW * 0.12;
    const zone = analyse(ctx, logoX - pad, logoY - pad, logoW + pad * 2, logoH + pad * 2);

    let pick = { key: "colour", plate: false };
    if (o.logoVariant !== "auto" && assets.logos[o.logoVariant]) {
      pick = { key: o.logoVariant, plate: false };
    } else if (zone.mean < CFG.logoPlateThreshold) {
      if (assets.logos.white) pick = { key: "white", plate: false };
      else {
        pick = { key: "colour", plate: true };
        warnings.push("The logo sits on a white plate because the white logo file is not installed yet.");
      }
    }
    if (zone.sd > 0.22) warnings.push("The area behind the logo is busy. Try the other logo position.");

    // Text block
    let block = null, onDark = false, textTop = 0;
    const hasText = o.mode === "text" && (o.collection || o.hTH || o.hEN || o.sTH || o.sEN || o.cta);
    if (hasText) {
      const maxW = W - 2 * Math.max(safe.left, safe.right);
      const gapLogo = W * 0.03;
      const regionTop = o.logoPos === "top" ? logoY + logoH + gapLogo : safe.top;
      const regionBottom = o.logoPos === "top" ? H - safe.bottom : logoY - gapLogo;
      const maxH = regionBottom - regionTop;

      let scale = 1;
      for (let i = 0; i < 14; i++) {
        block = buildBlock(ctx, { ...o, onDark: false }, W, maxW, scale);
        const widest = Math.max(0, ...block.rows.map((r) => r.widest || r.w || 0));
        if (block.total <= maxH && widest <= maxW + 1) break;
        scale *= 0.93;
      }
      if (block.total > maxH) warnings.push("The text is long for this format. Shorten it for a cleaner result.");
      textTop = o.logoPos === "top" ? regionBottom - block.total : regionTop;

      // Light or dark text is decided from the area the text really covers, so every format of one photo agrees.
      const area = analyse(ctx, W * 0.15, textTop, W * 0.7, block.total);
      onDark = area.mean < 0.5;
      if (area.sd > 0.24) warnings.push("The photo is busy behind the text. Ask ChatGPT to leave calm space for text, or shorten the text.");
      for (const r of block.rows) if (r.type === "collection") r.img = assets.collection[onDark ? "white" : "black"];

      // Soft band behind the text for legibility: fades in above the block and out below it.
      const pad = H * 0.06;
      const bandTop = textTop - pad;
      const bandH = block.total + pad * 2;
      const rgb = onDark ? "0,0,0" : "255,255,255";
      const maxA = onDark ? 0.5 : 0.6;
      const g = ctx.createLinearGradient(0, bandTop, 0, bandTop + bandH);
      g.addColorStop(0, `rgba(${rgb},0)`);
      g.addColorStop(pad / bandH, `rgba(${rgb},${maxA})`);
      g.addColorStop((pad + block.total) / bandH, `rgba(${rgb},${maxA})`);
      g.addColorStop(1, `rgba(${rgb},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(0, bandTop, W, bandH);
    }

    // Draw logo
    if (pick.plate) {
      ctx.save();
      ctx.fillStyle = "rgba(255,255,255,0.92)";
      roundRect(ctx, logoX - pad, logoY - pad, logoW + pad * 2, logoH + pad * 2, pad * 0.9);
      ctx.fill();
      ctx.restore();
    }
    ctx.drawImage(assets.logos[pick.key], logoX, logoY, logoW, logoH);

    // Draw text
    if (block) {
      let y = textTop;
      const ink = onDark ? CFG.colours.paper : CFG.colours.ink;
      ctx.textAlign = "center";
      ctx.textBaseline = "top";
      for (const r of block.rows) {
        if (r.type === "collection") {
          ctx.drawImage(r.img, (W - r.w) / 2, y, r.w, r.h);
        } else if (r.type === "text") {
          ctx.font = `${r.weight} ${r.size}px ${fontStack(r.lang)}`;
          ctx.fillStyle = ink;
          r.lines.forEach((line, i) => ctx.fillText(line, W / 2, y + i * r.lh + (r.lh - r.size) / 2));
        } else if (r.type === "cta") {
          ctx.fillStyle = CFG.colours.red;
          roundRect(ctx, (W - r.w) / 2, y, r.w, r.h, r.h / 2);
          ctx.fill();
          ctx.font = `700 ${r.size}px ${fontStack("th")}`;
          ctx.fillStyle = "#fff";
          ctx.fillText(r.text, W / 2, y + r.padY + r.size * 0.1);
        }
        y += r.h + (r.gapAfter || 0);
      }
    }
    return { canvas, warnings };
  }

  function withGuides(src, fmt) {
    const c = document.createElement("canvas");
    c.width = src.width; c.height = src.height;
    const ctx = c.getContext("2d");
    ctx.drawImage(src, 0, 0);
    const { w, h, safe } = fmt;
    ctx.fillStyle = "rgba(255,0,60,0.22)";
    ctx.fillRect(0, 0, w, safe.top);
    ctx.fillRect(0, h - safe.bottom, w, safe.bottom);
    ctx.fillRect(0, safe.top, safe.left, h - safe.top - safe.bottom);
    ctx.fillRect(w - safe.right, safe.top, safe.right, h - safe.top - safe.bottom);
    ctx.strokeStyle = "rgba(255,0,60,0.9)";
    ctx.lineWidth = 3;
    ctx.setLineDash([14, 10]);
    ctx.strokeRect(safe.left, safe.top, w - safe.left - safe.right, h - safe.top - safe.bottom);
    return c;
  }

  // ---------- UI ----------
  function options() {
    const val = (n) => document.querySelector(`input[name="${n}"]:checked`)?.value;
    return {
      mode: val("mode"),
      hTH: $("#hTH").value, hEN: $("#hEN").value, sTH: $("#sTH").value, sEN: $("#sEN").value, cta: $("#cta").value,
      collection: $("#collection").checked,
      logoPos: val("logoPos"),
      logoVariant: $("#logoVariant").value,
      focusY: { top: 0, centre: 0.5, bottom: 1 }[val("focus")],
    };
  }

  function slug(o) {
    const base = (o.hEN || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 28);
    return base || "post";
  }

  function stamp() {
    const d = new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
  }

  const toBlob = (canvas) => new Promise((res) => canvas.toBlob(res, "image/png"));

  function download(blob, name) {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = name;
    document.body.appendChild(a);
    a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1500);
  }

  let lastFiles = [];

  async function create() {
    const status = $("#status");
    if (!state.img) { status.textContent = "เลือกรูปก่อน · Choose a photo first"; return; }
    status.textContent = "กำลังสร้าง… · Creating…";
    syncCollectionFromText();
    const o = options();
    const chosen = CFG.formats.filter((f) => $("#fmt-" + f.id).checked);
    const results = $("#results");
    results.innerHTML = "";
    lastFiles = [];
    for (const fmt of chosen) {
      const { canvas, warnings } = renderFormat(fmt, o);
      const blob = await toBlob(canvas);
      const name = `HB_${stamp()}_${slug(o)}_${fmt.id}.png`;
      lastFiles.push(new File([blob], name, { type: "image/png" }));
      const card = document.createElement("div");
      card.className = "card";
      const shown = $("#guides").checked ? withGuides(canvas, fmt) : canvas;
      shown.className = "preview";
      card.append(shown);
      const meta = document.createElement("div");
      meta.className = "meta";
      meta.innerHTML = `<strong>${fmt.label}</strong> <span>${fmt.note} · ${fmt.w}×${fmt.h}</span>`;
      card.append(meta);
      for (const w of warnings) {
        const p = document.createElement("p");
        p.className = "warn";
        p.textContent = "⚠ " + w;
        card.append(p);
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "secondary";
      btn.textContent = "บันทึก · Save";
      btn.onclick = () => download(blob, name);
      card.append(btn);
      results.append(card);
    }
    $("#shareAll").hidden = !lastFiles.length;
    status.textContent = lastFiles.length ? `เสร็จแล้ว ${lastFiles.length} ไฟล์ · ${lastFiles.length} files ready` : "เลือกขนาดอย่างน้อยหนึ่งแบบ · Choose at least one size";
  }

  async function shareAll() {
    if (navigator.canShare && navigator.canShare({ files: lastFiles })) {
      try { await navigator.share({ files: lastFiles, title: "Heartbaker post" }); return; } catch (e) { if (e.name === "AbortError") return; }
    }
    for (const f of lastFiles) { download(f, f.name); await new Promise((r) => setTimeout(r, 400)); }
  }

  function updateMode() {
    $("#textPanel").hidden = document.querySelector('input[name="mode"]:checked').value !== "text";
  }

  function buildFormatChecks() {
    $("#formats").innerHTML = CFG.formats.map((f) => `<label class="check"><input type="checkbox" id="fmt-${f.id}" checked> ${f.label} <small>${f.note}</small></label>`).join("");
    const sel = $("#logoVariant");
    for (const k of Object.keys(assets.logos)) sel.insertAdjacentHTML("beforeend", `<option value="${k}">${k}</option>`);
  }

  async function init() {
    try {
      await loadAssets();
    } catch (e) {
      $("#status").textContent = "โหลดไฟล์แบรนด์ไม่ได้ · Brand files did not load: " + e.message;
      return;
    }
    buildFormatChecks();
    $("#photo").addEventListener("change", async (ev) => {
      const f = ev.target.files[0];
      if (!f) return;
      state.img = await loadImage(URL.createObjectURL(f));
      state.name = f.name;
      const thumb = new Image();
      thumb.alt = "";
      thumb.src = state.img.src;
      $("#thumbBox").replaceChildren(thumb);
    });
    $("#paste").addEventListener("input", applyPastedBlock);
    for (const sel of ["#hTH", "#hEN", "#sTH", "#sEN", "#cta"]) $(sel).addEventListener("change", syncCollectionFromText);
    document.querySelectorAll('input[name="mode"]').forEach((r) => r.addEventListener("change", updateMode));
    $("#create").addEventListener("click", create);
    $("#shareAll").addEventListener("click", shareAll);
    $("#clear").addEventListener("click", () => {
      for (const s of ["#paste", "#hTH", "#hEN", "#sTH", "#sEN", "#cta"]) $(s).value = "";
      $("#collection").checked = false;
    });
    updateMode();
    $("#status").textContent = "พร้อมแล้ว · Ready";
    window.__hb = { parseBlock, stripPhrase, renderFormat, state, assets, CFG };
  }

  init();
})();
