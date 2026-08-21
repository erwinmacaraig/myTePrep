
module.exports = cds.service.impl(async function(){
    const {Worker} = this.entities;

    this.on('hike', async req => {
        const {ID} = req.data;
        if(!ID) {
            return req.reject(400, 'ID is required');
        }
        console.log(`Received request to increment salary for Worker with ID ${ID}`);
        // Start new transaction 
        const tx = cds.transaction(req);
        try {
            // retrieve the current salary amount of Worker
            const workers = await tx.read(Worker).where({ID : ID});
            if(!workers|| workers.length === 0) {
                await tx.rollback();
                return req.reject(404, `Worker with ID ${ID} not found.`);
            }

            const currentSalary = workers[0].salaryAmount;
            console.log(`Current salary fo worker with ID ${ID} is ${currentSalary}`);

            // update the database table
            const result = await tx.update(Worker).set({salaryAmount: currentSalary + 20000}).where({ID: ID});
            if (result === 0) {
                await tx.rollback();
                return req.reject(500, 'Failed to retrieve updated worker');
            }
            console.log(`Salary of worker with id {ID} is incremented by 20000`);

            // Retrieve the updated worker within the seame transaction before committing
            const updatedWorker = await tx.read(Worker).where({ID: ID});
            if (!updatedWorker || updatedWorker.length === 0) {
                await tx.rollback();
                return req.reject(500, 'Failed to retrieve updated worker');
            }

            //Commit transaction
            await tx.commit();
            console.log(`Updated worker with ID ${ID} retrieved successfully`);
            return req.reply({message:"Incremeneted", Worker: updatedWorker[0]})

        } catch(error) {
            // Rollback the transaction
            console.log(`Error during hike action:`, error);
            try {
                await tx.rollback();
            } catch(rollbackError) {
                console.log("Rollback failed", rollbackError);
            }
            return req.reject(500, `Error: ${error.message}`);
        }
    });
});