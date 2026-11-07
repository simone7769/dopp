import os
import subprocess
import re
from pathlib import Path
from collections import defaultdict

# Rapporti accettati (Width / Height)
RAPPORTI_OK = {
    0.75: "3:4",
    0.666: "2:3",
    0.8: "4:5",
    1.333: "4:3",
    1.5: "3:2",
    1.777: "16:9",
    2.143: "2833:1322 (Outlet)",
    2.079: "1616:777 (Collection)",
    1.720: "860:500 (Gift Card)"
}

def get_dims(filepath):
    try:
        out = subprocess.check_output(['sips', '-g', 'pixelWidth', '-g', 'pixelHeight', str(filepath)], stderr=subprocess.DEVNULL).decode()
        w = int(re.search(r'pixelWidth:\s*(\d+)', out).group(1))
        h = int(re.search(r'pixelHeight:\s*(\d+)', out).group(1))
        return w, h
    except Exception as e:
        return None, None

def main():
    print("🔍 Scansione immagini in images/...\n")
    images_dir = Path("images")
    rapporti_trovati = defaultdict(list)
    fuori_standard = []

    for f in images_dir.glob("*.*"):
        if f.suffix.lower() in ['.webp', '.jpg', '.jpeg', '.png']:
            w, h = get_dims(f)
            if w and h:
                ratio = round(w / h, 3)
                trovato = False
                for k, v in RAPPORTI_OK.items():
                    if abs(ratio - k) < 0.05:  # Tolleranza del 5%
                        rapporti_trovati[v].append(f.name)
                        trovato = True
                        break
                if not trovato:
                    fuori_standard.append((f.name, w, h, ratio))

    print("📊 RIEPILOGO RAPPORTI STANDARD:")
    for ratio_name, files in sorted(rapporti_trovati.items()):
        print(f"  {ratio_name}: {len(files)} immagini")

    if fuori_standard:
        print("\n⚠️ IMMAGINI CON RAPPORTO FUORI STANDARD:")
        for name, w, h, ratio in fuori_standard:
            print(f"  - {name} ({w}x{h}, ratio {ratio})")
    
    print("\n🔍 Controllo dimensioni dichiarate negli HTML...")
    html_files = list(Path(".").glob("*.html"))
    errori_html = 0
    for hf in html_files:
        content = hf.read_text(encoding="utf-8")
        # Trova img con src, width, height
        imgs = re.findall(r'<img[^>]+src="(images/[^"]+)"[^>]*width="(\d+)"[^>]*height="(\d+)"', content)
        for src, w_str, h_str in imgs:
            img_path = Path(src)
            if img_path.exists():
                real_w, real_h = get_dims(img_path)
                if real_w and real_h:
                    if int(w_str) != real_w or int(h_str) != real_h:
                        print(f"  ❌ {hf.name}: {src} dichiara {w_str}x{h_str} ma è {real_w}x{real_h}")
                        errori_html += 1

    if errori_html == 0:
        print("  ✅ Tutte le dimensioni HTML corrispondono ai file reali.")
    else:
        print(f"\n  ⚠️ Trovati {errori_html} errori di dimensione negli HTML.")

if __name__ == "__main__":
    main()
