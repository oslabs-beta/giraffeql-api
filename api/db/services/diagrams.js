const Diagram = require('../models/diagram');

module.exports = {
  addDiagram: (req, res, next) => {
    try {
      const { user, diagramName, tables, position } = req.body;
      Diagram.create({
        user: user,
        diagramName: diagramName,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        reactFlowData: tables,
        position: position
      }).then((data) => {
        res.locals.diagram = data;
        return next();
      });
    } catch(err) {
      return next(err);
    } 
  },
  getAllDiagrams: (req, res, next) => {
    try {
      let user = req.params.user || res.locals.user._id
      console.log(user)
      // const { user } = req.params || res.locals.user._id;
      Diagram.find({ user: user })
        .then((data) => {
          res.locals.diagrams = data
          return next();
        })
    } catch(err) {
      return next(err);
    }
  },
  deleteDiagram: (req, res, next) => {
    try {
      const { diagramId } = req.params;
      Diagram.findOneAndDelete({ _id: diagramId })
        .then((data) => {
          res.locals.diagram = data;
          return next();
        })
    } catch(err) {
      return next(err);
    }
    
  },
  updateDiagram: (req, res, next) => {
    try {
      const { diagramId, user, diagramName, tables } = req.body
      if (diagramId) {
        Diagram.findOneAndUpdate(
          { _id: diagramId },
          {
            user: user,
            diagramName: diagramName,
            updatedAt: Date.now(),
            tables: tables
          },
          {
            new: true,
            upsert: true
          })
          .then((data) => {
            res.locals.diagram = data;
            return next();
          })
      } else {
        const { user, diagramName, tables } = req.body;
        Diagram.create({
          user: user,
          diagramName: diagramName,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          tables: tables
        }).then((data) => {
          res.locals.diagram = data;
          return next();
        });
      }
      
    } catch(err) {
      return next(err);
    }
  }
}