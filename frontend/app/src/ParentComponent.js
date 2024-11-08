import React, { useState } from 'react';
import ProcessingOptions from './ProcessingOptions';
import ProcessedDisplay from './ProcessedDisplay';

const ParentComponent = () => {
    const [result, setResult] = useState(null);
    const [fileType, setFileType] = useState('text'); // or 'image' based on your application logic
    const [fileContent, setFileContent] = useState(''); // Set this based on your file input logic

    const resetResult = () => {
        setResult(null); // Clear previous results
    };

    return (
        <div>
            <ProcessingOptions 
                fileType={fileType} 
                onProcess={setResult} 
                fileContent={fileContent} 
                resetResult={resetResult} 
            />
            {result && <ProcessedDisplay result={result} />}
        </div>
    );
};

export default ParentComponent;
