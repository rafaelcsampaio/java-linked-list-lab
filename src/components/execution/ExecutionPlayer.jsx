import { useId } from 'react';
import { ChevronLeft, ChevronRight, FastForward, Pause, Play, Rewind, RotateCcw } from 'lucide-react';
import useExecutionSpeed from './useExecutionSpeed';
import { setStepDelay } from './executionSpeed';
import './ExecutionPlayer.css';

export default function ExecutionPlayer({ index = 0, count = 0, playing = false, onPlayPause, onSeek }) {
    const id = useId();
    const delay = useExecutionSpeed();
    const speeds = [...new Set([6000, 4000, 2000, 1000, 500, delay])].sort((a, b) => b - a);
    const available = count > 0;
    const end = Math.max(0, count - 1);
    const speedLabel = value => `${Number((2000 / value).toFixed(2)).toLocaleString('pt-BR')}×`;
    const seek = next => onSeek(Math.max(0, Math.min(end, next)));
    return (
        <section className="executionPlayer" aria-label="Player da execução">
            <div className="executionPlayerProgress">
                <label htmlFor={`${id}-progress`}>{available ? `Passo ${index + 1} de ${count}` : 'Prepare uma operação'}</label>
                <span>{playing ? 'Reproduzindo' : !available ? 'Pronto' : index === end ? 'Concluído' : 'Pausado'}</span>
            </div>
            <input
                id={`${id}-progress`}
                className="executionPlayerTimeline"
                type="range"
                min="0"
                max={end || 1}
                value={index}
                disabled={count < 2}
                aria-valuetext={`Passo ${index + 1} de ${count}`}
                onChange={event => seek(Number(event.target.value))}
            />
            <div className="executionPlayerControls">
                <div className="executionPlayerTransport">
                    <button type="button" title="Voltar ao início" aria-label="Voltar ao início" disabled={!available || index === 0} onClick={() => seek(0)}><RotateCcw size={17} /></button>
                    <button type="button" title="Voltar 5 passos" aria-label="Voltar 5 passos" disabled={!available || index === 0} onClick={() => seek(index - 5)}><Rewind size={19} /></button>
                    <button type="button" title="Passo anterior" aria-label="Passo anterior" disabled={!available || index === 0} onClick={() => seek(index - 1)}><ChevronLeft size={22} /></button>
                    <button type="button" className="executionPlayerPlay" title={playing ? 'Pausar' : index === end && available ? 'Reproduzir novamente' : 'Reproduzir'} aria-label={playing ? 'Pausar' : 'Reproduzir'} disabled={!available} onClick={onPlayPause}>{playing ? <Pause size={21} fill="currentColor" /> : <Play size={21} fill="currentColor" />}</button>
                    <button type="button" title="Próximo passo" aria-label="Próximo passo" disabled={!available || index === end} onClick={() => seek(index + 1)}><ChevronRight size={22} /></button>
                    <button type="button" title="Avançar 5 passos" aria-label="Avançar 5 passos" disabled={!available || index === end} onClick={() => seek(index + 5)}><FastForward size={19} /></button>
                </div>
                <label className="executionPlayerSpeed" htmlFor={`${id}-speed`}>Velocidade
                    <select id={`${id}-speed`} value={delay} onChange={event => setStepDelay(event.target.value)}>
                        {speeds.map(value => <option key={value} value={value}>{speedLabel(value)}</option>)}
                    </select>
                </label>
            </div>
            <p>Use as setas ou arraste a barra para revisar. 1× = 2 segundos por passo.</p>
        </section>
    );
}
