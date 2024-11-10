const jobAssigner = (start, reapMode, functionName,...args) => {
    
    if (typeof functionName !== 'function') {
        console.error('Provided functionName is not a valid function.');
        return;
    }

    const executeJob = async () => {
        try {
            await functionName(...args);
            console.log('Job completed successfully.');
        } catch (error) {
            console.error('Job execution failed:', error);
        }
    };
  
    setTimeout(() => {
        executeJob();

       
        switch(reapMode) {
            case 'once':
              
                console.log('Job executed once.');
                break;
            case 'daily':
               
                setInterval(executeJob, 24 * 60 * 60 * 1000); 
              
                break;
            case 'weekly':
               
                setInterval(executeJob, 7 * 24 * 60 * 60 * 1000); 
                
                break;
            default:
                console.error('Unknown reap mode.');
        }
    }, start);
};

module.exports = jobAssigner;
