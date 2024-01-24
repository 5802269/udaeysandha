function showCode() {
    // Generate JavaScript code and display it.
    javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null;
    var code = javascript.javascriptGenerator.workspaceToCode(workspace);
    alert(code);
}

function runCode() {
    // Generate JavaScript code and run it.
    window.LoopTrap = 1000;
    javascript.javascriptGenerator.INFINITE_LOOP_TRAP =
        'if (--window.LoopTrap < 0) throw "Infinite loop.";\n';
    var code = javascript.javascriptGenerator.workspaceToCode(workspace);
    javascript.javascriptGenerator.INFINITE_LOOP_TRAP = null;
    try {
        eval(code);
    } catch (e) {
        alert(e);
    }
}