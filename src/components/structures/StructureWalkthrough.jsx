import { useState } from 'react';
import ExecutionInspector from '../code/ExecutionInspector';
import StructurePreview from './StructurePreview';
import { execute, initialState, modules } from './structureExecution';

export default function StructureWalkthrough({ variant, number }) {
    const [op, setOp] = useState('push');
    const [step, setStep] = useState(0);
    const result = execute(variant, initialState(variant), op, variant === 'tree' ? op === 'push' ? 9 : 8 : 40);
    const frame = result.frames[step];
    return <section className="theorySection"><div className="sectionHeading"><span className="sectionNumber">{number}</span><div><span className="sectionEyebrow">Do desenho à implementação</span><h2>Acompanhe as mudanças, uma instrução por vez</h2><p>Selecione a operação e avance. Voltar um passo restaura também o desenho e as variáveis.</p></div></div><div className="connectionActionSelector">{Object.entries(modules[variant].operations).map(([key, label]) => <button key={key} className={op === key ? 'selected' : ''} onClick={() => { setOp(key); setStep(0); }}>{label}</button>)}</div><div className="connectionLesson"><div className="modulePreviewShell"><StructurePreview mode={variant} state={frame.state} activeIndexes={frame.active} activeValues={variant === 'tree' ? frame.active : []} /></div><div className="connectionExplanationGrid"><div className="connectionCode"><pre><code>{result.code[frame.line]?.trim()}</code></pre>{frame.visited.length > 0 && <p className="structureCodeOutput">Saída: {frame.visited.join(' → ')}</p>}</div><ExecutionInspector explanation={frame.explanation} variables={frame.variables} condition={frame.condition} frameIndex={step} frameCount={result.frames.length} onPrevious={() => setStep(step - 1)} onNext={() => setStep(step + 1)} /></div></div><aside className="theoryTip"><span>💡</span><p>{variant === 'queue' ? 'fim é a próxima posição livre. getFim consulta (fim - 1 + tamanho) % tamanho. Uma célula fica reservada para distinguir cheia de vazia.' : variant === 'stack' ? 'Consultar e percorrer não removem elementos. Apenas pop modifica o topo para retirar um elemento.' : 'Inserir e remover devolvem a raiz da subárvore resultante. A chamada externa também precisa atualizar raiz.'}</p></aside></section>;
}
