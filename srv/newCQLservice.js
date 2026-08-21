const { SELECT } = require("@sap/cds/lib/ql/cds-ql");

const cds = require('@sap/cds');
const INSERT = require("@sap/cds/lib/ql/INSERT");
const UPDATE = require("@sap/cds/lib/ql/UPDATE");
const {worker} = cds.entities('myte.db.master');

const NEWCQLService = function(srv) {
    srv.on('READ', 'readWorker', async(req, res) => {
        let results = [];
        results = await cds.tx(req).run(SELECT.from(worker).where({"firstName":"Saurabh"}));
        return results;
    });

    // Inserting data in table
    srv.on('CREATE', 'insertWorker', async(req,res) => {

        // let returnData = await cds.transaction(req).run([
        //     INSERT.into(worker).entries([req.data])
        // ]).then((resolve, reject) => {
        //     if (typeof(resolve) !== undefined){
        //         return req.data;
        //     } else {
        //         req.error(500, "There was an error");
                
        //     }
        // }).catch(err => {
        //     req.error(500, "below error occurred" + err.toString());
        // });
        let returnData = await cds.transaction(req).run([
            INSERT.into(worker).entries([req.data])
        ]);
        return returnData;
    });

    srv.on('UPDATE', 'updateWorker', async(req,res) => {
        let returnData = await cds.transaction(req).run([
            UPDATE(worker).set({
                firstName: req.data.firstName
            }).where({ID:req.data.ID}),
            UPDATE(worker).set({
                lastName: req.data.lastName
            }).where({ID:req.data.ID})
        ]).then((resolve, reject) => {
            if (typeof(resolve) !== undefined){
                return req.data;
            } else {
                req.error(500, "There was an error");
                
            }
        }).catch(err => {
            req.error(500, "below error occurred" + err.toString());
        });
    });

    srv.on('DELETE', 'deleteWorker', async(req,res) => {
        let returnData = await cds.transaction(req).run([
            DELETE.from(worker).where(req.data)
        ]).then((resolve, reject) => {
            if (typeof(resolve) !== undefined){
                return req.data;
            } else {
                req.error(500, "There was an error");
                
            }
        }).catch(err => {
            req.error(500, "below error occurred" + err.toString());
        });
    });
}

module.exports=NEWCQLService;