const mongoose = require('../mongoose.js');

const Schema = mongoose.Schema;
const diagramSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  diagramName: {
    type: "String"
  },
  reactFlowData: {
    position: {
      type: [
        "Number"
      ]
    },
    zoom: {
      type: "Number"
    },
    tables: [
      {
        id: "String",
        type: { type: "String" },
        data: {
          label: {
            type: { type: "String" },
            key: "String",
            ref: "String",
            props: {
              children: {
                type: { type: "String" },
                key: "String",
                ref: "String",
                props: {
                  id: "String",
                  nodeid: "Number",
                  tablename: "String",
                  columns: [
                    {
                      name: "String",
                      dataType: "String",
                      required: "Boolean",
                      primaryKey: "Boolean"
                    }
                  ]
                },
                _owner: "String",
                _store: "Mixed"
              }
            },
            _owner: "String",
            _store: "Mixed"
          }
        },
        position: {
          x: "String",
          y: "String"
        },
        targetPosition: "String",
        sourcePosition: "String"
      },
    ],
    connections: [
      {
        id: "String",
        source: "String",
        sourceHandle: "String",
        target: "String",
        targetHandle: "String",
        animated: "Boolean",
        style: {
          stroke: "String",
          strokeWidth: "String"
        },
        type: { type: "String" }
      }
    ]
  }
});

module.exports = mongoose.models.Diagram || mongoose.model('Diagram', diagramSchema);