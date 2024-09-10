import React from 'react'

interface ScoreProps {
    score: number;
    totalMarks: number;
}

const Remarks = [{
    word: "Great",
    description: "You are doing amazing! 🤩 Keep it up."
}, {
    word: "Good",
    description: "You are doing good! 🤗 Keep studying, you can do better."
}, {
    word: "Poor",
    description: "You are doing poorly! 😔 Keep studying, you can do better."
}, {
    word: "Terrible",
    description: "You are doing terrible! 😔 Keep studying, you can do better."
}];

const Score = ({ score, totalMarks }: ScoreProps) => {
    const percentage = Math.round((score / totalMarks) * 100);
    const getColor = () => {
        if (percentage >= 80) return 'text-green-500';
        if (percentage >= 60) return 'text-yellow-500';
        return 'text-red-500';
    };

    const getRemarks = () => {
        if (percentage >= 80) return Remarks[0];
        if (percentage >= 60) return Remarks[1];
        if (percentage >= 40) return Remarks[2];
        return Remarks[3];
    };

    return (
        <div className='h-fit lg:h-screen w-full max-w-sm flex flex-col items-center justify-center p-8'>
            <h1 className='text-2xl md:text-3xl font-bold mb-6 text-gray-800'>Your Result</h1>
            <div className={`text-5xl md:text-6xl font-bold mb-2 ${getColor()}`}>
                {score}
                <span className='text-2xl md:text-3xl text-gray-500'>/{totalMarks}</span>
            </div>
            <p className='text-lg md:text-xl font-bold'>{getRemarks().word}</p>
            <p className='text-sm text-gray-600 text-center'>{getRemarks().description}</p>
        </div>
    )
}

export default Score