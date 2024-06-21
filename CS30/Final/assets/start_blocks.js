var startBlocks = {
    // code for the initial blocks all ready on the workspace
    "blocks": {
        "languageVersion": 0,
        "blocks": [
            {
                "type": "controls_if",
                "inline": false,
                "extraState": {
                    "hasElse": true
                },
                "inputs": {
                    "IF0": {
                        "block": {
                            "type": "logic_compare",
                            "fields": {
                                "OP": "EQ"
                            },
                            "inputs": {
                                "A": {
                                    "block": {
                                        "type": "math_arithmetic",
                                        "fields": {
                                            "OP": "MULTIPLY"
                                        },
                                        "inputs": {
                                            "A": {
                                                "block": {
                                                    "type": "math_number",
                                                    "fields": {
                                                        "NUM": 7
                                                    }
                                                }
                                            },
                                            "B": {
                                                "block": {
                                                    "type": "math_number",
                                                    "fields": {
                                                        "NUM": 6
                                                    }
                                                }
                                            }
                                        }
                                    }
                                },
                                "B": {
                                    "block": {
                                        "type": "math_number",
                                        "fields": {
                                            "NUM": 42
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "DO0": {
                        "block": {
                            "type": "move",
                            "fields": {
                                "move": "forward",
                                "time": "100"
                            }
                        }
                    },
                    "ELSE": {
                        "block": {
                            "type": "text_print",
                            "inline": false,
                            "inputs": {
                                "TEXT": {
                                    "block": {
                                        "type": "text",
                                        "fields": {
                                            "TEXT": "oopsie"
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        ]
    }
};