import { useState } from "react";

const questions = [
    {
        question: "¿Cuál de estos formatos soporta transparencia?",
        options: ["JPEG", "PNG", "WebP", "AVIF"],
        answer: "PNG",
    },
    {
        question: "¿Qué formato es más eficiente en la web?",
        options: ["PNG", "JPEG", "WebP", "AVIF"],
        answer: "AVIF",
    },
    {
        question: "¿Qué tipo de compresión usa JPEG?",
        options: ["Sin pérdida", "Con pérdida", "Vectorial", "Ninguna"],
        answer: "Con pérdida",
    },
    {
        question: "¿Qué formato es ideal para gráficos vectoriales escalables?",
        options: ["JPEG", "PNG", "SVG", "AVIF"],
        answer: "SVG",
    },
    {
        question: "¿Cuál de estos formatos fue desarrollado por Google?",
        options: ["AVIF", "WebP", "PNG", "JPEG"],
        answer: "WebP",
    },
    {
        question: "¿Qué significa la compresión sin pérdida?",
        options: [
            "La imagen pierde calidad al comprimirse",
            "La imagen mantiene toda su calidad original",
            "La imagen se convierte a blanco y negro",
            "La imagen se reduce a la mitad de tamaño",
        ],
        answer: "La imagen mantiene toda su calidad original",
    },
    {
        question: "¿Qué herramienta online permite convertir y comparar formatos de imagen?",
        options: ["Figma", "Squoosh", "Canvas", "Webpack"],
        answer: "Squoosh",
    },
    {
        question: "¿Qué formato es más adecuado para fotografías con muchos colores?",
        options: ["SVG", "PNG", "JPEG", "BMP"],
        answer: "JPEG",
    },
    {
        question: "¿Cuál de estos formatos soporta animaciones?",
        options: ["JPEG", "SVG", "AVIF", "BMP"],
        answer: "AVIF",
    },
    {
        question: "¿Qué formato ocupa menos espacio manteniendo buena calidad en la web?",
        options: ["PNG", "BMP", "JPEG", "WebP"],
        answer: "WebP",
    },
];

const TestEjercicio1 = () => {
    const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
        Array(questions.length).fill("")
    );
    const [submitted, setSubmitted] = useState(false);

    const handleSelect = (index: number, option: string) => {
        if (submitted) return;
        const newAnswers = [...selectedAnswers];
        newAnswers[index] = option;
        setSelectedAnswers(newAnswers);
    };

    const checkAnswers = () => {
        setSubmitted(true);
        const correct = selectedAnswers.filter(
            (ans, i) => ans === questions[i].answer
        ).length;
        alert(`Has respondido correctamente ${correct} de ${questions.length}`);
    };

    const reset = () => {
        setSelectedAnswers(Array(questions.length).fill(""));
        setSubmitted(false);
    };

    return (
        <div className="p-6 mt-8 border-t">
            <h2 className="text-2xl font-bold mb-4">Test de Conocimientos — Formatos de Imagen</h2>
            {questions.map((q, i) => (
                <div key={i} className="mb-6">
                    <p className="font-semibold mb-2">
                        {i + 1}. {q.question}
                    </p>
                    <div className="flex flex-wrap gap-2">
                        {q.options.map((opt) => {
                            let style = "bg-gray-300";
                            if (submitted) {
                                if (opt === q.answer) style = "bg-green-500 text-white";
                                else if (selectedAnswers[i] === opt) style = "bg-red-400 text-white";
                            } else if (selectedAnswers[i] === opt) {
                                style = "bg-blue-500 text-white";
                            }
                            return (
                                <button
                                    key={opt}
                                    className={`px-4 py-2 rounded ${style}`}
                                    onClick={() => handleSelect(i, opt)}
                                >
                                    {opt}
                                </button>
                            );
                        })}
                    </div>
                </div>
            ))}
            <div className="flex gap-4 mt-4">
                <button
                    onClick={checkAnswers}
                    disabled={submitted}
                    className="bg-green-500 text-white px-6 py-2 rounded disabled:opacity-50"
                >
                    Verificar respuestas
                </button>
                <button
                    onClick={reset}
                    className="bg-gray-500 text-white px-6 py-2 rounded"
                >
                    Reiniciar
                </button>
            </div>
        </div>
    );
};

export default TestEjercicio1;