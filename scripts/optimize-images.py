from PIL import Image
import os

SIZES = [480, 800, 1200]

BASE_DIR = os.path.join(os.path.dirname(__file__), '..')
ASSETS_DIR = os.path.join(BASE_DIR, 'assets')
OUT_DIR = os.path.join(ASSETS_DIR, 'optimized')

os.makedirs(OUT_DIR, exist_ok=True)

def process_image(path):
    base, ext = os.path.splitext(os.path.basename(path))
    try:
        with Image.open(path) as im:
            im_format = im.format
            # Save main webp
            webp_path = os.path.join(OUT_DIR, f"{base}.webp")
            im.save(webp_path, 'WEBP', quality=80)
            print('Saved', webp_path)

            # Create resized webp versions
            for w in SIZES:
                if im.width <= w:
                    continue
                im_copy = im.copy()
                im_copy.thumbnail((w, w), Image.LANCZOS)
                out_path = os.path.join(OUT_DIR, f"{base}-{w}.webp")
                im_copy.save(out_path, 'WEBP', quality=80)
                print('Saved', out_path)

            # Save a fallback optimized copy of original type
            fallback = os.path.join(OUT_DIR, f"{base}-orig{ext}")
            im.save(fallback)
            print('Saved', fallback)
    except Exception as e:
        print('Error processing', path, e)

if __name__ == '__main__':
    for fname in os.listdir(ASSETS_DIR):
        if fname.lower().endswith(('.png', '.jpg', '.jpeg')):
            process_image(os.path.join(ASSETS_DIR, fname))

    print('Done. Optimized images are in', OUT_DIR)
