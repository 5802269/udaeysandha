var toolbox = {
    // blockly's standard toolbox code - includes the basic blocks 
    "kind": "categoryToolbox",
    "contents": [
        {
            "kind": "category",
            "name": "Move",
            "colour": "#a55b80",
            "contents": [
                {
                    "kind": "block",
                    "type": "move",
                    "fields": {
                        "move": "forward",
                        "time": "100"
                    }
                }
            ]
        },
        {
            "kind": "category",
            "name": "Logic",
            "colour": "#5b80a5",
            "contents": [
                { "kind": "block", "type": "controls_if" },
                {
                    "kind": "block",
                    "type": "logic_compare",
                    "fields": {
                        "OP": "EQ"
                    }
                },
                {
                    "kind": "block",
                    "type": "logic_operation",
                    "fields": {
                        "OP": "AND"
                    }
                },
                { "kind": "block", "type": "logic_negate" },
                {
                    "kind": "block",
                    "type": "logic_boolean",
                    "fields": {
                        "BOOL": "TRUE"
                    }
                }
            ]
        },
        {
            "kind": "category",
            "name": "Loops",
            "colour": "#5ba55b",
            "contents": [
                {
                    "kind": "block",
                    "type": "controls_repeat_ext",
                    "inputs": {
                        "TIMES": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "10"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "controls_whileUntil",
                    "fields": {
                        "MODE": "WHILE"
                    }
                },
                {
                    "kind": "block",
                    "type": "controls_for",
                    "fields": {
                        "VAR": "pw-{J0?#sq]BW!F]dR[F"
                    },
                    "inputs": {
                        "FROM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "1"
                                }
                            }
                        },
                        "TO": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "10"
                                }
                            }
                        },
                        "BY": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "1"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "kind": "category",
            "name": "Math",
            "colour": "#5b67a5",
            "contents": [
                {
                    "kind": "block",
                    "type": "math_number",
                    "fields": {
                        "NUM": "0"
                    }
                },
                {
                    "kind": "block",
                    "type": "math_arithmetic",
                    "fields": {
                        "OP": "ADD"
                    },
                    "inputs": {
                        "A": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "1"
                                }
                            }
                        },
                        "B": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "1"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_single",
                    "fields": {
                        "OP": "ROOT"
                    },
                    "inputs": {
                        "NUM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "9"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_trig",
                    "fields": {
                        "OP": "SIN"
                    },
                    "inputs": {
                        "NUM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "45"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_constant",
                    "fields": {
                        "CONSTANT": "PI"
                    }
                },
                {
                    "kind": "block",
                    "type": "math_number_property",
                    "mutations": {
                        "divisor_input": false
                    },
                    "fields": {
                        "PROPERTY": "EVEN"
                    },
                    "inputs": {
                        "NUMBER_TO_CHECK": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "0"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_round",
                    "fields": {
                        "OP": "ROUND"
                    },
                    "inputs": {
                        "NUM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "3.1"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_modulo",
                    "inputs": {
                        "DIVIDEND": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "64"
                                }
                            }
                        },
                        "DIVISOR": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "10"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_constrain",
                    "inputs": {
                        "VALUE": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "50"
                                }
                            }
                        },
                        "LOW": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "1"
                                }
                            }
                        },
                        "HIGH": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "100"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "math_random_int",
                    "inputs": {
                        "FROM": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "1"
                                }
                            }
                        },
                        "TO": {
                            "block": {
                                "type": "math_number",
                                "fields": {
                                    "NUM": "100"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "kind": "category",
            "name": "Text",
            "colour": "#5ba58c",
            "contents": [
                {
                    "kind": "block",
                    "type": "text",
                    "fields": {
                        "TEXT": ""
                    }
                },
                {
                    "kind": "block",
                    "type": "text_length",
                    "inputs": {
                        "VALUE": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "abc"
                                }
                            }
                        }
                    }
                },
                {
                    "kind": "block",
                    "type": "text_print",
                    "inputs": {
                        "TEXT": {
                            "block": {
                                "type": "text",
                                "fields": {
                                    "TEXT": "abc"
                                }
                            }
                        }
                    }
                }
            ]
        },
        {
            "kind": "sep"
        },
        {
            "kind": "category",
            "name": "Variables",
            "colour": "#a55b80",
            "custom": "VARIABLE"
        },
        {
            "kind": "category",
            "name": "Functions",
            "colour": "#995ba5",
            "custom": "PROCEDURE"
        }
    ]
};