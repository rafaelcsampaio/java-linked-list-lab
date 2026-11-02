import ExecutionPlayer from '../execution/ExecutionPlayer';
import { useState } from 'react';
import { Code2, Info, RotateCcw } from 'lucide-react';
import BackButton from '../layout/BackButton';
import ExecutionInspector from '../code/ExecutionInspector';
import StructurePreview from './StructurePreview';
import useExecutionPlayer from '../execution/useExecutionPlayer';
import { modules, execute, initialState, emptyState } from './structureExecution';
import '../../pages/CodeVisualizer/CodeVisualizer.css';
import './ModuleVisuals.css';

export default function StructureCodeExplorer({ variant }) {
    const config = modules[variant];
    const [operation, setOperation] = useState('push');
    const [scenario, setScenario] = useState('normal');
    const player = useExecutionPlayer();
    let initial = scenario === 'empty' ? emptyState(variant) : initialState(variant);
    if (scenario === 'full' && variant !== 'tree') {
        initial.slots = initial.slots.map((_, i) => (i + 1) * 10);
        if (variant === 'stack') initial.topo = initial.slots.length - 1;
        else { initial.inicio = 0; initial.fim = initial.slots.length - 1; initial.slots[initial.fim] = null; }
    }
    if (scenario === 'wrap' && variant === 'queue') initial = { slots: [20, null, null, null, null, 10, 15], inicio: 5, fim: 1 };
    if (scenario === 'single' && variant === 'tree') initial = { root: { value: 8, left: { value: 4, left: null, right: null }, right: null } };
    const value = scenario === 'missing' ? 99 : variant === 'tree' ? operation === 'push' ? 9 : scenario === 'leaf' ? 2 : 8 : 40;
    const execution = execute(variant, initial, operation, value);
    const frame = player.frame ?? execution.frames[0];
    function select(op, scene = scenario) { setOperation(op); setScenario(scene); player.clear(); }
    function clickLine(line) {
        const frames = player.frames.length ? player.frames : execution.frames;
        const next = frames.findIndex((f, i) => f.line === line && i > player.index);
        const target = next < 0 ? frames.findIndex(f => f.line === line) : next;
        if (target < 0) return;
        if (!player.frames.length) player.load(frames, false, target);
        else player.seek(target);
    }
    return <main className={`codePage moduleCodePage moduleCodePage--${variant}`}><BackButton />
        <header className="codeHeader"><span className="codeBadge moduleBadgeSoft">Java passo a passo</span><h1>Código de <span className="moduleTitleAccent">{config.name}</span></h1><p>Execute, pause ou selecione uma linha. Condições e iterações atualizam o mesmo estado mostrado no diagrama.</p></header>
        <section className="practiceSelector"><div><span>Escolha a operação</span><strong>{config.description}</strong></div><div className="practiceButtons">{Object.entries(config.operations).map(([key, label]) => <button key={key} className={operation === key ? 'selected' : ''} onClick={() => select(key)}>{label}</button>)}</div></section>
        <section className="practiceSelector structureScenarioSelector"><label>Cenário <select value={scenario} onChange={event => select(operation, event.target.value)}><option value="normal">Estrutura preenchida</option><option value="empty">Estrutura vazia</option>{variant !== 'tree' && <option value="full">Estrutura cheia</option>}{variant === 'queue' && <option value="wrap">Índices após a volta ao zero</option>}{variant === 'tree' && <><option value="leaf">Remover / buscar folha (2)</option><option value="single">Raiz com um filho (8)</option><option value="missing">Valor ausente (99)</option></>}</select></label><strong>{['push', 'search'].includes(operation) || (variant === 'tree' && operation === 'pop') ? `Argumento: ${value}` : 'Observe os índices e referências'}</strong></section>
        <section className="codeWorkspace"><article className="codeArea"><div className="codeToolbar"><div className="codeFileName"><Code2 size={17} /><span>{config.file}.java</span></div><div className="codeToolbarActions"><button onClick={player.clear}><RotateCcw size={16} />Reiniciar</button></div></div>
            <div className="codeHint"><Info size={17} /><span>Uma linha de laço pode executar várias vezes. Clique novamente para ver a próxima ocorrência.</span></div>
            <pre className="javaCode">{execution.code.map((line, index) => <button key={index} className={`javaLine ${frame.line === index ? 'active' : ''} ${execution.frames.some(f => f.line === index) ? '' : 'nonInteractive'}`} disabled={!execution.frames.some(f => f.line === index)} onClick={() => clickLine(index)}><span className="lineNumber">{String(index + 1).padStart(2, '0')}</span><code>{line || ' '}</code></button>)}</pre>
        </article><aside className="codeVisualization"><div className="visualizationTitle"><span>Estado da estrutura</span><strong>{config.operations[operation]}</strong></div><div className="practiceVisualizer"><div className="moduleCodePreview"><StructurePreview mode={variant} state={frame.state} activeIndexes={frame.active} activeValues={variant === 'tree' ? frame.active : []} /></div></div><ExecutionPlayer index={player.index} count={execution.frames.length} playing={player.playing} onPlayPause={() => player.frames.length ? player.toggle() : player.load(execution.frames, true)} onSeek={index => player.frames.length ? player.seek(index) : player.load(execution.frames, false, index)} /><div className="codeExplanation"><div className="codeExplanationContent"><span className="codeExplanationLabel">Linha {frame.line + 1}</span><ExecutionInspector showNavigation={false} explanation={frame.explanation} variables={frame.variables} condition={frame.condition} frameIndex={player.index} frameCount={execution.frames.length} onPrevious={() => { if (!player.frames.length) player.load(execution.frames); player.seek(player.index - 1); }} onNext={() => { if (!player.frames.length) player.load(execution.frames, false, 1); else player.seek(player.index + 1); }} /></div></div>{frame.visited.length > 0 && <p className="structureVisualNote">Visitas: {frame.visited.join(' → ')}</p>}{variant === 'tree' && <p className="structureVisualNote">Inserção e remoção são chamadas com <code>raiz = {operation === 'pop' ? 'remover' : 'inserir'}(raiz, valor)</code>; buscar e percorrer recebem raiz.</p>}</aside></section>
    </main>;
}
