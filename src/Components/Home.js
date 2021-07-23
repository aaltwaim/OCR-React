import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';

function Home() {
    const [ocr, setOcr] = useState('Recognizing...');
    const [showOdometer, setShowOdometer] = useState(false)
    useEffect(() => {
        doOCR();

    }, [showOdometer]);
    const worker = createWorker({
        logger: m => console.log(m),
    });
    const doOCR = async () => {
        if (showOdometer) {
            await worker.load();
            await worker.loadLanguage('eng');
            await worker.initialize('eng');
            const { data: { text } } = await worker.recognize('images/img.png');
            const matches = text.match(/\d+/g);
            var longest = matches.sort(
                function (a, b) {
                    return b.length - a.length;
                }
            )[0];
            setOcr(longest);
        }
    };
    const toggleShowOdometer = () => {
        setShowOdometer(true)
    }

    return (
        <div>

            <img src="images/img.png" />
            <button onClick={toggleShowOdometer}> Show Odometer image</button>
            {showOdometer ? <h2>{ocr}</h2> : null}
        </div>
    );
}

export default Home;