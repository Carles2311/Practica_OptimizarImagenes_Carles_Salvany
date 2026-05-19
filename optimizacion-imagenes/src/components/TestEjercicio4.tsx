import { useState } from "react";

const questions = [
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
    {
        question: "¿Qué hace el parámetro threshold en IntersectionObserver?",
        options: [
            "Define el tamaño máximo de la imagen",
            "Indica qué porcentaje del elemento debe ser visible para activarse",
            "Establece la calidad de compresión",
        ],
        answer: "Indica qué porcentaje del elemento debe ser visible para activarse",
    },
];

const TestEjercicio2 = () => {
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
            <h2 className="text-2xl font-bold mb-4">Test de Lazy Loading</h2>
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

export default TestEjercicio2;