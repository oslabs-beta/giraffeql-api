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
      let user = req.params.user || res.locals.user._id
      console.log(user)
      // const { user } = req.params || res.locals.user._id;
      Diagram.find({ user: user })
        .then((data) => {
          console.log(data)
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
      const { diagramId, user, diagramName, reactFlowData } = req.body
      if (diagramId) {
        Diagram.findOneAndUpdate(
          { _id: diagramId },
          {
            user: user,
            diagramName: diagramName,
            reactFlowData: reactFlowData
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
        const { user, diagramName, reactFlowData } = req.body;
        Diagram.create({
          user: user,
          diagramName: diagramName,
          reactFlowData: reactFlowData
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