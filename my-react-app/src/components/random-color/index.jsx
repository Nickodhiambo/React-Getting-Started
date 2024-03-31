import { useState, useEffect } from 'react'

export default function RandomColor() {

    const [typeOfColor, setTypeOfColor] = useState('hex');
    const [color, setColor] = useState('#000000');

    // Generates a random number btn 0 and specified length
    function randomColorUtilityFunction(length) {
        return Math.floor(Math.random() * length);
    }

    // Generates a random hex color
    function handleRandomHexColor() {
        const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F'];
        let hexColor = '#';

        for (let i = 0; i < 6; i++) {
            hexColor += hex[randomColorUtilityFunction(hex.length)];
            setColor(hexColor);
        }

    }

    // Generates a random RGB color
    function handleRandomRGBColor() {
        const r = randomColorUtilityFunction(256);
        const g = randomColorUtilityFunction(256);
        const b = randomColorUtilityFunction(256);

        setColor(`rgb(${r},${g},${b})`);
    }

    useEffect(() => {
        if (typeOfColor === 'rgb' ? handleRandomRGBColor() : handleRandomHexColor());
    }, [typeOfColor])

    return (
        <>
            <div style={{
                width: '100vw',
                height: '100vh',
                background: color
            }}>
                <button onClick={() => setTypeOfColor('hex')}>Generate hex color</button>
                <button onClick={() => setTypeOfColor('rgb')}>Generate RGB color</button>
                <button onClick={() => typeOfColor === 'hex' ? handleRandomHexColor() : handleRandomRGBColor()}>
                    Generate random color
                </button>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    fontSize: '60px',
                    marginTop: '50px'
                }}>
                    <h3>{typeOfColor === 'rgb' ? 'RGB Color' : 'Hex Color'}</h3>
                    <h1>{color}</h1>
                </div>
            </div>
        </>
    )
}