import { useRef, useState } from "react";

const ImageEditor = () => {
    const [image, setImage] = useState<string | null>(null);
    const [brightness, setBrightness] = useState<number>(50);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result as string;
                setImage(result);

                // Dibujamos la imagen original en el canvas nada más subirla
                const canvas = canvasRef.current;
                if (!canvas) return;
                const ctx = canvas.getContext("2d");
                if (!ctx) return;

                const img = new Image();
                img.src = result;
                img.onload = () => {
                    canvas.width = img.width / 2;
                    canvas.height = img.height / 2;
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
            };
            reader.readAsDataURL(file);
        }
    };

    const applyFilter = (filter: string) => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx || !image) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width / 2;
            canvas.height = img.height / 2;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            for (let i = 0; i < data.length; i += 4) {
                if (filter === "grayscale") {
                    const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                    data[i] = data[i + 1] = data[i + 2] = avg;
                } else if (filter === "invert") {
                    data[i] = 255 - data[i];
                    data[i + 1] = 255 - data[i + 1];
                    data[i + 2] = 255 - data[i + 2];
                } else if (filter === "brightness") {
                    const factor = (brightness - 50) * (255 / 50);
                    data[i] = Math.min(255, Math.max(0, data[i] + factor));
                    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + factor));
                    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + factor));
                }
            }
            ctx.putImageData(imageData, 0, 0);
        };
    };

    const resetImage = () => {
        const canvas = canvasRef.current;
        if (!canvas || !image) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const img = new Image();
        img.src = image;
        img.onload = () => {
            canvas.width = img.width / 2;
            canvas.height = img.height / 2;
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
    };

    return (
        <div className="text-center p-4">

            {/* Input con accept para filtrar solo imágenes */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
            />

            {/* Botones de filtro — solo visibles si hay imagen cargada */}
            {image && (
                <>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                        <button
                            onClick={() => applyFilter("grayscale")}
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                            Escala de Grises
                        </button>
                        <button
                            onClick={() => applyFilter("invert")}
                            className="bg-red-500 text-white px-4 py-2 rounded"
                        >
                            Invertir Colores
                        </button>
                        <button
                            onClick={() => applyFilter("brightness")}
                            className="bg-yellow-500 text-white px-4 py-2 rounded"
                        >
                            Brillo
                        </button>
                        <button
                            onClick={resetImage}
                            className="bg-gray-500 text-white px-4 py-2 rounded"
                        >
                            Resetear
                        </button>
                    </div>

                    {/* Slider de brillo */}
                    <div className="flex flex-col items-center mb-4">
                        <label className="mb-1 font-semibold">
                            Intensidad de brillo: {brightness - 50 > 0 ? "+" : ""}{brightness - 50}
                        </label>
                        <input
                            type="range"
                            min={0}
                            max={100}
                            value={brightness}
                            onChange={(e) => setBrightness(Number(e.target.value))}
                            className="w-64"
                        />
                        <div className="flex justify-between w-64 text-sm text-gray-500">
                            <span>Oscuro</span>
                            <span>Neutro</span>
                            <span>Claro</span>
                        </div>
                    </div>
                </>
            )}

            <canvas ref={canvasRef} className="border mt-4"></canvas>
        </div>
    );
};

export default ImageEditor;