import ExecutionPlayer from '../execution/ExecutionPlayer';
import { useState } from 'react';
import { motion } from 'motion/react';
import { CircleAlert, Info, Play, RotateCcw, Undo2 } from 'lucide-react';
import BackButton from '../layout/BackButton';
import ExecutionInspector from '../code/ExecutionInspector';
import StructurePreview from './StructurePreview';
import useExecutionPlayer from '../execution/useExecutionPlayer';
import { execute, initialState, modules, stateVariables } from './structureExecution';
import '../../pages/Simulator/Simulator.css';
import './ModuleVisuals.css';

export default function StructureSimulator({ variant }) {
    const config = modules[variant];
    const [state, setState] = useState(() => initialState(variant));
    const [operation, setOperation] = useState('push');
    const [value, setValue] = useState('');
    const [history, setHistory] = useState([]);
    const [error, setError] = useState('');
    const player = useExecutionPlayer();
    const frame = player.frame;
    const busy = player.frames.length > 0 && player.index < player.frames.length - 1;
    const needsValue = operation === 'push' || operation === 'search' || (variant === 'tree' && operation === 'pop');
    const visible = frame?.state ?? state;
    function run() {
        const parsed = Number(value);
        if (needsValue && (!value.trim() || !Number.isInteger(parsed) || parsed < -2147483648 || parsed > 2147483647)) {
            setError('Digite um inteiro entre -2147483648 e 2147483647, compatível com int em Java.'); return;
        }
        setError('');
        const result = execute(variant, state, operation, parsed);
        setHistory(items => [{ state: structuredClone(state), label: `${config.operations[operation]}${needsValue ? ` (${parsed})` : ''}` }, ...items].slice(0, 20));
        setState(result.frames.at(-1).state);
        player.load(result.frames, true);
    }
    function reset() { player.clear(); setState(initialState(variant)); setHistory([]); setValue(''); setError(''); }
    function undo() { player.clear(); setState(history[0].state); setHistory(items => items.slice(1)); setError(''); }
    const message = error || frame?.explanation || 'Escolha uma operação e acompanhe cada mudança de estado.';
    return <main className={`simulatorPage moduleSimulatorPage moduleSimulatorPage--${variant}`}><BackButton /><header className="simulatorHeader"><span className="simulatorBadge moduleBadgeSoft">Simulador interativo</span><h1>Estrutura de <span className="moduleTitleAccent">{config.name}</span></h1><p>{config.description}. Execute e acompanhe as visitas, os valores e as referências.</p></header>
        <section className="simulatorWorkspace"><aside className="operationPanel"><span className="panelLabel">Operações</span><div className="operationButtons">{Object.entries(config.operations).map(([key, label]) => <button key={key} disabled={busy} className={operation === key ? 'selected' : ''} onClick={() => { setOperation(key); setError(''); }}>{label}</button>)}</div><div className="operationDescription"><strong>{config.operations[operation]}</strong><p>{variant === 'stack' ? 'Pilha estática: capacidade 6. Percorrer visita do topo até a base.' : variant === 'queue' ? 'Vetor de 7 posições com uma célula reservada. fim aponta à próxima inserção.' : 'A raiz está no nível 0. Duplicatas não criam novos nós.'}</p></div>
            {needsValue && <label>Valor inteiro<input type="number" step="1" value={value} disabled={busy} aria-invalid={!!error} onChange={e => { setValue(e.target.value); setError(''); }} onKeyDown={e => { if (e.key === 'Enter' && !busy) run(); }} placeholder={variant === 'tree' ? 'Ex.: 9' : 'Ex.: 40'} /></label>}
            <button className="executeButton" disabled={busy} onClick={run}><Play size={18} />Executar operação</button>
            <div className="historyActions"><button disabled={!history.length} onClick={undo}><Undo2 size={17} />Desfazer</button><button onClick={reset}><RotateCcw size={17} />Reiniciar</button></div>
        </aside><div className="simulatorMain"><motion.aside key={message} className={`simulatorFeedback ${error || frame?.error ? 'error' : 'info'}`} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} role="status"><div className="feedbackIcon">{error || frame?.error ? <CircleAlert size={21} /> : <Info size={21} />}</div><div><strong>O que está acontecendo?</strong><p>{message}</p></div></motion.aside>
            <section className="visualizerCard"><div className="visualizerHeader"><div><span>Visualização</span><strong>{variant === 'queue' ? 'Vetor circular' : config.name}</strong></div><span className="nodeCounter">{stateVariables(variant, visible).quantidade} elemento(s)</span></div><div className="moduleSimulatorVisual"><StructurePreview mode={variant} state={visible} activeIndexes={frame?.active ?? []} activeValues={variant === 'tree' ? frame?.active ?? [] : []} /></div>
            <ExecutionPlayer index={player.index} count={player.frames.length} playing={player.playing} onPlayPause={player.toggle} onSeek={player.seek} />
            {frame && <p className="structureVisualNote">Visitas: {frame.visited.join(' → ') || '—'}</p>}
            <ExecutionInspector showNavigation={false} explanation={frame ? 'Avance ou volte para revisar os estados desta operação.' : 'Estado inicial da estrutura.'} variables={frame?.variables ?? stateVariables(variant, visible)} condition={frame?.condition ?? null} frameIndex={player.index} frameCount={player.frames.length || 1} onPrevious={() => player.seek(player.index - 1)} onNext={() => player.seek(player.index + 1)} />
            </section><section className="moduleHistoryBox"><strong>Histórico de operações</strong>{history.length ? <ol className="moduleHistoryList">{history.map((entry, index) => <li className="moduleHistoryItem" key={index}>{entry.label}</li>)}</ol> : <p className="structureVisualNote">As operações executadas aparecerão aqui.</p>}</section>
        </div></section>
    </main>;
}
