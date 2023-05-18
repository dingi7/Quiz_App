import React, { useState, useEffect } from "react";

const HyperplexedText = () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const text = "HYPERPLEXED"
    const [displayText, setDisplayText] = useState("HYPERPLEXED");
    const [iteration, setIteration] = useState(0);
    let interval = null;

    useEffect(() => {
        return () => clearInterval(interval);
    }, [interval]);

    const handleMouseOver = () => {
        clearInterval(interval);

        interval = setInterval(() => {
            setDisplayText((prevText) =>
                prevText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }

                        return letters[Math.floor(Math.random() * 26)];
                    })
                    .join("")
            );

            if (iteration >= 10) {
                clearInterval(interval);
            }

            setIteration((prevIteration) => prevIteration + 1);
        }, 50);
    };

    return (
        <h1 data-value="HYPERPLEXED" onMouseOver={handleMouseOver}>
            {displayText}
        </h1>
    );
};

export default HyperplexedText;
