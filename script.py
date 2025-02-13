import os

# Direktori sumber (folder 'src')
source_dir = "src"
output_file = "output.txt"

# Ekstensi file yang ingin dibaca (hanya file teks / kode)
valid_extensions = {".js", ".ts", ".tsx", ".jsx", ".json", ".md", ".txt"}

def collect_text_from_directory(directory, output_path):
    with open(output_path, "w", encoding="utf-8") as output:
        for root, _, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                _, ext = os.path.splitext(file)
                
                if ext in valid_extensions:  # Filter file teks/kode
                    try:
                        with open(file_path, "r", encoding="utf-8") as f:
                            content = f.read()
                            output.write(f"--- File: {file_path} ---\n")
                            output.write(content + "\n\n")
                    except Exception as e:
                        output.write(f"--- File: {file_path} (ERROR: {str(e)}) ---\n\n")

# Jalankan fungsi untuk mengumpulkan teks
collect_text_from_directory(source_dir, output_file)

print(f"Semua teks dari folder '{source_dir}' telah disalin ke '{output_file}'.")
