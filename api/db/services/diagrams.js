const Diagram = require('../models/diagram');

module.exports = {
  addDiagram: (req, res, next) => {
    try {
      const { user, diagramName, tables, position, description } = req.body;
      Diagram.create({
        user: user,
        diagramName: diagramName,
        description: description,
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
      const { diagramId, user, diagramName, tables, description } = req.body
      if (diagramId) {
        Diagram.findOneAndUpdate(
          { _id: diagramId },
          {
            user: user,
            diagramName: diagramName,
            description: description,
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
        const { user, diagramName, tables, description } = req.body;
        Diagram.create({
          user: user,
          diagramName: diagramName,
          description: description,
          createdAt: Date.now(),
          updatedAt: Date.now(),
          tables: tables,
          favorite: false
        }).then((data) => {
          res.locals.diagram = data;
          return next();
        });
      }
      
    } catch(err) {
      return next(err);
    }
  },
  toggleFavorite: async (req, res, next) => {
    try {
      const { diagramId } = req.params;
      console.log('diagramId :', diagramId)
      const diagram = await Diagram.findById(diagramId);
      console.log('diagram :', diagram)
      if (!diagram) return res.status(204).send('no data found');
      const newFav = !diagram.favorite;
      console.log(newFav);
      Diagram.findOneAndUpdate({ _id: diagramId }, 
        { favorite: newFav },
        { new: true}).then(data => {
          res.locals.diagram = data;
          return next();
        });
    } catch(err) {
      return next(err);
    }
  }
}