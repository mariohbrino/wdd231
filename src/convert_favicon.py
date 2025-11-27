import io
import os

import cairosvg
from PIL import Image


def image_to_ico(image_path, ico_path, sizes=[(16, 16), (32, 32), (48, 48)]):
    """
    Converts an image file to an ICO file with specified sizes using Pillow.
    Creates both a multi-size ICO file and individual size files.
    """
    if image_path.lower().endswith(".svg"):
        # Convert SVG to PNG in memory
        png_data = cairosvg.svg2png(url=image_path, output_width=256, output_height=256)
        image = Image.open(io.BytesIO(png_data))
    else:
        image = Image.open(image_path)

    # Convert to RGBA if not already
    if image.mode != "RGBA":
        image = image.convert("RGBA")

    # Create multi-size ICO file
    image.save(ico_path, sizes=sizes)
    print(f"Multi-size ICO created: {ico_path}")

    # Create individual size files
    base_name = os.path.splitext(ico_path)[0]

    save_resized_ico(image, sizes[2], ico_path)
    print(f"Individual size ICO created: {ico_path}")

    for size in sizes:
        filename = f"{base_name}_{size[0]}x{size[1]}.ico"
        size_filename = save_resized_ico(image, size, filename)
        print(f"Individual size ICO created: {size_filename}")


def save_resized_ico(image, size, filename):
    resized_img = image.resize(size, Image.Resampling.LANCZOS)
    resized_img.save(filename)
    return filename


if __name__ == "__main__":
    image_to_ico("images/logo.svg", "images/favicon.ico")
