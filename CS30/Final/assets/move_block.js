Blockly.Blocks['move'] = {
  // defining move block with a directional dropdown and a duration drodown
  init: function () {
    this.jsonInit({
      "type": "move",
      "message0": "move %1 for %2 ms",
      "args0": [
        {
          "type": "field_dropdown",
          "name": "move",
          "options": [
            [
              "forward",
              "forward"
            ],
            [
              "backward",
              "backward"
            ],
            [
              "left",
              "left"
            ],
            [
              "right",
              "right"
            ]
          ]
        },
        {
          "type": "field_number",
          "name": "time",
          "value": 100,
          "min": 0,
          "max": 9999,
          "precision": 1
        }
      ],
      "previousStatement": null,
      "nextStatement": null,
      "colour": 230,
      "tooltip": "",
      "helpUrl": ""
    });
  }
};

// javascript generation
javascript.javascriptGenerator.forBlock['move'] = function (block, generator) {
  var dropdown_move = block.getFieldValue('move');
  var number_time = block.getFieldValue('time');

  if (port) {
    // if connected to the port, the direction and time will be transmitted via serial 
    try {
      var code = 'writer.write("' + dropdown_move + '\\n");\n';  //sending direction
      code += 'writer.write("' + number_time + '\\n");\n';  //sending time
    } catch (e) {
      console.error(e);
    }
  } else {
    // if port not connected sending browser alert
    code = 'alert("Mr. Scott did you connect the Arduino?");\n';
  }
  // returning the code to be run in code generation
  return code;
};