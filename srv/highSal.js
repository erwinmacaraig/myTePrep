const cds = require('@sap/cds');
const SELECT = require('@sap/cds/lib/ql/SELECT');

module.exports = srv => {
    srv.on('getHighestSalary', async() => {
        try {
            const {worker} = cds.entities('myte.db.master');
            // fetch the worker with the highest salary 
            const highestSalaryWorker = await cds.run(SELECT.one `salaryAmount as highestSalary` .from(worker).orderBy `salaryAmount DESC`);
            console.log('data', highestSalaryWorker);
            if (highestSalaryWorker) {
                return highestSalaryWorker.highestSalary;
            } else {
                return null;
            }
        } catch (error) {
            console.error('Error fetching highest Salary:', error);
            return null;
        }
    });
}