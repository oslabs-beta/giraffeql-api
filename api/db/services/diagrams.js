const Diagram = require('../models/diagram');

module.exports = {
  addDiagram: (req, res, next) => {
    try {
      const { user, diagramName, reactFlowData } = req.body;
      Diagram.create({
        user: user,
        diagramName: diagramName,
        reactFlowData: reactFlowData
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
      const { user } = req.params;
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
      const { diagramId } = req.body;
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
      const { diagramId, diagramName, reactFlowData } = req.body
      Diagram.findOneAndUpdate(
        { _id: diagramId },
        {
          diagramName: diagramName,
          reactFlowData: reactFlowData
        },
        {
          new: true
        })
        .then((data) => {
          res.locals.diagram = data;
          return next();
        })
    } catch(err) {
      return next(err);
    }
  }
}