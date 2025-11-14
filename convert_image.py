from PIL import Image
import os


def convert_image(
    input_path: str,
    output_path: str,
    target_height: int = 512,  # Set your desired height
    quality: int = 85,
    background_color: tuple = (255, 255, 255)  # Solid background color (white)
) -> None:
    """
    Resize an image so the height matches target_height, keeping aspect ratio.
    Pads the image with a solid background to ensure consistent dimensions.

    :param input_path: Path to the input image file.
    :param output_path: Path to save the resized image.
    :param target_height: Desired height for all images.
    :param quality: Quality of the output image.
    :param background_color: Background color to fill the padded area.
    """
    with Image.open(input_path) as image:
        width, height = image.size

        # Determine scaling factor to match target_height
        scale_factor = target_height / height
        new_width = int(width * scale_factor)
        new_height = target_height

        # Resize the image
        resized_image = image.resize((new_width, new_height), Image.LANCZOS)

        # Create a new blank image with the target height and adjusted width
        final_image = Image.new("RGB", (new_width, target_height), background_color)

        # Paste the resized image onto the blank canvas
        final_image.paste(resized_image, (0, 0))

        # Save the final image
        final_image.save(output_path, "WEBP", quality=quality, optimize=True)


if __name__ == "__main__":
    images = os.path.join(os.path.dirname(__file__), "images-base")
    output_dir = os.path.join(os.path.dirname(__file__), "chamber/images")
    os.makedirs(output_dir, exist_ok=True)

    for image in os.listdir(images):
        print(f"Processing [{image}].")
        print(f" - from {os.path.join(images, image)}")
        print(f" - to {os.path.join(output_dir, image)}\n")
        base_name, ext = os.path.splitext(image)
        output_filename = f"{base_name}.webp"
        convert_image(
            input_path=os.path.join(images, image),
            output_path=os.path.join(output_dir, output_filename),
            target_height=720,  # Set the desired height
            quality=75,
            background_color=(255, 255, 255),  # White background
        )