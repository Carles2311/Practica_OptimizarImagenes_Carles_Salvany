import { useState, useMemo } from "react";

const allQuestions = [
    // Ejercicio 1 - Formatos
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
    // Ejercicio 2 - Lazy Loading
    {
        question: "¿Qué hace Lazy Loading?",
        options: [
            "Carga todas las imágenes de inmediato",
            "Carga imágenes solo cuando son visibles",
            "Reduce la calidad de las imágenes",
        ],
        answer: "Carga imágenes solo cuando son visibles",
    },
    {
        question: "¿Qué API de JavaScript se usa para implementar Lazy Loading?",
        options: ["Fetch API", "Intersection Observer", "Canvas API"],
        answer: "Intersection Observer",
    },
    {
        question: "¿Cuál es el atributo HTML5 para activar Lazy Loading de forma nativa?",
        options: ['loading="eager"', 'loading="lazy"', 'defer="true"'],
        answer: 'loading="lazy"',
    },
    {
        question: "¿Qué beneficio principal aporta el Lazy Loading?",
        options: [
            "Aumenta la resolución de las imágenes",
            "Reduce el tiempo de carga inicial de la página",
            "Convierte imágenes a formato WebP",
        ],
        answer: "Reduce el tiempo de carga inicial de la página",
    },
    // Ejercicio 3 - Canvas
    {
        question: "¿Qué API de JavaScript permite manipular imágenes en un canvas?",
        options: ["WebGL", "Canvas API", "Intersection Observer"],
        answer: "Canvas API",
    },
    {
        question: "¿Cuál de estos métodos obtiene los datos de píxeles de una imagen en Canvas?",
        options: ["getContext()", "getImageData()", "setTimeout()"],
        answer: "getImageData()",
    },
    {
        question: "¿Qué método escribe los datos de píxeles modificados de vuelta en el canvas?",
        options: ["drawImage()", "putImageData()", "renderImage()"],
        answer: "putImageData()",
    },
    {
        question: "¿Cómo se convierte una imagen a escala de grises en Canvas?",
        options: [
            "Eliminando el canal alfa de cada píxel",
            "Promediando los valores R, G y B de cada píxel",
            "Multiplicando cada píxel por 0",
        ],
        answer: "Promediando los valores R, G y B de cada píxel",
    },
    // Ejercicio 4 - Figma
    {
        question: "¿Qué formato es ideal para exportar iconos desde Figma?",
        options: ["JPEG", "PNG", "SVG"],
        answer: "SVG",
    },
    {
        question: "¿Qué plugin permite exportar código JSX desde Figma?",
        options: ["Tailwind CSS for Figma", "Anima for Figma", "SVG Export"],
        answer: "Anima for Figma",
    },
    {
        question: "¿Cuál es la principal ventaja de usar SVG en React frente a PNG?",
        options: [
            "Ocupa más espacio en disco",
            "Es escalable sin perder calidad",
            "Soporta más colores que PNG",
        ],
        answer: "Es escalable sin perder calidad",
    },
    {
        question: "¿Qué herramienta permite diseñar interfaces web?",
        options: ["Photoshop", "Figma", "GIMP"],
        answer: "Figma",
    },
    {
        question: "¿Cuál es el formato más eficiente para imágenes en la web?",
        options: ["JPEG", "PNG", "WebP", "AVIF"],
        answer: "AVIF",
    },
];

const Test = () => {
    // useMemo para que el orden aleatorio no cambie en cada render
    const questions = useMemo(
        () => [...allQuestions].sort(() => Math.random() - 0.5),
        []
    );

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
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Test Final</h2>
            <p className="mb-4 text-gray-600">
                {questions.length} preguntas en orden aleatorio sobre todos los ejercicios.
            </p>
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
                    Reiniciar test
                </button>
            </div>
        </div>
    );
};

export default Test;